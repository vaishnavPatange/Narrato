import React, { useEffect, useState } from 'react'
import { Container, Button } from '../components/index';
import postService from '../config/postService';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import parse from "html-react-parser";
import fileService from '../config/fileService';


function Post() {

  const [post, setPost] = useState(null);
  const userData = useSelector((state) => state.userData);
  const {_id} = useParams();
  const navigate = useNavigate();

  const isAuthor = post && userData ? userData._id === post.user : false;

  useEffect(() => {
    if(_id){
      postService.getPost(_id).then((currPost) => {
        if(currPost) setPost(currPost);
        else navigate("/");
      })
    } else{
      navigate("/")
    }
  },[_id, navigate]);

  const deletePost = async () => {
   await postService.deletePost(_id).then((res) => {
      if(res.success){
        const response = fileService.deleteFile({file_id: post.image});
        if(response) navigate("/");
      }
    })
  }

  return post ? (
    <div className='py-8'>
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img 
            src={ fileService.filePreview({file_id: post.image})}
            alt={post.title}
            className='rounded-xl'
          />
          {isAuthor && (
            <div className='absolute right-6 top-6'>
              <Link to={`/post/edit/:${post._id}`}>
                <Button className='mr-3' bgColor='bg-green-500'>
                  Edit
                </Button>
              </Link>
              <Button onClick={deletePost} bgColor='bg-red-500'>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className='w-full mb-6'>
          <h1 className='text-2xl font-bold'>{post.title}</h1>
        </div>
        <div className='browser-css'>
        {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : <h1>Something went wrong</h1>
}

export default Post
