import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

export default function Home1() {
  const navigate = useNavigate();
  const handleNavigateSignupAsInstrctor =()=>{
     return navigate(`/signup`,{state:{forRoll:'Instructor'}});
  }
  return (
    <div className='flex md:justify-around justify-center flex-wrap  md:w-[45%] w-full gap-y-10 mb-5 md:mb-20 p-3 mt-5'>
      {/* Box1 */}
    <div className='w-[100%] flex flex-col justify-center items-start gap-3 border-0  bg-[rgb(255,255,255)] py-7 text-gray-900  rounded-[10px] md:py-10 p-3'>
      <p className='font-Inter text-indigo-600 md:text-[1.7rem] text-[1.6rem] my-17 font-bold font-lora'>A commitment to <span className='text-black'>ongoing development through courses,</span>  experiences, and practice</p>
      <p  className='text-gray-900 md:text-[.95rem] text-[.85rem] font-semibold'>Skill enhancement is a vital aspect of personal and professional growth, enabling individuals to stay competitive and adaptable in a rapidly changing world. By embracing upskilling and reskilling, one can bridge knowledge gaps, remain relevant in their industry</p>

      <button 
      to='/signup' 
      onClick={handleNavigateSignupAsInstrctor}
      className='text-white btn min-h-[40px] h-[1.1rem] md:min-h-[2.7rem] md:h-[2.7rem] mt-4 md:mt-10  px-3 border-none bg-indigo-600 hover:bg-indigo-700 font-[700] text-[.9rem]'>Become a instructor </button>
    </div>
   {/* Box2 */}
    <div className='w-[100%] flex justify-center items-center border-0 bg-[rgb(255,255,255)] md:bg-none px-2 py-4 rounded'>
      <img className='w-[90%]' src="/study-4.svg" alt="" />
    </div>

  </div>
  )
}
