import db from "../models/index.js";


const { Product , Store } = db;


export const createProduct = async (req, res) => {
    const {name, description, price, image, stock , categoryId } = req.body;

    try{
        const store = await Store.findOne({where:{OwnerId: req.user.id}});

        if (!store) {
            return res.status(404).json({message:"Store not found for this admin."});
        }

        const product = await Product.create({name, description, image, price, stock, CategoryId: categoryId, StoreId : store.id});
        return res.status(201).json({
            message : "Product created successfully.",
             product,
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({message:"Server Error."});
    }
}


export const getProduct = async (req, res) => {
    try{
        const store = await Store.findOne({where:{OwnerId: req.user.id}});
        if (!store) {
            return res.status(404).json({message:"Store not found for this admin."});
        }

        const products = await Product.findAll({
            where:{StoreId: store.id}
        })
        return res.status(200).json({
            message : "Product found successfully.",
            products,
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({message:"Server Error."});
    }
}


export const updateProduct = async (req, res) => {
    const {name, description,image, price, stock, categoryId} = req.body;
    try{
        const store = await Store.findOne({where:{OwnerId: req.user.id}});
        if (!store) {
            return res.status(404).json({message:"Store not found for this admin."});
        }
        const product = await Product.findOne({where:{StoreId: store.id}})

        if (!product) {
            return res.status(404).json({message:"Product not found for this store."});
        }

        if(name) product.name = name;
        if(description) product.description = description;
        if(image) product.image = image;
        if(price) product.price = price;
        if(stock) product.stock = stock;
        if(categoryId) product.categoryId = categoryId;
        await product.save();

        return res.status(200).json({
            message : "Product updated successfully.",
            product,
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({message:"Server Error."});
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try{
        const store = await Store.findOne({where:{OwnerId: req.user.id}});

        const product = await Product.findOne({where:{StoreId: store.id}})
        if (!product) {
            return res.status(404).json({message:"Product not found."});
        }
       await product.destroy();

        return res.status(200).json({
            message:"Product deleted successfully.",
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({message:"Server Error."});
    }
}