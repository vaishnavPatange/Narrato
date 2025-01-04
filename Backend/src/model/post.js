const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseAggregatePagination = require("mongoose-aggregate-paginate-v2");

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug:{
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true
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
}, { timestamps: true });

postSchema.plugin(mongooseAggregatePagination);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;