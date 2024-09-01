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
        default: avatar
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;