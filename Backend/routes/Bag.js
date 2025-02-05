import express from 'express'
import { addToBag, getMyBag, removeToBag } from '../controllers/Bag.js';
import { isAuth, isStudent } from '../middlewares/Auth.js';
const bagRoutes = express.Router();

//Add to cart
bagRoutes.get('/',isAuth,isStudent,getMyBag);

//Add to cart
bagRoutes.get('/addToBag/:courseId/',isAuth,isStudent,addToBag);

//Remove to cart
bagRoutes.get('/removeToBag/:courseId',isAuth,isStudent,removeToBag);

export default bagRoutes;