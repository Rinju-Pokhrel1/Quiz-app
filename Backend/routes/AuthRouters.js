import express from "express";
import { signupValidation, loginValidation } from "../middleware/AuthValidation.js";
import { signup, login } from "../controllers/Authcontroller.js";
import { ensureAuthenticated, ensureAdmin } from "../middleware/Auth.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

// Admin route to promote user to admin
router.put("/promote/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { role: 'admin' }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User promoted to admin", user });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;


// router.post("/signup", signupValidation, (req, res) => {
//     res.send("Signup successful");
// });

// router.post("/login", loginValidation, (req, res) => {
//     res.send("Login successful");
// });
