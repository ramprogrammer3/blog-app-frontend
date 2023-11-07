import React from "react";
import { useSelector } from "react-redux";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="mt-20">
      <div className="flex flex-col gap-y-5">
        {/* profile wala div  */}
        <div className="w-11/12 max-w-[400px] mx-auto flex flex-col gap-1 ml-[42%]">
          <img
            src={user.image}
            alt="profile-pic"
            className="w-40 gradient  h-40 rounded-full object-cover"
          />
          <p>
            {" "}
            <span className="font-semibold text-[18px]"> Name :</span>{" "}
            <span className="tracking-wider text-[18px]"> {user.name}</span>{" "}
          </p>
          <p>
            <span className="font-semibold text-[18px]"> Email :</span>{" "}
            <span className="tracking-wider text-[18px]"> {user.email}</span>
          </p>
          <div className="flex flex-col md:flex-row gap-y-2  justify-between mt-2">
            <p className="flex text-[18px] items-center gap-1">
              update profile
              <Link to={`/updateProfile/:${user._id}`}>
                <BiSolidEditAlt className="text-2xl text-blue-600 cursor-pointer" />
              </Link>
            </p>
            <p className="flex text-[18px] items-center gap-1">
              delete profile
              <MdDelete className="text-2xl text-red-600 cursor-pointer" />
            </p>
          </div>
        </div>

        <div className="w-full  border border-blue-400"></div>

        {/* post wala div  */}
        <div></div>
      </div>
    </div>
  );
};

export default ProfilePage;
