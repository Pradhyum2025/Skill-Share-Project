import { Course } from '../models/course.js'
import { User } from '../models/user.js'
import { Category } from '../models/category.js'
import { uploadImageToCloudinary } from '../utils/imageUploader.js'
import dotenv, { populate } from 'dotenv'
import mongoose from 'mongoose'
import { mailSender } from '../utils/mailSender.js'
// import { CourseStatusEmail } from '../models/mailTemplates/CourseStatusChangedMailTemplate.js'
dotenv.config()


//Create course
export const createCourse = async (req, res) => {
  try {
    //Extract data
    const {
      courseName,
      whatYouWillLearn,
      price,
      category,
      language
    } = req.body;

    const userId = req.user.id;
    const tag = req.body['tag[]'];

    console.log("req.body : ------>> ",req.body)
    
    const currInstructor = await User.findById(userId);
    if(currInstructor && currInstructor.status==='Deactive'){
      return res.status(401).json({
        success: false,
        message: 'Dear Instructor, your account is temporary deactive'
      })
    }

    //Get thumbnail  TODO : check on testing time
    const thumbnail = req.files['thumbnailImage[]'];

    //Validation
    if (!courseName || !whatYouWillLearn || !price || !category || !tag || !language || !thumbnail) {
      return res.status(401).json({
        success: false,
        message: 'All feilds are required!'
      })
    }
    //Check for instructor

    //Check given category is valid 
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(401).json({
        success: false,
        message: 'Category details not found,Try with valid category!'
      })
    }
    console.log("categoryDetails ----------->>> : ",categoryDetails)
    //Upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

    //create course entry in db
    const newCourse = await Course.create({
      courseName,
      whatYouWillLearn,
      price,
      catgory: categoryDetails._id,
      instructor: userId,
      language,
      tag:tag,
      thumbnail: thumbnailImage.secure_url,
    })

    //Add course entry in user schema
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          courses: {
            $each: [newCourse._id],
            $position: 0
          }
        }
      },
      { new: true }
    );

    //Add course entry in cataegory
    await Category.findOneAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
          categoryCourses: {
            $each: [newCourse._id],
            $position: 0
          }
        }
      },
      { new: true }
    );
  
    console.log("newCourse ----------->>> : ",newCourse)
    //Return response
    return res.status(200).json({
      success: true,
      message: 'New course created successfully!',
      newCourse
    })

  } catch (error) {
    console.log("Error occured in new course creation,try again:", error.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to create new course,try again'
    })
  }
}

//get all courses handler
export const getAllCourses = async (req, res) => {
  try {

    const allCourses = await Course.find({ status: "Approved" })

    return res.status(200).json({
      success: true,
      message: 'All course fetch successfuly!',
      allCourses
    })

  } catch (error) {
    console.log('Error in fetch all courses :', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch all courses! Please try again'
    })
  }
}

//get specific course 
export const getCourseDetailsofUser = async (req, res) => {
  try {
    //get courseId
    const { courseId } = req.params;
    const userId = req.user.id;
    //validation
    if (!courseId) {
      return res.status(500).json({
        success: false,
        message: 'Something missing!'
      })
    }

    const user = await User.findOne({ _id: userId }, {
      courses: {
        $elemMatch: {
          $eq: new mongoose.Types.ObjectId(courseId)
        }
      }
    })

    if (user) {
      //find course
      const course = await Course.findById({ _id: courseId })
        .populate({
          path: 'instructor',
          populate: { path: 'additionalDetails' }
        })
        .populate({
          path: 'reviews',
          populate: { path: 'createdBy' }
        })
        .populate({
          path: 'courseContent',
          populate: { path: 'subSection' }
        })
        .exec();


      //response
      return res.status(200).json({
        success: true,
        message: 'Course deatils fetched succeesfully!',
        course
      })
    } else {
      //response
      return res.status(200).json({
        success: false,
        message: 'Course deatils not found!',
      })
    }


  } catch (error) {
    console.log('Error occured while getting a specific course :', error.message);

    return res.status(500).json({
      success: false,
      message: 'Someting went wrong, Please try again!'
    })
  }
}

