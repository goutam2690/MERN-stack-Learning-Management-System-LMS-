import { Router } from "express";
import { register, login, logout, getMyProfile, forgotPassword, resetPassword, changePassword, updateUser } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/auth.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

try {
    router.post("/register", upload.single("avatar"), register);
    router.post("/login", login);
    router.post("/logout", logout);
    router.get("/getMyProfile", isAuthenticated, getMyProfile);
    router.post("/reset", forgotPassword);
    router.post("/reset/:resetToken", resetPassword);
    router.post("/change-password", isAuthenticated, changePassword) 
    router.put("/update/:id", isAuthenticated, upload.single('avatar'), updateUser)
} catch (error) {
    console.log("error", error);
}

export default router;