import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getUserData,
  deleteUser,
  getAllUsers,
  updateProfilePic,
  getProfilePic,
} from "../controllers/userController.js";
import upload from "../middleware/upload.js";

const userRouter = express.Router();

userRouter.get("/get-user-data", userAuth, getUserData);
userRouter.post("/delete-user", userAuth, deleteUser);
userRouter.get("/get-all-users", userAuth, getAllUsers);
userRouter.post(
  "/update-profile-pic",
  upload.single("image"),
  userAuth,
  updateProfilePic
);
userRouter.get("/get-profile-pic/:id", getProfilePic);

export default userRouter;
