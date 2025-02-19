import express from "express";
const app = express();

//Imported  routes
import authRoutes from "./routes/User.js";
import courseRoutes from "./routes/Course.js";
import categoryRoutes from "./routes/Category.js";
import profileRoutes from "./routes/Profile.js";
import sectionRoutes from "./routes/Section.js";
import subSectionRoutes from "./routes/SubSection.js";
import reviewRoutes from "./routes/Review.js";
import resetPasswordRoutes from "./routes/ResetPassword.js";
import bagRoutes from "./routes/Bag.js";
import instructorRoutes from './routes/Instructor.js'


//Imported ConectedDB
import connectDB from "./config/connectDB.js";

//NPM Packages
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import connectCloudinary from "./config/connectCloudinary.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import bodyParser from "body-parser";
import paymentRoutes from "./routes/Payment.js";



//load env file
dotenv.config(); 
const PORT = process.env.PORT || 4040 ;

//connect database
connectDB();

app.use(cors(
  {
    origin:'http://localhost:5173',
  }
))
  

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({
  useTempFiles: true
}));

//config connectCloudinary
connectCloudinary();

//all routers
app.use('/auth',authRoutes);
app.use('/course',courseRoutes);
app.use('/category',categoryRoutes);
app.use('/profile',profileRoutes);
app.use('/section',sectionRoutes);
app.use('/subSection',subSectionRoutes);
app.use('/review',reviewRoutes);
app.use('/resetPassword',resetPasswordRoutes)
app.use('/bag',bagRoutes)
app.use('/instructor',instructorRoutes);
app.use('/payment',paymentRoutes);


//Def route
app.get("/",(req,res)=>{
  console.log("Listing at home rotes!");
  res.status(200).json({
    success:true,
    message:'You are at home route! Welcome'
  })

})
//Activate the server
app.listen(PORT,()=>{
  console.log(`Port started at port number ${PORT}`);
})


