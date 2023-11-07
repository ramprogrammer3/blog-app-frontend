import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateBlogPage from "./pages/CreateBlogPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import Private from "./components/Private";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="w-11/12 max-w-[1080px] mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createBlog" element = {<Private> <CreateBlogPage /> </Private>} />
          <Route path="/profile" element = {<Private> <ProfilePage /> </Private>} />
          <Route path="/updateProfile/:id" element = {<Private> <UpdateProfile /></Private>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
