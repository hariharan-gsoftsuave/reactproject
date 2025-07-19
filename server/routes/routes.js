const router = require("express").Router()

const {registerUser,loginUser,getUser,getUsers,editUser,followUnfollowUser,changeUserAvatar} = require('../controller/userControllers');
const {createPost,getPost,getPosts,updatePost,deletePost,getUserPosts,likeDislikePost,getfollowing,getUserBookmarks,createBookmark} =require('../controller/postcontrollers');
const authMiddelware = require("../middleware/authMiddleware");

//USER ROUTER
router.post('/users/register',registerUser)
router.post('/users/login',loginUser)
router.get('/users/:id',authMiddelware,getUser)
router.get('/users',authMiddelware,getUsers)
router.patch('/users/:id',authMiddelware,editUser)
router.patch('/users/:id/follow-unfollow',authMiddelware,followUnfollowUser)
router.post('/users/avatar',authMiddelware,changeUserAvatar)
router.get('/user/:id/post',authMiddelware,getUserPosts)
router.get('/user/bookmarks',authMiddelware,getUserBookmarks)

//POST ROUTEs
router.post('/post',authMiddelware,createPost)
router.get('/post/:id',authMiddelware,getPost)
router.patch('/post/:id',authMiddelware,updatePost)
router.delete('/post/:id',authMiddelware,deletePost)
router.get('/post/:id/like',authMiddelware,likeDislikePost)
router.get('/posts',authMiddelware,getPosts)
router.get('/posts/following',authMiddelware,getfollowing)
router.get('/posts/:id/bookmarks',authMiddelware,createBookmark)

module.exports = router;



