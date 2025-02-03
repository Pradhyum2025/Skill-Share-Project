import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import LoadingBtn from '../../Common/LoadingBtn';
import sendOtp from '../../../operations/auth';

export default function Signup() {

  //nvaigate
  const navigate = useNavigate();
  const location = useLocation();
  const currRoll = location.state?.forRoll || 'Student';
  //Fetching
  const [otpFetching, setOtpFetching] = useState(false);
  //roll
  let [roll, setRoll] = useState(currRoll);

  // roll change handler
  const handleChangeRoll = (event) => {
    setRoll(event.target.value)
  }

  //React form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {

    event.preventDefault();

    //User details
    let signUpData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact:data.contact,
      accountType: roll,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }
    //Additional details for instructor
    if (roll === 'Instructor') {
      signUpData.qualification = data.qualification,
      signUpData.qualificationProof = data.qualificationProof
    }

    //Send OTP
    return await sendOtp(navigate, setOtpFetching, signUpData, false);
  }

  //Fetching 
  let fetching = useSelector(store => store.fetching);

  return (
    <div class="">
      {/*--------- Signup Heading--------- */}
      <div class="text-center bg-gradient-to-r from-black to-gray-900 min-h-[160px] sm:p-6 p-4">
        <h4 class="sm:text-3xl text-2xl text-white  tracking-wider  font-bold">Create your free account</h4>
      </div>

      <div class="font-Inter mx-4 mb-4 -mt-16">

        {/* -----------------------------form starting-------------------------- */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          class="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">

          {/* ------------roll selection------------ */}
          <div className='bg-white mb-5 flex gap-x-5 flex items-center'>
            <label className='text-black text-sm tracking-wider font-semibold'>As</label>
            <select
              name="roll"
              id="roll"
              value={roll}
              onChange={handleChangeRoll}
              className='bg-white border-2 foucus:ring-4 rounded text-black text-sm tracking-wide font-semibold pl-2 pr-20'>
              <option value="Student" className='text-black text-sm tracking-wider font-semibold'>a Student</option>
              <option value="Instructor" className='text-black  text-sm tracking-wider font-semibold'>an Instructor</option>
            </select>
          </div>


          <div class="grid md:grid-cols-2 gap-8">
            {/* ----------------first name---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">First Name <span className='text-red-500'>*</span></label>
              <input name="firstName" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter name"
                // --------validation--------
                {...register("firstName", { required: true, 
                  maxLength: { value: 100, message: "First name length should be under 100 word" },
                })}
              />
              {/* -------Error handling ------- */}
              {errors.firstName?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>First name is required</p>
              )}
              <p className='text-[.81rem] text-red-500'>{errors?.firstName?.message}</p>
            </div>


            {/* ----------------Last name---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Last Name<span className='text-red-500'>*</span></label>
              <input name="lastName" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter last name"
                // ---- validation -------
                {...register("lastName", { required: true, 
                  maxLength : { value: 100, message: "Last name length should be under 100 word" },
                 })}
              />
              {/* ---- Error handling ---- */}
              {errors.lastName?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Last name is required</p>
              )}
               <p className='text-[.81rem] text-red-500'>{errors?.lastName?.message}</p>
            </div>


            {/* ----------------Email id---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email Id<span className='text-red-500'>*</span></label>
              <input name="email" type="email" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter email"
                // ---- validation -------
                {...register("email",
                  {
                    required: true,
                    maxLength: { value: 300, message: "EmailId length should be under 200 word" },
                    minLength: { value: 12, message: 'EmailId length should be grater than 12 words' }
                  })}
              />
              {/* ---- Error handling ---- */}
              {errors.email?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Email id is required</p>
              )}
              <p className='text-[.81rem] text-red-500'>{errors?.email?.message}</p>
            </div>


            {/* ----------------Mobile number---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Mobile No.<span className='text-red-500'>*</span></label>
              <input name="contact" type="number" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter mobile number"
                // ---- validation -------
                {...register("contact", {
                  required: true,
                  maxLength: { value: 10, message: "Enter valid contact number" },
                  maxLength: { value: 10, message: 'Enter valid contact number' }
                })}
              />
              {/* ---- Error handling ---- */}
              {errors.contact?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Contact number is required</p>
              )}
              <p className='text-[.81rem] text-red-500'>{errors?.contact?.message}</p>
            </div>

            {/* ---------------- Password---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password<span className='text-red-500'>*</span></label>
              <input name="password" type="password" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter password"
                // ---- validation -------
                {...register("password", { required: true,
                  minLength: { value: 8, message: 'Minimum length of password should be 8' },
                  maxLength: { value: 10, message: 'Minimum length of password should be 50' }
                 })}
              />
              {/* ---- Error handling ---- */}
              {errors.password?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Password is required</p>
              )}
               <p className='text-[.81rem] text-red-500'>{errors?.password?.message}</p>
            </div>

            {/* ----------------Confirm password---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Confirm Password<span className='text-red-500'>*</span></label>
              <input name="confirmPassword" type="password" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter confirm password"
                // ---- validation -------
                {...register("confirmPassword", { required: true,
                  minLength: { value: 8, message: 'Minimum length of password should be 8' },
                  maxLengthLength: { value: 10, message: 'Maximum length of password should be 50' }

                 })}
              />
              {/* ---- Error handling ---- */}
              {errors.confirmPassword?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Confirm password didn't match</p>
              )}
              <p className='text-[.81rem] text-red-500'>{errors?.confirmPassword?.message}</p>
            </div>


            {/* -------- additional inputs for instructor roll ---------- */}
          </div>
          {roll === 'Instructor' ?
            <div className='w-[100%] flex justify-between flex-wrap mt-6'>


              {/* ---------------- Higher qualification---------------- */}
              <div className='w-[48%]'>
                <label class="text-gray-800 text-sm mb-2 block">Higher Qualification<span className='text-red-500'>*</span></label>
                <input name="qualification" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter qualification"
                  // ---- validation -------
                  {...register("qualification", { required: true, maxLength: 20 })}
                />
                {/* ---- Error handling ---- */}
                {errors.qualification?.type === "required" && (
                  <p role="alert" className='text-[.81rem] text-red-500'>qualification is required</p>
                )}
              </div>


              {/* ---------------- Higher qualification Docs---------------- */}
              <div className='w-[48%]'>
                <label class="text-gray-800 text-sm mb-2 block">Qualification proof<span className='text-red-500'>*</span></label>
                <input name="qualificationProof" type="file" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter confirm password"
                  // ---- validation -------
                  {...register("qualificationProof", { required: true, maxLength: 20 })}
                />
                {/* ---- Error handling ---- */}
                {errors.qualificationProof?.type === "required" && (
                  <p role="alert" className='text-[.81rem] text-red-500'>Qualification proof is required</p>
                )}
              </div>

            </div> :
            null
          }

          {/* ----------submit button----------- */}
          <div class="mt-8">
            {otpFetching ?
              <LoadingBtn working={'Signing'} /> :
              <button type="submit" class="btn py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none border-none">
                Signup
              </button>
            }
          </div>

          {/* -------------- Break line-------------- */}
          <div
            class="my-8 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p
              class="mx-4 text-center">
              Or
            </p>
          </div>
          {/* -------------other options------------- */}
          <div class="grid md:grid-cols-2 gap-8">

            {/*----------------- Continue with Google----------------- */}
            <button type="button"
              class="w-full px-6 py-3 flex items-center justify-center rounded-md text-gray-800 text-sm tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200">
              <img src="/google.svg" alt="" />
              Continue with Google
            </button>

            {/* --------------Continue with Apple-------------- */}
            <button type="button"
              class="w-full px-6 py-3 flex items-center justify-center rounded-md text-white text-sm tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]">
              <img src="/apple.svg" alt="" />
              Continue with Apple
            </button>

          </div>

        </form> {/* ---------------form ending--------------- */}

      </div>
    </div>
  )
}
