import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { FaAngleDown, FaTrash } from 'react-icons/fa6';
import { IoEyeSharp } from 'react-icons/io5';
import { MdLibraryAdd, MdOutlineAddCircleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SectionModal from '../Section/SectionModal';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function Instructor_AddCourseContent({ singleCourse, openSectionId, courseId }) {

  const navigate = useNavigate();
  const currUser = useSelector(store => store.auth);
  //Hide sub sections default handler
  const [hideSubSection, setHideSubSection] = useState(openSectionId);
  const handleHideSubSections = (sectionId) => {
    if (sectionId === hideSubSection) {
      setHideSubSection(-1)
    } else {
      setHideSubSection(() => sectionId)
    }
  }

  //Get SectionId
  const [purpose, setPurpose] = useState('create');
  const [getSection, setGetSection] = useState(null);
  const [getSubSection, setGetSubSection] = useState(null);

  const HandleSectionOprns = (newPurpose, section, subSection) => {
    setGetSection(() => section);
    setGetSubSection(() => subSection)
    setPurpose(newPurpose);
    document.getElementById('my_modal_5').showModal()
  }

  //Navigate create subsection page
  const HandleNavigateCreateSubSection = (section) => {
    return navigate(`/dashbord/createSubSection/${courseId}/${section._id}`, { state: { message: `${section.sectionName}` } })
  }

  //Handle Edit SubSection page
  const HandleEditSubSection = (currSectionId, currSubSection) => {
    if (courseId) {
      navigate(`/dashbord/subSection/edit/${courseId}/${currSectionId}/${currSubSection._id}`, { state: { message: currSubSection } })
    } else {
      return;
    }
  }


  return (
    <div className="w-full overflow-hidden lg:mx-auto">
      {singleCourse?.courseContent?.length > 0 ? (
        <div>
          {singleCourse.courseContent.map(section => {
            {/*-------------- Section of the course-------------- */ }
            return <div key={section._id}>

              {/* Section Name */}
              <div
                className={`flex items-center justify-between gap-2 md:gap-8 rounded-lg  px-4 py-1 leading-[2.5rem]  ${hideSubSection !== section._id ? 'mb-1' : 'rounded-br-none rounded-bl-none'} bg-white shadow-md hover:shadow-lg transition transition-shadow duration-500`}>

                <div
                  onClick={() => handleHideSubSections(section._id)}
                  className="flex items-center gap-2 text-indigo-600 font-[700] cursor-pointer flex-1">
                  <button>
                    <FaAngleDown className={`${hideSubSection === section._id ? 'rotate-180' : null} transition duration-400 text-gray-800`} />
                  </button>
                  {section.sectionName}
                </div>
                {/* -------------- Section edit options ------------ */}
                {currUser.accountType === 'Instructor' ?
                  <div className="flex items-center gap-4">
                    <FaEdit
                      onClick={() => HandleSectionOprns('edit', section)}
                      className="text-[1.7rem] text-indigo-600 hover:bg-gray-200 hover:text-indigo-700 p-1 rounded cursor-pointer" />
                    <FaTrash
                      onClick={() => HandleSectionOprns('delete', section)}
                      className="text-[1.6rem] text-red-500 hover:bg-gray-200 hover:text-red-600 p-[4px] rounded cursor-pointer" />
                    <MdOutlineAddCircleOutline
                      onClick={() => HandleNavigateCreateSubSection(section)}
                      className="text-[1.65rem] text-indigo-600 hover:text-indigo-700 hover:bg-gray-200 p-[2px] rounded cursor-pointer" />
                  </div>
                  :
                  null}

              </div>

              {/*-------------- subSection of the course-------------- */}
              <div
                className={`${hideSubSection === section._id ? 'block' : 'hidden'} bg-slate-200 mt-[1px]`}>
                {section?.subSection?.length > 0 ?
                  <ul className="flex flex-col gap-y-0 mb-1">
                    {section.subSection.map(sub_Section => {
                      return <li
                        key={sub_Section._id}
                        className="bg-gray-100  border-slate-300 border-b-[1px] hover:bg-slate-200 py-1 px-3 pl-5 text-[.9rem] text-slate-700 font-[900]  hover:shadow-lg flex items-center justify-between">

                        <span>
                          {sub_Section.title}
                        </span>

                        {/* -------------- SubSection edit options ------------ */}
                        {currUser.accountType === 'Instructor' ?
                          <div className="flex items-center gap-4">
                            <IoEyeSharp
                              onClick={() => HandleSectionOprns('viewSubSection', section, sub_Section)}
                              className="text-[1.5rem] text-gray-500 font-[700] hover:bg-gray-400 hover:text-gray-700 p-[1px] rounded cursor-pointer" />
                            <FaEdit
                              onClick={() => HandleEditSubSection(section._id, sub_Section)}
                              className="text-[1.6rem] text-indigo-600 hover:bg-gray-300 hover:text-indigo-700 p-1 rounded cursor-pointer" />
                            <FaTrash
                              onClick={() => HandleSectionOprns('deleteSubSection', section, sub_Section)}
                              className="text-[1.5rem] text-gray-500 hover:bg-gray-400 hover:text-gray-700 p-[4px] rounded cursor-pointer" />
                          </div>
                          :
                          null}

                      </li>
                    })}
                  </ul> :
                  <p className="text-gray-700 font-semibold p-2 mb-2">No video added here yet now!</p>}
              </div>

            </div>
          })}
        </div>) :
        <div className='flex items-center gap-x-2 bg-gray-50 w-full py-10 rounded rounded shadow-lg hover:shadow-2xl flex items-center justify-center mt-5 md:mt-0'>
          <span className="text-[.99rem] text-gray-600 font-[600] ">No Section added here yet now!</span>
          <span className='text-[.99rem] text-red-500 font-[600]'><IoIosInformationCircleOutline /></span>
        </div>
      }

      {/* ----------- Add New Section Buttons ----  */}
      {currUser.accountType === 'Instructor' ?
        <div className="mt-5">
          <button
            onClick={() => HandleSectionOprns('create')}
            className="flex btn text-[.99rem] text-white border-0 bg-indigo-600 hover:bg-indigo-700">
            Add new section <MdLibraryAdd className="text-[1.4rem]" />
          </button>
        </div>
        :
        null}


      <SectionModal purpose={purpose} courseId={courseId} section={getSection} subSection={getSubSection} />
    </div>
  )
}
