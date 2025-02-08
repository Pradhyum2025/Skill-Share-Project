import React, { useEffect, useState } from 'react'
import { changeInstructorAccountStatus, getAllInstructor } from '../../../operations/instructor'
import { useDispatch, useSelector } from 'react-redux'
import { FaChevronRight } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { TbLivePhoto } from "react-icons/tb";
import { TbLivePhotoOff } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdSchool } from "react-icons/md";
import { PiLinkSimpleBold } from "react-icons/pi";

export default function InstructorPage() {
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hidenBlockId, setHidenBlockId] = useState(-1);

  useEffect(() => {
    if (currUser.token) {
      getAllInstructor(dispatch, currUser.token);
    } else {
      return;
    }
  }, [])

  //Change account status
  const handleChangeInstructorAccountStatus = (instructorId) => {
    if (currUser.token) {
      return changeInstructorAccountStatus(dispatch, instructorId, currUser.token);
    } else {
      toast.error('Authentication token expired, Please login again');
      navigate('/');
    }
  }

  const allInstructor = useSelector(store => store.instructor);


  return (
    <div className='relative w-full min-h-screen bg-gray-100 p-1 md:p-3'>
      <div className='max-w-4xl mx-auto mt-10 ms:mt-0'>
        <h1 className='text-xl md:text-2xl font-bold text-indigo-700 mb-8 text-center'>All Leading Instructor of our team</h1>

        {allInstructor.length === 0 ?
          (< div className="text-center py-12">
        <p className="text-gray-500 text-xl">Currently no instructor here yet now!</p>
      </div>):(
      <div
        className='flex flex-col gap-y-5'>
        {allInstructor.map((instructor, index) => {
          return <div
            key={instructor._id}
            className={`flex flex-col p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>

            {/* Uper Block */}
            <div className="flex items-center justify-between ">

              {/*  -------------- Name of instructor and image  ----------- */}
              <div className='flex items-center gap-x-4'>
                <img
                  className='w-[2.3rem] rounded-full'
                  src={instructor?.image}
                  alt="" />
                <span className='text-md sm:text-[1.05rem] font-bold text-indigo-600'>{instructor.firstName + " " + instructor.lastName}</span>

                {/* See more details btn */}
                <span
                  className='hover:bg-gray-200 rounded cursor-pointer'
                  onClick={() => {
                    if (hidenBlockId === instructor._id) {
                      setHidenBlockId(-1);
                    } else {
                      setHidenBlockId(instructor._id);
                    }
                  }}
                >
                  <MdOutlineKeyboardArrowDown
                    size={25}
                    className={`${hidenBlockId === instructor._id ? 'rotate-180 transition duration-400' : null}`}
                  />
                </span>

              </div>


              {/*  -------------- Status  ----------- */}
              <div className='flex items-center justify-start '>
                {instructor.status === 'Active' ?
                  <TbLivePhoto className='text-[1.7rem] text-green-500' />
                  :
                  <TbLivePhoto className='text-[1.7rem] text-red-500' />
                }
              </div>

            </div>

            {/* description */}
            <div className={`${hidenBlockId === instructor._id ? 'block border-t-2 mt-4 pt-2' : 'hidden'} flex flex-col sm:flex-row justify-between gap-y-5 pt-5`}>
              {/* Contact info */}
              <div className='flex  flex-col gap-y-5'>

              <p className='text-[.9rem]  flex gap-x-4 items-center text-gray-700 font-[700]'><MdSchool className='text-[1.4rem] text-indigo-700' /> {instructor?.qualification || 'Not specify'}
              {/* Document proof */}
              <a
              className='text-blue-500 hover:text-blue-700 cursor-pointer'
              href={instructor.qualificationProof}><PiLinkSimpleBold/>
              </a>
              </p>

                <p className='text-[.9rem]  flex gap-x-4 items-center text-gray-700 font-[700]'><MdMarkEmailRead className='text-[1.3rem] text-indigo-700' /> {instructor.email}</p>
                <p className='text-[.9rem] flex gap-x-5 items-center text-gray-700 font-[700]'><BsFillTelephoneFill className='text-[1rem] text-indigo-700' /> {instructor?.additionalDetails?.contact}</p>

              </div>

              {/* Account status */}
              <div className='flex items-center gap-x-2'>
                <span className='text-sm sm:text-[1rem] font-[600] text-black'>Account status :</span>
                <select
                  onChange={() => handleChangeInstructorAccountStatus(instructor._id)}
                  defaultValue={instructor.status}
                  name="status"
                  className={`bg-slate-100 border-2 font-[600] text-sm sm:text-md rounded   outline-none ${instructor.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}
                  id="">
                  <option value="Active"  className='text-green-500  hover:bg-yellow-500 font-[600] '>Active</option>
                  <option value="Deactive" className='text-red-500  font-[600] '>Deactive</option>
                </select>
              </div>

            </div>


          </div>
        })}
      </div>
      )
        }

    </div>

    </div >
  )
}
