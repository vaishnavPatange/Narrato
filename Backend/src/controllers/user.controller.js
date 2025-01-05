const asyncHandler = require("../utils/asyncHandler.js");
const ApiErrors = require("../utils/ApiErrors.js");
const ApiResponse = require("../utils/ApiResoponse.js");
const cloudinaryUpload = require("../utils/cloudinary.js");
const User = require("../Model/user.js");

const accessAndRefreshTokenGenerator = async(userId) => {
    try {
        const user = User.findById(userId).select("-password -refreshToken");
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validaeBeforeSave: false });

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiErrors(500, "Something went wrong while generating referesh and access token");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if(!username && !email && !password){
        throw new ApiErrors(400, "All fields are mandatory");
    }
    const avatarLocalPath = req.file?.path;
    if(!avatarLocalPath) throw new ApiErrors(400, "Avatar is required");

    const doesUserExists = await User.findOne(
        {$or: [{username: username, email: email}]});

    if(doesUserExists) throw new ApiErrors(400, "User with entered Username or Email already exixst");

    const cloudinaryResponse = await cloudinaryUpload(avatarLocalPath);

    if(!cloudinaryResponse) throw new ApiErrors(500, "Something went wrong while uploading image");

    const createdUser = await User.create({
        username,
        email,
        password,
        avatar: cloudinaryResponse.url
    }).select("-password");

    return res.status(201)
    .json( new ApiResponse(
        201,
        createdUser,
        "User created successfully"
    ));

});