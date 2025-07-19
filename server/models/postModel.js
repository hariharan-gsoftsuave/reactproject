const mongoose = require('mongoose');
const {Schema, model} =require("mongoose");

const postSchema = new Schema({
    creator:{type:Schema.Types.ObjectId, ref:"User"},
    body:{type:String, required:true},
    image:{type:String, required:true},
    likes:[{type:Schema.Types.ObjectId, ref:"User"}],
    Comment:[{type:Schema.Types.ObjectId, ref:"comment"}]
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;