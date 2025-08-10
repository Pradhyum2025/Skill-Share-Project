import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
export default function Home2() {
  return (
    <div className='w-full flex justify-around flex-wrap gap-5 my-5 py-3  bg-[rgb(248,248,248)]'>

      {/* Box1 */}
      <div className='w-[100%] md:w-[45%] rounded-[10px] m-3 p-3 gap-y-5 bg-[rgb(255,255,255)]'>
        <h1 className='text-indigo-700 text-[1.3rem] md:text-[1.4rem] my-1 font-bold'>
          Explore our courses and inhance your skills with following supports & features
        </h1>
        <ul className='text-gray-800 md:text-[1rem] text-[1rem] my-2 font-[600] list-disc list-inside flex flex-col gap-y-[7px] list-none'>
          <li>- Achieving a high level of expertise in a particular skill or domain</li>
          <li>- Embracing education and growth throughout life</li>
          <li>- Enhancing skills and knowledge to advance in your career</li>
          <li>- Actively seeking ways to grow personally and professionally</li>
          <li>- The ability to quickly learn and apply new skills in changing environments</li>
        </ul>
      </div>

      {/* Box-2 */}
      <div className='w-[100%] md:w-[45%]  rounded-[10px] mx-3 p-3 flex flex-col gap-y-5 bg-[rgb(255,255,255)]'>
        <p className='font-Inter text-indigo-700 md:text-[1.4rem]  text-[1.3rem] my-17 font-bold'>
          Learn from tech expert and boost your skills and productivity

        </p>
        <p className='text-gray-800 md:text-[1rem] text-[1rem] my-2 font-[600] list-disc list-inside '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci necessitatibus accusamus cum velit sequi expedita voluptatem amet illo unde sunt!</p>
        <div className='w-[100%] flex flex-col w-[50%] gap-4'>

          {/* Button-1 */}
          <button className='text-white btn bg-indigo-600 mt-3 md:mt-5 border-none hover:bg-indigo-500 font-[700] text-[1rem]'>
            Explore courses
          </button>

          {/* Button-2 */}
          <button className='text-white btn bg-indigo-600 mt-3 md:mt-5 border-none hover:bg-indigo-500 font-[700] text-[1rem]'>
            Learn more
          </button>
        </div>
      </div>
    </div>
  )
}
