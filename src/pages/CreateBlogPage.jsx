import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateBlogPage = () => {
  const [postTitle, setPostTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  const uploadImage = (e)=>{
      const file = e.target.files[0];
      if(file === undefined){
        toast.error("Please select post image ");
        return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        setImage(reader.result);
      }
  }

  const submitPost = (e) =>{
    e.preventDefault();
    
    const data = {
      title : postTitle,
      body,
      image
    }

    console.log(data);
  }

 
  return (
    <div className="mt-20">
      <div className="border p-5 w-11/12 border-blue-300 rounded-md max-w-[500px] mx-auto">
        <form className="flex flex-col gap-3" onSubmit={submitPost}>
          <label className="flex flex-col gap-1">
            <p className=" text-[16px] md:text-[20px]">Email : </p>
            <input
              name="postTitle"
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full text-center border
            border-blue-300 rounded-md p-1 
            focus:outline-blue-400"
              placeholder="Post Title"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <p className=" text-[16px] md:text-[20px]">Description : </p>
            <textarea
              name="body"
              cols="30"
              rows="5"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full  border
            border-blue-300 rounded-md p-1 
            focus:outline-blue-400"
              placeholder="write post description...."
            ></textarea>
          </label>

          <label className="flex flex-col gap-1">
            <p className=" text-[16px] md:text-[20px]">Choose post image : </p>
            <input
              className="w-full  border
            border-blue-300 rounded-md p-1 
            focus:outline-blue-400"
              type="file"
              accept="image/*"
              onChange={uploadImage}
            />
          </label>

          <button type="submit" className="bg-blue-500 
          text-white rounded-md md:text-[20px]">Post </button>

        </form>

        <div className="w-full mt-8">

          {
            image.length > 1 && 
          <img src= {image} alt="post pic "  />
          }
        </div>

      </div>
    </div>
  );
};

export default CreateBlogPage;
