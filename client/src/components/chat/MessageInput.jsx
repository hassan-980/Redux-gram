import { useState } from "react";
import socket from "../../../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages, setNewMessage } from "../../../features/messages/messageSlice";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const { authuser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [image, setImageFile] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(!message){
        return
      }
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/message/send-message/${
          selectedUser?._id
        }`,
        { message },
        {
          withCredentials: true,
        }
      );

      const msg = res?.data?.newMessage;

    socket.emit("sendMessage", msg);






      // socket.emit("sendMessage", res?.data?.newMessage);
      // dispatch(setMessages([...messages, res?.data?.newMessage]));
      dispatch(setNewMessage(res?.data?.newMessage));


    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };



  // const handleSend = () => {
  //   if (text.trim() === "") return;

  //   const msg = {
  //     senderId: authUser.id,
  //     receiverId: selectedUser._id,
  //     text,
  //   };

  //   socket.emit("sendMessage", msg);
  //   dispatch(set({ ...msg, self: true }));
    
  // };

  // const handleSend = () => {
  //   socket.emit("send_message", message);
  //   setText("");
  // };
  // const onSubmitHandler = async (e) => {
  // }

  return (
    <>
      <form
        className="flex   w-full p-3 border-t border-gray-300"
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* <div className="flex  justify-center items-center mr-3">
          <div className=" relative ">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 z-30"
              name="image"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
              }}
            />
            <div className="flex flex-col justify-center items-center ">
              <GrAttachment className="text-2xl" />
            </div>
          </div>
        </div> */}

        <button type="submit">
          <IoSend className="text-xl dark:text-white  cursor-pointer" />
        </button>
      </form>
    </>
  );
};

export default MessageInput;
