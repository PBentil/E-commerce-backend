import express from 'express';
import {protect} from "../middleware/auth.middleware.js";



const router = express.Router();

router.get('/protected', protect,( req, res)  => {
        res.json({message: `Hello ${req.user.role}, your id is ${req.user.id}`});
})

export default router;