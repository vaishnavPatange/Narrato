const Router = require("express");
const router = Router();
const {
    registerUser,
    loginUser,
    getUser,
    logoutUser,
    updateRefreshToken,
    changeCurrentPassword,
    updateAcountInfo,
    updateAvatar
} = require("../controllers/user.controller.js");
const verifyJWT = require("../middlewares/auth.middleware.js");
const upload = require("../middlewares/multer.middleware.js");

router.route("/new").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

// secure routes

router.route("/get-user").get(verifyJWT, getUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update-refresh-token").post(verifyJWT, updateRefreshToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/update-details").post(verifyJWT, updateAcountInfo);
router.route("/update-details").post(verifyJWT, upload.single("newAvatar"),updateAvatar);


module.exports = router;
