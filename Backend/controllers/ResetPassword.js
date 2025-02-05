import { User } from "../models/user.js"; 
import dotenv from 'dotenv'
dotenv.config();
import nodemailer from 'nodemailer';
import { mailSender } from "../utils/mailSender.js";
import bcrypt from'bcrypt'
import crypto from 'crypto'


//Reset password Token Generate handler function
export const resetPasswordToken = async(req,res)=>{
  
  try{
    // Get email from req ki body
    const {email} = req.body;
    console.log(email)
    //Validation
    if(!email){
      return res.status(401).json({
        success:false,
        message:'Email requires'
      })
    }
    //Check user registered
    const currUser  = await User.findOne({email});
    if(!currUser){
      return res.status(401).json({
        success:false,
        message:'User did not found!'
      })
    }
    //Generate token
    const token = crypto.randomUUID();

    //Update user by adding token and expiration time
    const updateDetails = await User.findOneAndUpdate(
                                      {email:email},
                                      {
                                        token:token,
                                        resetPasswordExpires:Date.now()+5*60*1000
                                     },
                                      {new:true}
                                      );
    //Create url
    const url  = `https://localhost:${process.env.PORT}/update-password/${token}`

    //Send url containing  mailto user
    const resopnse = await mailSender(email,
      'Password reset link',
       `Reset password through this link :${url}`
    )
    // console.log(resopnse);

    //Return resposne
    return res.status(200).json({
      success:true,
      message:'Reset password token generated successfully!',
      url,
    })


  }catch(error){
    console.log("Password reset token error :", error.message);
    return res.status(500).json({
      success:false,
      message:'error occured while generating reset password token!'
    })
  }
}

//Reset password
 export const resetPassword = async(req,res)=>{
    
  try{
    //Extract data from req ki body
    const {newPassword,confirmNewpassword,token} = req.body;
    //Validation
    if(!newPassword || !confirmNewpassword || !token){
      return res.status(401).json({
        success:false,
        message:'All fields are required like newpassword , confirmPassword and token'
      })
    }
    //Match password and confirm password
    if(newPassword!==confirmNewpassword){
      return res.status(401).json({
        success:false,
        message:'New password not match with confirm password, Please try again'
      })
    }
    //If user registered / exist by token
    const userDetails = User.findOne({token:token});

    if(!userDetails){
      return res.status(401).json({
        success:false,
        message:'Invalid token'
      })
    }
    //Check token has expired or NOT
    if(userDetails.resetPasswordExpires < Date.now()){
      return res.status(401).json({
        success:false,
        message:'Request time out ,Please make a new reuest for reset password again!'
      })
    }
    //Hash new password
    let hashedPassword = ''
    try{
     hashedPassword = await bcrypt.hash(newPassword,10);
    }catch(error){
      console.log('failed to hash password, Please try again');
      return res.status(401).json({
        success:false,
        message:'failed to hash password, Please try again'
      })
    }
    
    //Update new password
    await User.findOneAndUpdate(
                        {token:token},
                        {
                          password:hashedPassword
                        },
                        {new:true}
                        )
    //Send response
    return res.status(200).json({
      success:true,
      message:'Password reset successfully!'
    })

  }catch(error){
    console.log('Internal server error occured while reset password : ',error.message);

    return res.status(500).json({
      success:false,
      message:'Internal server error occured while reset password, Try again!'
    })
  }
 }