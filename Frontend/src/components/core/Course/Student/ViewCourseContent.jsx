import React, { useEffect, useState } from 'react'
import { FaAnglesRight } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCourse } from '../../../../operations/course';
import { useNavigate, useParams } from 'react-router-dom';
import StudentVideoContainer from '../subSection/Student.VideoContainer';
import ContentSlidebar from './ContentSlidebar';

export default function Student_ViewCourseContent() {

  const {courseId} = useParams();
  const [isSlideBarOpen, setIsSlideBarOpen] = useState(window.innerWidth<=768?false:true);
  const [hideSubSection, setHideSubSection] = useState(-1);
  
  const CourseArray = useSelector(store => store.course);
  const singleCourse = CourseArray.length>0?CourseArray[0]:null;

  
  const [selectedSubSection , setSelectedSubSection] = useState(null);
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  
  //Get single course and rating
  useEffect(() => {
    if(currUser.token){
      getSingleCourse(dispatch, courseId,currUser.token)
    }else{
      return;
    }
  }, [])
  
  
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
  

 const handleSelectSubSection = (sub_Section)=>{
    if(width<=768 && isSlideBarOpen){
      setIsSlideBarOpen(()=>false)
    } 
    setSelectedSubSection(sub_Section)
 }

 
// Hnadle Hide subsection
 const handleHideSubSection= (sectionId)=>{
  if(sectionId==hideSubSection){
    return setHideSubSection(-1);
  }else{
    return setHideSubSection(sectionId);
  }
 }

 //Back to course
 const handleBackToCourse = ()=>{
  return navigate('/dashbord')
 }

  return (
    <div className='w-full h-[30rem] md:h-[35rem] mt-0 flex bg-gray-800 relative md:static'>

      {/* ---------- Slide bar ----------------- */}
      {isSlideBarOpen ?
       <ContentSlidebar singleCourse={singleCourse} setIsSlideBarOpen={setIsSlideBarOpen} handleBackToCourse={handleBackToCourse} hideSubSection={hideSubSection} handleHideSubSection={handleHideSubSection} handleSelectSubSection={handleSelectSubSection} selectedSubSection={selectedSubSection}/>
        :
        <button
          onClick={() => setIsSlideBarOpen(() => true)}
          className='bg-indigo-600  h-[2.5rem] w-[2.3rem] rounded-tr-lg rounded-br-lg  flex items-center justify-end p-2 fixed '><FaAnglesRight className='text-[1.9rem]' />
        </button>
      }

      {/* ---------------Video Play Container---------------- */}
      <div className='flex-1 bg-gray-800 '>
       {selectedSubSection?
       <StudentVideoContainer  subSection={selectedSubSection}/>:
       <div className='w-full  h-full flex flex-col gap-y-5 justify-center items-center bg-neutral-100 border-1 border-black'>
         <p className='text-2xl  font-[800]'>Welcome to <span className='text-red-500'>the {singleCourse?.courseName}</span></p>
      
       </div>
      }
      </div>


    </div>
  )
}
