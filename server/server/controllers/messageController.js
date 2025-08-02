import messageModel from "../config/models/messageModel.js";
import cloudinary from "../../lib/cloudinary.js";
import { io } from "../../server.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;
    const { image, message } = req.body;

    let imageUrl;

    if (image) {
      const upload = await cloudinary.uploader.upload(image);
      imageUrl = upload.secure_url;
    }

    const newMessage = messageModel({
      members: [senderId, receiverId],
      senderId,
      receiverId,
      message,
      image: imageUrl,
    });

    await newMessage.save();

    res.json({ success: true, newMessage });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.userId;

    const Conversation = await messageModel.find({
      members: { $all: [senderId, receiverId] },
    });

    if (Conversation.message === null) {
      return res.status(200).json([]);
    }

    return res.status(200).json(Conversation);
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const markMessageAsSeen = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;

    const users = await messageModel
      .find({ senderId: receiverId, receiverId: senderId, seen: false })
      .select("_id");
    const update = await messageModel.updateMany(
      { senderId: receiverId, receiverId: senderId, seen: false },
      { $set: { seen: true } }
    );
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
