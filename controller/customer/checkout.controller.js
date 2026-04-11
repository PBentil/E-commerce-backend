import axios from "axios";
import db from "../../models/index.js";

const { CartItem, Product, Store } = db;

export const checkout = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1️⃣ Fetch cart items
        const cartItems = await CartItem.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    as: "Product",
                    include: [{ model: Store, as: "Store" }]
                }
            ]
        });

        if (!cartItems.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const total = cartItems.reduce((sum, item) => {
            return sum + item.Product.price * item.quantity;
        }, 0);


        const { email, paymentMethod } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required for payment" });
        }

        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount: total * 100,
                currency: "GHS",
                channels: paymentMethod === "momo" ? ["mobile_money"] : ["card"]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // 4️⃣ Return the payment URL to frontend
        res.status(200).json({
            message: "Payment initialized",
            authorization_url: response.data.data.authorization_url,
            access_code: response.data.data.access_code,
            reference: response.data.data.reference
        });

    } catch (error) {
        res.status(500).json({
            message: "Checkout failed",
            error: error.response?.data || error.message
        });
    }
};


export const verifyPayment = async (req, res) => {
    const { reference } = req.query; // reference returned by Paystack

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });

        if (response.data.data.status === "success") {
            // ✅ Payment confirmed
            // Fulfill the order: clear cart, save order record, send confirmation email
            return res.status(200).json({
                message: "Payment successful",
                data: response.data.data
            });
        } else {
            return res.status(400).json({ message: "Payment not successful" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Payment verification failed", error: error.message });
    }
};