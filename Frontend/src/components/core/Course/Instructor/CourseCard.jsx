import React from 'react'
import { PiCurrencyInrFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

export default function Instructor_CourseCard({course,currUser}) {
  
  const navigate = useNavigate();
  const handleClickToView = (course)=>{
    navigate(`/dashbord/show/${course._id}`)
  }
  return (

    <div class="w-[20rem] bg-white border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl bg-white border-white">

      {/*  --------------Thumbnail of course -------------- */}
      <a href="#">
        <img class="p-2 h-[15rem] w-[98%] m-auto rounded-[15px] fit" src={course.thumbnail} alt="product image" />
      </a>
      <div class="px-3 pb-2">

        <div className='flex gap-10 items-center mb-5'>
        {/*  --------------Name of the course -------------- */}
        <a href="#">
          <h5 class="text-large font-[600] tracking-tight text-indigo-600">{course.courseName}</h5>
        </a>

        {/*  --------------Course status for instructor -------------- */}
        {currUser.accountType==='Instructor'? (course.status==='Draft'?
        <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">Draft</span>:
        <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">Approved</span>):null
        }
        </div>

        <div class="flex items-center justify-start w-full">
           {/* -------------click to view btn ------------- */}

          <button
          onClick={()=>handleClickToView(course)}
          type='button' class="w-full text-white bg-indigo-600 hover:bg-indigo-700 py-0 min-h-[2.5rem] h-[2.5rem] border-0 text-[1rem] font-[600] btn">Click to view</button>
        </div>

      </div>
    </div>


  )
}
