import React, { useState } from 'react'
import { PiCurrencyInrFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import BagBtn from '../../../Common/BagBtns';
import { Link, useNavigate } from 'react-router-dom';

export default function CourseCard({course}) {
   const currUser = useSelector(store=>store.auth);
  const navigate = useNavigate();

  const handleNavigatation = (courseId)=>{
    return navigate(`/show/${courseId}`,{state:{returnPath:`/course`}})
  }
  return (
    <div class="w-[20rem] bg-white border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl bg-white border-white">

      {/*  --------------Thumbnail of course -------------- */}
        <img 
        onClick={()=>handleNavigatation(course._id)}
        class="p-2 h-[12rem] lg:h-[15rem] w-[98%] m-auto rounded-[15px] fit  cursor-pointer" src={course.thumbnail} alt="product image" />


      <div class="px-3 pb-2">

        {/*  --------------Name of the course -------------- */}
          <h5 
           onClick={()=>handleNavigatation(course._id)}
          class="text-large font-[600] tracking-tight text-indigo-600 hover:underline cursor-pointer">{course.courseName}</h5>

        {/* -------------- Avg Rating  of the course with start svg icons --------------*/}
        <div class="flex items-center mt-2.5 mb-1">
          <div class="flex items-center space-x-1 rtl:space-x-reverse">
            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </div>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>

        </div>

        <span class="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded-sm">{course?.language}</span>
        
        <div class="flex items-center justify-between mt-1">
           {/* ------------- Price ------------- */}
          <span class="text-[1.3rem] font-bold text-indigo-600 flex items-center gap-1"><span><PiCurrencyInrFill className='text-[1.5rem] text-gray-700'/></span> <span>{course.price}</span></span>

           {/* ------------- Add To card btn ------------- */}
           {currUser?.accountType==='Student'?
          <BagBtn course={course}/>:
          null
           }
        </div>

      </div>
    </div>


  )
}
