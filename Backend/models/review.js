import mongoose from "mongoose";


const reviewSchema  =new mongoose.Schema({
  rating:{
    type:Number,
    required:true,
    minimum:1,
    maximum:5,
  },
  comment:{
    type:String,
    required:true,
    trim:true
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  createdAt:{
    type:String,
    default: Date.now()
  },
  course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
  }

})

export const Review = mongoose.model('Review',reviewSchema);

