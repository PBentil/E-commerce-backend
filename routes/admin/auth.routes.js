import express from "express";
import {
    loginUser,
    registerAdmin,
    registerCustomer,
    verifyEmail,
    logoutUser,
    requestResetPassword, resetPassword
} from "../../controller/admin/auth.controller.js";



const router = express.Router();

router.post('/admin/register', registerAdmin);
router.post('/user/register', registerCustomer);
router.get('/verify', verifyEmail);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/request-password', requestResetPassword);
router.post('/reset-password', resetPassword);

export default router;
