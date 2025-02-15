import { User } from "../models/user.js";
import { Course } from "../models/course.js";
import instance from '../config/razorpay.js'
import { mailSender } from "../utils/mailSender.js";
import mongoose from "mongoose";
import crypto from 'crypto'
import { enrollmentEmailTemplate } from "../models/mailTemplates/PaymentSucessMail.js";


// -----------create payament OR capture payment handler -----------
export const capturePayment = async (req, res) => {
  //get courseId and userId
  const { course_Id } = req.params;
  const user_Id = req.user.id;

  // -------- 1.validate user id
  let user = await User.findById(user_Id).populate('additionalDetails');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'did not find any choosen Course'
    })
  }
  //Modify user info

  user = {
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    contact: user.additionalDetails?.contact
  }

  //   ----------- 2.validate courseID
  if (!course_Id) {
    return res.status(401).json({
      success: false,
      message: 'did not find any choosen Course'
    })
  }

  //------------ validate courseDetails
  try {

    let course = await Course.findById(course_Id);

    if (!course) {
      return res.status(401).json({
        success: false,
        message: 'Course did not found'
      })
    }


    //user already pay for this course or NOT
    const uid = new mongoose.Types.ObjectId(user_Id);
    if (course.enrolledStudent.includes(uid)) {
      return res.status(401).json({
        success: false,
        message: 'Student is already enrolled in course!'
      })
    }

    // ---------- Order creation ----------
    const amount = course.price;
    const currency = 'INR'

    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_Id,
        userId: user_Id
      }
    }

    try {

      //initialize the payment using razorpay
      const paymentResponse = await instance.orders.create(options);

      // --------- return response ------------
      return res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_KEY,
        user,
        courseName: course.courseName,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount

      })
    } catch (error) {
      console.log('Payement capture error to create instance: ', error)
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }


  } catch (error) {
    console.log('Payement capture error : ', error?.message)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }

}

// verify the payment
export const varifySignature = async (req, res) => {
   
  try{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courseId = req.body?.courseId
    const userId = req.user.id
  
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed"
      })
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courseId, userId, res,razorpay_payment_id,);
      return res.status(200).json({
         success: true, 
         message: "Payment Verified" 
        })
    }else{
      return res.status(400).json({
         success: false,
          message: "Payment not varified" 
        })
    }

  }catch(error){
    console.log('Signature verification error ', error.message)
    return res.status(500).json({ 
      success: false, 
      message: "Payment Failed" 
      })
  }
}

//Verify signature of razorpay and server
const enrollStudents = async (courseId, userId, res,razorpay_payment_id) => {
  try {
    //Validatiions
    if (!courseId || !userId || !res) {
      return res.status(400).json({
        success: false,
        message: 'Course details or user details missed'
      })
    }

    // --------- find the course and enroll student in it
    const enrolledCourse = await Course.findByIdAndUpdate({ _id: courseId },
      {
        $push: {
          enrolledStudent: userId
        }
      },
      { new: true }
    )

    if (!enrolledCourse) {
      return res.status(400).json({
        success: false,
        message: 'Course not found!'
      })
    }

    // -------- find the student and add course in it
    const enrolledStudent = await User.findByIdAndUpdate({ _id: userId },
      {
        $push: {
          courses: courseId
        }
      },
      { new: true })
   

    // send mail to user that user has enrolled in course
    await mailSender(
      enrolledStudent.email,
      'Payment verification mail from Skill_Share',
    enrollmentEmailTemplate(enrolledCourse.courseName, 'Skill_Share', razorpay_payment_id, enrolledCourse.price));
   

  } catch (error) {

  console.log('Student enrollment eroro',error?.message)
  //return response
   return res.status(500).json({
    success: false,
    message: 'Internal server error'
  })

  }
}
