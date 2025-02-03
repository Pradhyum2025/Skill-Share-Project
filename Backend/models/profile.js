import mongoose from "mongoose";

const profileSchema  = new mongoose.Schema({
  gender:{
    type:String,
    enum:["Male","Female","Other"]
  },
  dateOfBirth:{
    type:String
  },
  about:{
    type:String
  },
  contact:{
    type:Number,
    trim:true
  }
  
})


export const Profile = mongoose.model('Profile',profileSchema);