const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../Model/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.post("/login", passport.authenticate("local"),async (req, res) => {
    console.log(req.body);
    
    return res.status(200).json({success:true, message:"user logged in successfully!"});
});


router.post("/new", wrapAsync(async (req, res) => {
    const { username, email, password, userImage } = req.body;
    console.log(req.body);
    
    const newUser = new User({
        username: username,
        email: email,
        userImage: userImage
    });
    await User.register(newUser, password);
    return res.status(200).json({ success: true, message: "User Registered successfully!" })

}));


router.get("/logout", (req, res) => {
    req.logout((err) => {
        if(err){
            next(err);
        } else{
            return res.status(200).json({success:true, message:"User logged out successfully !"});
        }
    });
});


module.exports = router;