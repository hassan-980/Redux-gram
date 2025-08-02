import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setOtherUsers,
  setSelectedUser,
} from "../../../features/users/userSlice";
import { FaSearch } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
const ChatSidebar = () => {
  const { selectedUser, onlineUsers, otherUsers } = useSelector(
    (store) => store.user
  );
  const { authuser } = useSelector((state) => state.auth);
  const [active, setAtive] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        className={` ${
          selectedUser === null ? "" : "hidden"
        } sm:flex sm:flex-col sm:w-1/2 w-full bg-gray-100 dark:bg-black p-2 sm:p-4 dark:border  dark:border-r-white/50  `}
      >
        <h2 className="text-xl dark:text-white font-bold  mb-4">Chats</h2>

        <div className="flex items-center w-full mb-3 ">
          <div className="flex   pl-2  w-full  border dark:border-white rounded-full px-1  py-1">
            <input
              type="text"
              className="dark:text-white focus:outline-none p-1 "
              placeholder="search here"
            />
          </div>
          <button className="text-xl dark:text-white cursor-pointer ml-2">
            <FaSearch />
          </button>
        </div>

        <div className="flex mb-2 overflow-auto ">
          {authuser && (
            <div className="relative ">
              <img
                src={`${
                  import.meta.env.VITE_SERVER_URL
                }/api/user/get-profile-pic/${authuser.id}`}
                onError={(e) => {
                  e.target.src = "/avatar.jpg";
                }}
                alt="Profile"
                className=" rounded-full object-cover w-17 h-17  "
              />
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-13  bottom-0"></span>
            </div>
          )}

          {otherUsers?.map((chat) =>
            onlineUsers.includes(chat._id) ? (
              <div className="relative ml-2">
                {chat.profilePic.contentType  ? (
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_URL
                    }/api/user/get-profile-pic/${chat._id}`}
                    alt="Profile"
                    className=" rounded-full object-cover w-17 h-17  "
                  />
                ) : (
                  <img
                    src="/avatar.jpg"
                    alt="Profile"
                    className=" rounded-full object-cover w-17 h-17  "
                  />
                )}

                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-13  bottom-0"></span>
              </div>
            ) : null
          )}
        </div>

        {/* <form onSubmit={(e) => e.preventDefault() } action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-md' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-700 text-white'>
                     <BiSearchAlt2 className='w-6 h-6 outline-none'/> 
                </button>
            </form>   */}

        <div className="overflow-auto flex flex-col">
          <div className=" w-full    overflow-y-auto ">
            {otherUsers?.map((chat) => (
              <button
                key={chat._id}
                className="w-full text-left mt-1 py-2 dark:bg-gray-600 bg-gray-300 hover:bg-gray-400 cursor-pointer  rounded-xl"
                onClick={() => {
                  selectedUserHandler(chat);
                }}
              >
                <div className="flex items-center">
                  <div className="relative ">
                    {chat.profilePic.contentType ? (
                      <img
                        className="rounded-full  w-10 h-10 items-start mx-3   "
                        src={`${
                          import.meta.env.VITE_SERVER_URL
                        }/api/user/get-profile-pic/${chat._id}`}
                        alt="image"
                      />
                    ) : (
                      <img
                        className="rounded-full  w-10 h-10 items-start mx-3   "
                        src="/avatar.jpg"
                        alt="image"
                      />
                    )}

                    {onlineUsers.includes(chat._id) ? (
                      <span className="absolute w-2 h-2 bg-green-600 rounded-full left-10  bottom-0"></span>
                    ) : null}
                    {/* <span className="absolute w-2 h-2  bg-green-600 rounded-full left-9 bottom-0 "></span> */}
                  </div>

                  <div>
                    <h4 className="sm:text-sm flex font-semibold dark:text-white text-gray-900">
                      {chat.username}
                                    {chat.isVerified ? (
                                                          <MdVerified className="text-blue-800 text-xl pl-1 pt-1" />
                                                        ) : null}
                    </h4>
                    {/* <div className="text-[12px]">Hello Lauren 👋, · 24 Mar</div> */}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatSidebar;
