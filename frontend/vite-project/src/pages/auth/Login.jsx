import React, { useContext, useState } from 'react'
import axios from "axios";
import AuthLayout from '../../components/Layouts/AuthLayout'
import Input from '../../components/inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [error,setError]=useState(null)

  const {updateUser}= useContext(UserContext);

  //handle login form submit
  const handleLogin=async (e) => {
    e.preventDefault();

    const response = await axios.post(
  "https://budgety-expense-tracker.onrender.com/api/v1/auth/login",
  { email, password }
);

    if (!validateEmail(email)) {
      setError ("please enter a valid email");
      return;
    }

    if(!password){
      setError("please enter the Password");
      return;
    }
    setError("");

    //login API Call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong, PLease try again later.");
      }
    }
  }
  const navigate=useNavigate()
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 nd:h-full flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black text-[20px]'>Welcome</h3>
      <p className='text-l text-slate-700 mt-[5px] mb-6'>
        Please enter your details 
      </p>
      <form onSubmit={handleLogin}>
        <Input 
        value={email} 
        onChange={({target})=> setEmail(target.value)} label="Email Address"
        placeholder='eg. abc@gmail.com' 
        type='text' 
        />
        <Input 
        value={password} 
        onChange={({target})=> setPassword(target.value)} label="Password"
        placeholder="Enter Password "
        type="password"
        />
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p> }
        
        <button type='submit' className='w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer'>LOGIN</button>
        <p className='p-4 text-[13px] text-slate-800 nt-3'> Don't have an account?{""}
          <Link className='font-medium text-primary underline' to="/signUp">
          Sign Up</Link>
        </p>
      </form>
      </div>

    </AuthLayout>
  )
}

export default Login
