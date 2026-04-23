import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import Input from '../../components/inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {
  const[profilePic, setProfilePic]=useState(null);
  const[fullName, setFullName]=useState("");
  const[email, setEmail]=useState("");
  const[password, setPassword]=useState("");

  const[error, setError]=useState(null);

  const {updateUser}=useContext(UserContext);
  const navigate=useNavigate();

  const handleSignUP=async(e)=>{
    e.preventDefault();

    let profileImageUrl="";
    if (!fullName){
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
          setError ("please enter a valid email");
          return;
    }
    
    if(!password){
          setError("please enter the Password");
          return;
    }
    setError("");

    // connection to Api
    try{

      //upload image
      if(profilePic){
        const imgUploadRes= await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const {token, user}= response.data;

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
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto  flex flex-col justify-center">
        <h3 className="text=xl font-semibold text-black">Create an Account</h3>
        <p className="text-s text-slate-700 mt-[5px] mb-3">Join us and take full control of your expenses- hassle-free</p>

        <form onSubmit={handleSignUP}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input 
            value={fullName}
            onChange={({target})=>setFullName(target.value)}
            label="Full Name"
            placeholder="eg. John"
            type="text" />
            <Input 
            value={email}
            onChange={({target})=>setEmail(target.value)}
            label="Email Address"
            placeholder="eg. John@gmail.com"
            type="text" />
            <Input 
            value={password}
            onChange={({target})=>setPassword(target.value)}
            label="Set Password"
            placeholder="Min 8 characters"
            type="password" />

          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p> }
                  
            <button type='submit' className='w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer'>SIGNUP</button>
            <p className='p-4 text-[13px] text-slate-800 nt-3'> Already have an account?{""}
              <Link className='font-medium text-primary underline' to="/login">
                Login</Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
