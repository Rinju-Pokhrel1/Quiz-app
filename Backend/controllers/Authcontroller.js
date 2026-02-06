import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// SIGNUP
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
    const normalizedEmail = email.trim().toLowerCase();

    // 👇 PASTE THIS HERE
    const count = await User.countDocuments();
    console.log("Total users in DB:", count);

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    console.log("Existing user found:", existingUser);

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        console.error("Signup error:", err);

        // Handle duplicate key error from MongoDB
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Email already registered",
                success: false
            });
        }

        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.trim().toLowerCase();
        console.log("Login attempt for:", normalizedEmail);

        const user = await User.findOne({ email: normalizedEmail });
        const errorMsg = "Auth failed: email or password is wrong";

        if (!user) {
            console.log("User not found");
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        console.log("User found, checking password");
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log("Password mismatch");
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        console.log("Password match, generating token");
        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        console.log("Login successful");
        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            email: user.email,
            name: user.name,
            role: user.role
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export { signup, login };
