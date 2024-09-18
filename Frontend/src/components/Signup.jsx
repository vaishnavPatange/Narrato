import React, { useState } from 'react';
import { Input, Logo, Button } from "./index";
import authService from '../config/authService';
import { login as authLogin } from "../store/authSlice";
import authService from '../config/authService';
import fileService from "../config/fileService";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import useForm from "react-hook-form";

function Signup() {

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const signup = async (data) => {
        setError("")
        try {

            if(data.image[0]) await fileService.uploadFile(name="user", data.image[0])

            const createdUser = await authService.signup(data);
            if (createdUser) {
                const currUser = await authService.getCurrUser();
                if (currUser) dispatch(authLogin(currUser));
                navigate("/");
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(signup)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Username: "
                            placeholder="Enter a username"
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is requried",
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input 
                            label="Password: "
                            placeholder="Enter your password"
                            {...register("password",{
                                required:"Password is required"
                            })}
                        />
                        <Input 
                            label="Add your photo"
                            type="file"
                            accept="image/jpg, image/png, image/jpeg, image/gif"
                            {...register("userImage")}
                        />

                        <Button 
                            children="Signup"
                            type="submit"
                            className="w-full"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
