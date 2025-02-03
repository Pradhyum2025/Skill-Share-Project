import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { User } from '../models/user.js';

//Auth
export const isAuth = async(req,res,next)=>{
   try{
    //body-->avoid   
    //cookie -->safe  
    //bearer token --> safe
    //Extract token from some request attributes
    const token = req.cookies.token
                    || req.body.token
                    || req.header('Authorisation').replace('Bearer ',"");
    
    //If token is missing
    if(!token){
      return res.status(401).json({
        success:false,
        Message:'Authentication token is missing'
      })
    }
    //Verify JWT token
    try{
      const decode = jwt.verify(token,process.env.JWT_SECRET);
      // console.log('decode : ',decode);
      //Every request has a user for authentication
      req.user = decode; 
      

    }catch(err){
      console.log('Failed to Authentication user error occured :',err.message);
      return res.status(500).json({
        success:false,
        message:"User authentication failed,Please try again!"
      })
    }
    // Returen next() middleware
    return next();

   }catch(error){
     console.log('IsAuth middleware error issue :',error.message);
     return res.status(500).json({
      success:false,
      message:'Internal server issue!'
     })
   }
}

//isStudent middleware function
export const isStudent =  async(req,res,next)=>{
   try{
    const {accountType} = req.user;
    if(accountType!=='Student'){
      return res.status(401).json({
        success:false,
        message:'This is a procted route for student only!'
      })
    } 

    return next();

   }catch(error){
    console.log("User role cannot be verifiied, please try again! :",error.message)
    return res.status(500).json({
      success:false,
      message:'User role cannot be verifiied, please try again!'
    })
   }
}


//isInstructor  middleware function
export const isInstructor =  async(req,res,next)=>{
  try{
   const {accountType} = req.user;
   if(accountType!=='Instructor'){
     return res.status(401).json({
       success:false,
       message:'This is a procted route for instructor only!'
     })
   } 

   return next();
   
  }catch(error){
   console.log("User role cannot be verifiied, please try again! :",error.message)
   return res.status(500).json({
     success:false,
     message:'User role cannot be verifiied, please try again!'
   })
  }
}


//isAdmin  middleware function
export const isAdmin =  async(req,res,next)=>{
  try{
   const {accountType} = req.user;
   if(accountType!=='Admin'){
     return res.status(401).json({
       success:false,
       message:'This is a procted route admin only!'
     })
   } 

   return next();
   
  }catch(error){
   console.log("User role cannot be verifiied, please try again! :",error.message)
   return res.status(500).json({
     success:false,
     message:'User role cannot be verifiied, please try again!'
   })
  }
}