import React from 'react'


import Home1 from './Home1';
import Home2 from './Home2';
import Login from '../Auth/Login';


export default function Home() {
  return (
    <>
    <div className='flex justify-around flex-wrap w-full md:my-5 my-1  bg-[rgb(248,248,248)] border-b-gray-900'>
      {/* Section-1 */}
      <Home1/>
      <div className='w-full md:w-[45%]  flex justify-center items-start'>
      <Login/>
      </div>
    </div>
      {/* Section-2 */}
      <Home2/>
      {/* Section-3 */}
    </>

  )
}