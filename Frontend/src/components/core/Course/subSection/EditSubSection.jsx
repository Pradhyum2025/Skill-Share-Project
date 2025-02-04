import { useForm } from "react-hook-form";
import { FiUploadCloud, FiX, FiCheck, FiArrowLeft } from "react-icons/fi";
import { BiErrorCircle } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, editSubSection } from "../../../../operations/subSection";
import { useEffect } from "react";
import LoadingBtn from "../../../Common/LoadingBtn";

export const EditSubSection = () => {
  
  const { courseId, sectionId , subSectionId} = useParams();
  const currUser = useSelector(store => store.auth);
  const fetching = useSelector(store => store.fetching);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const subSectionData = location.state?.message
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  //dispatch,navigate,subSectionData,courseId,sectionId,token
  const onSubmit = async (data) => {

    let updateData = {
      title:data.title,
      description:data.description,
    }
    if(data.videoFile.length>0){
      updateData.videoFile = data.videoFile;
    }

    // dispatch,navigate,updatedData,courseId,sectionId,subSectionId,token
    if (courseId && sectionId && subSectionId && currUser.token) {
      await editSubSection(dispatch, navigate, data, courseId, sectionId,subSectionId,currUser.token)
    } else {
      return;
    }
  };

  useEffect(()=>{
    if(subSectionData){
      reset(subSectionData);
    }
  },[subSectionData,reset]);

  //Handle clear form
  const handleClearForm = () => {
    reset({
      title: '',
      description: '',
      videoFile: null
    })
  }

  // handle Back Naviaget handler
  const handleBackNaviaget=()=>{
    if(courseId){
      return navigate(`/dashbord/show/${courseId}`,{state:{currSectionId:sectionId}})  
    }else{
      return ;
    }
  }
  return (
    <div className="w-full min-h-screen bg-gray-50 py-3 px-3">
      {/* Back button */}
      <button
      disabled={fetching}
      onClick={handleBackNaviaget}
       className="btn flex items-center text-white mb-4 group transition-colors duration-200 bg-indigo-600 border-0 hover:bg-indigo-700 text-[.97rem] disabled:bg-indigo-700 disabled:cursor-not-allowed disabled:text-white">
        <FiArrowLeft className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
        Back
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <p className="text-2xl font-bold text-indigo-600 mb-2 text-center"> {subSectionData.title}</p>
        <h2
          className="text-lg font-semibold text-gray-700 mb-6 text-center">Edit Sub-Section</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/*  --------- title of sub Section ---------  */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-1">
              Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter sub-section title"
              className={`block w-full px-4 py-3 rounded-lg border bg-white ${errors && errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"} focus:border-transparent focus:outline-none focus:ring-2 transition duration-200 ease-in-out text-black`}       {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Title must be at least 3 characters" },
                maxLength: { value: 100, message: "Title must not exceed 100 characters" }
              })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <BiErrorCircle className="mr-1" />
                {errors?.title?.message}
              </p>
            )}
          </div>

          {/*  --------- Description of sub Section ---------  */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Provide detailed description of the sub-section"
              rows="4"
              className={`block w-full px-4 py-3 rounded-lg border bg-white ${errors && errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"} focus:border-transparent focus:outline-none focus:ring-2 transition duration-200 ease-in-out text-black`}            {...register("description", {
                required: "Description is required",
                minLength: { value: 15, message: "Description must be at least 10 characters" },
                maxLength: { value: 100, message: "Description must not exceed 500 characters" }
              })}
            />
            <div className="mt-1 flex justify-between">
              {errors.description && (
                <p className="text-sm text-red-600 flex items-center">
                  <BiErrorCircle className="mr-1" />
                  {errors?.description?.message}
                </p>
              )}
              {/* <span className="text-sm text-gray-500">{description?.length}/100</span> */}
            </div>
          </div>

          {/* ------------ Upload video ------------ */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Video Upload
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors`}
            >
              <input
                name="videoFile"
                type="file"
                accept="video/*"
                className="cursor-pointer absolute bg-black  left-[40%] top-5 w-[20%] h-[35%] opacity-0"
                {...register("videoFile")}
              />
              <div className="space-y-2">
                <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                {watch('videoFile') ?
                  <p className="text-blue-500">{watch('videoFile')?.length > 0 && watch('videoFile')[0]?.name}</p>
                  :
                  <>
                    <p className="text-gray-600"> click to select</p>
                    <p className="text-sm text-gray-500">.mp4, .avi, .mov (max 50MB)</p>
                  </>}
              </div>
            </div>

            {errors.videoFile && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <BiErrorCircle className="mr-1" />
                {errors?.videoFile?.message}
              </p>
            )}
          </div>

          {/* -----------  Button div -----------   */}
          <div className="flex items-center justify-end space-x-4">
            <button
            disabled={fetching}
              type="submit"
              className={`bg-indigo-600 px-4 py-2 rounded-md text-white transition-colors  text-md font-semibold text-gray-800 disabled:cursor-not-allowed `}
            >
              {fetching?
              <LoadingBtn working={'Updating..'}/>:
              'Update'
              }
            </button>

            <button
            disabled={fetching}
              onClick={handleClearForm}
              type="reset"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-md font-semibold text-gray-800 disabled:cursor-not-allowed"
            > Clear
            </button>


          </div>
        </form>
      </div>
    </div>
  );
};

