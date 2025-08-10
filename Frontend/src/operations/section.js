import axiosInstance from "../helper/axiosInstance";
import toast from "react-hot-toast";
import { courseSliceAction } from "../store/slices/courseSlice";
import { fetchSliceAction } from "../store/slices/fetchSlice";

// create Section 
export const createSection = async (dispatch,sectionData,courseId,token)=>{
  try {
     dispatch(fetchSliceAction.serializeFetching());
      const res = await axiosInstance.post(`/section/${courseId}`, sectionData, {
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());

      if (res.data && res.data.success) {
      console.log("CREATE SECTION RESPONSE --->>>", res)
      dispatch(courseSliceAction.setSingleCourses(res.data.updateCourse))
      document.getElementById('my_modal_5').close()
      toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
    }
  } catch (error) {
    toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('Category creation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Delete section
export const DeleteSection = async (dispatch,courseId,sectionId,token)=>{
  try {
      dispatch(fetchSliceAction.serializeFetching());
      const res = await axiosInstance.delete(`/section/${courseId}/${sectionId}`, {
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
      if (res.data && res.data.success) {
      // console.log("DELETE SECTION RESPONSE --->>>", res)
      dispatch(courseSliceAction.setSingleCourses(res.data.course))
      document.getElementById('my_modal_5').close()
      toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
    }
  } catch (error) {
    toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('Category creation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// Edit section
export const editSection = async (dispatch,courseId,sectionId,token,sectiondata)=>{
  try {
      dispatch(fetchSliceAction.serializeFetching());
      const res = await axiosInstance.patch(`/section/${courseId}/${sectionId}`,sectiondata,{
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
      if (res.data && res.data.success) {
      // console.log("EDIT SECTION RESPONSE --->>>", res)
      dispatch(courseSliceAction.setSingleCourses(res.data.updatedCourse))
      document.getElementById('my_modal_5').close()
      toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
    }   
  } catch (error) {
    toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('Category creation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}