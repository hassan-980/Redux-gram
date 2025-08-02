import { FcOk } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  sendEmailVerifyOtp,
  verifyEmail,
} from "../../../features/auth/authSlice";

function Verify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user, loggedIn, isverified } = useSelector(
    (state) => state.auth
  );

  const [otpData, setotpData] = useState("");
  const [otpsend, setotpsend] = useState(false);

  const handleChange = (e) => setotpData(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyEmail(otpData));
  };
  useEffect(() => {
    if (isverified) {
      navigate("/profile");
    }
  }, [isverified]);

  return (
    <>
      <div className="bg-white dark:bg-black dark:text-white flex min-h-screen flex-col items-center  sm:justify-center sm:pt-0">
        <div className="relative mt-12 w-full max-w-lg sm:mt-10 ">
          <div className="mx-5 border dark:border-t-white/50 border-black/80  rounded-lg dark:border-white/20 dark:border-l-white/20 dark:border-r-white/50  lg:rounded-xl ">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                Verification
              </h3>
              <p
                className="mt-1.5 text-sm font-medium text-gray-400
                "
              >
                Enter the OTP for verification
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <div className=" relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                          Enter OTP
                        </label>
                        <div className="absolute right-3 translate-y-2 ">
                          {otpData.length === 6 ? <FcOk /> : null}
                        </div>
                      </div>
                      <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        onChange={handleChange}
                        className="block w-full border-0 bg-transparent p-0 text-sm  placeholder:text-gray-600 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                  {otpsend && (
                    <p className="text-gray-600 mt-2">
                      A one-time password (OTP) has been sent to your registered
                      email address and will be valid for 10 minutes.{" "}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-center gap-x-2">
                  <button
                    className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-600 inline-flex items-center justify-center rounded-md text-sm focus-visible:ring-offset-2  bg-white text-black h-10 px-8 py-3"
                    type="submit"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>

              <div className="flex w-full justify-center">
                <button
                  onClick={() => {
                    dispatch(sendEmailVerifyOtp());
                    setotpsend("true");
                  }}
                  className="flex items-center justify-center rounded-md text-sm font-medium transition-all  focus-visible:ring-offset-2  hover:ring dark:hover:ring-white hover:ring-black h-10 px-4 py-2 duration-200 mt-2 cursor-pointer"
                >
                  {otpsend ? "Resend OTP" : "send OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Verify;
