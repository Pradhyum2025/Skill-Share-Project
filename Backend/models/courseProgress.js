import mongoose from "mongoose";

const courseProgressSchema  =new mongoose.Schema({
  courseID:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Coures"
    },
    compeletedVideo:[{
       type:mongoose.Schema.Types.ObjectId,
      ref:"subsection"
    }]

})

export const CourseProgress = mongoose.model('CourseProgress',courseProgressSchema);

