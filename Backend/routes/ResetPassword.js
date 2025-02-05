import express from 'express'
import { resetPassword, resetPasswordToken } from '../controllers/ResetPassword.js';
const resetPasswordRoutes = express.Router();

//Generate resetPassword token
resetPasswordRoutes.post("/reset-password-token",resetPasswordToken);

//Reset password route
resetPasswordRoutes.post("/reset-password",resetPassword)

export default resetPasswordRoutes;