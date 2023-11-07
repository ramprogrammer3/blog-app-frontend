import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {setToken,setUser} from "../slices/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation();
  const  dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  

  const logout = ()=>{
    dispatch(setUser(null))
    dispatch(setToken(null))
    localStorage.removeItem("user");
    localStorage.removeItem('token');
    toast.success("Log out successful")
    navigate("/")
  }


  return (
    <div className="border-b fixed top-0 left-0 right-0 bg-white">
      <div className="w-11/12 max-w-[1080px] mx-auto flex justify-between items-center py-2 ">
        <div className="flex gap-x-2 md:gap-x-8">
          <NavLink
            to={"/"}
            className={`text-sm md:text-[1.2rem] no-underline ${
              location.pathname === "/" ? "text-blue-600" : "text-black"
            } `}
          >
            Home
          </NavLink>
          <NavLink
            to={"/createBlog"}
            className={`text-sm md:text-[1.2rem] no-underline ${
              location.pathname === "/createBlog"
                ? "text-blue-600"
                : "text-black"
            } `}
          >
            create post
          </NavLink>
        </div>
        <div>
          {/* search wala div  */}
          <div></div>

          {/* login signup logout wala div  */}
          <div className="flex gap-x-4">
            {!user && (
              <Link
                to={"/login"}
                className="no-underline text-white text-[12px] md:text-[1rem] bg-slate-400
               rounded-lg py-1 px-2 md:px-3"
              >
                Login
              </Link>
            )}

            {!user && (
              <Link
                to={"/signup"}
                className="no-underline text-white text-[12px] md:text-[1rem] bg-slate-400 
              rounded-lg py-1 px-2 md:px-3"
              >
                Singup
              </Link>
            )}

            {user && (
              <div>
                <Link to={"/profile"}>
                <img src= {user.image} alt="profile-pic" 
                className="w-10 h-10 rounded-full object-cover gradient " 
                />
                </Link>
              </div>
            )}

            {user && <button onClick={logout} className="text-[12px] rounded-full  border-2  border-[#ccc]">logout </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
