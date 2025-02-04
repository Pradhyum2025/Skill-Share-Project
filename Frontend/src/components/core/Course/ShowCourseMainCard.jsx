import React, { useEffect, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa6';
import { FiShare2 } from 'react-icons/fi';
import { GoStarFill } from 'react-icons/go';
import { getAvgRating } from '../../../operations/review';
import { formatDate } from '../../../operations/course';
import { useSelector } from 'react-redux';
import BagBtn from '../../Common/BagBtns';
import { BiSolidPurchaseTag } from "react-icons/bi";
import { PiCurrencyInrFill } from 'react-icons/pi';

export default function InstructorShowCourseMainCard({singleCourse,courseId,isShowCourse}) {4
  const currUser = useSelector(store=>store.auth);
    //Hide course desc.
    const [hideWhatYouWillLearn, setHideWhatYouWillLearn] = useState(true);
    //Avg  rating of course
    const [avgRating, setAvgRating] = useState(0);
  
  //Get single course and rating
  useEffect(() => {
    getAvgRating(courseId, setAvgRating)
  }, [])

  //Formate date
  const createdDate = formatDate(singleCourse ? singleCourse.createdAt : null);
  
  // console.log(singleCourse)
  const cardData = {
    additionalDetails: {
      views: "2.5k",
      comments: 48,
      shares: 156
    }
  };

  return (
    <div className="w-full xl:w-[45%]  bg-white rounded-2xl shadow-lg overflow-hidden order-1 lg:order-2">
    {/*  ----------- Image Section -----------  */}
    <div className="relative h-[15rem] md:h-[21rem] overflow-hidden">
      <img
        src={singleCourse.thumbnail}
        alt="Course thumnail"
        className="w-full h-full md:object-cover transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1497366216548-37526070297c";
          e.target.onerror = null;
        }}
      />
    </div>

    {/* Content Section */}

    <div className="px-4 py-2">

      {/*------------ Coursname ------------*/}
      <div className="mb-4 flex items-center justify-start gap-x-20">
        <h1 className="text-2xl xl:text-[1.6rem]  font-bold text-indigo-600 ">
          {singleCourse.courseName}
        </h1>
        {singleCourse?.instructor?.accountType!=='Student'?
        <>
        {singleCourse.status === 'Draft' ?
          <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-md">Draft</span> :
          <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-md ">Approved</span>}
        </>:
        null
        }

      </div>

      {/*------------- Description------------- */}
      {
      isShowCourse?
      <div className=" leading-relaxed mb-3">
        <h1 className="text-[1.1rem] text-gray-800 font-[700] flex items-center gap-2">
          <span>What you will learn </span>

          <button
            onClick={() => setHideWhatYouWillLearn(() => !hideWhatYouWillLearn)}
            className="bg-gray-200 hover:bg-gray-300 rounded-2xl p-1">
            <FaAngleDown
              className={`${!hideWhatYouWillLearn ? 'rotate-180' : null} transition duration-800 text-gray-800`} />
          </button>
        </h1>
        <p className={`${hideWhatYouWillLearn ? 'hidden' : 'block'} text-gray-600 text-[.9rem]`}>
          {singleCourse.whatYouWillLearn}
        </p>
      </div>
      :
      null
      }

      {/* Language of the course */}
      <div className="mb-3">
        <span className="text-gray-900 text-[.95rem] font-[600]">Language of the course : </span>
        <span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">{singleCourse.language}</span>
      </div>

      {/*---------- Metadata about course ----------*/}
      <div className="flex items-center justify-between space-x-4 text-sm text-gray-600 mb-3">
        <div className="text-[1.2rem] flex items-center gap-2">

          <span className="text-gray-900 text-[.95rem] font-[600]">Avarage rating : </span>
          <span class="flex items-center gap-x-2 bg-yellow-200 text-yellow-900 text-[.99rem] font-medium me-2 px-2.5 py-0.5 rounded-sm ">{avgRating === 0 ? 0 : avgRating + '.0'}<GoStarFill className="text-yellow-500" /></span>

        </div>

        <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">{createdDate}</span>
      </div>

       <span class="text-[1.3rem] font-bold text-indigo-600 flex items-center gap-1">Price : <span><PiCurrencyInrFill className='text-[1.5rem] text-gray-700'/></span> <span>{singleCourse.price}</span></span>

    </div>
      {/*------------- Stats & Actions------------- */}
      <div className="h-[5rem] flex items-center justify-center   border-t border-gray-200 ">
          {/*---------- buttons ---------- */}
        { (currUser?.accountType ==='Student' && !isShowCourse) ?
          <div className="w-full flex justify-around items-center gap-x-10">
          {/* Bag btns */}
          <div className='w-[50%] flex items-center justify-center' >
            <BagBtn course={singleCourse} />  
          </div>

           {/* Buy Now btns */}
          <BuyNowBtn course={singleCourse}/>
          </div>:
          null
          }

      </div>
  </div>
  )
}
