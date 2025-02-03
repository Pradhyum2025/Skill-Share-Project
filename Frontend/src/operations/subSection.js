import axios from "axios";
import toast from "react-hot-toast";
import { courseSliceAction } from "../store/slices/courseSlice";
import { fetchSliceAction } from "../store/slices/fetchSlice";

// create sub-Section 
export const createSubSection = async (dispatch,navigate,subSectionData,courseId,sectionId,token)=>{
  try {
     dispatch(fetchSliceAction.serializeFetching());
      const res = await axios.post(`http://localhost:8080/subSection/${courseId}/${sectionId}`, subSectionData, {
      headers:{
        'Authorisation':`Bearer ${token}`,
        'Content-Type':'multipart/form-data'
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());

      if (res.data && res.data.success) {
      // console.log("CREATE SUB-SECTION RESPONSE --->>>", res) 
      navigate(`/dashbord/show/${courseId}`,{state:{currSectionId:sectionId}});  
      toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
    }
  } catch (error) {
    toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('SubSection creation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Delete section
export const deleteSubSection = async (dispatch,courseId,sectionId,subSectionId,token)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching());
      const res = await axios.delete(`http://localhost:8080/subSection/${courseId}/${sectionId}/${subSectionId}`, {
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });
    
    dispatch(fetchSliceAction.deserializeFetching());

      if (res.data && res.data.success) {
      // console.log("DELETE SUB-SECTION RESPONSE --->>>", res)
      dispatch(courseSliceAction.setSingleCourses(res.data.course))
      document.getElementById('my_modal_5').close()
      toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
    }
  } catch (error) {
    toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('Sub Section deletion error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}


//Edit subSection
export const editSubSection = async (dispatch,navigate,updatedData,courseId,sectionId,subSectionId,token)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching());
      const res = await axios.patch(`http://localhost:8080/subSection/${courseId}/${sectionId}/${subSectionId}`, updatedData, {
        headers:{
          'Authorisation':`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
    });
    dispatch(fetchSliceAction.deserializeFetching());

      if (res.data && res.data.success) {
      // console.log("EDIT SUB-SECTION RESPONSE --->>>", res)   
      navigate(`/dashbord/show/${courseId}`,{state:{currSectionId:sectionId}});
      toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
    }
  } catch (error) {
    toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('SubSection updation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}