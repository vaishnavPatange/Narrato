const express = require("express");
const router = express.Router;
const User = require("../Model/user");

router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    const user = User.findOne({email: email})
    if(user){
        if(user.password === password){
           return res.status(200).json({success: true});
        } else{
            return res.json({success: false});
        }
    }
    res.send("User not found !!");

})