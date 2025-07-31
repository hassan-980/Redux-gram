// const socketConnection = (io) => {
//   io.on("connection", (socket) => {
//     console.log("New socket connected:", socket.id);

//     socket.on("join_chat", (chatId) => {
//       socket.join(chatId);
//     });

//     socket.on("send_message", (messageData) => {
//       io.to(messageData.chatId).emit("receive_message", messageData);
//     });

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected:", socket.id);
//     });
//   });
// };

// export default socketConnection;



// let onlineUsers = new Map();

// io.on("connection", (socket) => {
//   console.log("🔌 New user connected:", socket.id);

//   // Save user and socket mapping
//   socket.on("addUser", (userId) => {
//     onlineUsers.set(userId, socket.id);
//     io.emit("getUsers", Array.from(onlineUsers.keys()));
//   });

  // Send message to specific user
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const receiverSocket = onlineUsers.get(receiverId);
//     if (receiverSocket) {
//       io.to(receiverSocket).emit("getMessage", {
//         senderId,
//         text,
//       });
//     }
//   });

//   // On disconnect, remove from online map
//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected:", socket.id);
//     for (const [userId, socketId] of onlineUsers.entries()) {
//       if (socketId === socket.id) {
//         onlineUsers.delete(userId);
//         console.log(onlineUsers);
//         break;
//       }
//     }
//     io.emit("getUsers", Array.from(onlineUsers.keys()));
//   });
// });