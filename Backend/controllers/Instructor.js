
import { AccountStatusMailTemplate } from "../models/mailTemplates/AccountStatusMailTemplate.js";
import { User } from "../models/user.js"
import { mailSender } from "../utils/mailSender.js";

export const getAllInstructor = async(req,res)=>{
  try{
   let allInstructors = await User.find({accountType:'Instructor'},
    {
      firstName:true,
      lastName:true,
      email:true,
      image:true,
      courses:true,
      status:true,
      qualification:true,
      qualificationProof:true

    }).populate('additionalDetails');
   res.status(200).json({
    success:true,
    message:'Get all instructor success',
    allInstructors
   })

  }catch(error){
    console.log('All instructor get details errorr : ',error?.message)
    res.status(500).json({
      success:false,
      message:'Internal server error'
      
     })
  }
}

export const changeInstructorAccountStatus = async(req,res)=>{
  try{
    const {instructorId} = req.params;
    const userId = req.user.id;

    const admin = await User.findById(userId,{
      firstName:true,
      lastName:true,
      email:true
    });

    const currInstructor = await User.findById(instructorId);
    if(!currInstructor){
      res.status(400).json({
        success:false,
        message:'Instructor not found'
       })
    }

    currInstructor.status = currInstructor.status==='Active'?'Deactive':'Active';
    await currInstructor.save();

    //Send mail to instructor
    const insructorname= `${currInstructor.firstName} ${currInstructor.lastName}`
    const adminName = `${admin.firstName} ${admin.lastName}`
    const adminEmail = admin.email;
    const accountStatus = currInstructor.status;

    await mailSender(currInstructor.email,'Instructor account status updation mail',AccountStatusMailTemplate(insructorname,adminName,'SkillShare',accountStatus,adminEmail));
    res.status(200).json({
      success:true,
      message:'Update successfully'
     })


  }catch(error){
    console.log('Instructor profile status updation errorr : ',error?.message)
    res.status(500).json({
      success:false,
      message:'Internal server error'
      
     })
  }
}