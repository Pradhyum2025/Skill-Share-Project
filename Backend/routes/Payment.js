import express from 'express'
import { isAuth,isStudent } from '../middlewares/auth.js';
import { capturePayment, varifySignature } from '../controllers/payment.js';
const paymentRoutes = express.Router();

//capture payement
paymentRoutes.get("/:course_Id",isAuth,isStudent,capturePayment);

//varifySinganture
paymentRoutes.post('/',isAuth,isStudent,varifySignature);

export default paymentRoutes;

