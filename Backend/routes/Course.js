import express from 'express'
import { isAdmin, isAuth, isInstructor } from '../middlewares/Auth.js';
import { createCourse, getAllCourses, getCourseDetailsForView, getCourseDetailsofUser, getCoursesByAdmin, getFilteredCourses, getUserAllCourse, setCourseStatus } from '../controllers/Course.js';
const courseRoutes = express.Router();

//create course
courseRoutes.post('/',isAuth,isInstructor,createCourse);

//get all course
courseRoutes.get('/',getAllCourses);

//get user course
courseRoutes.get('/user',isAuth,getUserAllCourse);

//get user course
courseRoutes.get('/view/:courseId',getCourseDetailsForView);

//get specific course
courseRoutes.get('/:courseId',isAuth,getCourseDetailsofUser);

//get specific course
courseRoutes.get('/filter/:categoryId',getFilteredCourses);

//get specific course
courseRoutes.get('/filter/admin/:categoryId',isAuth,isAdmin,getCoursesByAdmin);


//set  course status
courseRoutes.get('/status/:courseId',isAuth,isAdmin,setCourseStatus);

export default courseRoutes;