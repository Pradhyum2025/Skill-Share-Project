import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";
import { varificationMailTemplate } from "./mailTemplates/MailVerificationTemplate.js";

const otpSchema  =new mongoose.Schema({
  email:{
    type:String,
    required:true,
    trim:true
  },
  otp:{
    type:Number,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:10*60
  }

})

//a functiom  -> send email
async function sendVarificationEmail(email,otp) {
  try{
    const mailResponse = await mailSender(email,'varification Email from Pradhyum Garashya',otp)
   
    // console.log('Mail send successfully :',mailResponse);
  }catch(err){
    console.log("error occured while sending mails :",err)
  }
}

//calling pre hook function
otpSchema.pre('save',async function (next) {
  await sendVarificationEmail(this.email,varificationMailTemplate(this.otp));
})

export const  OTP = mongoose.model('OTP',otpSchema);

