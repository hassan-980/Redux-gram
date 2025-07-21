import React from 'react'
import { Link } from 'react-router'
import { ImCross } from "react-icons/im";
import { useState } from 'react';


function LoginPopup() {

  const [isActive, setIsActive] = useState(false);

  return (

    <div className={` ${isActive && 'hidden'}  fixed inset-0 z-30 bg-black/40 bg-opacity-50 flex items-center justify-center overflow-hidden`}>

        <div
            className="mx-5 bg-white w-90   rounded-lg lg:rounded-xl ">
            <div className="flex flex-col justify-center  sm:p-6 p-7 ">

                <div className=' flex justify-end '>
                      <button className='cursor-pointer' onClick={()=>setIsActive(true)}><ImCross /></button>
                </div>
                <div className='flex justify-center'>

                <img src="/logoLight.png" className='w-40'  />
                </div>

                <p className="mt-1.5 text-sm font-medium text-gray-500
                ">Welcome to Reduxgram, signup to create posts.
                </p>
                <Link
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 mt-3"
                  to="/login"
                  onClick={()=>setIsActive(true)}
                >
                  Login
                </Link>

                <Link
                  className="flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex mt-3"
                  to="/signup"
                  onClick={()=>setIsActive(true)}
                >
                  Sign in
                </Link>
                <p className="mt-2 text-sm  text-gray-500
                ">We use cookies🍪 to enhance your browsing experience.
                </p>
            </div>
           
        </div>
    </div>

  )
}

export default LoginPopup



