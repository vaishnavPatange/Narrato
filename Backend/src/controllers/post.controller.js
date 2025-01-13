const asyncHandler = require("../utils/asyncHandler.js");
const ApiErrors = require("../utils/ApiErrors.js");
const ApiResponse = require("../utils/ApiResoponse.js");
const cloudinaryUpload = require("../utils/cloudinary.js");
const Post = require("../model/post.model.js");
const mongoose = require("mongoose");
const { isValidObjectId } = mongoose;

const getAllPosts = asyncHandler( async( req, res) => {
    const {page=1, limit=30, query, sortBy,sortType, userId} = req.query;

    const pageNo = parseInt(page);
    const pageLimit = parseInt(limit);
    const skip = (pageNo - 1) * pageLimit;

    const pipeline = [];

    const matchStage = {};
    if( query && query.trim() !== ""){
        matchStage.$or = [
            {title : { $regex: query, $options: "i"}},
            {slug : { $regex: query, $options: "i"}},
            {content : { $regex: query, $options: "i"}},
        ]
    }

    if(userId) matchStage.user = userId;

    if(Object.keys(matchStage) > 0) pipeline.push({$match: matchStage});

    if( sortBy && sortType){
        const sortStage = {
            $sort: {[sortBy]: parseInt(sortType)}
        }
        pipeline.push(sortStage);
    }

    if(skip) pipeline.push({$skip: skip});

    pipeline.push({$limit: pageLimit});

    const posts = await Post.aggregate(pipeline);

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts/pageLimit);

    return res.status(200)
    .json( new ApiResponse(
        200,
        {
            posts,
            pageNo,
            totalPosts,
            totalPages,
            hasNextPage: pageNo < totalPages,
            hasPrevPage: 0 < pageNo
        },
        "Posts fetched successfully"
    ))

});

const addPost = asyncHandler( async(req, res) => {
    const {title, slug, content, status} = req.body;

    const imageLocalPath = req.file?.path;

    if(!title && !slug && !content && !status && !imageLocalPath) throw new ApiErrors(400, "All the fields are neccessary");

    const image = await cloudinaryUpload(imageLocalPath);

    const post = await Post.create({
        title,
        slug,
        content,
        status,
        user: req.user?._id,
        image: image.url
    });

    return res.status(201)
    .json( new ApiResponse(
        201,
        post,
        "Post created successfully"
    ));

});

const editPost = asyncHandler( async(req, res) => {
    const {title, slug, content, status, _id} = req.body;

    if( !title || !slug || !content || !status) throw new ApiErrors(400, "Nothing is edited");

    const post = await Post.findOne({_id , user: req.user?._id});

    if(!post) throw new ApiErrors(401, "You are not the owner of this post");

    const updatedPost = await Post.findByIdAndUpdate(_id, {
        $set: {
            ...(title && {title}),
            ...(slug && {slug}),
            ...(content && {content}),
            ...(status && {status})
        }
    } , { new : true });

    return res.status(200)
    .json( new ApiResponse(
        200,
        updatedPost,
        "Post updated successfully"
    ));

});

const deletePost = asyncHandler( async(req, res)=> {
    const { _id } = req.params;

    if(!_id) throw new ApiErrors(400, "Post id is missing");

    if(!isValidObjectId(_id)) throw new ApiErrors(400, "Invalid post id");

    const post = await Post.findOne({_id, user: req.user?._id});

    if(!post) throw new ApiErrors(401, "Post not found or You are not owner of this post");

    await Post.findByIdAndDelete(_id);

    return  res.status(200)
    .json( new ApiResponse(
        200,
        {},
        "Post deleted successfully"
    ));

});

const getPost = asyncHandler( async(req, res) => {
    const {_id} = req.params;

    if(!_id) throw new ApiErrors(400, "Post id missing");

    if(!isValidObjectId(_id)) throw new ApiErrors(400, "Invalid post id");

    const post = await Post.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(_id) 
            }
        },
        {
            $lookup: {
                from: "User",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                user: {
                    $first: "$user"
                }
            }
        }
    ]);

    return res.status(200)
    .json( new ApiResponse(
        200,
        post[0],
        "Post fetched successfully"
    ));

});

module.exports = {
    getAllPosts,
    addPost,
    editPost,
    deletePost,
    getPost
}