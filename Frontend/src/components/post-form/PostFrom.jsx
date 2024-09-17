import React,{useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import postService from "../../config/postService";
import fileService from "../../config/fileService";
import { useForm } from 'react-hook-form';
import {Input, Button, Select, RTE} from "../index";

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
    const userData = useSelector((state) => state.auth.userData);

    const submit = async(data) => {
      if(post){
        const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null

        if(file){
          await fileService.deleteFile(data.image);
        }

        const updatdData = await postService.editPost({
          ...data,
          image : file ? file.$id : null
        })

        if(updatdData.success){
          navigate(`/post/:${updatdData._id}`);
        }
      } else {
        const file = await fileService.uploadFile(data.image[0]);
        if(file){
          const fileID = file.$id;
          data.image = fileID;

          const createdPost = await postService.addPost({...data});
          if(createdPost.success) navigate(`/post/${createdPost._id}`); 

        }
      }
    }

    const slugTranform = useCallback((value)=> {
      if(value && typeof(value) === "string"){
        return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
      }

      return "";
    }, []);


    useEffect(()=> {
      const subscription = watch((value, {name}) =>{
        if(name === 'title'){
          setValue('slug', slugTranform(value.title),{shouldValidate:true});
        }

      });

      return () => {
        subscription.unsubscribe();
      }
    }, [watch, slugTranform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className='w-2/3 px-2'>
        <Input 
          label ="Title: "
          placeholder = "title"
          className="mb-4"
          {...register('title', {required:"Title is required"})}
        />
        <Input 
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          {...register("slug",{required:"Slug is required"})}
          onInput={(e) => (setValue("slug", slugTranform(e.currentTarget.value), {shouldValidate:true}))}
        />
        <RTE label="Content:" name="Content" control={control} defaultValue={getValues('content')}/>
      </div>
      <div className='w-1/3 px-2'>
        <Input 
          label="Image: "
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          {...register("image", {required: !post ? "Image is required": false})}
        />
        {post && (<div className='w-full mb-4'>
          <img 
            src={fileService.filePreview({name:"post", file_id:post.image})}
            alt="Post title"
            className='rounded-lg'
          />
          </div>)}

        <Select 
          label="Satus"
          options={[active, inactive]}
          className="mb-4"
          {...register("satus", {required:"status is required"})}
        />

        <Button
          type='submit'
          bgColor={post ? "bg-green-500" : undefined}
          className='w-full'
        >{post ? "Update" : "Submit"}</Button>
      </div>
    </form>
  );
}

export default PostFrom
