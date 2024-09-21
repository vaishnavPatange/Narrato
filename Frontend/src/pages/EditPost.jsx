import React, {useState, useEffect} from 'react';
import postService from '../config/postService';
import { Container, PostForm } from '../components/index';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {

    const [post, setPost] = useState(null);
    const {_id} = useParams();
    const navigate = useNavigate;

    useEffect(()=>{
        if(_id){
            postService.getPost({_id})
            .then((post) => {
                if(post) setPost(post)
            })
        } else{
            navigate("/");
        }
    },[_id,navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) :null
}

export default EditPost
