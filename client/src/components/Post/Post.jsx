import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { getGlobalPosts } from "../../../features/posts/postslice";


const URL='https://redux-gram-server.onrender.com';
const handleDelete = async (postId) => {
  try {
    await axios.post(`${URL}/api/posts/delete-post/${postId}`, {
      withCredentials: true,
    });
    alert("post deleted")

    dispatch(getGlobalPosts({ skip: 0, limit }));
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

function Post({ post }) {
  const { loggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const [imageload, setimageload] = useState(true);
const dispatch = useDispatch();


  return (
    <>
      <div className=" mt-6   dark:bg-black dark:text-white text-black w-full max-w-lg  sm:mt-10  ">
        <div className="   mx-3 sm:mx-5   border dark:border-t-white/50 border-black/80  rounded-lg dark:border-white/20 dark:border-l-white/20 dark:border-r-white/50  lg:rounded-xl ">
          <div className="flex flex-col   sm:p-6  p-3">
            <div className="flex">
              <div className="w-full flex sm:mt-0 mt-2 mb-2 sm:mb-0 sm:mr-4">
                <img
                  className="rounded-full max-w-none sm:w-12 sm:h-12 w-10 h-10"
                  src="/avatar.jpg"
                />
                <div className=" flex flex-col">
                  <span className=" sm:ml-3 sm:pt-1 pt-0 ml-1.5 text-xl flex font-semibold leading-6 tracking-tighter">
                  {post.username}
                  {post.isVerified ? (
                    <MdVerified className="text-blue-800 text-2xl pl-1 pt-1" />
                  ) : null}
                </span>

                <span className=" text-sm text-gray-500 sm:ml-3 ml-1.5 ">
                  {post.createdAt.slice(0, 16)}
                </span>

                </div>
                
              </div>

              {location.pathname === "/profile" && (
                <button
                  onClick={() => handleDelete(post._id)}
                  className="flex items-center justify-center rounded-xl bg-red-700  text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 h-10 w-20 "
                  to="/login"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="sm:py-4 pt-2">
              <div className="flex justify-center  mb-1">

                  {post.image ? (
                    <div>
                      {imageload && (
                        
                          <div className="h-70 flex  items-center">
                          <div className="w-7   mt-4 h-7 border-3 mr-1 border-t-transparent dark:border-white border-black rounded-full animate-spin"></div>
                          </div>
                      )}

                      <img
                      src={`${URL}/api/posts/image/${post._id}`}
                      alt="Post"
                      className="max-w-full  rounded-lg"
                      onLoad={() => setimageload(false)}
            onError={() => setimageload(false)}
                    />
                    </div>
                  ) : null}
               
              </div>
              <div className="flex flex-col sm:pt-2 pt-1">
                <span className="text-xl font-semibold leading-6 tracking-tighter">
                  {post.title}
                </span>
                <p className="mt-1.5 text-sm font-medium dark:text-white/50">
                  {post.description}
                </p>
              </div>
              <div className="flex sm:pt-3">
                <span className="text-lg font-bold">{post.likes}</span>
                <FcLike className="text-2xl ml-1 pt-0.5 " />
                <span className="text-lg font-bold ml-3">{post.comments}</span>
                <FaComment className="text-2xl ml-1 pt-1 " />
              </div>

              <div className="flex mt-4 dark:text-white mb-3 sm:mb-0  rounded-lg border focus-within:border-sky-200 sm:px-3 px-2 pb-1.5 sm:pt-2.5 pt-1 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <input
                  type="text"
                  name="username"
                  placeholder="Write comment here"
                  className=" w-full  placeholder:text-gray-600 border-0 bg-transparent p-0 text-sm  focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                />

                <button className="cursor-pointer z-10 text-2xl  sm:pb-1 ">
                  <IoSend  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
