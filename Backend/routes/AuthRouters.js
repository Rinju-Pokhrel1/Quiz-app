const router = require("express").Router();

const { signupValidation, loginValidation } = require("../middleware/AuthValidation");
const { signup, login } = require("../controllers/Authcontroller");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/Auth");
const User = require("../models/user");

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

module.exports = router;


// router.post("/signup", signupValidation, (req, res) => {
//     res.send("Signup successful");
// });

// router.post("/login", loginValidation, (req, res) => {
//     res.send("Login successful");
// });
