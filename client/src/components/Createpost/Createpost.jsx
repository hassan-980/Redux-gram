import React from "react";
import { Link } from "react-router";
import { createPost } from "../../../features/posts/postslice";
import { TiUpload } from "react-icons/ti";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Footer from "../Footer/Footer";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Createpost() {
  const { loading, error,} = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("visibility", formData.visibility);
    data.append("image", imageFile);
     dispatch(createPost(data))
    

    


  };

  return (

    <> 

      {loading ? <Loader></Loader> : null}
      <div className="bg-white dark:bg-black dark:text-white flex min-h-screen  flex-col items-center  sm:justify-center sm:pt-0">
        <div className="relative mt-12 w-full mb-8  max-w-lg  sm:mt-10">
          <div className="  mx-5 border dark:border-t-white/50 border-black/80  rounded-lg dark:border-white/20 dark:border-l-white/20 dark:border-r-white/50  lg:rounded-xl   ">
            <div className="flex flex-col sm:p-6 p-4">
              <h3 className="text-xl font-semibold  tracking-tighter">
                New Post
              </h3>
              <p className="mt-1.5 text-sm  text-gray-400">
                Welcome , create new post
              </p>
              {(error === "Post created successfully") ? (
                <p className="text-green-700">{error}</p>
              ) : (
                <p className="text-red-500">{error}</p>
              )}
            </div>
            <div className="sm:p-6 p-4 pt-0">
              <form onSubmit={handleSubmit}>
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium  dark:group-focus-within:text-white text-gray-400">
                      Title
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      onChange={handleChange}
                      type="text"
                      name="title"
                      placeholder="Enter post title"
                      className=" block  w-full border-0 bg-transparent p-0 text-sm   focus:outline-none focus:ring-0 focus:ring-teal-500 placeholder:text-gray-600 "
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label className="text-xs font-medium  dark:group-focus-within:text-white text-gray-400">
                          bio
                        </label>
                      </div>
                      <div className="flex items-center">
                        <textarea
                          onChange={handleChange}
                          type="text"
                          name="description"
                          placeholder="Describe everything about this post here"
                          className=" block h-35 w-full border-0 bg-transparent p-0 text-sm   focus:outline-none focus:ring-0 focus:ring-teal-500 placeholder:text-gray-600"
                        />
                      </div>
                    </div>

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
                          if (file.size > MAX_FILE_SIZE) {
                             alert("Image size should not exceed 3MB");
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
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-x-2">
                  <select
                    onChange={handleChange}
                    value={formData.visibility}
                    className="flex items-center justify-center rounded-md text-sm font-medium transition-all  focus-visible:ring-offset-2  hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                    name="visibility"
                  >
                    <option className=" bg-black " value="public">
                      Public
                    </option>
                    <option className=" bg-black text-white" value="private">
                      Private
                    </option>
                  </select>

                  <Link
                    className="flex items-center justify-center rounded-md text-sm font-medium transition-all  focus-visible:ring-offset-2  hover:ring hover:ring-black dark:hover:ring-white h-10 px-4 py-2 duration-200"
                    href="/"
                  >
                    Cancel
                  </Link>

                  <button className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-600 inline-flex items-center justify-center rounded-md text-sm focus-visible:ring-offset-2  bg-white text-black h-10 px-4 py-2">
                    POST
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Createpost;
