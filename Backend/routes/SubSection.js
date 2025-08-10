import express from "express"
import { isAuth, isInstructor } from "../middlewares/Auth.js";
import { createSubSection, deleteSubSection, updateSubSection } from "../controllers/Subsection.js";
const subSectionRoutes = express.Router();

//create subSection
subSectionRoutes.post('/:courseId/:sectionId/',isAuth,isInstructor,createSubSection);

//update subSection
subSectionRoutes.patch('/:courseId/:sectionId/:subSectionId/',isAuth,isInstructor,updateSubSection);

//delete subSection
subSectionRoutes.delete('/:courseId/:sectionId/:subSectionId/',isAuth,isInstructor,deleteSubSection);

export default subSectionRoutes;

  