import { FcGoogle, FcOk } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/auth/authSlice";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Loader from "../Loader";
import Footer from "../Footer/Footer";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <>
      {loading ? <Loader></Loader> : null}

      <div className="bg-white dark:bg-black dark:text-white flex min-h-screen flex-col items-center  sm:justify-center sm:pt-0">
        <div className="relative mt-12 w-full max-w-lg sm:mt-10">
          <div className="relative -mb-px h-px w-full "></div>
          <div className="mx-5 border dark:border-white/50 border-black/80  rounded-lg   lg:rounded-xl ">
            <div className="flex flex-col sm:p-6 p-4">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                Signup
              </h3>
              <p className="mt-1.5 text-sm font-medium text-gray-400">
                Welcome, enter your credentials to continue.
              </p>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="sm:p-6 p-4 pt-0">
              <form onSubmit={handleSubmit}>
                <div className=" relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Username
                    </label>
                    <div className="absolute right-3 translate-y-2 ">
                      <FcOk />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-gray-600 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  />
                </div>
                {/* //email */}
                <div className="mt-4 relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                      Email
                    </label>
                    <div className="absolute right-3 translate-y-2 ">
                      <FcOk />
                    </div>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Example@gmail.com"
                    onChange={handleChange}
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-gray-600 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  />
                </div>
                {/* //password */}
                <div className="mt-4">
                  <div>
                    <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label className="text-xs font-medium text-muted-foreground dark:group-focus-within:text-white text-gray-400">
                          Password
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="password"
                          name="password"
                          placeholder="password"
                          onChange={handleChange}
                          className="block w-full border-0 bg-transparent p-0 text-sm  placeholder:text-gray-600 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="remember"
                      className="outline-none focus:outline focus:outline-sky-600"
                    />
                    <span className="text-xs">Remember me</span>
                  </label>
                  <Link
                    className="text-sm font-medium text-foreground underline"
                    to={"/reset-pass"}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-4 flex justify-center gap-x-2">
                  <button
                    className="font-semibold bg-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white hover:ring hover:ring-black dark:hover:ring-white transition duration-600 inline-flex items-center justify-center rounded-md text-sm focus-visible:ring-offset-2  text-white hover:bg-white hover:text-black h-10 px-4 py-2 w-full cursor-pointer"
                    type="submit"
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
              <div className="text-center">
                <p className="mt-2 mb-2 text-sm font-medium text-white/50 ">
                  or Signup using Google
                </p>
              </div>

              <button
                className="font-semibold bg-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white hover:ring hover:ring-black dark:hover:ring-white transition duration-600 inline-flex items-center justify-center rounded-md text-sm focus-visible:ring-offset-2  text-white hover:bg-white hover:text-black h-10 px-4 py-2 w-full cursor-pointer"
                type="submit"
              >
                Google <FcGoogle className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Signup;
