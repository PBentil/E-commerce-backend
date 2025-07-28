import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message:"Not authorized"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch(err){
        console.log(err);
        return res.status(401).json({message: "Invalid or expired Token"});
    }
}


export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles || !roles.includes(req.user.role)) {
            return res.status(401).json({message:"Not authorized"});
        }
        next();
    }
}