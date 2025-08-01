import ChatSidebar from "./ChatSideBar";
import ChatWindow from "./ChatWindow";

const Chat = () => {
  return (
    <div className="flex  h-[calc(100vh-138px)] -mt-2 sm:mt-0">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default Chat;
