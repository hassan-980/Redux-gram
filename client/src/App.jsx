import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";
import { Provider } from "react-redux";
import {store} from "/store/store";


function App() {


  return (
    <>
      <Provider store={store}>
        <Navbar/>
        <Outlet />
        <Footer/>
      </Provider>
    </>
  );
}

export default App;
