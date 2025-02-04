import React, { useState } from 'react'
import {FilterContainer} from './FilterContainer.jsx';
import CourseContainer from './CourseContainer.jsx';


export default function CoursePage() {
  
  return (
    <div className='w-full relative'>

      {/* All catagories */}
      <FilterContainer />

      {/* show COurses */}
      <CourseContainer/>

    </div>
  )
}
