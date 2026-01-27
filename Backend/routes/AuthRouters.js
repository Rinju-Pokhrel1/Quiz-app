const router = require("express").Router();

const { signupValidation, loginValidation } = require("../middleware/AuthValidation");
const { signup, login } = require("../controllers/Authcontroller");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;


// router.post("/signup", signupValidation, (req, res) => {
//     res.send("Signup successful");
// });

// router.post("/login", loginValidation, (req, res) => {
//     res.send("Login successful");
// });
