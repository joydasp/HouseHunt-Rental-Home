import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { createContext, useEffect, useState } from "react";

import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import ForgotPassword from "./modules/common/ForgotPassword";
import AdminHome from "./modules/admin/AdminHome";
import OwnerHome from "./modules/user/owner/OwnerHome";
import RenterHome from "./modules/user/renter/RenterHome";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />

              <Route
                path="/adminhome"
                element={userLoggedIn ? <AdminHome /> : <Login />}
              />
              <Route
                path="/ownerhome"
                element={userLoggedIn ? <OwnerHome /> : <Login />}
              />
              <Route
                path="/renterhome"
                element={userLoggedIn ? <RenterHome /> : <Login />}
              />
            </Routes>
          </div>
          <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3">
              © {date} Copyright: RentEase
            </div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
