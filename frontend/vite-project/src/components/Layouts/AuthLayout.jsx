import React from 'react'
import CARD_2 from '../../assets/card2.jpg';
import {LuTrendingUpDown} from "react-icons/lu";
import { LuIndianRupee } from "react-icons/lu";

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
      <div className="w-screen h-screeen np:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-[40px] text-font-poppins text-cyan-400 font-bold" >
         Budgety : Your Personal Expense Tracker 
        </h2>
        {children}
      </div>
      <div className="gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-600/10 border border-gray-200/50 z-10">
        
        <div className="flex items-center gap-2 p-1.8">
          <LuTrendingUpDown className="text-xl text-gray-500 w-12 h-12 flex items-centre justify-center text-[26px] ${color} rounded-full drop-shadow-xl" />
          <LuIndianRupee className="text-2xl text-green-600" />
          <p className="text-lg font-semibold">4,50,000</p>

        </div>
            <img src={CARD_2} className='fixed h-[86.5vh] rounded-xl bg-cover bg-no-repeat bg-center bg-black/40 relative z-10' />
             
      </div>
    </div>
  )
}
export default AuthLayout

