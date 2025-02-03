import mongoose from "mongoose";

const subSectionSchema  = new mongoose.Schema({
    title:{
      type:String,
      required:true,
      trim:true
    },
    timeDuration:{
      type:String,
      required:true,
      trim:true
    },
    description:{
      type:String,
      required:true,
      trim:true
    },
    videoUrl:{
      type:String,
      required:true,
      trim:true
    }
})

export const SubSection = mongoose.model('SubSection',subSectionSchema);

