const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;
