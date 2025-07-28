import {
    deleteAdminAccount, deleteUserAccount,
    editAdminProfile,
    editProfile,
    getAdminProfile,
    getUserProfile
} from "../../controller/admin/profile.controller.js";
import {protect, restrictTo} from "../../middleware/auth.middleware.js";
import express from "express";

const router = express.Router();

router.get("/admin/profile",protect, restrictTo("admin"), getAdminProfile)
router.put("/admin/edit-profile",protect, restrictTo("admin"), editAdminProfile)
router.get("/profile", protect, restrictTo("user"), getUserProfile);
router.put("/edit-profile", protect, restrictTo("user"), editProfile)
router.delete("/admin/delete-account", protect, restrictTo("admin"), deleteAdminAccount)
router.delete("/delete-account", protect, restrictTo("user"), deleteUserAccount)


export default router;