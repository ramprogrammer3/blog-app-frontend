import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { Spinner } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';
import PostComponent from '../components/PostComponent';

const Home = () => {

  const [loading,setLoading] = useState(false);
  const [posts,setPosts] = useState([]);
  

  
  const getAllPost = async()=>{
    setLoading(true);
    try {
      
      const response = await axios.get("https://blog-app-backend-silk.vercel.app/api/v1/post/getAllPost")
      if(response.data.success){
        toast.success(response.data.message)
      }
      console.log(response.data.allPost)
      setPosts(response.data.allPost)
      setLoading(false)
      
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }

  }

  useEffect(()=>{
    getAllPost();
  },[])



  if(loading){
    return <div className='flex w-screen h-screen justify-center items-center '>
      <Spinner className='mr-56' />
    </div>
  }

  console.log(posts)

  return (
    <div className='my-20 flex flex-col gap-y-4'>
      {
        posts.map((post)=>(
          <PostComponent
            id={post._id}
            title = {post.title}
            body = {post.body}
            postImage={post.postImage}
            likes={post.likes}
            comments={post.comments}

            key={post._id}
          />
        ))
      }
    </div>
  )
}

export default Home
