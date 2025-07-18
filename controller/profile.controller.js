import db from "../models/index.js";
import bcrypt from "bcrypt";


const {User , Store} = db;

export const getAdminProfile = async(req,res)=>{
    try{
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'role'],
            include: {
                model: Store,
                as: 'store',
                attributes: ['id', 'name', 'description'],
            }
        });

        if(!user || user.role !== "admin"){
            return res.status(403).json({message:" Unauthorized"});
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"server error"});
    }
}


export const editAdminProfile = async(req,res)=>{
    const userId = req.user.id;
    const {name , email , password, store} = req.body;
    try{
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'role'],
            include: {
                model: Store,
                as: 'store',
            }
        })
        if(!user || user.role !== "admin"){
            return res.status(403).json({message:" Unauthorized"});
        }

        if (name) user.name =name;
        if (email) user.email =email;
        if (password) user.password = await bcrypt.hash(password, 10);
        await user.save();

        if (store){
            if(store.name) user.store.name = store.name;
            if (store.description) user.store.description = store.description;
            await user.store.save();
        }


        return res.status(200).json({
            message:" Profile successfully updated",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            store: user.store ?{
                id: user.store.id,
                name: user.store.name,
                description: user.store.description,
            } : null,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"server error"});
    }
}


export const getUserProfile = async(req,res)=>{
    const userId = req.user.id;

    try{
        const user = await User.findByPk(userId);

        if(!user || user.role !== "user"){
            return res.status(403).json({message:" Unauthorized"});
        }

        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"server error"});
    }
}


export const editProfile = async(req,res)=>{
    const userId = req.user.id;
    const { name, email, password } = req.body;

    try{
        const user = await User.findByPk(userId);
        if(!user || user.role !== "user"){
            return res.status(403).json({message:" Unauthorized"});
        }
        if (name) user.name =name;
        if (email) user.email =email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        return res.status(200).json({
            message:" Profile successfully updated",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"server error"});
    }
}

export const deleteAdminAccount = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId, {
            include: {
                model: Store,
                as: 'store',
            },
        });

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (user.store) {
            await user.store.destroy();
        }

        await user.destroy();

        return res.status(200).json({ message: "Account and store deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const deleteUserAccount = async(req,res)=>{
    const userId = req.user.id;
    try{
        const user = await User.findByPk(userId);
        if(!user || user.role !== "user"){
            return res.status(403).json({message:" Unauthorized"});
        }

        user.destroy();
        return res.status(200).json({
            message:" Account successfully deleted",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"server error"});
    }
}