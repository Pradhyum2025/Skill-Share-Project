import axios from "axios"
import { fetchSliceAction } from "../store/slices/fetchSlice"
import toast from "react-hot-toast";
import { courseSliceAction } from "../store/slices/courseSlice";

//Create course
export const createCourse = async (dispatch, navigate, courseData,token) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.post('http://localhost:8080/course', courseData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorisation':`Bearer ${token}`
      }
    })
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("CREATE COURSE RESPONSE --->>>", res)
      toast.success(res.data.message, { position: 'top-right', duration: 2000 });
      navigate('/dashbord/');
    }
  } catch (error) {
     dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error?.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('Course creation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Get my course
export const getAllCourses = async (dispatch) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.get('http://localhost:8080/course')
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("GET ALL COURSE RESPONSE --->>>", res)
      // console.log(res.data.allCourses)
      dispatch(courseSliceAction.setCourses(res.data.allCourses));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('Get All Courses Error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Get my course
export const getMyCourse = async (dispatch,token) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.get('http://localhost:8080/course/user',{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    })
    dispatch(fetchSliceAction.deserializeFetching());
    
    if (res.data && res.data.success) {
      // console.log("GET USER COURSE RESPONSE --->>>", res)
      dispatch(courseSliceAction.setCourses(res.data.courses));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('Get user error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Get Single course
export const getSingleCourse = async (dispatch,courseId,token) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.get(`http://localhost:8080/course/${courseId}`,{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("GET SINGLE COURSE RESPONSE --->>>", res)
      dispatch(courseSliceAction.setSingleCourses(res.data.course));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('Get user error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Date formate function 
export const  formatDate = (timestamp) =>{
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = String(date.getFullYear()).slice(-2);
  
  return `${day} ${month}-20${year}`;
}

export const getCourseDetailsForView = async(dispatch,courseId)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.get(`http://localhost:8080/course/view/${courseId}`,{
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("GET Course Details for view RESPONSE --->>>", res)
      dispatch(courseSliceAction.setSingleCourses(res.data.course));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('Get user error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

export const getFilteredCourses = async(dispatch,categoryId)=>{

  try {
    const res = await axios.get(`http://localhost:8080/course/filter/${categoryId}`,{
    });
    if (res.data && res.data.success) {
      // console.log("GET Filter Course Response --->>>", res)
      // toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
      dispatch(courseSliceAction.setCourses(res.data.filterdCourses));
    }
  } catch (error) {
    console.log('GET Filter Course error : ', error)
    toast.error(error.response?.data?.message, { position: 'bottom-right', duration: 2000 });
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

export const getCoursesByAdmin = async(dispatch,categoryId,token)=>{

  try {
    const res = await axios.get(`http://localhost:8080/course/filter/admin/${categoryId}`,{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
    if (res.data && res.data.success) {
      // console.log("GET Filter Course by admin Response --->>>", res)
      // toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
      dispatch(courseSliceAction.setCourses(res.data.filterdCourses));
    }
  } catch (error) {
    console.log('GET Filter Course by admin error : ', error)
    toast.error(error.response?.data?.message, { position: 'bottom-right', duration: 2000 });
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// SET course status
export const setCourseStatus = async(dispatch,courseId,token)=>{
  const toastId = toast.loading('Updating status....')
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.get(`http://localhost:8080/course/status/${courseId}`,{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    toast.dismiss(toastId);
    if (res.data && res.data.success) {
      // console.log("Set Course Status Response --->>>", res)
      dispatch(courseSliceAction.setCourseStatus(courseId));
      toast.success(res?.data?.message, { position: 'bottom-right', duration: 2000 });
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('Set Course error : ', error)
    toast.error(error.response?.data?.message, { position: 'bottom-right', duration: 2000 });
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
  toast.dismiss(toastId);
}
