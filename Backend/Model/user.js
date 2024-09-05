const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
        default: "https://i.pinimg.com/236x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"
    },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;