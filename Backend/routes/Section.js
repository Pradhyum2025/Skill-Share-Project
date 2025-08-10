import express from 'express'
import {isAuth, isInstructor } from '../middlewares/auth.js';
import { createSection, deleteSection, updateSection } from '../controllers/section.js';
const sectionRoutes = express.Router();

//create section
sectionRoutes.post('/:courseId',isAuth,isInstructor,createSection);

//update
sectionRoutes.patch('/:courseId/:sectionId',isAuth,isInstructor,updateSection);

//delete
sectionRoutes.delete('/:courseId/:sectionId',isAuth,isInstructor,deleteSection);

export default sectionRoutes;
