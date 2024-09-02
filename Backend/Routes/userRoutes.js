const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../Model/user");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            if (user.password === password) {
                return res.status(200).json({ success: true });
            } else {
                return res.json({ success: false, message:"Invalid Credentials" });
            }
        }
        return res.json({succes: false, message: "User not Found !!!"});

    } catch (error) {
        return res.status(400).json({success: false, message: "Some error occured : ", error});
    }
});


router.post("/new", async(req, res) => {
    const { name, email, password, userImage} = req.body;
    console.log(name," ", email," ", password," ", userImage);
    
    try {

        const alreadyUser = await User.findOne({email: email});
        if(alreadyUser) return res.status(401).json({success: false, message:"User already exists!"})

        await User.create({
            name:"Vaishnav Patange",
            email:email,
            password:password,
            userImage:userImage,
        });
        return res.status(200).json({success: true, message: "User registered Successfully"})
    } catch (error) {
        return res.status(400).json({success: false, message: "Some error occured : ", error});
    }
});


module.exports = router;