import axios from "axios";

//Get my course
export const getAvgRating = async (courseId,setAvgRating) => {
  try {
    const res = await axios.get(`http://localhost:8080/review/${courseId}`)
    
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