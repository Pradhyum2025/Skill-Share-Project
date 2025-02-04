import React, { useEffect } from 'react'
import CourseCard from './CourseCard.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../../../operations/course.js';
import { getMyBag } from '../../../../operations/bag.js';


export default function CourseContainer() {
  const dispatch = useDispatch();
    const currUser = useSelector(store=>store.auth);
  useEffect(() => {
    getAllCourses(dispatch);
  }, [])
  
  useEffect(() => {
    if (currUser?.accountType == 'Student' && currUser?.token) {
      // getMyBag(dispatch, currUser.token)
    } else {
      return;
    }
  }, [])
  
  const costomizeCourses = useSelector(store => store.course);
  return (
    <div>
      {costomizeCourses.length===0?
      <div className='h-[40vh] md:h-[80vh] flex items-center justify-center w-full mx-3'>
      <p className='text-lg text-gray-600 font-[600]'>There are now course available for this category</p>
      </div>
      :
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 m-3 justify-items-center items-center'>
      {costomizeCourses.map((course) => {
        return <CourseCard course={course} />
      })}
    </div>
      }
    </div>
  )
}
