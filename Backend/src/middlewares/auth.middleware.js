const asyncHandler = require("../utils/asyncHandler.js");
const User = require("../Model/user.js");
const jwt = require("jsonwebtoken");
const ApiErrors = require("../utils/ApiErrors.js");


const verifyJWT = asyncHandler( async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")
        ?.replace("Bearer", "");

        if(!token) throw new ApiErrors(401, "Unauthorized Request");

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if(!user) throw new ApiErrors(401, "Invalid Acess Token");

        req.user = user;
        next();

    } catch (error) {
        throw new ApiErrors(401, error?.message || "Invalid access token");
    }
})

module.exports = verifyJWT;