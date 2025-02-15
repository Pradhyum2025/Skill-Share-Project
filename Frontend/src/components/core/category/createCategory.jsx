import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiBook } from "react-icons/fi";
import { createCategory } from "../../../operations/category";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
import LoadingBtn from "../../Common/LoadingBtn";

const CategoryCreation = () => {

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const currUser  = useSelector(store=>store.auth);

  const onSubmit = async (data) => {
    if(currUser.token==='undefined') return ;
    try{
      await createCategory(dispatch,navigate, data,currUser.token);
    }catch(error){
      console.log(error)
    }
  }
  
  const  fetching = useSelector(store=>store.fetching);

  return (
    <div className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-indigo-600 mb-2">Create New Category</h1>
            <p className="text-gray-600">Add a new category to organize your courses effectively</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Category Name Input */}
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${errors.name ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter category name"
                {...register("name", { required: true, maxLength: 40 })}
              />
              {/* ---- Error handling ---- */}
              {errors.name?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Category of course is required</p>
              )}
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows="4"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${errors.description ? "border-red-500" : "border-gray-300"}`}
                placeholder="Provide a detailed description of the category (Max length 500 word)"
                aria-describedby="description-error"
                {...register("description", { required: true, maxLength: 500 })}
              />
              {/* ---- Error handling ---- */}
              {errors.description?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Description of category is required</p>
              )}
            </div>

            {/* Related Courses Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center text-gray-600">
                <FiBook className="mr-2" />
                <span className="text-sm">Courses will be linked after category creation</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              {/* Reset btn */}
              <button
                type="reset"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset
              </button>

              {/* Create btn */}
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {fetching ? <LoadingBtn working={'Creating....'}/>: "Create Category"}
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};

export default CategoryCreation;