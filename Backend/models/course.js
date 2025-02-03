import mongoose from "mongoose";

const courseSchema  = new mongoose.Schema({
    courseName:{
      type:String,
      required:true,
      trim:true
    },
    instructor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    whatYouWillLearn:{
      type:String,
      required:true,
      trim:true
    },
    status:{
      type:String,
      enum:['Draft','Approved'],
      default:'Draft'
    } 
    ,
    courseContent:[
      {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Section',
      }
    ],
    reviews:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review',
      }
    ],
    price:{
      type:Number,
      required:true,
      minimum: 0,
    },
    thumbnail:{
      type:String,
      required:true,
    },
    tag:{
      type:[String]
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category',
      },
    enrolledStudent:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
    }],
    language:{
      type:String,
      enum:["Hindi","English","Hindi_english"],
      required:true
    },
    createdAt:{
      type:Date,
      default:Date.now(),
    }
})

export const Course = mongoose.model('Course',courseSchema);

