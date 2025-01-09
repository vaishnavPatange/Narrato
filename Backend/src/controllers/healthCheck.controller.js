const asyncHandler = require("../utils/asyncHandler.js");
const ApiErrors = require("../utils/ApiErrors.js");
const ApiResponse = require("../utils/ApiResoponse.js");

const healthCheck = asyncHandler( async(req, res) => {
    return res.status(200)
    .json( new ApiResponse(
        200,
        {},
        "Everything is working fine"
    ))
});

module.exports = healthCheck;