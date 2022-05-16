import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from "./userContext";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Home from "./components/Home";
function App() {

  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }


  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="My application"></Header>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-12">
                <div className="card mt-5 text-center">
                  <div className="card-body">
                    <Routes>
                      <Route path="/" exact element={<Home />}></Route>
                      <Route path="/login" exact element={<Login />}></Route>
                      <Route path="/register" element={<Register />}></Route>
                      <Route path="/profile" element={<Profile />}></Route>
                      <Route path="/logout" element={<Logout />}></Route>
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </BrowserRouter >
  );
}

export default App;
