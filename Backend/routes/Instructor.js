import express from 'express'
import { isAdmin, isAuth } from '../middlewares/Auth.js';
import { changeInstructorAccountStatus, getAllInstructor } from '../controllers/Instructor.js';

const instructorRoutes = express.Router();

instructorRoutes.get('/',isAuth,isAdmin,getAllInstructor)

instructorRoutes.get('/:instructorId',isAuth,isAdmin,changeInstructorAccountStatus)

export default instructorRoutes;