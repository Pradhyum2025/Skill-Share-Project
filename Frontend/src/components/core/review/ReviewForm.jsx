import React from 'react'
import {useForm} from 'react-hook-form'
import StarRating from './StarRating';


export default function ReviewForm() {
  const [rating,setRating] =useState(-1)
  
  const {
   register,
   handleSubmit,
   formState:{errors},
  } = useForm();

  const onSubmit = async(data)=>{
    console.log(data)
  }

  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Submit Your Review</h2>
    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ----- Rating (1 to 5)-------- */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating 
        </label>
        <StarRating rating={rating} setRating={setRating} />
        {errors && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
     
     {/*  ---------- Comment input ----------  */}
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Review
        </label>
        <textarea
          name="comment"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="Share your experience..."
          {...register("firstName", {
            required: "first name is required",
            minLength: {
              value: 5,
              message: "Comment must be at least 5 characters"
            },
            maxLength: {
              value: 100,
              message: "Comment section cannot exceed 100 characters"
            },
          })}
        />
        {errors.comment && (
          <p
            id="section-name-error"
            className="mt-2 text-sm text-red-600 animate-fade-in"
            role="alert"
          >
            {errors?.comment?.message}
          </p>
        )}
      </div>
     
     {/* --------------  Submit button ------- */}
      <button
        type="submit"
        className={`w-full py-3 px-4 text-white font-medium rounded-md transition-colors duration-200 `}
      >
      Submit
      </button>

    </form>
  </div>
  )
}
