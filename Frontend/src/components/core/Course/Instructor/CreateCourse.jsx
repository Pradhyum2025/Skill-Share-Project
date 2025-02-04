import React, { useEffect, useRef, useState } from "react";
import { FiBook, FiTag, FiX } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoMdCloudUpload } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createCourse } from "../../../../operations/course";
import { getAllCategories } from "../../../../operations/category";
import LoadingBtn from "../../../Common/LoadingBtn";

export const CourseCreationForm = () => {
  const dispatch = useDispatch();
  //Fetch existimg category
  useEffect(() => {
      // getAllCategories(dispatch);
  }, [])

  const categories = useSelector(store => store.category);
  const currUser = useSelector(store => store.auth);
 
  const navigate = useNavigate();
  // const [currentTag, setCurrentTag] = useState("");
  let currentTag = useRef('');
  let [tagData, setTagData] = useState([]);

  // Tag error
  let [tagError, setTagError] = useState(false);

  //Handle Tag when press key "Enter"
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      if (currentTag.current.value !== '' || currentTag.current.value !== ' ') {
        if (tagError) { setTagError(() => false) }
        e.preventDefault();
        const tag = currentTag.current.value.trim();
        setTagData([...tagData, tag])
        currentTag.current.value = '';
      } else {
        return;
      }
    }
  };

  //Remove Tags
  const removeTag = (indexToRemove) => {
    setTagData([
      ...tagData.filter((_, index) => index !== indexToRemove)
    ]);
  };


  //  -------------- useForm hook -------------- 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // console.log("TOKEN : ", token)
  //Form submit
  const onSubmit = async (data, e) => {

    if (tagData.length === 0) {
      e.preventDefault();
      setTagError(() => true);
      return;
    }

    let courseData = {
      courseName: data.courseName,
      whatYouWillLearn: data.whatYouWillLearn,
      price: data.price,
      tag: tagData,
      category: data.category,
      language: data.language,
      thumbnailImage: data.thumbnail,
    }

    // Call course  create function
    if(currUser.token){
      try{
        await createCourse(dispatch, navigate, courseData,currUser.token);
      }catch(error){
        console.log(error);
      }
    }else{
      return;
    }
  }
  
  const  fetching = useSelector(store=>store.fetching);
  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Create New Course</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/*  ----------------Course Name ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiBook className="mr-2" /> Course Name
              </label>
              <input
                type="text"
                name="courseName"
                className={`mt-1 block w-full rounded-md border ${errors.courseName ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white`}
                // --------validation--------
                {...register("courseName", { required: true, maxLength: 50 })}
              />
              {/* -------Error handling ------- */}
              {errors.courseName?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Course name is required</p>
              )}
            </div>


            {/*  ----------------What You Will Learn ----------------*/}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <BsPencilSquare className="mr-2" /> What You Will Learn
              </label>
              <textarea
                name="whatYouWillLearn"
                rows="4"
                placeholder="Minimum 75 word reuired"
                className={`mt-1 block w-full rounded-md border ${errors.whatYouWillLearn ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white`}
                // --------validation--------
                {...register("whatYouWillLearn", { required: true, minLength: 10 })}
              />
              {/* -------Error handling ------- */}
              {errors.whatYouWillLearn?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Required feild</p>
              )}
            </div>


            {/* ---------------- Price ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 ">
                <RiMoneyRupeeCircleFill className="mr-2 text-[1.2rem]" /> Price
              </label>
              <input
                type="number"
                name="price"
                className={`mt-1 block w-full rounded-md border ${errors.price ? "border-red-500" : "border-gray-300"} shadow-sm p-2 bg-white`}
                // --------validation--------
                {...register("price", { required: true })}
              />
              {/* -------Error handling ------- */}
              {errors.price?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Price is reuired{errors.price && errors.price.message}</p>
              )}
            </div>

            {/*  ----------------Upload Thumbnail ---------------- */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
              <div className={`mt-1 flex items-center ${errors.thumbnail ? "border-red-500" : "border-gray-300"}`}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="thumbnail"
                  name="thumbnail"
                  // --------validation--------
                  {...register("thumbnail", { required: true })}
                />

                <label
                  htmlFor="thumbnail"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <IoMdCloudUpload className="mr-2 h-5 w-5" />
                  Upload Thumbnail
                </label>
              </div>
              {/* -------Error handling ------- */}
              {errors.thumbnail?.type === "required" && (
                <span role="alert" className='text-[.81rem] text-red-500'>Thumbnail of the course is required</span>
              )}
            </div>

            {/*  ----------------Tags ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FiTag className="mr-2" /> Tags
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  ref={currentTag}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Press Enter to add tags"
                  className="block w-full rounded-md border border-gray-300 shadow-sm p-2 bg-white"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {tagData.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-1 text-indigo-600 hover:text-indigo-800"
                      >
                        <FiX className='w-[10px]' />
                      </button>
                    </span>
                  ))}
                  {tagError ? <p role="alert" className='text-[.81rem] text-red-500'>Minimum one tag is reuired to related the course</p> : null}
                </div>
              </div>
            </div>

            {/*  ----------------Category ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <BiCategory className="mr-2" /> Category
              </label>
              <select
                name="category"
                className={`mt-1 block w-full rounded-md border  shadow-sm p-2 bg-white ${errors.category ? "border-red-500" : "border-gray-300"}`}
                // --------validation--------
                {...register("category", { required: true })}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/* -------Error handling ------- */}
              {errors.category?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Catagory of the course is reuired</p>
              )}
            </div>

            {/*  ----------------Language ---------------- */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MdLanguage className="mr-2" /> Language
              </label>
              <div className="mt-2 sm:space-x-0 flex flex-col sm:flex-row gap-x-4 gap-y-2 bg-white">

                {["Hindi", "English", "Hindi_english"].map((lang) => (
                  <label key={lang} className="inline-flex items-center ml-0">
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      className="form-radio h-4 w-4"
                      // --------validation--------
                      {...register("language", { required: "Please select a language." })}
                    />
                    <span className="ml-2">{lang.replace("_", " ")}</span>
                  </label>
                ))}
              </div>
              {errors.language && (
                <p className="mt-1 text-sm text-red-500">Choose course lanuage</p>
              )}
            </div>

            {/*  ----------------buttons ---------------- */}
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {fetching ? <LoadingBtn working={'Creating...'}/>: "Create course"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreationForm;