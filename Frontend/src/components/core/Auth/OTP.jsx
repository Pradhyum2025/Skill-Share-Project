import React, { Children, useState } from 'react'
import OtpInput from './OTPInput';
import OtpVerifyBtn from './OtpVerifyBtn';
import { useForm } from 'react-hook-form';
import axios from "axios";
import toast from 'react-hot-toast';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliceAction } from '../../../store/slices/fetchSlice';
import LoadingBtn from '../../Common/LoadingBtn';
import sendOtp, { signUp } from '../../../operations/auth';

export default function OTP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [currOtp, setCurrOtp] = useState('');

  //React form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //get user details from react state
  const signUpData = useLocation().state?.signUpData;
  
  // console.log('signUpData :',signUpData)

  // ------ handle submit form  ----------
  const onSubmit = async (data) => {
    //if userDetails found
    if (signUpData && currOtp.length == 4) {
      signUpData.otp = currOtp;

      // ---------------  send reuest to backend --------------
      return signUp(navigate, dispatch, signUpData);

    } else {
      return navigate('/signup')
    }
  }
  const [otpFetching, setOtpFetching] = useState(false);
  //Resend otp finction calling
  const handleResendOtp = () => {
    if (signUpData) {
      return sendOtp(navigate, setOtpFetching, signUpData, true);
    } else {
      return navigate('/signup');
    }
  }

  const fetching = useSelector(store => store.fetching);
  return (
    <div class="max-w-md min-h-[50vh] mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow m-10">

      {/* ----------  Text paragraph   ------------*/}
      <header class="mb-8">
        <h1 class="text-2xl text-gray-800 font-bold mb-1">Email Verification</h1>
        <p class="text-[15px] font-[500] text-slate-600">Enter the 4-digit verification code that was sent to your email account.</p>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* ----------  Otp input   ------------*/}
        <OtpInput length={4} setCurrOtp={setCurrOtp} />

        {/* ----------  Verify btn   ------------*/}
         <OtpVerifyBtn />

      </form>
      <div class="text-sm text-slate-500 mt-4 flex items-center justify-center">Didn't receive code?
        <span
          onClick={handleResendOtp}
          class="font-medium text-indigo-500 hover:text-indigo-600 hover:underline cursor-pointer" >
            {otpFetching?
            <LoadingBtn working={'Sending..'}/>
          :
          'Resend'
          }
          </span>
      </div>
    </div>

  )
}
