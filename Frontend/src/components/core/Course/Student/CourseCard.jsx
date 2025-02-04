import React, { useEffect, useState } from 'react'
import { FiShare2 } from 'react-icons/fi';
import { GoStarFill } from 'react-icons/go';
import { formatDate } from '../../../../operations/course';
import { FaAngleDown } from 'react-icons/fa6';
import { getAvgRating } from '../../../../operations/review';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidPurchaseTag } from 'react-icons/bi';

export default function Student_CourseCard({ singleCourse }) {
  const navigate = useNavigate();
  const [hideWhatYouWillLearn, setHideWhatYouWillLearn] = useState(true);

  //Avg  rating of course
  const [avgRating, setAvgRating] = useState(0);
  useEffect(() => {
    getAvgRating(singleCourse._id, setAvgRating)
  }, [])

  //Formate date
  const createdDate = formatDate(singleCourse ? singleCourse.createdAt : null);

  //navigate student course page
  const handleNaviagetStudentShowCourse = () => {
    if (singleCourse._id) {
      navigate(`/student/course/show/${singleCourse._id}`)
    } else {
      return;
    }
  }

  return (
    <div className="w-[95%] mx-auto md:w-[20rem] bg-white rounded-2xl shadow-lg overflow-hidden rounded-br-[0px] ">
      {/*  ----------- Image Section -----------  */}
      <div
        className="relative h-[12rem] sm:h-[12rem] md:h-[14rem] lg:h-[15rem] xl:h-[12rem]  overflow-hidden ">
        <img
          src={singleCourse?.thumbnail}
          alt="Course thumnail"
          className="w-full h-full  transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c";
            e.target.onerror = null;
          }}
        />
      </div>


      {/* Content Section */}

      <div className="px-2 md:pt-4 pt-2">
        {/*------------ Coursname and  Avg ratings ------------*/}
        <div className="mb-2 flex items-center justify-between ">

          <h1
            className="text-xl md:text-[1.1rem] font-bold text-indigo-600 hover:text-indigo-700">
            {singleCourse.courseName}
          </h1>

          <span class="flex items-center gap-x-2 bg-yellow-200 text-yellow-900 text-[.99rem] font-medium me-1 px-2 py-0.2 rounded-sm ">{avgRating === 0 ? 0 : avgRating + '.0'}<GoStarFill className="text-yellow-500" />
          </span>

        </div>

        <div className="flex items-center justify-start mb-0 gap-x-3">

          {/* ------------ Instructor Image ------------*/}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200">
            <img
              src={singleCourse.instructor?.image}
              alt="Intstructor"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80";
                e.target.onerror = null;
              }}
            />
          </div>

          {/* ------------ Instructor name ------------*/}
          <span
            className="font-medium text-gray-900 text-sm md:text-[.8rem]">{singleCourse.instructor?.firstName + " " + singleCourse.instructor?.lastName}
          </span>

          {/* Language of the course */}
          <div className='w-[38%] flex items-center justify-end'>
            <span class="bg-purple-100 text-purple-800 text-xs font-medium  px-2.5 py-0.5 rounded-sm">{singleCourse.language}</span>
          </div>

        </div>


      </div>
      {/*---------- Course Btns ----------*/}
      <div className='w-full flex items-center justify-center mt-4 mb-0 p-2'>

        <button
          onClick={handleNaviagetStudentShowCourse}
          type='button' class="btn text-white bg-indigo-600 hover:bg-indigo-700  px-3 text-[.9rem] font-[600] border-0 min-h-[2rem] h-[2.5rem] w-full rounded-br-[0px]">
          Click to view
        </button>

      </div>

    </div>
  )
}
