import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyCourse } from '../../../operations/course';
import Instructor_CourseCard from './Instructor/CourseCard.jsx';
import Student_CourseCard from './Student/CourseCard.jsx';

export default function MyCourse() {
  
  const myCourses = useSelector(store=>store.course)
  const currUser = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(currUser?.token){
      getMyCourse(dispatch,currUser.token);
    }else{
      return;
    }
  },[])

  return (
    <>
    {(currUser?.accountType === 'Instructor')?
    //  ---------- FOr Instructor ---------- 
    <div className='flex items-center justify-center w-full p-5'>
      <div className='w-full mx-auto grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  gap-10 justify-items-center justify-center'>
      {myCourses.map(course=>{
        return <Instructor_CourseCard key={course._id} course={course} currUser={currUser} />
      })}
      </div>
    </div>:
    //  ---------- For Student ---------- 
      <div className='flex items-center justify-center w-full p-2 lg:p-5'>
      <div className='w-full mx-auto grid  xl:grid-cols-3 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-y-5 justify-items-center justify-center'>
      {myCourses.map(course=>{
        return <Student_CourseCard key={course._id} singleCourse={course}/>
      })}
      </div>
    </div>
    }
    </>
  )
}
