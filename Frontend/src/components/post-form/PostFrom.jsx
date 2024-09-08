import React,{useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import postService from "../../config/postService";
import { useForm } from 'react-hook-form';

function PostFrom({post}) {
    const {register, handleSubmit, watch, control, setValue, getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || ""
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
  return (
    <div>
      
    </div>
  )
}

export default PostFrom
