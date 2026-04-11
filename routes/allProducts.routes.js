import express from "express";
import {getAllProducts} from "../controller/allProducts.js";


const router  = express.Router();

router.get(`/`, getAllProducts);

export default router;