
module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if(!req.isAuthenticated()){
        return res.status(401).json({success: false, message: "User not logged-in!"})
    }
    return next();
}