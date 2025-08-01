import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "/store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Createpost from "./components/Createpost/Createpost.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Verify from "./components/Login/verification.jsx";
import ResetPass from "./components/ResestPass/ResetPass.jsx";
import ResetNewPass from "./components/Login/ResetNewPass.jsx";
import toast, { Toaster } from 'react-hot-toast';


import Chat from "./components/chat/Chat.jsx";

function App() {
  return (

    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
           <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="createpost" element={<Createpost />} />
            <Route path="verify" element={<Verify />} />
            <Route path="Reset-pass" element={<ResetPass />} />
            <Route path="Reset-NewPass" element={<ResetNewPass />} />
            <Route path="chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;



