const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// SIGNUP
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email);

        const user = await User.findOne({ email });
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

module.exports = {
    signup,
    login
};
