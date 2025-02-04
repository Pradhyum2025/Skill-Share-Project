import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

export default function ViewSubSectionModal({subSection}) {

  if(subSection && document.getElementById('currVideo')){
    document.getElementById('currVideo').src=subSection?.videoUrl;
  }
  const handleVideoCancle =()=>{
  let currVideo = document.getElementById('currVideo');
  currVideo.pause();
  currVideo.currentTime = 0; 
  return document.getElementById('my_modal_5').close();
  }

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
         <div className="modal-box bg-gray-00 pt-0">
   
           <button
             onClick={handleVideoCancle}
             className="absolute top-2 right-3 btn min-h-[33px] w-[40px] h-[30px] bg-gray-100 hover:bg-gray-400 border-0 p-1 z-10">
             <RxCross2 className="w-full h-[85%] text-black font-[700]  z-20 hover:scale-110" />
           </button>

           <div className='0'>
            <p className='text-[1.1rem] my-4 font-[700]'>{subSection.title}</p>
            <video id='currVideo' controls muted autoPlay={false} className='h-[20rem] w-[30rem]'>
              <source src={subSection?.videoUrl}  type='video/mp4'/>
            </video>
           </div>
   
            
         </div>
       </dialog>
  )
}
