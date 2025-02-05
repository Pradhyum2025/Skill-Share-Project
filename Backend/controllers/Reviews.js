import { Review } from '../models/review.js'
import { Course } from '../models/course.js';
import mongoose from 'mongoose';

//Create review
export const createReview = async (req, res) => {
  try {
    //Get data from req ki body
    const { rating, comment } = req.body;
    //Get courseId from req ke params
    const { courseId } = req.params;
    const userId = req.user.id;

    //Validation
    if (!rating || !comment || !courseId) {
      return res.status(401).json({
        success: false,
        message: 'All fields are reuired, Please try again!'
      })
    }
    //Check review validity

    //Check user is enrolled this course or not
    const courseDetails = await Course.findOne({ _id: courseId }, {
      enrolledStudent: { $elemMatch: { $eq: userId } }
    });

    if (!courseDetails) {
      return res.status(401).json({
        success: false,
        message: "Restricted route for enrolled students for this course!"
      })
    }
    
    //Check user has already review this course or not
    const alreadyReview = await Review.findOne({
      createdBy:userId,
      course:courseId
    })
    if(alreadyReview){
      return res.status(401).json({
        success: false,
        message: "User review already present there!"
        })
      }

    // Create new review
    const newReview = await Review.create({
      rating,
      comment,
      createdBy: userId,
      course:courseId
    },
  {new:true});

    //Push new review in curr course
    const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
      {
        $push: {
          reviews: newReview._id
        }
      }
    )

    return res.status(200).json({
      success: true,
      message: 'Review posted suceesfully'
    })

  } catch (err) {
    console.log("error occured while creating review :", err.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to create review, Please try again!'
    })

  }
}

//delete review
export const deleteReview = async (req, res) => {
  try {
    //fetch parameters from req.params
    let { CourseId, reviewId } = req.params;
    const userId = req.user.id;

    if (!CourseId || !reviewId) {
      return res.status(401).json({
        success: false,
        message: 'Can not find course or review details'
      })
    }

    const review = await Review.findById(reviewId);

    if (review && review.createdBy.equals(userId)) {

      //first remove this review from course
      await Course.findByIdAndUpdate({ _id: CourseId },
        {
          $pull:
          {
            reviews: reviewId
          }
        });
      //delete review
      await Review.findByIdAndDelete(reviewId);

      //return response
      return res.status(200).json({
        success: true,
        message: 'Review deleted suceesfully'
      })
    }
  } catch (error) {
    console.log("error occured while deleting review :", error.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to delete review,Please try again!'
    })

  }
}

//find average of reviews handler
export const getAvgRating = async (req, res) => {
  try {
    const { courseId } = req.params;

    //get avarage of all reviews those present in course
    const result = await Review.aggregate([
      // Step 1: Match reviews whose course id match with courseId
      {
        $match: {
          course:new mongoose.Types.ObjectId(courseId),
        }
      },
      // Step 2: Group the matched reviews and calculate the average rating
      {
        $group: {
          _id: null, // Group by null to calculate the overall average
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    // If no reviews are found, return 0
    const averageRating = result.length > 0 ? result[0].averageRating : 0;

    //return response
    return res.status(200).json({
      success: true,
      message: "Avg of all reviews calculated successfully",
      averageRating
    })

  } catch (error) {

    console.log("error occured while getting avg of all reviews :", error.message)

    return res.status(500).json({
      success: false,
      message: 'Failed to  getting avg of all reviews Please try again!'
    })

  }
}

//get all review of a course handler
export const reviewsOfCourse = async (req, res) => {
  try {
    //fetch data
    const {courseId} = req.params;

    //validation
    if(!courseId){
      return res.status(401).json({
        success: false,
        message: 'course ID missing'
      })
    }
    //fetch reviews
    const allReviewsDetails = await Review.findById({course:courseId})
    .sort({rating:'desc'})
    .populate({
      path:'createdBy',
      select:'firstName lastName email image'
    })
    .populate({
      path:'course',
      select:'courseName'
    })
    .exec();

    //return res
    return res.status(200).json({
      success: true,
      message: 'reviews of course fetched successfully!',
      data:allReviewsDetails
    })
  } catch (error) {
    console.log("error occured while getting all reviews :", error.message)

    return res.status(500).json({
      success: false,
      message: 'Failed to  getting all reviews Please try again!'
    })
  }
}

//get all reviews handler
export const allReviewsOfAllCourses = async (req, res) => {
  try {

    //fetch all reviews
    const allReviews = await Review.find()
    .sort({rating:'desc'})
    .populate({
      path:'createdBy',
      select:'firstName lastName email image'
    })
    .populate({
      path:'course',
      select:'courseName'
    })
    .exec();

    //return res
    return res.status(200).json({
      success: true,
      message: 'all reviews fetched successfully!',
      data:allReviews
    })
  } catch (error) {
    console.log("error occured while getting all reviews :", error.message)

    return res.status(500).json({
      success: false,
      message: 'Failed to  getting all reviews Please try again!'
    })
  }
}
