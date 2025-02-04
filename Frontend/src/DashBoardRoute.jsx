import React, { useEffect, useState } from 'react'
import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer'
import { Outlet } from 'react-router-dom'
import DashboardSlideBar from './components/core/User/DashboardSlideBar'
import { Toaster } from 'react-hot-toast'
import { FaAnglesRight } from 'react-icons/fa6'

export default function DashBoardRoute() {
    const [isSlideBarOpen, setIsSlideBarOpen] = useState(window.innerWidth<=768?false:true);

      //Get Screen resize
      const [width, setWidth] = useState(window.innerWidth);
      useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };
        
        window.addEventListener("resize", handleResize);
        
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

      const handleSelectSubSection = ()=>{
        if(width<=768 && isSlideBarOpen){
          setIsSlideBarOpen(()=>false)
        } 
     }
      
  return (
    <>
      <Navbar />
      <div className='flex w-full'>
        <Toaster />
        {isSlideBarOpen ?
          <DashboardSlideBar  setIsSlideBarOpen={setIsSlideBarOpen} handleSelectSubSection={handleSelectSubSection}/>
          :
          <button
            onClick={() => setIsSlideBarOpen(() => true)}
            className='lg:hidden bg-black h-[2.3rem] w-[3rem] rounded-tr-lg rounded-br-lg  flex items-center justify-end p-2 fixed z-20 '><FaAnglesRight className='text-[1.5rem]' />
          </button>
        }
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
