// src/components/ChatBox.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addMessage, setMessages } from "../features/messageSlice";
import axios from "axios";
// import { getSocket } from "../utils/socket";

const ChatBox = () => {
  const dispatch = useDispatch();
//   const { currentChat } = useSelector(state => state.chat);
//   const { messages } = useSelector(state => state.message);
  const [input, setInput] = useState("");
//   const scrollRef = useRef();

//   useEffect(() => {
//     async function loadMessages() {
//       const { data } = await axios.get(`/api/message/${currentChat._id}`, { withCredentials: true });
//       dispatch(setMessages(data));
//     }
//     if (currentChat) loadMessages();
//   }, [currentChat, dispatch]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const payload = { content: input, chatId: currentChat._id };
//     const { data } = await axios.post("/api/message", payload, { withCredentials: true });
//     dispatch(addMessage(data));
//     getSocket().emit("new message", data);
//     setInput("");
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

  return (
    <div className="flex flex-col flex-1 p-4">
      <div className="flex-1 overflow-auto">
        {/* {messages.map(msg => (
          <div
            ref={scrollRef}
            key={msg._id}
            className={`my-1 p-2 max-w-xs ${msg.sender._id === currentChat.me ? 'self-end bg-blue-100' : 'self-start bg-gray-100'} rounded`}
          >
            <strong>{msg.sender.username}</strong>
            <div>{msg.content}</div>
            <div className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</div>
          </div>
        ))} */}
      </div>
      <div className="mt-2 flex">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        //   onKeyPress={e => e.key === 'Enter' && sendMessage()}
        />
        {/* <button className="ml-2 px-4 bg-blue-500 text-white rounded" onClick={sendMessage}>Send</button> */}
      </div>
    </div>
  );
};

export default ChatBox;
