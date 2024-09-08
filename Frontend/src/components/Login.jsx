import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import useForm from "react-hook-form";
import { Input, Button, Logo } from "./index";
import { login as authLogin } from "../store/authSlice";
import authService from '../config/authService';

function Login() {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("")
    try {
      const loginMessage = await authService.login(data);
      if (loginMessage) {
        dispatch(authLogin(data));
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input 
              label="Username"
              placeholder="Enter your username"
              {...register("username", {
                required:"Username is required",
              })}
            />
            <Input 
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password",{
                required:"Password is required"
              })}
            />
            <Button 
              children="Login"
              type="submit"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
