import db from '../../models/index.js';


const { Category, Product } = db;

export const getCategoryWithProducts = async (req, res) => {
    try{
        const categories = await Category.findAll({
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price','stock', 'image', 'StoreId'],
                }
            ]
        });
        return res.status(200).json({categories})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "something went wrong" });
    }
}

export const GetSpecificCategory = async (req, res) => {
    const { id } = req.params;

    try{
        const category = await Category.findByPk(id,{
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price','stock', 'image', 'CategoryId'],
                }
            ]
        })

        if(!category){
            return res.status(404).json({message:"No category with this id"})
        }

        return res.status(200).json({
            category: category.categoryName,
            products: category.products,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "something went wrong" });
    }
}


export const createCategory = async (req, res) => {
    const { categoryName, slug } = req.body;

    if (!categoryName || !slug) {
        return res.status(400).json({ message: "categoryName and slug are required" });
    }

    try {
        const existing = await Category.findOne({ where: { slug } });
        if (existing) {
            return res.status(409).json({ message: "Category with this slug already exists" });
        }

        const category = await Category.create({ categoryName, slug });
        return res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
