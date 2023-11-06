import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="border-b">
      <div className="w-11/12 max-w-[1080px] mx-auto flex justify-between items-center py-2 ">
        <div className="flex gap-x-2 md:gap-x-8">
          <NavLink
            to={"/"}
            className={`text-sm md:text-[1.2rem] no-underline ${
              location.pathname === "/" ? "" : "text-black"
            } `}
          >
            Home
          </NavLink>
          <NavLink
            to={"/createBlog"}
            className={`text-sm md:text-[1.2rem] no-underline ${
              location.pathname === "/createBlog" ? "" : "text-black"
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
            <Link
              to={"/login"}
              className="no-underline text-white text-[12px] md:text-[1rem] bg-slate-400
               rounded-lg py-1 px-2 md:px-3"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="no-underline text-white text-[12px] md:text-[1rem] bg-slate-400 
              rounded-lg py-1 px-2 md:px-3"
            >
              Singup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
