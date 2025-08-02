import express from "express";
import {
  sendMessage,
  getMessages,
  markMessageAsSeen,
} from "../controllers/messageController.js";

import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/send-message/:id", userAuth, sendMessage);
router.get("/get-messages/:id", userAuth, getMessages);
router.post("/mark-seen/:id", userAuth, markMessageAsSeen);

export default router;
