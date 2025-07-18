import express from "express";
import {protect, restrictTo} from "../middleware/auth.middleware.js";
import {createProduct, deleteProduct, getProduct, updateProduct} from "../controller/product.controller.js";


const router = express.Router();

router.post("/create-product", protect, restrictTo("admin"), createProduct);
router.get("/get-products", protect, restrictTo("admin"), getProduct);
router.put("/update-product/:id", protect, restrictTo("admin"), updateProduct);
router.delete("/delete-product/:id", protect, restrictTo("admin"), deleteProduct);


export default router;