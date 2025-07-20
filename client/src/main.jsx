import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Createpost from './components/Createpost/Createpost.jsx'
import Home from './components/Home/Home.jsx'
import Profile from './components/Profile/Profile.jsx'
import { BrowserRouter, createBrowserRouter,RouterProvider } from 'react-router'
import Verify from './components/Login/verification.jsx'
import ResetPass from './components/ResestPass/ResetPass.jsx'
import ResetNewPass from './components/Login/ResetNewPass.jsx'



// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App/>,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "profile",
//         element: <Profile />
//       },
//       {
//         path: "login",
//         element: <Login />
//       },{
//         path: "signup",
//         element: <Signup />
//       },{
//         path: "createpost",
//         element: <Createpost />
//       },{
        
//         path: "verify",
//         element: <Verify />
      
//       },{
        
//         path: "Reset-pass",
//         element: <ResetPass />
      
//       }
//       ,{
        
//         path: "Reset-NewPass",
//         element: <ResetNewPass />
      
//       }
    
      
//     ]
//   }
// ])



createRoot(document.getElementById('root')).render(

    // <RouterProvider router={router} />

    <App/>
  

);
