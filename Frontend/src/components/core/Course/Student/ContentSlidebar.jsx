import React from 'react'
import { FaAnglesLeft, FaArrowLeftLong } from 'react-icons/fa6'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'

export default function ContentSlidebar({singleCourse,setIsSlideBarOpen,handleBackToCourse,hideSubSection,handleHideSubSection,handleSelectSubSection,selectedSubSection}) {
  return (
    <div className={`w-[15rem] lg:w-[20rem] h-full bg-neutral-100 border-r-2 absolute z-20 md:static md:z-0`}>
      <div
        className='w-full flex items-center justify-between pl-2  bg-gray-800'
      >
        <span
          onClick={handleBackToCourse}
          className='flex items-center gap-2 hover:underline text-[.8rem] font-[300] cursor-pointer'>
          <FaArrowLeftLong />
          Back to course</span>

        <FaAnglesLeft
          onClick={() => setIsSlideBarOpen(() => false)}
          className='text-[1.8rem] rounded m-2 bg-gray-800  p-1' />
      </div>

      {/*  ------------- Slide bar content ----------- */}
      <div
        className="overflow-y-auto h-[87vh]"
      >

        {singleCourse?.courseContent.map((section, index) => (
          <div key={section._id} className="border-b border-b-[1px] border-black border-opacity-20">

            {/* Section Infromation like  name */}
            <button
              onClick={() => handleHideSubSection(section._id)}
              className={`w-full p-4 flex items-center justify-between  transition-colors ${hideSubSection === section._id ? 'bg-indigo-400' : ''}`}
              aria-expanded={hideSubSection === section._id}
            >
              <span className={`text-md font-[600] ${hideSubSection === section._id ? 'text-white' : 'text-stone-700'} `}>{index + 1 + "" + ". " + section.sectionName}</span>

              {hideSubSection === section._id ? (
                <FiChevronDown className='text-[1.2rem] text-stone-600  font-[900]' />
              ) : (
                <FiChevronRight className='text-[1.2rem]  text-stone-600 font-[900]' />
              )}
            </button>


            {/*  ----------- SubSection container -----------  */}
            <div
              className={`transition-all duration-300  ${hideSubSection === section._id ? 'block' : 'hidden'}`}>

              {section.subSection?.length > 0 && section.subSection.map(sub_Section => (
                <button
                  key={sub_Section._id}
                  onClick={() => handleSelectSubSection(sub_Section)}
                  className={`w-full p-3 pl-8 text-left  border-b transition-colors ${(selectedSubSection && selectedSubSection._id === sub_Section._id) ? 'bg-neutral-200 text-stone-600' : ''}`}
                >
                  <span className='text-[.85rem] font-[700] text-gray-600'>{sub_Section.title}</span>
                </button>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
