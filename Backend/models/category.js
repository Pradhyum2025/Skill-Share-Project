import mongoose from "mongoose";

const categorySchema  = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
  ,
  categoryCourses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
  }]

})

export const Category = mongoose.model('Category',categorySchema);

