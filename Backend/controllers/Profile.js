import { CourseProgress } from "../models/courseProgress.js";
import jwt from 'jsonwebtoken'
import { Profile } from "../models/profile.js";
import { User } from "../models/user.js";
import { Course } from "../models/course.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import dotenv from 'dotenv'
dotenv.config();


//Update profile picture
export const updateProfilePicture = async (req, res) => {
  try {
    //Extract user information
    const userId = req.user.id;
    //Fetch picture path from tmp folder
    const newPicture = req.files['picture[]'];
    
    let currUser = await User.findById(userId);

    if(!currUser){
      return res.status(401).json({
        success: false,
        message: 'User not found!',

      })
    }
    //Upload on cloudinary
    const pictureResponse = await uploadImageToCloudinary(newPicture, process.env.FOLDER_NAME);

    //Secure_url return in response
    currUser = await User.findByIdAndUpdate({ _id: userId }, { image: pictureResponse.secure_url }, { new: true }).populate('additionalDetails');



    //Generate JWT token for user authentication
    const payload = {
      email: currUser.email,
      id: currUser._id,
      accountType: currUser.accountType
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })

    currUser.token = token;
    currUser.password = undefined,
    currUser._id = undefined;
    currUser.courses = undefined;

    //create cookie and send in response to frontend side
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }


    //retrun response
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      token,
      currUser,
    })

  } catch (error) {
    console.log("Update profile picture error :", error.message);
    return res.status(500).json({
      success: false,
      message: 'Can not change profile picture!'
    })
  }
}

//Update profile handler
export const updateProfile = async (req, res) => {
  try {
    //extarct data from req body
    const { firstName, lastName, gender, dateOfBirth, about, contact } = req.body;
    //get userId
    const userId = req.user.id;
    //validation
    if (!userId || !gender || !dateOfBirth || !about || !firstName || !lastName || !contact) {
      return res.status(401).json({
        success: false,
        message: 'All feilds are require! Please try again with proper entries'
      })
    }
    //find user profile
    let currUser = await User.findById(userId)

    if (!currUser) {
      return res.status(401).json({
        success: false,
        message: 'Current user not found!'
      })
    }
    //find profile and update profile 
    const profileId = currUser.additionalDetails;
    const response = await Profile.findByIdAndUpdate({ _id: profileId }, {
      gender,
      dateOfBirth,
      about,
      contact
    },
      { new: true }
    )
    currUser = await User.findByIdAndUpdate({ _id: userId }, {
      firstName,
      lastName
    }, { new: true }).populate('additionalDetails')

    //Generate JWT token for user authentication
    const payload = {
      email: currUser.email,
      id: currUser._id,
      accountType: currUser.accountType
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })

    currUser.token = token;
    currUser.password = undefined,
    currUser._id = undefined;
    currUser.courses = undefined;

    //create cookie and send in response to frontend side
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }


    //retrun response
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      token,
      currUser,
    })

  } catch (error) {
    console.log('Error occured in update profile : ', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    })
  }
}

//Delete account handler
export const deleteAccount = async (req, res) => {
  try {
    //Extract userID
    const userId = req.user.id
    //Get user from db
    const user = await User.findById(userId);
    //Validation
    if (!user) {
      return res.status(401).json({
        success: false,
        Message: 'Current user not found!'
      })
    }

    //Find profile ID and delete
    const profileId = user.additionalDetails;

    await Profile.findByIdAndDelete(profileId);
    //Find progressID and delete
    const progresses = user.courseProgress //Array of courseProgress object
    await CourseProgress.findByIdAndDelete({ _id: { $in: progresses } });

    //Remove these student from enrolled courses
    const courses = user.courses; //array of courses

    if (courses.length > 0) { //If, student is enrolled in more than zero courses
      for (const currCourse of courses) {
        await Course.findByIdAndUpdate({ _id: currCourse }, {
          $pull: {
            enrolledStudent: userId //remove user from enrolledStudent
          }
        })
      }
    }
    //finally delete user account
    await User.findByIdAndDelete({ _id: userId });

    //return response
    return res.status(401).json({
      success: true,
      Message: 'User deleted successfully'
    })

  } catch (error) {
    console.log('error occured while deleting account:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete account'
    })
  }
}

//Get all user handler
export const getUserDetails = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;
    //get all user detqails
    const userDetails = await User.findById(userId).populate('additionalDetails').exec();

    return res.status(200).json({
      success: false,
      message: 'User details fetched successfully!',
      userDetails
    })

  } catch (error) {
    console.log("error occured to get all user details")
    return res.status(500).json({
      success: false,
      message: 'Failed to get user details, Please try again!'
    })
  }
}