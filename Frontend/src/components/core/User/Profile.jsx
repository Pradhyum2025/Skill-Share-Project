import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2, FiX, FiCheck,} from "react-icons/fi";
import { MdEditNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileDetails, updateProfileImage } from "../../../operations/auth";
import LoadingBtn from '../../Common/LoadingBtn.jsx'
import ChangeProfilePicture from "./ChangeProfilePicture.jsx";
import { FaAngleLeft } from "react-icons/fa";
const UserProfile = () => {

  const currUser = useSelector(store => store.auth);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const userData = {
    firstName: currUser?.firstName,
    lastName: currUser?.lastName,
    email: currUser?.email,
    contact: currUser?.additionalDetails?.contact,
    about: currUser?.additionalDetails?.about,
    dateOfBirth: currUser?.additionalDetails?.dateOfBirth,
    gender: currUser?.additionalDetails?.gender
  }
    
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: userData
  });

  const onSubmit = async (data) => {
    if (currUser.token) {
      updateProfileDetails(dispatch, data, currUser.token, setIsEditing)
    } else {
      return;
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    
  };

  const fetching = useSelector(store => store.fetching)

  return (
    <div className="w-full mx-auto md:p-6 p-1 bg-white  shadow-lg">
      {!isEditing ? (
        <div className="flex flex-col  items-start gap-8 p-3 pt-10 md:pt-0">
          {/* Image */}
          <div className="relative w-[7rem] h-[7rem] rounded-full overflow-hidden">
            <img
              src={currUser?.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* ----------  Left div ----------  */}
          <div className="w-full">

            <div className="w-[100%] flex justify-between items-center gap-x-3 mb-3 sm:mb-3">
              <h1 className="text-xl sm:text-2xl font-bold text-indigo-600">{`${currUser?.firstName} ${currUser?.lastName}`}</h1>
              <button
                onClick={() => setIsEditing(()=>true)}
                className="btn min-h-[2rem] h-[2.5rem] bg-gray-100 border-1 border-gray-200 hover:border-gray-300  hover:bg-gray-200  text-black disabled:text-gray-600 font-[900]"
              > <span className="text-indigo-600">Edit</span>
                <MdEditNote size={25} className="text-indigo-600" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-md font-semibold text-gray-800">
                <span>About : </span>
                <span className="text-gray-900 font-[700]">{currUser?.additionalDetails?.about}</span>
              </p>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold ">Email:</span>
                <span className="text-gray-900 font-[700]">{currUser?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold">Phone:</span>
                <span className="text-gray-900 font-[700]">{currUser?.additionalDetails?.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold">DOB:</span>
                <span className="text-gray-900 font-[700]">{currUser?.additionalDetails?.dateOfBirth}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold">Gender:</span>
                <span className="text-gray-900 font-[700]">{currUser?.additionalDetails?.gender}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ---------------- Edit options  ----------------
        <div className="w-full">

          <button
          disabled={fetching}
          className="btn min-h-[2rem] h-[2.5rem] bg-gray-100 border-1 border-gray-200 hover:border-gray-300  hover:bg-gray-200  text-black disabled:text-gray-600 md:mt-0 mt-12"
           onClick={()=>setIsEditing(()=>false)}> <FaAngleLeft/>
           Back
           </button>

        <div className="w-full flex items-start flex-wrap sm:flex-nowrap justify-around gap-4 mt-2 mb-4 md:my-5">
          {/* -------------- Change profile image form -------------- */}
          <ChangeProfilePicture/>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col justify-center md:gap-y-10 gap-y-5  sm:pt-5">

            {/* ---------- edit image section ---------- */}

            {/* --------------- Text details  --------------- */}
            <div className="flex flex-col gap-y-8">

              <div className="flex w-full  justify-around">
                {/* ---------- First name ---------- */}
                <div className="w-[45%]">
                  <label className="block text-md font-[500] text-gray-700 mb-1">
                    FirstName
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-[600] bg-white"
                    {...register("firstName", {
                      required: "first name is required",
                      minLength: {
                        value: 5,
                        message: "Section name must be at least 3 characters"
                      },
                      maxLength: {
                        value: 20,
                        message: "Section name cannot exceed 50 characters"
                      },
                    })}
                  />
                  {errors.firstName && (
                    <p
                      id="section-name-error"
                      className="mt-2 text-sm text-red-600 animate-fade-in"
                      role="alert"
                    >
                      {errors?.firstName?.message}
                    </p>
                  )}
                </div>
                {/* ---------- Last name----------  */}
                <div className="w-[45%]">
                  <label className="block text-md font-[500] text-gray-700 mb-1">
                    LastName
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-[600] bg-white"
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 5,
                        message: "Section name must be at least 3 characters"
                      },
                      maxLength: {
                        value: 20,
                        message: "Section name cannot exceed 50 characters"
                      },
                    })}
                  />
                  {errors.sectionName && (
                    <p
                      id="section-name-error"
                      className="mt-2 text-sm text-red-600 animate-fade-in"
                      role="alert"
                    >
                      {errors?.lastName?.message}
                    </p>
                  )}

                </div>
              </div>

              <div className="flex w-full justify-around">
                {/*  ------------- Gender -------------  */}
                <div className="w-[45%]">
                  <label className="block text-md font-[500] text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-[600] bg-white"
                    {...register("gender", {
                      required: "Gender is required"
                    })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p
                      id="section-name-error"
                      className="mt-2 text-sm text-red-600 animate-fade-in"
                      role="alert"
                    >
                      {errors?.gender?.message}
                    </p>
                  )}
                </div>
                {/*  ------------- contact -------------  */}
                <div className="w-[45%]">
                  <label className="block text-md font-[500] text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="contact"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-[600] bg-white"
                    {...register("contact", {
                      required: "Contact is required",
                      minLength: {
                        value: 5,
                        message: "Section name must be at least 3 characters"
                      },
                      maxLength: {
                        value: 20,
                        message: "Section name cannot exceed 50 characters"
                      },
                    })}
                  />
                  {errors.contact && (
                    <p
                      id="section-name-error"
                      className="mt-2 text-sm text-red-600 animate-fade-in"
                      role="alert"
                    >
                      {errors?.contact?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex w-full justify-around">
                <div className="w-[45%]">
                  <label className="block text-md font-[500] text-gray-700 mb-1">
                    About
                  </label>
                  <input
                    type="text"
                    name="about"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-[600] bg-white"
                    {...register("about", {
                      required: "About is required",
                      minLength: {
                        value: 3,
                        message: "Section name must be at least 3 characters"
                      },
                      maxLength: {
                        value: 20,
                        message: "Section name cannot exceed 50 characters"
                      },
                    })}
                  />
                  {errors.about && (
                    <p
                      id="section-name-error"
                      className="mt-2 text-sm text-red-600 animate-fade-in"
                      role="alert"
                    >
                      {errors?.about?.message}
                    </p>
                  )}
                </div>
                <div className="w-[45%]">
                  <label className="block text-md font-[500] text-gray-700 mb-1">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-[500] bg-white"
                    {...register("dateOfBirth", {
                      required: "About is required",
                    })}
                  />
                  {errors.dateOfBirth && (
                    <p
                      id="section-name-error"
                      className="mt-2 text-sm text-red-600 animate-fade-in"
                      role="alert"
                    >
                      {errors?.dateOfBirth?.message}
                    </p>
                  )}
                </div>
              </div>

            </div>

            <div className="flex justify-end gap-4 px-1">
              <button
                type="button"
                onClick={handleCancel}
                className="md:px-6 px-2 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FiX /> Cancel
              </button>
              <button
                type="submit"
                className="md:px-6 px-2 py-2 bg-indigo-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {fetching ?
                  <LoadingBtn working={'Saving...'} /> :
                  <span className="flex items-center gap-2">
                    <FiCheck /> Save Changes
                  </span>
                }
              </button>
            </div>

          </form>

        </div>

        </div>
      )}
    </div>
  );
};

export default UserProfile;
