import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const signup = async (req, res) => {
  //     const { name, email, password } = req.body;

  //     try {

  //         const existingUser = await User.findOne({ email: email.toLowerCase() });
  //         if (existingUser) {
  //             return res.status(409).json({ message: "User already exists" });
  //         }


  //         const hashedPassword = bcrypt.hashSync(password, 10);


  //         const newUser = new User({
  //             name,
  //             email: email.toLowerCase(),
  //             password: hashedPassword,
  //             role: "user", // default role
  //         });

  //         await newUser.save();

  //         res.status(201).json({ message: "User registered successfully" });
  //     } catch (err) {
  //         console.error(err);
  //         res.status(500).json({ message: "Server error" });
  //     }
  // };

  try {
    const { name, email, password, role } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    console.log("Incoming email:", normalizedEmail);
    const existingUser = await User.findOne({ email: normalizedEmail });




    console.log("Found user:", existingUser);


    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: true,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role && ["user", "admin"].includes(role) ? role : "user";

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: userRole
    });

    await newUser.save();


    return res.status(200).json({
      message: "User registered successfully",
      success: true,
      token: jwt.sign(
        { _id: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1hr" }
      )
    });


  } catch (err) {
    console.error("Signup error:", err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "User already exists",
        success: false

      });
    }

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
    const normalizedEmail = email.trim().toLowerCase();

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
  { _id: user._id, email: user.email, role: user.role }, 
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
