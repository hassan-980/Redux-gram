// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
// import { fetchChats } from "../features/chatSlice";
// import { initSocket, getSocket } from "../utils/socket";

const Home = () => {
  const dispatch = useDispatch();
//   const { user } = useSelector(state => state.auth);
//   const { currentChat } = useSelector(state => state.chat);

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchChats());
//       initSocket(document.cookie.split('token=')[1]);
//       const socket = getSocket();
//       socket.on("connected", () => console.log("Socket connected"));
//       socket.on("message received", (msg) => {
//         if (msg.chat._id === currentChat?._id) {
//           dispatch(addMessage(msg));
//         } else {
//           dispatch(addNotification(msg));
//         }
//       });
//     }
//   }, [user, dispatch, currentChat]);

  return (
    <div className="flex h-screen">
      <ChatList/>
      <ChatBox/>
      {/* {currentChat ? <ChatBox /> : <div className="flex-1 flex items-center justify-center">Select or create a chat</div>} */}
    </div>
  );
};

export default Home;
