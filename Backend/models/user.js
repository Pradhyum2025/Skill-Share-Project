import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true
  },
  lastName:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum:['Approved','NotApproved'],
  },
  status:{
    type:String,
    enum:['Active','Deactive'],
    default:'Deactive'
  }
  ,
  qualification:{
    type:String,
    
  },
  qualificationProof:{
    type:String
  },
  password:{
    type:String,
    required:true,
  },
  accountType:{
    type:String,
    enum:["Admin","Student","Instructor"],
    required:true
  },
  token:{
    type:String
  },
  resetPasswordExpire:{
    type:Date 
  },
  additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Profile",
  },
  courses:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Course"
    }
  ],
  image:{
    type:String
  },
  bag:{
    type:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Course"
    }]
  },
  courseProgress:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"CourseProgress"
    }
  ]

})

export const User = mongoose.model('User',userSchema);

