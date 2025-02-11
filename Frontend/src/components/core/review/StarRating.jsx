import React, { useState } from 'react'
import { GoStarFill } from "react-icons/go";

export default function StarRating({rating,setRating}) {
  const ratingVals = [Bad,Average,Good,Verygood,Excellent];
  return (
    <div className='flex items-center gap-3'>
    {ratingVals.map((ratingVal,index)=>{
      return <li
      onClick={()=>setRating(index)} 
      className={`${index<=rating?'bg-yello-500':'text-gray-300 '}`}><GoStarFill/></li>
    }
    )}
    </div>
  )
}
