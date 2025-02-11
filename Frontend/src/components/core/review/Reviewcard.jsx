import React from 'react'
import { FaStarHalfStroke } from "react-icons/fa6";

export default function ReviewCard({review}) {
 
  return (
    <div className='w-[100%] h-[270px] flex justify-center items-center p-x-[5%]'>
      <div className='w-[97%] md:h-[200px] h-[200px] bg-white hover:ring-1 hover:shadow-2xl shadow-xl rounded-[10px] p-3 pt-4'>
      <p className='text-[.9rem] md:text-[1.2rem] text-indigo-500  font-[700] w-[100%] flex justify-between items-center mb-3'>
        <span>{review.name}</span>
        <span class="badge min-h-[100%] h-[100%] badge-primary">{review.batch}</span>
        </p>
      <p className='text-[.9rem] md:text-[1rem] text-gray-900 font-[400] mb-1'>{review.comment}</p>
      <p className='text-[1rem] text-gray-900 font-[700] flex items-center gap-2'>
        <span>
        {review.ratting[1]=='.'?review.ratting:review.ratting+'.0'}
        </span>
        <span>
        <FaStarHalfStroke className='text-yellow-500'/>
        </span>
        </p>
      </div>

    </div>
  )
}
