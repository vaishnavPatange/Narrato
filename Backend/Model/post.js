const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const default_image = "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 255
    },
    slug:{
        type:String,
        required: true,
        maxLength: 255
    },
    image: {
        type: String,
        required: true,
        default: default_image
    },
    content: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;