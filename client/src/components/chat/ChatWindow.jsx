import { useEffect, useState } from "react";
import socket from "../../../utils/socket";
import MessageInput from "./MessageInput";
import { useSelector, useDispatch } from "react-redux";
import { TiTick } from "react-icons/ti";
import fetchMessages from "../../../hooks/fetchMessages";
import { useRef } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { setSelectedUser } from "../../../features/users/userSlice";
import {
  setNewMessage,
  updateSeen,
} from "../../../features/messages/messageSlice";
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
      //  dispatch(updateSeen(res.data));
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

  // MARK SEEN
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
        <div className=" w-full  lg:col-span-2 lg:block ">
            
          <div className="relative flex items-center p-3 border-b border-gray-300">
         <button 
         className="cursor-pointer flex sm:hidden"
         onClick={
           () => {
             dispatch(setSelectedUser(null));
           }
         }
         
         >
              <MdOutlineArrowBackIos className=" dark:text-white text-xl mr-2" />
            </button>
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={`${
                import.meta.env.VITE_SERVER_URL
              }/api/user/get-profile-pic/${selectedUser._id}`}
              onError={(e) => {
                e.target.onerror = null; // prevent infinite loop
                e.target.src = "/avatar.jpg"; // path to your public avatar image
              }}
              alt="username"
            />
            <span className="block ml-2 mb-2 font-bold text-gray-600 dark:text-white">
              {selectedUser.username}
            </span>
            {onlineUsers.includes(selectedUser._id) ? (
              <div>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full sm:left-10
                left-17 bottom-3"></span>

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

         
          <div className="  relative w-full sm:h-[55vh]      h-[calc(100vh-272px)] sm:p-6 p-2  overflow-y-auto hide-scrollbar">
            <div className="">
               <ul className="space-y-2">
              {messages?.map((data) => (

                <li 
                                  ref={messagesEndRef}
                  key={data._id}
                 className={"flex flex-col mb-4  " +   ( data.senderId === authuser.id ? "items-end" : "items-start")}>
                            {/* <div className="text-xs opacity-80 mb-2 text-slate-300 font-medium">
                                hello
                                <time className='ml-2 opacity-50'>2 hour ago</time>
                            </div> */}
                            <div className="relative">
                               <div className={`max-w-xs flex lg:max-w-md px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                                data.senderId === authuser.id
                                    ? 'bg-gradient-to-r from-pink-500  to-rose-500 text-white rounded-br-md'
                                    : 'bg-gradient-to-r from-purple-500  to-blue-500 text-white rounded-bl-md'
                            }`}>
                                <div className='text-sm leading-relaxed'>{data.message}</div>


                                 <span className="flex    text-gray-200 mt-2 ml-2    text-xs ">
                         {data.createdAt.slice(11, 16)}
                       </span>

                            </div>
                            

                    {data.senderId === authuser.id ? (
                      data.seen === true ? (
                        <span className=" absolute right-0  text-blue-600 -bottom-3   text-xs ">
                          <span className="flex">
                            <TiTick className="-mr-2" />
                            <TiTick />
                          </span>
                        </span>
                      ) : (
                        <span className=" absolute right-0 text-gray-400 -bottom-3   text-xs ">
                          <span className="flex">
                            <TiTick className="-mr-2" />
                            <TiTick />
                          </span>
                        </span>
                      )
                    ) : null}

                            </div>
                          
                            


                            {/* <div 
                            className={`text-xs opacity-60  text-slate-400 text-right
                            }`}>
                                Seen
                            </div> */}
                        </li>


             
                // <li
                //   ref={messagesEndRef}
                //   key={data._id}
                //   className={`flex  ${
                //     data.senderId === authuser.id
                //       ? "justify-end"
                //       : "justify-start mr-15"
                //   }  `}
                // >


                //   <div className="relative max-w-xl m-1 px-4 py-2 text-gray-700 bg-white dark:bg-gray-600 dark:text-white rounded shadow">
                //     <span className="flex">
                //       <span className="block ">{data.message}</span>
                //       <span className="   text-gray-400 mt-2 ml-2   text-xs ">
                //         {data.createdAt.slice(11, 16)}
                //       </span>
                //     </span>

                //     {data.senderId === authuser.id ? (
                //       data.seen === true ? (
                //         <span className=" absolute right-0  text-blue-600 -bottom-3   text-xs ">
                //           <span className="flex">
                //             <TiTick className="-mr-2" />
                //             <TiTick />
                //           </span>
                //         </span>
                //       ) : (
                //         <span className=" absolute right-0 text-gray-400 -bottom-3   text-xs ">
                //           <span className="flex">
                //             <TiTick className="-mr-2" />
                //             <TiTick />
                //           </span>
                //         </span>
                //       )
                //     ) : null}
                //   </div>
                // </li>
              ))}
            </ul>

             </div>
           
             
          </div>

         <MessageInput />
        </div>
        
      )}
    </>
  );
};

export default ChatWindow;



<div  className={"flex flex-col mb-6 " +  "items-end"}>
                            {/* <div className="text-xs opacity-80 mb-2 text-slate-300 font-medium">
hello
                                <time className='ml-2 opacity-50'>2 hour ago</time>
                            </div> */}
                            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm 
                              
                                     bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-md`
                                  }>
                                <div className='text-sm leading-relaxed'>hellobtjrehtkberktbhebt</div>
                            </div>
                            <div 
                            className={`text-xs opacity-60 mt-2 text-slate-400 text-right
                            }`}>
                                Seen
                            </div>
                        </div>



         {/* <div  className={"flex flex-col mb-6 " + (user.firstName === msg.firstName ? "items-end" : "items-start")}>
                            <div className="text-xs opacity-80 mb-2 text-slate-300 font-medium">
                                {`${msg.firstName} ${msg.lastName}`}
                                <time className='ml-2 opacity-50'>2 hour ago</time>
                            </div>
                            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                                user.firstName === msg.firstName
                                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-md'
                                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-bl-md'
                            }`}>
                                <div className='text-sm leading-relaxed'>{msg.text}</div>
                            </div>
                            <div 
                            className={`text-xs opacity-60 mt-2 text-slate-400 ${
                                user.firstName === msg.firstName ? 'text-right' : 'text-left'
                            }`}>
                                Seen
                            </div>
                        </div> */}