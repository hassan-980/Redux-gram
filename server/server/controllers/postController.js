//postController.js
import postModel from "../config/modals/postModel.js";
import Post from "../config/modals/postModel.js";

import userModel from "../config/modals/userModel.js";

export const createPost = async (req, res) => {
  try {


    const { title, description, visibility  } = req.body;


    

if (!title || !description ) {
    return res
      .status(400)
      .json({ sucess: false, message: "Title and description is required" });
  }

    const userId  = req.userId;
    console.log(userId)

    const user = await userModel.findById(userId)

    const post = new Post({
    username: user.username,
     isVerified: user.isVerified,
     likes:Math.floor(Math.random() * 100),
     comments:Math.floor(Math.random() * 100),
      userId,
      title,
      description,
      visibility,
    });

    if (req.file) {
      console.log("found")
      post.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getImage =async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || !post.image || !post.image.data) return res.status(404).send('No image');

    res.set('Content-Type', post.image.contentType);
    res.send(post.image.data);
  } catch (err) {
    res.status(500).send('Error loading image');
  }
}

export const getUserPosts = async (req, res) => {
  try {
    
    const userId = req.userId;

    const posts = await Post.find({ userId },{ 'image.data': 0 }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


export const deleteUserPost = async (req, res) => {
  try {
    const  postId  = req.params.postId;
    console.log(postId)
    // const userId = req.userId;

    // const post = await Post.findOne({ _id: postId, userId });
    const deletepost = await Post.findByIdAndDelete(postId);

    if (!deletepost) {
      return res.status(404).json({ msg: 'Post not found or not authorized' });
    }

    
    res.status(200).json({ msg: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};


export const getAllPosts = async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const globalPosts = await Post.find({ visibility: 'public' },{ 'image.data': 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ visibility: 'public' });

    res.json({ globalPosts , total });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
  }
};



