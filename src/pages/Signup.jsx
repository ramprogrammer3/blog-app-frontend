import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [showPassword ,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);

  // set signup data in hook
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle signup data 
  const handleChange = (e) => {
    setFormdata((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // preview image 
  const [image,setImage] = useState("")

  // upload image as a url 
  const uploadImage = (e) =>{
    const file = e.target.files[0];
    if(file === undefined){
      toast.error("Please select profile picture");
      return;
    }
    const reader  = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      setImage(reader.result);
    }
  }

  // api call for singup

  const singupUser = async(data)=>{
    const toastId = toast.loading("loading...")
    try {
      const response = await axios.post("https://blog-app-backend-silk.vercel.app/api/v1/user/register",data);
      if(response.data.success){
        toast.success(response.data.message);
      }
      console.log(response)

      navigate("/login")
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
  }

  // form submit function
  const handleSubmit = (e) =>{
    e.preventDefault();

    if(formdata.password.length < 6){
      toast.error("password must be at least 6 characters long");
      return;
    }

    if(formdata.password !== formdata.confirmPassword){
      toast.error("password does not match")
      return;
    }

    if(image.length < 1){
      toast.error("Please select profile picture ")
      return
    }
    const data = {...formdata,image}
    singupUser(data);
  }



  return (
    <div className="flex justify-center items-center my-28">
      <div className="border p-5 w-11/12 border-blue-300 rounded-md max-w-[500px]">
        <p className="text-center md:text-2xl font-semibold mb-4">
          Welcome to singup page{" "}
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

          <label className="flex flex-col gap-1">
            <p className=" text-[16px] md:text-[20px]">Name : </p>
            <input
              name="name"
              value={formdata.name}
              onChange={handleChange}
              type="text"
              className="w-full text-center border
             border-blue-300 rounded-md p-1 
             focus:outline-blue-400"
              placeholder="name : ram kumar  "
              required
            />
          </label>

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
              placeholder="email : ram@gmail.com "
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
              className="w-full text-center border
             border-blue-300 rounded-md p-1 
             focus:outline-blue-400"
              placeholder="password"
            />
            <span onClick={()=>setShowPassword(!showPassword)}
            className="text-[12px] absolute right-[12px] bottom-[8px] cursor-pointer">
               { showPassword ? "Hide" : "Show"} </span>
          </label>

          <label className="flex flex-col gap-1 relative">
            <p className=" text-[16px] md:text-[20px]">Confirm Password : </p>
            <input
              name="confirmPassword"
              value={formdata.confirmPassword}
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              className="w-full text-center border
             border-blue-300 rounded-md p-1 
             focus:outline-blue-400"
              placeholder="confirmPassword"
            />
            <span onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
            className="text-[12px] absolute right-[12px] bottom-[8px] cursor-pointer">
            { showConfirmPassword ? "Hide" : "Show"}
            </span>
          </label>

          <label className="flex flex-col gap-1">
            <p className=" text-[16px] md:text-[20px]">Choose picture </p>
            <input
              onChange={uploadImage}
              type="file"
              className="w-full text-center border
             border-blue-300 rounded-md p-1 
             focus:outline-blue-400"
            />
          </label>

          <button type="submit" className="bg-blue-500 
          text-white rounded-md md:text-[20px]">Singup</button>

        </form>

        <div className="my-5 flex justify-center">
          {
            image.length > 0 && 
          <img src= {image} alt="profile pic" className="w-40 h-40 rounded-full object-cover" />
          }
        </div>
        <div className="text-center">
          <span className="text-red-500">already account ? </span>   
          <Link to={"/login"} className="text-blue-600"> login </Link> 
        </div>
      </div>
    </div>
  );
};

export default Signup;
