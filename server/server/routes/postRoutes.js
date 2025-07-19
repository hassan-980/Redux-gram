import express from "express";
import upload from "../middleware/upload.js";
import userAuth from "../middleware/userAuth.js";



import {
  createPost,
  getImage,
  getUserPosts,
  deleteUserPost,
  getAllPosts,
} from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post("/create-post", upload.single("image"), userAuth, createPost);
postRouter.get("/image/:id", getImage);
postRouter.get("/get-user-posts", userAuth, getUserPosts);
postRouter.post("/delete-post/:postId", userAuth, deleteUserPost);
postRouter.get("/get-all-data/", getAllPosts);

export default postRouter;
