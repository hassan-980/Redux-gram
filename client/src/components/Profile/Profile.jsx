import React from "react";
import ProfilePosts from "./ProfilePosts";
import { useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router";
function Profile() {
  const { loggedIn, username, isverified } = useSelector((state) => state.auth);

  const navigate = useNavigate();



  return (
    <>
      <div className="bg-white dark:bg-black  dark:text-white flex   flex-col items-center  sm:justify-center ">
        <div className=" mt-25 mb-8 w-full max-w-lg  ">
          <div className="mx-5 border dark:border-t-white/50 border-black/80  rounded-lg dark:border-white/20 dark:border-l-white/20 dark:border-r-white/50  lg:rounded-xl ">
            <div className=" -mt-20 w-full flex justify-center">
              <div className="h-32 w-32">
                <img
                  src="./public/images/avatar.jpg"
                  className="rounded-full object-cover h-full w-full shadow-md"
                />
              </div>
            </div>

            <div className="flex items-center p-6 mt-5 flex-col ">
              <div className="flex">
                <h3 className="text-xl mr-2  font-extrabold ">{username}</h3>

                {isverified? ( <MdVerified className="text-blue-800 text-2xl pl-1 mt-1" />): (
                  <Link
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-2 py-2 text-sm font-semibold  text-white  hover:bg-blue-500 "
                  to="/verify"
                >
                  Get verified< MdOutlineVerified className="ml-1" /> 
                </Link>
                 

                )}
               
              </div>
              <p className="mt-1.5 text-sm font-medium text-gray-600">
                Welcome back {username},
              </p>
            </div>
          </div>
        </div>
      </div>

      <ProfilePosts></ProfilePosts>
    </>
  );
}

export default Profile;
