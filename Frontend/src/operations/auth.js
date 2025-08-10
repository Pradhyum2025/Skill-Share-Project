
import axiosInstance from "../helper/axiosInstance";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import toast from "react-hot-toast";
import authSlice, { authSliceAction } from "../store/slices/authSlice";

//Send otp request for user function
export default async function sendOtp(navigate, setOtpFetching, signUpData, resend) {
  try {
    setOtpFetching(()=>true)
    let res = await axiosInstance.post('/auth/otp', { email:signUpData.email });

    // console.log("SEND OTP RESPONSE ---->>:", res);

    setOtpFetching(()=>false)
    if (res && res.data.success && resend ) {
      toast.success('OTP regenerated successfully', { position: 'bottom-right', duration: 2000 });
    }
    if (res && res.data.success && !resend) {
      toast.success('OTP generated successfully', { position: 'bottom-right', duration: 2000 });
      navigate('/otp',{state:{signUpData:signUpData}});
    }
  } catch (err) {
    setOtpFetching(()=>false)
    toast.error(err?.response?.data?.message, { position: 'bottom-right', duration: 2000 });
    console.log("Error to send otp request : ", err)
  }
}

// Signup function handler
export const signUp = async (navigate, dispatch, signUpData) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.post('/auth/signup', signUpData, {
      headers: {
        'Content-Type': 'multipart/form-data', // axiosInstance sets the boundary automatically
      },
    });
    // console.log("SIGNUP RESPONSE ---->>:", res)
    dispatch(fetchSliceAction.deserializeFetching());
    if (res && res.data.success) {
      //save user info into local storage
      window.localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
      dispatch(authSliceAction.setUserData(res.data.currUser))
      toast.success(res.data.message, { position: 'bottom-right', duration: 2000 });
      navigate('/');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('SignUp error :',error)
    toast.error(error.response.data.message, { position: 'top-right', duration: 2000 });
  }

}

// Login / Signin function handler
export const signIn = async (navigate,dispatch,formData) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.post('/auth/login', formData);
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("LOGIN RESPONSE --->>>", res)
      dispatch(authSliceAction.setUserData(res.data.currUser));
      window.localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
      toast.success(res?.data?.message, { position: 'right-bottom', duration: 2000 });
      navigate('/');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error?.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('Login error : ', error)
  }

}


// Sign out function 
export const signOut = (dispatch, navigate) => {
  dispatch(authSliceAction.signout())
  dispatch(fetchSliceAction.deserializeFetching());
  navigate('/')
}

// Edit Profile Details
export const updateProfileDetails = async(dispatch,updatedData,token,setIsEditing)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching());
    console.log('Hello')
    const res = await axiosInstance.patch(`/profile/details`, updatedData, {
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      window.localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
      dispatch(authSliceAction.setFormData(res.data.currUser));
      setIsEditing(()=>false)
      // console.log("Profile Details Updation Response  --->>>", res)
      toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
    }

  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('Category updation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// Update Profile picture
export const updateProfileImage = async(dispatch,picData,token,setFetching,setPicture)=>{
  try {
    setFetching(()=>true)
    const res = await axiosInstance.patch(`/profile/picture`, picData, {
      headers:{
        'Authorisation':`Bearer ${token}`,
        'Content-Type':'multipart/form-data'
      }
    });
    setFetching(()=>false)
    if (res.data && res.data.success) {
      window.localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
      setPicture(res?.data?.currUser?.image)
      dispatch(authSliceAction.setFormData(res.data.currUser));
      console.log("Profile Picture Updation Response  --->>>", res)
      toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
    }

  } catch (error) {
    setFetching(()=>false)
    toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('Profile picture updation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

