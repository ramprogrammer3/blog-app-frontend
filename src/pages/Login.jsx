import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormdata((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // api call for user login

  const userLogin = async(logindata)=>{
    const toastId = toast.loading("loading...")
    try {
      const response = await axios.post("https://blog-app-backend-silk.vercel.app/api/v1/user/login",logindata);
      if(response.data.success){
        toast.success(response.data.message);
      }

      localStorage.setItem("user",JSON.stringify(response.data.user))
      localStorage.setItem("token",JSON.stringify(response.data.token));
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token))
      console.log(response)
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(formdata.password.length < 6){
      toast.error("password at least 6 characters long ")
      return;
    }
    userLogin(formdata)
  }

  return (
    <div className="flex justify-center items-center my-28">
      <div className="border p-5 w-11/12 border-blue-300 rounded-md max-w-[500px]">
        <p className="text-center md:text-2xl font-semibold mb-4">
          {" "}
          Welcome to blog app{" "}
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1">
            <p className=" text-[16px] md:text-[20px]">Email : </p>
            <input
              name="email"
              value={formdata.email}
              onChange={handleChange}
              type="email"
              className="w-full text-center border
            border-blue-300 rounded-md p-1 
            focus:outline-blue-400"
              placeholder="email : ram@gmail.com"
              required
            />
          </label>

          <label className="flex flex-col gap-1 relative">
            <p className=" text-[16px] md:text-[20px]">Password : </p>
            <input
              name="password"
              value={formdata.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              className="w-full text-center border border-blue-300 rounded-md p-1 focus:outline-blue-400"
              placeholder="password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-[12px] absolute right-[12px] bottom-[8px] cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}{" "}
            </span>
          </label>

          <button type="submit" className="bg-blue-500 
          text-white rounded-md md:text-[20px]">Login</button>
        </form>

        <div className="text-center mt-4">
          <span className="text-red-500">Not account ? </span>   
          <Link to={"/signup"} className="text-blue-600"> signup </Link> 
        </div>
      </div>
    </div>
  );
};

export default Login;
