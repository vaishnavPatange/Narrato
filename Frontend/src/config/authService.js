import {expressUrl} from "../conf/conf";
import axios from "axios";

export class AuthService{

    async signup({username, email, password, userImage = "https://i.pinimg.com/236x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"}){
        try {
            const newUser = await axios.post((`${expressUrl}/user/new`), {
                username: username,
                email:email,
                password:password,
                userImage:userImage
            })
            if(newUser.data.success){
                return this.login({username, password})
            }
        } catch (error) {
            return error.response ? error.response.data : error.message
        }
    }

    async getCurrUser(){
        try {
            const currUser = await axios.get(`${expressUrl}/user/current`);
            return currUser.userData
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }

    async login({username, password}){
        try {
            const loginUser = await axios.post((`${expressUrl}/user/login`),{
                username:username,
                password:password
            })
            if(loginUser.data.success){
                return loginUser.data.message
            }
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }

    async logout(){
        try {
           const logoutUser = await axios.get((`${expressUrl}/user/logout`))
           if(logoutUser.success){
            return logoutUser.data.message
           }
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }
}

const authService = new AuthService();

export default authService;