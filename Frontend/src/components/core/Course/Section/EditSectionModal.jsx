import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiReset } from "react-icons/bi";
import { FaCross } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import { editSection } from "../../../../operations/section";
import LoadingBtn from "../../../Common/LoadingBtn";

export default function EditSectionModal({ courseId, section }) {
  const currUser = useSelector(store => store.auth);
  const fetching = useSelector(store => store.fetching);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (section) {
      reset(section);
    }
  }, [section, reset]);
  const onSubmit = async (data) => {
    if(currUser.token){
      editSection(dispatch,courseId,section._id,currUser.token,data)
    }else{
      return;
    }
  };
  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <button
            onClick={() => document.getElementById('my_modal_5').close()}
            className="absolute top-2 right-3 btn min-h-[30px] h-[30px] bg-gray-100 hover:bg-gray-200 border-0 px-2 p-1">
            <RxCross2 className="text-black font-[900] text-lg" />
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-indigo-600 mb-2">Edit Section</h2>
            <p className="text-gray-600 font-[700] ">Enter the details for edit section</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="relative">
              <label
                htmlFor="sectionName"
                className="block text-sm font-semibold text-gray-800 mb-1"
              >
                Section Name
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative group">
                <input
                  name="sectionName"
                  type="text"
                  placeholder="Enter section name"
                  {...register("sectionName", {
                    required: "Section name is required",
                    minLength: {
                      value: 3,
                      message: "Section name must be at least 3 characters"
                    },
                    maxLength: {
                      value: 50,
                      message: "Section name cannot exceed 50 characters"
                    },
                    pattern: {
                      value: /^[\w\s-]+$/,
                      message: "Section name can only contain letters, numbers, spaces, and hyphens"
                    }
                  })}
                  className={`block w-full px-4 py-3 rounded-lg border bg-white ${errors.sectionName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"} focus:border-transparent focus:outline-none focus:ring-2 transition duration-200 ease-in-out text-gray-600 font-[700]`}
                  aria-describedby="section-name-error"
                />
              </div>

              {errors.sectionName && (
                <p
                  id="section-name-error"
                  className="mt-2 text-sm text-red-600 animate-fade-in"
                  role="alert"
                >
                  {errors?.sectionName?.message}
                </p>
              )}
            </div>

            {/* ------------ Buttons------------  */}
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className={`justify-center py-3 px-4 border border-transparent rounded-lg  font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out flex items-center bg-indigo-600`}
              >
                {fetching?
                <LoadingBtn working={'Updating. . .'}/>:
                'Update Section'
                }
              </button>

              <button
                type="reset"
                className="px-4 py-3 border border-gray-300 rounded-lg  text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out flex items-center justify-center font-[600]"
              >
                <BiReset className="mr-2" />
                Reset
              </button>

            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}
