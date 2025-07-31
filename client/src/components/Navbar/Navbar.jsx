import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import {
  MdOutlineAddBox,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineHome } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../../features/auth/authSlice";
import { fetchUser } from "../../../features/auth/authSlice";
import Loader from "../Loader";
import { useNavigate } from "react-router";
import { getGlobalPosts } from "../../../features/posts/postslice";
import LoginPopup from "../../../LoginPopup";
import { AiOutlineMessage } from "react-icons/ai";
import { getUserPosts } from "../../../features/posts/postslice";
import socket from "../../../utils/socket";
import { setOnlineUsers } from "../../../features/users/userSlice";

function Navbar() {
  const [darkmode, setdarkmode] = useState("");
  const dispatch = useDispatch();
  const { loading, loggedIn, username, authuser } = useSelector(
    (state) => state.auth
  );
  const { skip, limit } = useSelector((state) => state.post);
  const navigate = useNavigate();

  useEffect(() => {
    // Load from localStorage on mount
    const savedMode = localStorage.getItem("savedmode");
    if (savedMode === "true") {
      setdarkmode(true);
    } else {
      setdarkmode(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
    dispatch(getUserPosts());}
  }, [loggedIn]);

  useEffect(() => {
    if (darkmode) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [darkmode]);




  useEffect(() => {

    if (loggedIn) {
      dispatch(fetchUser())
    }
  }, [loggedIn])
  

  useEffect(() => {
    
      dispatch(fetchUser())

    
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGlobalPosts({ skip: 0, limit }));
  }, [dispatch]);

    useEffect(() => {
      socket.on("getUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });
  }, []);

  return (
    <>
      {loading ? <Loader></Loader> : null}

      {loggedIn ? null : <LoginPopup />}

      <div className=" pb-17  ">
        <div className=" bg-white dark:bg-black dark:text-white w-full flex  fixed justify-between items-center mx-auto sm:px-8 px-2 z-50  h-16 sm:h-18 border-b-1 border-gray-600">
          <div>
            <Link to="/">
              {darkmode ? (
                <img className="sm:w-30 w-24" src="/logoDark.png" alt="" />
              ) : (
                <img className="sm:w-30 w-24" src="/logoLight.png" alt="" />
              )}
            </Link>
          </div>
          <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
            <div className="inline-flex items-center max-w-full">
              <div className="flex items-center flex-grow-0  pl-2  w-60 h-11 border rounded-full px-1  py-1">
                <input
                  type="text"
                  className="dark:text-white focus:outline-none p-2 "
                  placeholder="search here"
                />
                <button className="cursor-pointer">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>

          <div className="flex  items-center ">
            <div className=" w-2 flex text-2xl ">
              <button
                className="hover:text-3xl flex items-center cursor-pointer"
                onClick={() => {
                  let newmode = !darkmode;
                  setdarkmode(newmode);
                  localStorage.setItem("savedmode", newmode);
                }}
              >
                {darkmode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
              </button>
            </div>
          </div>

          {loggedIn ? (
            <div className="flex ">
              <Link
                to="/profile"
                className="flex items-center  px-1.5 p-1 border rounded-full "
              >
                <p className="text-sm font-medium px-1">{username}</p>

                <FaUserCircle className="sm:text-2xl text-sm" />
              </Link>
            </div>
          ) : null}

          <div className="flex items-center justify-end gap-3">
            {loggedIn ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                  socket.disconnect();
                }}
                className="inline-flex items-center cursor-pointer justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 "
              >
                Logout
              </button>
            ) : (
              <div className="gap-3 flex items-center ">
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 "
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className=" items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                  to="/signup"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {loggedIn ? (
        <header className="fixed inset-x-0 block   z-50 mx-auto w-2/3 max-w-screen-md border border-gray-100 bg-white py-3 shadow  bottom-6 rounded-3xl ">
          <div className="flex items-center   justify-between h-8 ">
            <div className="ml-8  flex justify-center w-3">
              <Link
                aria-current="page"
                className=" px-2 py-1 text-2xl   hover:text-3xl"
                to="/"
              >
                <HiOutlineHome />
              </Link>
            </div>

            <div className=" w-5 ">
              <Link
                className=" px-2 py-1 text-2xl hover:text-3xl  "
                to="/createpost"
              >
                <MdOutlineAddBox />
              </Link>
            </div>

            <div className="w-5">
              <Link className=" px-2 py-1 text-2xl hover:text-3xl  " to="/chat">
                <AiOutlineMessage />
              </Link>
            </div>

            <div className="mr-8 flex justify-center w-3">
              <Link
                className=" px-2 py-1  text-2xl hover:text-3xl   "
                to="/profile"
              >
                <CgProfile />
              </Link>
            </div>
          </div>
        </header>
      ) : null}
    </>
  );
}

export default Navbar;
