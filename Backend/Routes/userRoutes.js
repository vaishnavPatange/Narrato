const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../Model/user");
const wrapAsync = require("../utils/wrapAsync");

router.post("/login", wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (user) {
        if (user.password === password) {
            return res.status(200).json({ success: true });
        } else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    }
    return res.json({ succes: false, message: "User not Found !!!" });
}));


router.post("/new", wrapAsync(async (req, res) => {
    const { name,username, email, password, userImage } = req.body;
    const newUser = new User({
        name: name,
        username: email,
        userImage: userImage
    });
    await User.register(newUser, password);
    return res.status(200).json({ success: true, message: "User Registered successfully!" })

}));


module.exports = router;