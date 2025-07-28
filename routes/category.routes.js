import express from "express";
import {getCategoryWithProducts, GetSpecificCategory} from "../controller/category.controller.js";



const router = express.Router();

router.get("/with-products", getCategoryWithProducts);
router.get("/with-products/:id", GetSpecificCategory);


export default router;