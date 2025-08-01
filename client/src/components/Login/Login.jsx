import React from 'react'
import { FcOk } from "react-icons/fc";
import { Link } from 'react-router';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router';
import Loader from '../Loader';
import Footer from '../Footer/Footer';



function Login() {
const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, loggedIn } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn]);



  return (
    <>{loading ? (<Loader></Loader>) : null }
<div className="bg-white dark:bg-black dark:text-white flex min-h-screen flex-col items-center sm:-mt-19  sm:justify-center sm:pt-0">

    <div className="relative mt-12 w-full max-w-lg sm:mt-10 ">

        <div
            className="mx-5 border dark:border-white/50 border-black/80  rounded-lg    lg:rounded-xl ">
            <div className="flex flex-col sm:p-6 p-4">
                <h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
                <p className="mt-1.5 text-sm font-medium text-gray-400
                ">Welcome back, enter your credentials to continue.
                </p>
               {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="sm:p-6 p-4 pt-0">
                <form onSubmit={handleSubmit} >
                    <div>
                        <div>
                            <div
                                className=" relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                <div className="flex justify-between">
                                    <label
                                        className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Email</label>
                                    <div className="absolute right-3 translate-y-2 ">
                                                  <FcOk />
                                            </div>
                                </div>
                                <input type="email" name="email" placeholder="Enter email"
                                  onChange={handleChange}

                                  
                                    className="block w-full border-0 dark:bg-black    p-0 text-sm  placeholder:text-gray-600 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"/>
                            </div>
                            <input type="email" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div>
                            <div
                                className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                                <div className="flex justify-between">
                                    <label
                                        className="text-xs font-medium text-muted-foreground dark:group-focus-within:text-white text-gray-400">Password</label>
                                        <div className="absolute right-3 translate-y-2 text-green-200">
                                                  <FcOk />
                                            </div>
                                </div>
                                <div className="flex items-center">
                                    <input type="password" name="password" placeholder='Enter password'
                                      onChange={handleChange}

                                        className="block w-full border-0 bg-transparent p-0 text-sm   placeholder:text-gray-600 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 text-foreground"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="remember"
                                className="outline-none focus:outline focus:outline-sky-600"/>
                            <span className="text-xs">Remember me</span>
                        </label>
                        <Link to={'/reset-pass'} className="text-sm font-medium text-foreground underline" >Forgot
                            password?</Link>

                    </div>
                    <div className="mt-4 flex items-center justify-end gap-x-2">
                        <Link className="flex items-center justify-center rounded-md text-sm font-medium transition-all  focus-visible:ring-offset-2  hover:ring dark:hover:ring-white hover:ring-black h-10 px-4 py-2 duration-200"
                            to="/signup">Register</Link>
                        <button
                            className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-600 inline-flex items-center justify-center rounded-md text-sm focus-visible:ring-offset-2  bg-white text-black h-10 px-4 py-2"
                            type="submit">{loading ? 'Logging in...' : 'Login'}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<Footer></Footer>
</>
  )
}

export default Login;






