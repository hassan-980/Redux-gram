
import ChatSidebar from "./chatSideBar";
import ChatWindow from "./ChatWindow";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { connectSocket } from "../redux/socketSlice";
// import { connectSocket } from "../../../features/socket/socketSlice";

const Chat = () => {
  const dispatch = useDispatch();


  return (
    <div className="flex h-[464px] -mt-2 sm:mt-0">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default Chat;
