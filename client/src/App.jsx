import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// import { BrowserRouter, Outlet } from "react-router";
import { Provider } from "react-redux";
import { store } from "/store/store";
// import { BrowserRouter , Route,Router, Routes } from "react-router";
// import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Createpost from "./components/Createpost/Createpost.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Verify from "./components/Login/verification.jsx";
import ResetPass from "./components/ResestPass/ResetPass.jsx";
import ResetNewPass from "./components/Login/ResetNewPass.jsx";
import { useLocation } from "react-router-dom";

import Chat from "./components/chat/Chat.jsx";

function App() {
  return (
    // <>
    //   <Provider store={store}>
    //     <Navbar/>
    //     <Outlet />
    //     <Footer/>
    //   </Provider>
    // </>

    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
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
        {/* <Footer /> */}
      </Provider>
    </>
  );
}

export default App;



