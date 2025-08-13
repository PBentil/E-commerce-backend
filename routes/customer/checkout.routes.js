import express from "express";
import {protect, restrictTo} from "../../middleware/auth.middleware.js";
import {checkout, verifyPayment} from "../../controller/customer/checkout.controller.js";



const router = express.Router();

router.post("/checkout", protect, restrictTo("user"), checkout);
router.get ("/payment-verify/:reference", verifyPayment);



export default router;