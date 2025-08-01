import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers, setSelectedUser } from "../../../features/users/userSlice";

const ChatSidebar = () => {
  // const {onlineUsers} = useSelector((state) => state.users);
  const { selectedUser, onlineUsers, otherUsers } = useSelector((store) => store.user);
  const [active, setAtive] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <> 
      <div className={` ${ selectedUser===null ? '':'hidden'} sm:flex sm:flex-col sm:w-1/2 w-full bg-gray-100 dark:bg-black p-2 sm:p-4 dark:border  dark:border-r-white/50  `}>
        <h2 className="text-xl dark:text-white font-bold  mb-4">Chats</h2>

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
            </form> */}

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
                    <img
                      className="rounded-full w-8 h-8 items-start sm:mx-3 mx-2  "
                      src={`${
                        import.meta.env.VITE_SERVER_URL
                      }/api/user/get-profile-pic/${chat._id}` }
                      onError={(e) => {
                        // e.target.onerror = null; // prevent infinite loop
                        e.target.src = "/avatar.jpg"; // path to your public avatar image
                      }}
                      
                      alt="image"
                    />

                     {/* <img
      className="rounded-full w-8 h-8 items-start sm:mx-3 mx-2"
      src={imageError ? fallback : profileUrl}
      onError={() => setImageError(true)}
      alt="profile"
    /> */}
                    {onlineUsers.includes(chat._id) ? (
                      <span className="absolute w-2 h-2 bg-green-600 rounded-full sm:left-9 left-8 bottom-0"></span>
                    ) : null}
                    {/* <span className="absolute w-2 h-2  bg-green-600 rounded-full left-9 bottom-0 "></span> */}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold dark:text-white text-gray-900">
                      {chat.username}
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
