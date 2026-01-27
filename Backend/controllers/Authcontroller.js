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

        const user = await User.findOne({ email });
        const errorMsg = "Auth failed: email or password is wrong";

        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            email: user.email,
            name: user.name
        });

    } catch (err) {
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
