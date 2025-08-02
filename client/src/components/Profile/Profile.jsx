import ProfilePosts from "./ProfilePosts";
import { useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { TiUpload } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";
import Footer from "../Footer/Footer";
import Loader from "../Loader";
import toast from "react-hot-toast";

import axios from "axios";
function Profile() {
  const { username, authuser } = useSelector((state) => state.auth);
  const [isUpdate, setIsUpdate] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const data = new FormData();
    data.append("image", imageFile);
    try {
      const res = await axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}/api/user/update-profile-pic`,
          data,
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setloading(false);
          seterror(true);
          toast.success("Profile Picture updated successfully");
        });
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <>
      {loading ? <Loader></Loader> : null}
      <div
        className={` ${
          isUpdate && "hidden"
        }  fixed inset-0 z-30 bg-black/40 bg-opacity-50 flex items-center justify-center overflow-hidden`}
      >
        <div className="mx-5 bg-white w-90    rounded-lg lg:rounded-xl ">
          <div className="flex flex-col justify-center   sm:p-6 p-7 ">
            <div className=" flex justify-end ">
              <button
                className="cursor-pointer"
                onClick={() => setIsUpdate(true)}
              >
                <ImCross />
              </button>
            </div>

            <div className="flex justify-center text-center flex-col">
              <p className="mt-1 text-sm font-bold text-black">
                Update your Profile Pictrue
              </p>

              {error ? (
                <p className="mt-1.5 text-sm font-medium text-green-500">
                  Profile Picture updated successfully
                </p>
              ) : null}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mt-4 relative border-2 border-gray-300 border-dashed rounded-lg p-6">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 z-30"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    const validImageTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                      "image/webp",
                      "image/jpg",
                    ];

                    if (!validImageTypes.includes(file.type)) {
                      alert(
                        "Only image files (jpg, png, gif, webp) are allowed"
                      );
                      return;
                    }

                    if (file) {
                      setImageFile(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />

                <div className="flex flex-col justify-center items-center ">
                  <TiUpload className="text-2xl" />

                  <h3 className="mt-2 text-sm font-medium text-gray-600">
                    <label className="relative cursor-pointer">
                      <span>Drag and drop</span>
                      <span className="text-indigo-600"> or browse </span>
                      <span>to upload</span>
                    </label>
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 3MB
                  </p>
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mt-4 rounded max-h-30 "
                    />
                  )}
                </div>
              </div>

              <button
                className="inline-flex items-center justify-center rounded-xl w-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 mt-3"
                to="/login"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-black  dark:text-white flex   flex-col items-center  sm:justify-center ">
        <div className=" mt-25 sm:mb-8 w-full  max-w-lg  ">
          <div className="mx-3 border border-black/80  rounded-lg dark:border-white/50   lg:rounded-xl ">
            <div className=" -mt-20 w-full flex justify-center">
              <div className="h-32 w-32">
                <div className="relative">
                  {authuser?.profilePic.contentType ? (
                    <img
                      src={`${
                        import.meta.env.VITE_SERVER_URL
                      }/api/user/get-profile-pic/${authuser.id}`}
                      onError={(e) => {
                        e.target.src = "/avatar.jpg";
                      }}
                      alt="Profile"
                      className=" rounded-full object-cover w-32 h-32  shadow-2xl"
                    />
                  ) : (
                    <img
                      className="rounded-full object-cover w-32 h-32  shadow-2xl   "
                      src="/avatar.jpg"
                      alt="image"
                    />
                  )}

                  <button className="flex" onClick={() => setIsUpdate(false)}>
                    <div className="absolute bottom-0 right-2 cursor-pointer  ">
                      <FaPlusCircle className="text-2xl " />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center p-6 sm:mt-5 flex-col ">
              <div className="flex">
                <h3 className="text-xl mr-2  font-extrabold ">
                  {authuser?.username}
                </h3>

                {authuser?.isVerified ? (
                  <MdVerified className="text-blue-800 text-2xl pl-1 mt-1" />
                ) : (
                  <Link
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-2 py-2 text-sm font-semibold  text-white  hover:bg-blue-500 "
                    to="/verify"
                  >
                    Get verified
                    <MdOutlineVerified className="ml-1" />
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
      <Footer></Footer>
    </>
  );
}

export default Profile;
