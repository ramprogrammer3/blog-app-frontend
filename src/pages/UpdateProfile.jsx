import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user,token } = useSelector((state) => state.user);
  const id = user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image,setImage] = useState(user.image)

  const imageUploader = (e) =>{
      const file = e.target.files[0];
      if(file === undefined){
        setImage(user.image)
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        setImage(reader.result)
      }
  }

  const updateProfile = async(data)=>{
    const toastId = toast.loading("Loading...");
    try {
      const config = {
        headers : {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      }
      const response = await axios.put(`https://blog-app-backend-silk.vercel.app/api/v1/user/update/${id}`,data,config);
      if(response.data.success){
        toast.success(response.data.message);
      }
      localStorage.removeItem("user");
      dispatch(setUser(null));
      localStorage.setItem("user",JSON.stringify(response.data.updateUser))
      dispatch(setUser(response.data.updateUser))
      navigate("/profile") 
    } catch (error) {
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }

  const handleProfileUpdate = (e)=>{
    e.preventDefault();
    const data = {
      name,email,image
    }
    updateProfile(data);
  }

  return (
    <div className="mt-20">
      <div className="border p-5 w-11/12 border-blue-300 rounded-md max-w-[500px] mx-auto">
        <form className="flex flex-col gap-3" onSubmit={handleProfileUpdate}>
          <label className="flex flex-col gap-1">
            <p className=" text-[16px] md:text-[20px]">Name : </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-center border
             border-blue-300 rounded-md p-1 
             focus:outline-blue-400"
            />
          </label>

          <label className="flex flex-col gap-1">
            <p className=" text-[16px] md:text-[20px]">Email : </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-center border
             border-blue-300 rounded-md p-1 
             focus:outline-blue-400"
            />
          </label>

          <label className="flex flex-col gap-1">
            <p className=" text-[16px] md:text-[20px]">
              {" "}
              Choose profile pictrue{" "}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={imageUploader}
              className="w-full text-center border
             border-blue-300 rounded-md p-1 
             focus:outline-blue-400"
            />
          </label>

          <button type="submit" className="bg-blue-500 
          text-white rounded-md md:text-[20px]">update </button>
        </form>
        <div className="my-5 flex justify-center">
          <img src= {image} alt="profile pic" className="w-40 h-40 rounded-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
