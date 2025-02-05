import express from 'express'
import { isAuth, isStudent } from '../middlewares/Auth.js';
import { createReview, deleteReview, getAvgRating, reviewsOfCourse } from '../controllers/Reviews.js';
const reviewRoutes = express.Router();

//Create review
reviewRoutes.post('/:courseId',isAuth,isStudent,createReview);

//Delete review
reviewRoutes.delete('/:courseId/:reviewId',isAuth,isStudent,deleteReview);

//Get all review of all courses
reviewRoutes.get('/',reviewsOfCourse);

//Get avg of review
reviewRoutes.get('/:courseId',getAvgRating);

//Get review of a specific course
reviewRoutes.get('/:courseId',reviewsOfCourse);

export default reviewRoutes;