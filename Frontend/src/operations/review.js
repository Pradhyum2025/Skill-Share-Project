import axiosInstance from "../helper/axiosInstance"


//Get my course
export const getAvgRating = async (courseId,setAvgRating) => {
  try {
    const res = await axiosInstance.get(`/review/${courseId}`)
    
    if (res.data && res.data.success) {
      // console.log("GET AVG RAting RESPONSE --->>>", res)
      setAvgRating(res.data.averageRating)
    }
  } catch (error) {
    console.log('Get Avg rating error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}