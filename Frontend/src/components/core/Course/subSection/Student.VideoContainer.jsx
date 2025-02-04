import React from 'react'
import { RxCross2 } from 'react-icons/rx';

export default function StudentVideoContainer({ subSection }) {

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
    <div className='w-full flex flex-col items-center justify-center'>
        <p className='md:text-[1.2rem] my-2  text-white font-[700] text-left w-full pl-[3rem]'>{subSection.title}</p>
        <video id='currVideo'  controls muted autoPlay={false} className='w-[20rem] h-[27rem] md:h-[30rem]'>
          <source src={subSection?.videoUrl} type='video/mp4' />
        </video>
    </div>
  )
}
