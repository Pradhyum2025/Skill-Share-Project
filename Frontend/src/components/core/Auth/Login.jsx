import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../../operations/auth';
import LoadingBtn from '../../Common/LoadingBtn';

export default function Login() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const fetching = useSelector(store => store.fetching);
   const currUser = useSelector(store => store.auth)
   //React form hook
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    
    //Submit login form
    const onSubmit = async (data,event) => {
      let userDetails = {
        email:data.email,
        password:data.password
      }

      //Call login/Signin function 
      signIn(navigate,dispatch,userDetails);
    }
  return (
    <div className='w-[95%] flex flex-col justify-center my-7 items-center sticky top-20 text-gray-900  bg-[rgb(255,255,255)] rounded-[20px]'>
      {/* form */}
      <div class="w-full px-4 py-5">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-xl">
          Sign in to your account
        </h1>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        class="space-y-4 md:space-y-8 mt-10 text-[.95rem] font-[500]" action="#">

        {/* Email */}
          <div>
            <label for="email" class="block mb-2">Your email</label>
            <input 
            disabled={currUser.email}
            type="email" name="email" id="email" class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-700 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gay-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
              {...register("email", { required: true, maxLength: 50 })}
              />
              {/* ---- Error handling ---- */}
              {errors.email?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Email is required</p>
              )}
          </div>

        {/* [password] */}
          <div>
            <label for="password" class="block mb-2">Password</label>
            <input 
            disabled={currUser.email}
            type="password" 
            name="password" 
            id="password" placeholder="••••••••" class="bg-black border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-700 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400  placeholder-gray-400 text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              {...register("password", { required: true, maxLength: 20 })}
              />
              {/* ---- Error handling ---- */}
              {errors.password?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>password is required</p>
              )}
          </div>


        {/* Signin btn */}
        <div className='mt-10'>
          <button 
          disabled={currUser.email}
          type="submit" 
          class="bg-black  text-white btn text-[1.1rem] font-semibold bg-indigo-600 hover:bg-indigo-500 border-none hover:bg-indigo-600 disabled:bg-indigo-500 disabled:text-gray-200">
            {fetching?
            <LoadingBtn working={'Signing..'} />:
            'Sign in'
            }
            </button>
        </div>

          <p class="text-sm font-semibold text-white-100">
            Don’t have an account yet? <Link to="/signup" class="font-medium text-indigo-500 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
