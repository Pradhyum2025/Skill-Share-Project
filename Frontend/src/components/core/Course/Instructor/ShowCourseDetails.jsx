import React, { useEffect} from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import {  getSingleCourse } from "../../../../operations/course";
import { useDispatch, useSelector } from "react-redux";
import InstructorShowCourseMainCard from "../ShowCourseMainCard";
import InstructorShowCourseProfile from "../CourseInstructorContainer";
import Instructor_AddCourseContent from "./ConsmizeCourseContent";

export const Instructor_ShowCourseDetails = () => {

  const dispatch =useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();
  const returnPath = location.state?.returnPath || '/dashbord'
  const currUser = useSelector(store=>store.auth);
  const openSectionId = location.state?location.state.currSectionId:-1;
  
    //Get single course and rating
    useEffect(() => {
      if(currUser?.token){
        getSingleCourse(dispatch, courseId,currUser.token)
      }
    }, [])

  const CourseArray = useSelector(store => store.course);
  const singleCourse = CourseArray.length>0?CourseArray[0]:null;

  
  if (!singleCourse) {
    return <p>Loading...</p>
  }
  const handleBackToPgae = ()=>{
    return navigate(returnPath,{state:{currCourseId:courseId}})
  }
  return (
    <div className="w-full bg-gradient-to-b from-gray-200 to-indigo-200 py-3 px-3">

      {/*----------  Back Button----------  */} 
      
        <button
        onClick={handleBackToPgae}
         className="btn flex items-center text-white mb-4 group transition-colors duration-200 bg-indigo-600 border-0 hover:bg-indigo-700 text-[.97rem] mt-10 lg:mt-0">
          <FiArrowLeft className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </button>
     

      <div className="w-full mx-auto flex justify-around  gap-y-5 flex-wrap md:px-0 xl:px-0 2xl:px-5">


        <div className="w-full xl:w-[45%] flex flex-col items-center justify-between gap-y-20 order-2 lg:order-1">
        {/* ----------- Add Content course for instructor ----------- */}
          <Instructor_AddCourseContent singleCourse={singleCourse}  openSectionId={openSectionId} courseId={courseId}/>

           {/* Instructor profile page */}
          <InstructorShowCourseProfile Instructor={singleCourse?.instructor}/>
        </div>

        {/* -----------Main Card----------- */}
         <InstructorShowCourseMainCard singleCourse={singleCourse} courseId={courseId} isShowCourse={true}/>
      </div>  
    </div>
  );
};
