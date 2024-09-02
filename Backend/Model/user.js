const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const avatar = "Backend\images\default_avatar_image.jpg";


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        default: "https://i.pinimg.com/236x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;