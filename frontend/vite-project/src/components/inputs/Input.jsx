import React from 'react'
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Input= ({value, onChange,placeholder, label, type}) => {
    const [showPassword,setShowPassword]=useState(false)
    const toggleShowPassword=()=>{
        setShowPassword(!showPassword)
    }
  return (
    <div className='relative'>
      <label className='text-[13px] text-slate-800'>{label}</label>
      <div className="w-full flex justify-between gap-3 text-black bg-gray-300 rounded px-4 py-3 mb-4 mt-3 border border-black-200 outline-none">
        <input 
        className='w-full bg-transparent outline-none'
        type={type=== "password" ? (showPassword?"text":"Password") :type}
        placeholder={placeholder}
        value={value}
        onChange={(e)=> onChange(e)}
        />

        {type==="password" &&(
          <div className="absolute right-3 top-1/2-translate-y-1/2 cursor-pointer" onClick={toggleShowPassword}>{showPassword ?(
              <FaRegEye
                size={22}
                className="text-primary" /> 
          ):(
            <FaRegEyeSlash
             size={22}
             className="text-slate-400 " />
          )}
          </div>
         
        )}
      </div>
    </div>
  )
}

export default Input
