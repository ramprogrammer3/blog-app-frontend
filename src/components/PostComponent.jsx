import React from 'react'

const PostComponent = ({body,title,likes,comments,postImage,id}) => {
  return (
    <div className='border border-blue-400 rounded-md'>
        <div className='flex flex-col p-5 gap-y-4'>
            <p className='text-2xl font-semibold'> {title} </p>
            <div className=''>
                <img src= {postImage} alt="postImage" className='w-full object-cover rounded-md '  />
            </div>
            <p className='text-[18px]'> {body} </p>
        </div>
    </div>
  )
}

export default PostComponent
