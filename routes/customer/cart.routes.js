import express from "express";
import {addToCart, clearCart, deleteCart, getCartItems, updateCart} from "../../controller/customer/cart.controller.js";
import {protect, restrictTo} from "../../middleware/auth.middleware.js";


const router = express.Router();

router.use(protect);

router.post("/add-cart", protect, restrictTo("user"), addToCart);
router.put("/update-cart",protect, restrictTo("user") ,updateCart);
router.get("/", protect, restrictTo("user"), getCartItems);
router.delete("/delete-cart/:productId", protect, restrictTo("user"), deleteCart);
router.delete("/clear-cart", protect, restrictTo("user"), clearCart);

export default router;