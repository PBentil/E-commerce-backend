import  db  from '../../models/index.js';


const {CartItem} = db;


export const addToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        const product = await db.Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product does not exist." });
        }

        let cartItem = await CartItem.findOne({ where: { userId, productId } });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({ userId, productId, quantity });
        }

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};



export const updateCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        let cartItem = await CartItem.findOne({
            where: {
                userId,
                productId
            }
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating cart.", error: error.message });
    }
};



export const getCartItems = async (req, res) => {
    const userId = req.user.id;
    try{
        const cartItems = await CartItem.findAll({
            where: { userId },
            include: ['Product']
        });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Error getting cart.", error: error.message });
    }
}

export const deleteCart = async (req, res) => {
    const userId = req.user.id;
    const  { productId } = req.params;

    try{
        const cartItem = await CartItem.findOne({
            where: {
                userId,
                productId
            }
        })
        if (!cartItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        await cartItem.destroy();
        res.status(200).json({message: "Successfully removed."});
    } catch (error) {
        res.status(500).json({ message: "Error removing cart.", error: error.message });
    }
}

export const clearCart = async (req, res) => {
    const userId = req.user.id;
    try{
        await CartItem.destroy({ where : { userId } });
        res.status(200).json({message: "clear cart successfully."});
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart.", error: error.message });
    }
}