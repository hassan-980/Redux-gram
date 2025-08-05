import { useEffect } from "react";
import socket from "../../../utils/socket";
import MessageInput from "./MessageInput";
import { useSelector, useDispatch } from "react-redux";
import { TiTick } from "react-icons/ti";
import fetchMessages from "../../../hooks/fetchMessages";
import { useRef } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { setSelectedUser } from "../../../features/users/userSlice";
import { MdVerified } from "react-icons/md";
import {setNewMessage,updateSeen} from "../../../features/messages/messageSlice";
import axios from "axios";

const ChatWindow = () => {
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const { authuser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  fetchMessages();
  socket.on("getSeenId", (id) => {
    dispatch(updateSeen(id.id.id));
  });

  async function markMessageAsSeen() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/message/mark-seen/${
          selectedUser._id
        }`
      );

      let id = res.data.users[0]._id;

      if (!id) {
        return;
      }
      socket.emit("seenMessage", { id });
    } catch (error) {}
  }

  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    socket.on("getMessage", (data) => {
      dispatch(setNewMessage(data.msg));
      markMessageAsSeen();
    });

    return () => {
      socket.off("getUsers");
      socket.off("getMessage");
    };
  }, [dispatch, selectedUser]);
  useEffect(() => {
    if (selectedUser === null) {
      return;
    }

    markMessageAsSeen();
  }, [selectedUser, setNewMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {selectedUser === null ? (
        <div className=" w-full hidden  sm:flex justify-center items-center">
          <h1 className=" font-extrabold dark:text-white text-xl">
            let's start a chat
          </h1>
        </div>
      ) : (
        <div className=" w-full   lg:col-span-2 lg:block ">
          <div className="relative flex items-center p-3 border-b border-gray-300">
            <button
              className="cursor-pointer flex sm:hidden"
              onClick={() => {
                dispatch(setSelectedUser(null));
              }}
            >
              <MdOutlineArrowBackIos className=" dark:text-white text-xl mr-2" />
            </button>

            {selectedUser?.profilePic.contentType ? (
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={`${
                  import.meta.env.VITE_SERVER_URL
                }/api/user/get-profile-pic/${selectedUser._id}`}
                alt="username"
              />
            ) : (
              <img
                className="rounded-full  w-10 h-10 object-cover  "
                src="/avatar.jpg"
                alt="image"
              />
            )}

            <span className="flex ml-2 mb-2 font-bold text-gray-600 dark:text-white">
              {selectedUser.username}
              {selectedUser.isVerified ? (
                <MdVerified className="text-blue-800 text-xl pl-1 pt-1" />
              ) : null}
            </span>
            {onlineUsers.includes(selectedUser._id) ? (
              <div>
                <span
                  className="absolute w-3 h-3 bg-green-600 rounded-full sm:left-10
                left-17 bottom-3"
                ></span>

                <span className="absolute left-22 sm:left-15 bottom-3 text-xs text-gray-400">
                  Online
                </span>
              </div>
            ) : (
              <span className="absolute left-22 sm:left-15 bottom-3 text-xs text-gray-400">
                Offline
              </span>
            )}
          </div>

          <div className="  relative w-full       h-[calc(100dvh-272px)] sm:p-6 p-2  overflow-y-auto hide-scrollbar">
              <ul className="space-y-2">
                {messages?.map((data) => (
                  <div className="">
                    <li
                      ref={messagesEndRef}
                      key={data._id}
                      className={
                        "flex flex-col mb-4  " +
                        (data.senderId === authuser.id
                          ? "items-end"
                          : "items-start")
                      }
                    >
                      <div className="relative flex max-w-xs lg:max-w-md">
                        {data.senderId !== authuser.id ? (
                          selectedUser?.profilePic.contentType ? (
                            <img
                              className="object-cover w-8 h-8 rounded-full mt-2 mx-1"
                              src={`${
                                import.meta.env.VITE_SERVER_URL
                              }/api/user/get-profile-pic/${selectedUser._id}`}
                              alt="username"
                            />
                          ) : (
                            <img
                              className="object-cover w-8 h-8 rounded-full mt-2 mr-1   "
                              src="/avatar.jpg"
                              alt="image"
                            />
                          )
                        ) : null}
                        <div
                          className={`px-4 sm:py-3 py-2 rounded-2xl flex shadow-lg backdrop-blur-sm ${
                            data.senderId === authuser.id
                              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-md"
                              : "bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-bl-md"
                          }`}
                        >
                          <div className="text-sm leading-relaxed">
                            {data.message}
                          </div>
                          <span className="flex text-gray-200 mt-2 ml-2 text-xs">
                            {data.createdAt.slice(11, 16)}
                          </span>
                        </div>
                        {data.senderId === authuser.id ? (
                          authuser?.profilePic.contentType ? (
                            <img
                              className="object-cover w-8 h-8 rounded-full mt-2 ml-1"
                              src={`${
                                import.meta.env.VITE_SERVER_URL
                              }/api/user/get-profile-pic/${authuser.id}`}
                              alt="username"
                            />
                          ) : (
                            <img
                              className="object-cover w-8 h-8 rounded-full mt-2 ml-1   "
                              src="/avatar.jpg"
                              alt="image"
                            />
                          )
                        ) : null}

                        {/* Seen/Delivered Tick */}
                        {data.senderId === authuser.id && (
                          <span
                            className={`absolute right-10 text-xs -bottom-3 ${
                              data.seen ? "text-blue-600" : "text-gray-400"
                            }`}>
                            <span className="flex">
                              <TiTick className="-mr-2" />
                              <TiTick />
                            </span>
                          </span>
                        )}
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
          </div>
          <MessageInput />
        </div>
      )}
    </>
  );
};

export default ChatWindow;
