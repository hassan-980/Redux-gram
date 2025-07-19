import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: String,
  likes: String,
  title: String,
  comments: String,
  isVerified: Boolean,
  description: String,
  visibility: { type: String, default: "public" },
  image: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.models.post || mongoose.model("post", postSchema);
export default postModel;
