import express from "express";
const app = express();

//Imported  routes
import authRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import categoryRoutes from "./routes/category.js";
import profileRoutes from "./routes/profile.js";
import sectionRoutes from "./routes/section.js";
import subSectionRoutes from "./routes/subsection.js";
import reviewRoutes from "./routes/review.js";
import resetPasswordRoutes from "./routes/resetPassword.js";
import bagRoutes from "./routes/bag.js";
import instructorRoutes from './routes/instructor.js'


//Imported ConectedDB
import connectDB from "./config/connectDB.js";

//NPM Packages
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import connectCloudinary from "./config/connectCloudinary.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import bodyParser from "body-parser";
import paymentRoutes from "./routes/payment.js";



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


