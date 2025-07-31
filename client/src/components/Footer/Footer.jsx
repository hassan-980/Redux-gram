import React from 'react'
import { FaFacebook,FaGithub,FaTwitter,FaInstagram,FaLinkedin  } from "react-icons/fa";


function Footer() {
  return (

    <>

    <div className={`  text-center`}>


    <span className="block m-10 text-sm text-center text-gray-500">© 2025™. All Rights Reserved.
		Built with 
        <span>❤️</span> 
            
	</span>

    <ul className="flex justify-center  mb-35 space-x-5">
        <li>
            <a href="#" className="text-gray-500 text-2xl  hover:text-gray-900">
               <FaTwitter />
            </a>
        </li>
        <li>
            <a href="#" className="text-gray-500 text-2xl  hover:text-gray-900">
               <FaFacebook />
            </a>
        </li>
        <li>
            <a href="#" className="text-gray-500 text-2xl  hover:text-gray-900">
                <FaInstagram />
            </a>
        </li>
        <li>
            <a href="#" className="text-gray-500  text-2xl hover:text-gray-900">
               <FaLinkedin />

            </a>
        </li>
        <li>
            <a href="#" className="text-gray-500 text-2xl  hover:text-gray-900">
                <FaGithub />
            </a>
        </li>
    </ul>
</div>
    
    </>
  )
}

export default Footer