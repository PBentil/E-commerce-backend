import db from "../models/index.js";

const { Product } = db;

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error,
        })
    }
}

