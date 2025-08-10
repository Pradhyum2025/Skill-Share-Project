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
 
const SubSection = mongoose.model('SubSection',subSectionSchema);

export { SubSection };

