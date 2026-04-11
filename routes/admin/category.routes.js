import express from "express";
import {
    createCategory,
    getCategoryWithProducts,
    GetSpecificCategory
} from "../../controller/admin/category.controller.js";



const router = express.Router();

router.get("/with-products", getCategoryWithProducts);
router.get("/with-products/:id", GetSpecificCategory);
router.post("/create-category", createCategory);


export default router;