import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./server/config/mongodb.js";
import { Server } from "socket.io";
import http from "http";
dotenv.config();

// ROUTES
import authRouter from "./server/routes/authRoutes.js";
import userRouter from "./server/routes/userRoutes.js";
import postRoutes from "./server/routes/postRoutes.js";
import messageRoutes from "./server/routes/messageRoutes.js";



const allowedOrigins = ["http://localhost:5173","https://reduxgram.vercel.app"];
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Store Online users
// export const userSocketMap = {}; //{ userId: socketId }
// let onlineUsers = new Map();




// Socket.io connection handler
// io.on("connection",(socket=>{
//   const userId = socket.handshake.query.userId; 
//   console.log("User connected", userId);  

//   if(userId) userSocketMap[userId] = socket.id;

  // Emit all online users
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", userId);  
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// }))



let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🔌 New user connected:", socket.id);

  // Save user and socket mapping
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers)
    io.emit("getUsers", Array.from(onlineUsers.keys()));
    // io.emit("getUsers", onlineUsers);

  });

  // Send message to specific user
  socket.on("sendMessage", ( msg ) => {
    const receiverSocket = onlineUsers.get(msg.receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("getMessage", {
        msg
      });
    }
  });

  socket.on("seenMessage", ( id ) => {

      io.emit("getSeenId", {
        id
      });
    
  });

  // On disconnect, remove from online map
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("getUsers", Array.from(onlineUsers.keys()));
  });
});

connectDB();

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser({ Credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API ENDPOINTS
app.get("/", (req, res) => {
  res.send("Welcome to the Reduxgram!!");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRoutes);
app.use("/api/message", messageRoutes);



// import socketConnection from "./socket.js";
// socketConnection(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

