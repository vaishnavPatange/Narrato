import React, { useEffect, useState } from 'react'
import {PostCard, Container} from "../components/index";
import postService from '../config/postService';
import { useSelector } from 'react-redux';

function Home() {

    const [posts, setPosts] = useState([]);
    const userStatus = useSelector((state) => state.userData.status);

    useEffect(() => {
        if(userStatus){
            postService.getAllPosts()
            .then((posts) => setPosts(posts));
        }
    },[])

  if(posts.length === 0){
    return(
        <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
    )
  }

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map((post) => (
                        <div key={post_id} className='p-2 w-1/4'>
                            <PostCard post={post}/>                            
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default Home
