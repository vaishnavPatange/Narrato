import React from 'react';
import {Link} from "react-router-dom";

function PostCard({_id, title, image}) {
  return (
    <Link to={`/post/${_id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={image} alt="post_image" width="100px" height="300px" className='rounded-xl' />
        </div>
        <h2 className='text-xl font-bold'>
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard
