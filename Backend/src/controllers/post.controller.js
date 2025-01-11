const asyncHandler = require("../utils/asyncHandler.js");
const ApiErrors = require("../utils/ApiErrors.js");
const ApiResponse = require("../utils/ApiResoponse.js");
const cloudinaryUpload = require("../utils/cloudinary.js");
const Post = require("../model/post.model.js");

const getAllPosts = asyncHandler( async( req, res) => {
    const {page=1, limit=30, query, sortType, userId} = req.query;

    const pageNo = parseInt(page);
    const pageLimit = parseInt(limit);
    const skip = (pageNo - 1) * pageLimit;

    const filter = {};

    if(query.trim() !== ""){
        filter.$or = [
            {title: {$regex: query, $option: "i"}},
            {slug: {$regex: query, $option: "i"}},
            {content: {$regex: query, $option: "i"}}
        ]
    };

    if(userId){
        filter.user = userId
    }

    const posts = await Post.find(filter)
    .sort({sortBy: sortType})
    .limit(pageLimit)
    .skip(skip);

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