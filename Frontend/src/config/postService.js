import {expressUrl} from "../conf/conf";
import axios from "axios";

export class PostService{
    
    async getAllPosts(){
        try{
            const allPosts = await axios.post(`${expressUrl}/post/all`);
            return allPosts
        }catch(error){
            return error.response ? error.response.data : error.message;
        }
    }

    async addPost({ title, slug, image, content, status, user }){
        try {
            const addedPost = await axios.post(`${expressUrl}/post/add`,{
                title:title,
                slug:slug,
                image:image,
                content:content,
                status:status,
                user:user
            });
            if(addedPost.data.success){
                return addedPost.data
            }
        } catch (error) {
            return error.response ? error.response.data : error.message;v
        }
    }

    async editPost({ title, slug, image, content, status, _id }){
        try {
            const editedPost = await axios.put(`${expressUrl}/post/edit/:${_id}`, {
                title:title,
                slug:slug,
                image:image,
                content:content,
                status:status,
                user:user
            })
            if(editedPost.data.success){
                return editedPost.data
            }
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }

    async deletePost({_id}){
        try {
           const deletedPost =  await axios.delete(`${expressUrl}/post/delete/:${_id}`);
           if(deletedPost.data.success){
            return deletedPost.data.success
           }
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }

    async getPost({_id}){
        try {
            const reqPost = await axios.post(`${expressUrl}/post/:${_id}`);
            if(reqPost.success){
                return reqPost.post;
            }
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }

}

const postService = new PostService();

export default postService;