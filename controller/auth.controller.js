import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import {sendEmail} from "../utils/mailer.js";

const { User , Store } = db;


export const registerAdmin = async (req, res) => {
    const { name, email, password, store } = req.body;

    try{
        if(!store || !store.name || !store.description){
            return res.status(400).json({message : "Store name and store description are required!"});
        }

        const existUser = await User.findOne({ where: { email } });
        if(existUser) return res.status(400).json({message : "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
        });

        await Store.create({
            name: store.name,
            description: store.description,
            OwnerId: user.id,
        });

        const emailToken = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_TOKEN,
            { expiresIn:'1d'},
        );

        const verifyUrl = `http://localhost:5173/verify?token=${emailToken}`;

        await sendEmail(
            user.email,
            "Verify your email",
            `<h3>Welcome to our ecommerce platform!</h3>
              <p>Click the link below to verify your email address:</p>
              <a href="${verifyUrl}">${verifyUrl}</a>
              <p>This link will expire in 1 hour.</p>`
        );



        return res.status(200).json({
            message : "Verification email sent. Please check your Inbox",
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message:"Something went wrong"});
    }
};



export const registerCustomer = async (req, res) => {
    const {name ,email, password} = req.body ;

   try{
       if(!name || !email || !password){
           return res.status(400).json({message : "All fields are required!"});
       }

       const existUser = await User.findOne({ where: { email } });
       if(existUser) return res.status(400).json({message : "User already exists"});

       const hashedPassword = await bcrypt.hash(password, 10);

       const user = await User.create({
           name,
           email,
           password: hashedPassword,
           role: "user",
       })
       const emailToken = jwt.sign(
           { id: user.id, email: user.email },
           process.env.JWT_TOKEN,
           { expiresIn: '1h' }
       );

       const verifyUrl = `http://localhost:5173/verify?token=${emailToken}`;

       await sendEmail(
           user.email,
           "Verify your email",
           `<h3>Welcome to our ecommerce platform!</h3>
              <p>Click the link below to verify your email address:</p>
              <a href="${verifyUrl}">${verifyUrl}</a>
              <p>This link will expire in 1 hour.</p>`
       );

       return res.status(200).json({
           message : "Verification email sent. Please check your Inbox",
       })
   } catch(err){
       console.error(err);
       return res.status(500).json({message:"Something went wrong"});
   }
}


export const verifyEmail = async (req, res) => {
    const { Token }= req.query;

    try{
        if(!Token) res.status(400).json({message : "Token is required!"});

        const decoded = jwt.verify(Token, process.env.JWT_TOKEN);
        const user = await User.findByPk( decoded.id );

        if(!user) return res.status(400).json({message:"User does not exist"});
        if(user.isVerified) return res.status(200).json({message:"Already verified"});

        user.isVerified = true;
        await user.save();

        return res.status(200).json({message:"Email verified successfully!"});
    } catch(err){
        console.error(err);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password) return res.status(400).json({message : "Fields are required!"});

        const user = await User.findOne({ where: { email } });
        if(!user) return res.status(400).json({message:"Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_TOKEN,
            { expiresIn: '1h' }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
            }
        );
        return res.status(200).json({
            message:"Login successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({message:"Something went wrong"});
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({message:"Logout successfully"});
}

export const requestResetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if(!user) return res.status(400).json({message:"User does not exist"});

        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_TOKEN,
            { expiresIn: '15m' }
        )

        const resetLink = `http://localhost:5173/reset?token=${token}`;

        await sendEmail(
             user.email,
             "Reset Password",
            `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`
        );

        return res.status(200).json({message:"Reset Link sent to email"});

    } catch(err){
        console.error(err);
        return res.status(500).json({message:"Something went wrong"});
    }
}


export const resetPassword = async (req, res) => {
    const {token , newPassword} = req.body;

    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findByPk(decoded.id);
        if(!user) return res.status(400).json({message:"User does not exist"});

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({message:"Password reset successfully"});
    } catch(err){
        console.error(err);
        return res.status(400).json({message:"Invalid or expired token"});
    }
}