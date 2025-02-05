import { Section } from "../models/section.js";
import { SubSection } from "../models/subsection.js";
import { Course } from "../models/course.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

//Create subsection handler function
export const createSubSection = async (req, res) => {
  try {
    //Extract neccesary  data from req ki body
    const { title, description } = req.body;
    const { courseId, sectionId } = req.params;
    const userId = req.user.id;

    //Extract video  url from req.file
    const video = req.files['videoFile[]'];
    
    //Validations
    if (!courseId || !sectionId || !userId || !title || !description || !sectionId || !video) {
      return res.status(401).json({
        success: false,
        message: 'All fileds are required'
      })
    }
    //Advance validation
    const course = await Course.findOne(
      { _id: courseId, instructor: userId },
      {
        courseContent:
        {
          $elemMatch:
            { $eq: new mongoose.Types.ObjectId(sectionId) }
        }
      });

    if (course && course.courseContent.length > 0) {
      //Upload video on cloudinary
      const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

      //Create subSection model and insert data
      const newSubSection = await SubSection.create({
        title,
        description,
        timeDuration:`${uploadDetails.duration}`,
        videoUrl: uploadDetails.secure_url,
      })

      //Insert subSecton in coresopnded section
      const currSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $push: {
            subSection: newSubSection._id
          }
        },
        { new: true }
      )
      //Return response
      return res.status(200).json({
        success: true,
        message: 'Subsection created successfully!',
        currSection
      })

    } else {
      return res.status(401).json({
        success: false,
        message: 'Can not create subsection!'
      })
    }

  } catch (error) {
    console.log('Error to create subsection : ', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to created subsection,Please try again!'
    })
  }
}


//Update subsection
export const updateSubSection = async (req, res) => {
  try {
    //Extract neccesary  data from req ki body
    const { title, description } = req.body;
    //Extract sectionId from req.params
    const { courseId, sectionId, subSectionId } = req.params;
    const userId = req.user.id;
    //get newVideo from req.file.videoFile
    const video = req.files?req.files['videoFile[]']:null;

    //validation
    if (!title || !description || !sectionId) {
      return res.status(401).json({
        success: false,
        message: 'All feilds are required!'
      })
    }
    //advance validation
    //1st let check that particulr course contains given section or not
    const course = await Course.findOne(
      { _id: courseId, instructor: userId },
      {
        courseContent: {
          $elemMatch: {
            $eq: new mongoose.Types.ObjectId(sectionId)
          }
        }
      });
    //2nd check particular section contains given subsection or not
    const section = await Section.findOne(
      { _id: sectionId },
      {
        subSection: {
          $elemMatch: {
            $eq: new mongoose.Types.ObjectId(subSectionId)
          }
        }
      })

    if (course && course.courseContent.length > 0 && section && section.subSection.length > 0) {
      //TODO : DELETE previous video again then upload new video

      const subSection_payload = {
        title,
        description
      }

      if (video) {
        let uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        subSection_payload.videoUrl = uploadDetails.secure_url;
        subSection_payload.duration = uploadDetails.duration;
      }

      // //Update subsection in db
      let updatedSubSection = await SubSection.findByIdAndUpdate({ _id: subSectionId }, subSection_payload, { new: true });

      //Return res
      return res.status(200).json({
        success: true,
        message: 'Subsection updated successfully!',
      })
    } else {
      return res.status(401).json({
        success: false,
        message: 'Can not update subsection!'
      })
    }


  } catch (error) {
    console.log('Error in update subSection details : ', error)
    return res.status(200).json({
      success: false,
      message: 'Failed to update Subsection!'
    })
  }
}


//Delete subsection
export const deleteSubSection = async (req, res) => {
  try {
    //Extract id from params
    const { courseId, sectionId, subSectionId } = req.params;
    const userId = req.user.id;

    //Validation
    if (!courseId || !sectionId || !subSectionId) {
      return res.status(401).json({
        success: false,
        message: 'Section or subsection did not found for these queries, Please try again!'
      })
    }

    //Advance validation
    //1st let check that particulr course contains given section or not
    let course = await Course.findOne(
      { _id: courseId, instructor: userId },
      {
        courseContent: {
          $elemMatch: {
            $eq: new mongoose.Types.ObjectId(sectionId)
          }
        }
      });

    //2nd check particular section contains given subsection or not
    const section = await Section.findOne(
      { _id: sectionId },
      {
        subSection: {
          $elemMatch: {
            $eq: new mongoose.Types.ObjectId(subSectionId)
          }
        }
      })

    if (course && course.courseContent.length > 0 && section && section.subSection.length > 0) {
      //Update section 
      const currSection = await Section.findByIdAndUpdate({ _id: sectionId }, {
        $pull: {
          subSection: subSectionId
        }
      },
    {new:true});

      //Then delete subSection
      await SubSection.findByIdAndDelete({ _id: subSectionId });
     
      // get Updated course
      course = await Course.findById(courseId)
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

      return res.status(200).json({
        success: true,
        message: "Subsection deleted sucessfully!",
        course
      })

    } else {

      return res.status(401).json({
        success: false,
        message: 'Can not create subsection!'
      })
    }

  } catch (error) {
    console.log('Error occured to delete subsection',error.message);
    return res.status(500).json({
      success: false,
      message: 'failed to delete subsection'
    })
  }
}
