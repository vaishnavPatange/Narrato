import conf from "../conf/conf.js";
import axios from "axios";

export class AuthService{

    async signup({username, email, password, userImage = "https://i.pinimg.com/236x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"}){
        try {
            console.log(username," ", email, " ", password , " ", userImage);
            const newUser = await axios.post(`http://localhost:8080/user/new`, {
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
            const currUser = await axios.get(`${conf.expressUrl}/user/current`);
            return currUser.userData
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }

    async login({username, password}){
        try {
            const loginUser = await axios.post((`http://localhost:8080/user/login`),{
                username:username,
                password:password
            })
            if(loginUser.data.success){
                return 
            }
        } catch (error) {
            return error.response ? error.response.data : error.message;
        }
    }

    async logout(){
        try {
           const logoutUser = await axios.get((`${conf.expressUrl}/user/logout`))
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