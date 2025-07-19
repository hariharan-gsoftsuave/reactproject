const HttpError = require('../models/errorModel');
const CommentModel = require('../models/commentModel');
const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const { post } = require('../routes/routes');

//========================================CREATE COMMENT========================================
// PROTECTED
// POST : api/comment/:postid
const createComment = async (req, res, next) => {
    try { 
        const postId = req.params.postid;
        const { comment } = req.body;
        if (!comment) {
            return next(new HttpError("Comment cannot be empty", 400)); 
        }
        // Create a new comment
        const commentcreator = await UserModel.findById(req.user.id);
        console.log(commentcreator)
        const newComment = new CommentModel({
            creator: {
                creatorId: req.user.id,
                creatorName: commentcreator.fullName,
                creatorPhoto: commentcreator.profilePhoto
            },
            postId,
            comment
        });
        await newComment.save();
        console.log(newComment);
        await PostModel.findByIdAndUpdate(postId, { $push: { Comment: newComment._id } });
        
        res.status(201).json(newComment);
    } catch (error) {
        return next(new HttpError(error.message || "Error creating comment", 500));
    }
};

//========================================GET POST COMMENTS========================================
// PROTECTED
// GET : api/comment/:postid
const getPostComment = async (req, res, next) => {
    try {
           const postId = req.params.postid;
          const comments = await CommentModel.find({ postId })
            .sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        return next(new HttpError(error.message || "Error fetching comments", 500));
    }
};

//========================================DELETE COMMENT========================================
// PROTECTED        
// DELETE : api/comment/:id
const deleteComment = async (req, res, next) => {
    try {
        const commentid = req.params.postid; 
        const comment = await CommentModel.findById(commentid);
        const commentCreator= await UserModel.findById(comment?.creator.creatorId);  
        if(commentCreator?._id != req.user.id){
            return next(new HttpError("You can't delete this comment since you are not the creator", 403)); 
        }
        await PostModel.findByIdAndUpdate(comment.postId, { $pull: { Comment: commentid } });
        const deletedComment = await CommentModel.findByIdAndDelete(commentid);
        res.status(200).json(deletedComment);
    } catch (error) {
        return next(new HttpError(error.message || "Error deleting comment", 500));
    }
};

module.exports = {createComment,getPostComment,deleteComment};
