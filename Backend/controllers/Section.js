import { populate } from "dotenv";
import { Course } from "../models/course.js";
import { Section } from "../models/section.js";
import { User } from "../models/user.js";
import { SubSection } from "../models/subsection.js";
import mongoose from "mongoose";


//Create section handler function
export const createSection = async (req, res) => {
  try {
    //Data extract from req. ki body
    const { sectionName } = req.body;
    const { courseId } = req.params;

    //Validation
    if (!sectionName || !courseId) {
      return res.status(401).json({
        success: false,
        message: 'All fields are required!'
      })
    }
    //Create new section
    const newSection = await Section.create({ sectionName });
    //Push section in course
    const updateCourse = await Course.findByIdAndUpdate(courseId,
      {
        $push: {
          courseContent: newSection._id
        }
      },
      { new: true })
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
      

    //Return res
    return res.status(200).json({
      success: true,
      message: 'Section created succeefully',
      updateCourse
    })
  } catch (error) {
    console.log("Section creation error : ", error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create new section, Please try again!'
    })
  }
}

//Update section handler function
export const updateSection = async (req, res) => {
  try {
    //Extract data
    const { sectionName } = req.body;
    const { courseId, sectionId } = req.params;
    const userId = req.user.id;

    //Validation
    if (!sectionName || !courseId || !sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required! Try again',
      })
    }

    const course = await Course.findOne(
      { _id: courseId, instructor: userId }
      ,
      {
        courseContent: {
          $elemMatch: {
            $eq: new mongoose.Types.ObjectId(sectionId)
          }
        }
      }
    );


    //Check of course and section
    if (course && course.courseContent.length > 0) {

      //update section
      const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId }, { sectionName: sectionName }, { new: true })
      
      const updatedCourse = 
      await Course.findById(courseId)
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

      //return resonse
      return res.status(200).json({
        success: true,
        message: 'Section updated succeefully',
        updatedCourse
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "Section can not update!",
      })
    }
  } catch (error) {
    console.log('Section updation error :', error.message)
    return res.status(500).json({
      success: false,
      message: 'Section updation has been failed, Please try again!',
    })
  }
}

//delete section
export const deleteSection = async (req, res) => {
  try {
    //extract data from params
    const { courseId, sectionId } = req.params;
    const userId = req.user.id;

    //validation
    if (!courseId || !sectionId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required! Try again',
      })
    }

    //Advance validation
    let course = await Course.findOne({ _id: courseId, instructor: userId }, { courseContent: { $elemMatch: { $eq: sectionId } } });
    
    console.log("COURSE : ",course)

    if (course && course.courseContent.length > 0) {
      //delete section -- follow some steps

      // 1.remove this section from course
      course = await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } }, { new: true })
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

      // 2.find subsection which present in section and delete these subsection parmanently
      const currSection = await Section.findByIdAndDelete({_id:sectionId},{new:true});
      
      //currSection.subSection is an array of subsection objectID's
      await SubSection.deleteMany({ _id: { $in: currSection.subSection } })  

  
      //return response
      return res.status(200).json({
        success: true,
        message: 'Section has been deleted',
        course
      })
    } else {
      return res.status(401).json({
        success: false,
        message: "Section can not deleted!",
      })
    }

  } catch (error) {
    console.log('section deletation error : ', error.message);
    return res.status(500).json({
      success: false,
      message: 'Section deletation has been failed, Please try again!',
    })
  }
}