import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useLocation, useParams } from "react-router-dom";
import { getCourseDetailsForView } from "../../../../operations/course";
import { useDispatch, useSelector } from "react-redux";
import InstructorShowCourseProfile from "../CourseInstructorContainer";
import InstructorShowCourseMainCard from "../ShowCourseMainCard";
import Review from "../../review/Review";


export default function ShowCourseDetails() {

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const location = useLocation();

  const returnPath = location.state?.returnPath
  // const currUser = useSelector(store=>store.auth);
  //Get single course and rating
  useEffect(() => {
    getCourseDetailsForView(dispatch, courseId);
  }, [])

  const CourseArray = useSelector(store => store.course);
  const singleCourse = CourseArray.length > 0 ? CourseArray[0] : null;

  let reviews = [
    {
      name: 'Rajat Sharma',
      batch: 'Prime2.0',
      comment: 'Best course ever, you must explore it!',
      ratting: '4.5'
    },
    {
      name: 'Nadndu Mishra',
      batch: 'Nora1.0',
      comment: 'Not good, I cannot recommend!',
      ratting: '1.5'
    },
    {
      name: 'Kajal Raina',
      batch: 'K-Sharp3.0',
      comment: 'Mentorship session was really helpful',
      ratting: '4'
    },
    {
      name: 'Ashya Williamns',
      batch: 'NinjaCount',
      comment: 'Keilvin Denies sir are best and their explanation of concept was best!',
      ratting: '4.5'
    },
    {
      name: 'Rupendra Raina',
      batch: 'K-Sharp3.0',
      comment: 'Mentorship session was really helpful',
      ratting: '4'
    },
    {
      name: 'Sujan Raina',
      batch: 'K-Sharp3.0',
      comment: 'Mentorship session was really helpful',
      ratting: '4'
    },
    {
      name: 'Kajal Raina',
      batch: 'K-Sharp3.0',
      comment: 'Mentorship session was really helpful',
      ratting: '4'
    },
  ]

  let description = singleCourse?.whatYouWillLearn?.split('.');

  if (!singleCourse) {
    return <p>Loading...</p>
  }
  return (
    <>
    <div className="w-full bg-gradient-to-b from-gray-200 to-indigo-200 pt-3 pb-10 lg:pb-20 px-3">

      {/*----------  Back Button----------  */}
      <Link to={`${returnPath}`}>
        <button className="btn flex items-center text-white mb-4 group transition-colors duration-200 bg-indigo-600 border-0 hover:bg-indigo-700 text-[.97rem]">
          <FiArrowLeft className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </button>
      </Link>

      <div className="w-full mx-auto flex justify-around  gap-y-5 flex-wrap md:px-0 xl:px-0 2xl:px-5">


        <div className="w-full xl:w-[45%] flex flex-col items-center justify-start gap-y-10 lg:gap-y-20 order-2 lg:order-1">
          {/* Instructor profile page */}
          <InstructorShowCourseProfile Instructor={singleCourse?.instructor} />

          {/* ----------- Course Description ----------- */}
          <div className="leading-relaxed mb-3 w-full">
            <div>
              {description?.map(desc=>{
                return <p 
                className={`
                  ${
                    (desc.trim()[0]==='*' && 
                    desc.trim()[1]==='*' && 
                    desc.trim()[desc.trim()?.length-2]==='*' 
                    && desc.trim()[desc.trim()?.length-1]==='*')?
                    'text-black text-[1.2rem] font-[900]'
                    :
                    'text-gray-600 text-[1rem] font-[700]'
                  }
                  `}>
                    {(desc.trim()[0]==='*' && 
                    desc.trim()[1]==='*' && 
                    desc.trim()[desc.trim()?.length-2]==='*' 
                    && desc.trim()[desc.trim()?.length-1]==='*')?desc.trim().substring(3,desc.trim().length-2):desc.trim()}
                    </p>
              })}
            </div>
          </div>

        </div>

        {/* -----------Main Card----------- */}
        <InstructorShowCourseMainCard singleCourse={singleCourse} courseId={courseId} isShowCourse={false} />
      </div>


    </div>

      {/* Show all Review */}
      {singleCourse?.reviews?.length >= 0 ?
        <Review about={'Enrolled course students'} reviews={reviews} /> :
        null
      }
    </>
  );
};

