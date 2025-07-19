import React from "react";
import { FcOk } from "react-icons/fc";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router";
import Loader from "../Loader";
import { setNewPass } from "../../../features/auth/authSlice";

function ResetNewPass() {
  const dispatch = useDispatch();
  const { error,loading,success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newpassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setNewPass(formData));
  };


  return (
    <>
      {loading ? <Loader></Loader> : null}
      <div className="bg-white dark:bg-black dark:text-white flex min-h-screen flex-col items-center  sm:justify-center sm:pt-0">
        <div className="relative mt-12 w-full max-w-lg sm:mt-10 ">
          <div className="mx-5 border dark:border-t-white/50 border-black/80  rounded-lg dark:border-white/20 dark:border-l-white/20 dark:border-r-white/50  lg:rounded-xl ">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                Create new password
              </h3>
              <p
                className="mt-1.5 text-sm font-medium text-gray-400
                  "
              >
                Enter your registered email for verification
              </p>
            
              <p className="   text-green-500">{error}</p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <div className=" relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                          Enter email
                        </label>
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        className="block w-full border-0 bg-transparent p-0 text-sm  placeholder:text-gray-600 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className=" relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                          Enter OTP
                        </label>
                      </div>
                      <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        onChange={handleChange}
                        className="block w-full border-0 bg-transparent p-0 text-sm  placeholder:text-gray-600 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      />
                    </div>

                    <div className="mt-4 relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                          Create new password
                        </label>
                      </div>
                      <input
                        type="text"
                        name="newpassword"
                        placeholder="Create new Password"
                        onChange={handleChange}
                        className="block w-full border-0 bg-transparent p-0 text-sm  placeholder:text-gray-600 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">
                    A one-time password (OTP) has been sent to your registered
                    email address and will be valid for 10 minutes.{" "}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-x-2">
                  <button
                    className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-600 inline-flex items-center justify-center rounded-md text-sm focus-visible:ring-offset-2  bg-white text-black h-10 px-8 py-3"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetNewPass;
