const express = require("express");
const router = express.Router({mergeParams:true});
const Post = require("../Model/post");

router.get("/all", async(req, res) => {
    try {
        const allPosts = await Post.find();
        return res.status(200).json({success:true,posts: allPosts});
    } catch (error) {
        return res.status(500).json({success:false,message: "An error occured while fetching all-posts"});
    }
});

router.post("/add", async(req, res) => {
    const {title, slug, image, content, status, user} = req.body;
    console.log(title, " ", slug, " ", content, " ", status, " ", user);
    

    if(!title || !slug || !content || !user){
        return res.status(400).json({success: false, message:"Please fill all the neccessary feilds"});
    }

    try {
        const newPost = await Post.create({
            title:title, slug:slug, image:image, content:content, status:status, user:user
        });
        return res.status(201).json({success:true, message:"Post created successfully", post:newPost})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false,message: "An error occured while creating a post"});
    }
});

router.put("/edit/:id", async(req, res) => {
    const {id} = req.params;
    const {title, slug, image, content, status} = req.body;

    if(!title || !slug || !content){
        return res.status(400).json({success: false, message:"Please fill all the neccessary feilds"});
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, 
            {title, slug, image, content, status},
            {runValidators:true}, {new: true}
        );
        if(!updatedPost){
            return res.status(404).json({success: false, message: "Post not found"});
        }
        return res.status(200).json({success:true, message:"Post edited successfully", post:updatedPost});
    } catch (error) {
        return res.status(500).json({success:false,message: "An error occured while editing a post"});
    }
});


router.delete("/delete/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if(!deletedPost) return res.status(404).json({success: false, message: "Post not found"});

        return res.status(200).json({success:true, message: "Post deleted successfully"});
        
    } catch (error) {
        return res.status(500).json({success:false,message: "An error occured while deleting a post"});
    }
});

module.exports = router;