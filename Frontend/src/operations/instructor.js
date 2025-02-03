import toast from "react-hot-toast";
import { insructorSliceAction } from "../store/slices/insructor";
import axios from "axios";

//Get all instructor
export const getAllInstructor = async(dispatch,token)=>{
  try{
    const res = await axios.get('http://localhost:8080/instructor',{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
    if(res.data && res.data.success) {
      console.log("GET All INSTRUCTOR DETAILS RESPONSE --->>>", res)
      dispatch(insructorSliceAction.setInstructorData(res.data.allInstructors));
    }

  }catch(error){
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    console.log('Get all instructor details error :',error)
  }
}

// Update instroctor account
export const changeInstructorAccountStatus = async(dispatch,instructorId,token)=>{
  const toastId = toast.loading('Updating....')
  try{
    const res = await axios.get(`http://localhost:8080/instructor/${instructorId}`,{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
    if(res.data && res.data.success) {
      // console.log("UPDATE INSTRUCTOR ACCOUNT RESPONSE --->>>", res)
      dispatch(insructorSliceAction.ChangeStatus(instructorId));
      toast.success(res?.data?.message, { duration: 2000 });
    }

  }catch(error){
    toast.error(error?.response?.data?.message, { duration: 2000 });
    console.log('Get all instructor details error :',error)
  }
  toast.dismiss(toastId);
}