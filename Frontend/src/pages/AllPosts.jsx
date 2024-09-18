import React, { useEffect, useState } from 'react';
import {Container, PostCard} from "../components/index";
import postService from "../config/postService";
function AllPosts() {

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const allPosts = postService.getAllPosts();
        if(allPosts) setPosts(allPosts);
        
    },[])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post._id} className='p-2 w-1/4'>
                    <PostCard {...post}/>
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
