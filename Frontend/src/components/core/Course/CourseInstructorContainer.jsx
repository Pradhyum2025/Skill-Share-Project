import { useState } from "react";
import { FaUser } from "react-icons/fa";
export default function InstructorShowCourseProfile({ Instructor }) {
  
  return (
      <div className="bg-white rounded-xl shadow-lg pb-6 px-4 w-full transform transition-transform duration-300">
        <p className="text-indigo-700 text-lg font-[800] mt-3">Course instruct by -</p>
        <div className="flex flex-row items-center gap-x-10 mt-3 justify-center">
          <div className="relative w-[5rem] h-[5rem] md:w-[9rem] md:h-[9rem] rounded-full border-4 border-blue-100 overflow-hidden">
              <img
                src={Instructor?.image}
                alt="Intstructor"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80";
                  e.target.onerror = null;
                }}
              />
          </div>
          <div className="text-left">
            <span className="font-lg text-gray-900 font-[700]">{Instructor?.firstName + " " + Instructor?.lastName}</span>
            <p className="text-gray-600 text-sm">{Instructor?.additionalDetails?.about}</p>
          </div>


        </div>
      </div>
  )
}
