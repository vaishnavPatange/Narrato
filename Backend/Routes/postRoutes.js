const express = require("express");
const router = express.Router({ mergeParams: true });
const Post = require("../Model/post");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middlewares.js"); 

router.post("/all", isLoggedIn, wrapAsync(async (req, res) => {
    const allPosts = await Post.find();
    return res.status(200).json({ success: true, posts: allPosts });
}));


router.post("/add", isLoggedIn, wrapAsync(async (req, res) => {
    const { title, slug, image, content, status, user } = req.body;
    console.log(title, " ", slug, " ", content, " ", status, " ", user);

    if (!title || !slug || !content || !user) {
        return res.status(400).json({ success: false, message: "Please fill all the necessary fields" });
    }
    
    const newPost = await Post.create({
        title: title, slug: slug, image: image, content: content, status: status, user: user
    });
    return res.status(201).json({ success: true, message: "Post created successfully", post: newPost });
}));


router.put("/edit/:id", isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { title, slug, image, content, status } = req.body;

    if (!title || !slug || !content) {
        return res.status(400).json({ success: false, message: "Please fill all the necessary fields" });
    }

    const updatedPost = await Post.findByIdAndUpdate(id,
        { title, slug, image, content, status },
        { runValidators: true, new: true }
    );
    if (!updatedPost) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, message: "Post edited successfully", post: updatedPost });
}));


router.delete("/delete/:id", isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) return res.status(404).json({ success: false, message: "Post not found" });

    return res.status(200).json({ success: true, message: "Post deleted successfully" });
}));

module.exports = router;
