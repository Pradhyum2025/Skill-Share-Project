import express from 'express'
import { isAdmin, isAuth } from '../middlewares/auth.js';
import { changeInstructorAccountStatus, getAllInstructor } from '../controllers/instructor.js';

const instructorRoutes = express.Router();

instructorRoutes.get('/',isAuth,isAdmin,getAllInstructor)

instructorRoutes.get('/:instructorId',isAuth,isAdmin,changeInstructorAccountStatus)

export default instructorRoutes;