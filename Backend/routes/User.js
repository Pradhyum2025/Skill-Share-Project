import express from 'express'
import {  changePassword, login, sendOTP, signup } from '../controllers/auth.js';
import { isAuth } from '../middlewares/auth.js';

const authRoutes = express.Router();

//Send OTP 
authRoutes.post('/otp',sendOTP);
//signup for user
authRoutes.post('/signup',signup);

//login for user
authRoutes.post('/login',login);

//changePaswword for user
authRoutes.post('/changePassword',isAuth,changePassword)


export default authRoutes;