const asyncHandler = require("../utils/asyncHandler.js");
const ApiErrors = require("../utils/ApiErrors.js");
const ApiResponse = require("../utils/ApiResoponse.js");
const cloudinaryUpload = require("../utils/cloudinary.js");
const User = require("../Model/user.js");
const jwt = require("jsonwebtoken");

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

const cookieOpt = {
    secure: true,
    httpOnly: true
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


const loginUser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body;

    if(!(username || email) && !password){
        throw new ApiErrors(400, "All the fields are neccessary");
    }

    const user = await User.findOne({ $or: [{ username }, { email }]});

    if(!user) throw new ApiErrors(404, "User not found");

    const isAuthenticated = await user.isPasswordCorrect(password);
    if(!isAuthenticated) throw new ApiErrors(401, "Unauthorized request");

    const { accessToken, refreshToken } = accessAndRefreshTokenGenerator(user._id);

    const loggedInUser = await User.findById(user._id)
                        .select("-password -refreshToken");

    return res.status(200)
    .cookie("accessToken", accessToken, cookieOpt)
    .cookie("refreshToken", refreshToken, cookieOpt)
    .json( new ApiResponse(
        200,
        loggedInUser,
        "User logged in successfully"
    ))

});

// Secure controllers

const getUser = asyncHandler( async(req, res) => {
    return res.statu(200)
    .json( new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ));
});

const logoutUser = asyncHandler( async(req, res) => {
    const logedOut = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }
        },
        { new : true }
    );

    return res.status(200)
    .clearCookie(accessToken, cookieOpt)
    .clearCookie(refreshToken, cookieOpt)
    .json( new ApiResponse(
        200,
        {},
        "User logged out successfully"
    ));
});

const updateRefreshToken = asyncHandler( async(req, res) => {
    // get incoming refreshToken from cookie
    // check if incoming token is available
    // if not throw err
    // verify refreshToken with jwt verify
    // not match throw err
    // if match check if user exists if not throw err
    // if check incRefreshToken with db refreshToken
    // if not match throw err 
    // if mactch generate new AccessToken and refresh Token
    // set cookie with new tokens

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken //(if sending from mobile)

    if(!incomingRefreshToken) throw new ApiErrors(401, "refresh token is missing");

    const isVerified = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    if(!isVerified) throw new ApiErrors(401, "Invalid refresh token");

    const user = await User.findOne({refreshToken: incomingRefreshToken});

    if(!user) throw new ApiErrors(404, "User not found");

    if( incomingRefreshToken !== user.refreshToken){
        throw new ApiErrors(401, "Unauthorized request")
    }

    const { accessToken, refreshToken } = accessAndRefreshTokenGenerator(user._id);

    const loggedInUser = await User.findById(user._id)
                        .select("-password -refreshToken");

    return res.status(200)
    .cookie("accessToken", accessToken, cookieOpt)
    .cookie("refreshToken", refreshToken, cookieOpt)
    .json( new ApiResponse(
        200,
        loggedInUser,
        "Refresh token updated successfully"
    ))

});

const changeCurrentPassword = asyncHandler( async(req, res)=>{
    const { oldPassword, newPassword } = req.body;

    if(!(oldPassword && newPassword)){
        throw new ApiErrors(400, "Both old and new passwords are required");
    }

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect) throw new ApiErrors(401, "Incorrect old password");

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200)
    .json( new ApiResponse( 
        200,
        {},
        "Password changed successfully"
    ));

});
