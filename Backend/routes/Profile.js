import express from 'express'
import { deleteAccount, getUserDetails, updateProfile, updateProfilePicture } from '../controllers/profile.js';
import { isAuth, isStudent } from '../middlewares/auth.js';
const profileRoutes = express.Router();

//Get curr user details
profileRoutes.get("/",isAuth,getUserDetails);

//Update profile picture
profileRoutes.patch('/picture',isAuth,updateProfilePicture);

//Update profile
profileRoutes.patch('/details',isAuth,updateProfile);

//Delete profile
profileRoutes.delete('/',isAuth,isStudent,deleteAccount)


export default profileRoutes;