//get specific course 
export const getCourseDetailsForView = async (req, res) => {
  try {
    //get courseId
    const { courseId } = req.params;
    //validation
    if (!courseId) {
      return res.status(500).json({
        success: false,
        message: 'Course Details not found!'
      })
    }


    //find course
    const course = await Course.findById({ _id: courseId })
      .populate({
        path: 'instructor',
        populate: { path: 'additionalDetails' }
      })
      .populate({
        path: 'reviews',
        populate: { path: 'createdBy' }
      })
      .exec();


    //response
    return res.status(200).json({
      success: true,
      message: 'Course deatils fetched succeesfully!',
      course
    })



  } catch (error) {
    console.log('Error occured while getting a specific course :', error.message);

    return res.status(500).json({
      success: false,
      message: 'Someting went wrong, Please try again!'
    })
  }
}


// Get user course
export const getUserAllCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    //validation
    //find course
    const user = await User.findById({ _id: userId });

    if (user) {
      const courses = await Course.find({ _id: { $in: user.courses } }).populate('instructor')
      //response
      return res.status(200).json({
        success: true,
        message: 'Course fetched succeesfully!',
        courses
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      })
    }

  } catch (error) {
    console.log('Error occured while getting a user course :', error.message);

    return res.status(500).json({
      success: false,
      message: 'Someting went wrong, Please try again!'
    })
  }
}

//getFiltered courses handler
export const getFilteredCourses = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const currCategory = await Category.findById(categoryId);

    if (!currCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category not found',
      })
    }
        console.log('currCategory.categoryCourses',currCategory.categoryCourses)
    if (currCategory?.categoryCourses?.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'There are no course available for this category',
      })
    }
    

    const filterdCourses = await Course.find({ _id: { $in: currCategory.categoryCourses }, status: 'Approved' });
    
    return res.status(200).json({
      success: true,
      message: 'Category courses fetched suceesfully!',
      filterdCourses
    })


  } catch (error) {
    console.log('Error to fetch filtered courses:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch all courses! Please try again'
    })
  }
}


//getFiltered courses handler
export const getCoursesByAdmin = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const currCategory = await Category.findById(categoryId);

    if (!currCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category not found',
      })
    }

    if (currCategory?.categoryCourses?.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'There are no course available for this category',
      })
    }
    

    const filterdCourses = await Course.find({ _id: { $in: currCategory.categoryCourses }});

    return res.status(200).json({
      success: true,
      message: 'Category courses fetched suceesfully!',
      filterdCourses
    })


  } catch (error) {
    console.log('Error to fetch filtered courses:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch all courses! Please try again'
    })
  }
}

// Set course status
export const setCourseStatus = async(req,res)=>{
  try{
    const adminId =req.user.id;
    const {courseId} =req.params;
    const currAdmin= await User.findById(adminId);

    const course= await Course.findById(courseId).populate('instructor');

    if(!course){
      return res.status(400).json({
        success:false,
        message:'Course details not found'
      })
    }


    //Send mail to instructor
    course.status = course.status==='Approved'?'Draft':'Approved'
    const instructorName = `${course.instructor?.firstName} ${course.instructor?.lastName}`
    const adminName =  `${currAdmin?.firstName} ${currAdmin?.lastName} `
    await mailSender(course?.instructor?.email,`Course updation information`,CourseStatusEmail(course.courseName, course.status, instructorName,adminName));

    await course.save();

    return res.status(200).json({
      success:true,
      message:'Course status updated successfully!'
    })
  }catch(error){
    console.log('Course status updation error : ',error.message)
    return res.status(500).json({
      success:false,
      message:'Internal server error'
    })
  }
}