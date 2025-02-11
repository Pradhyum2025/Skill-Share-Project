import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto'; // Defaults to weight 400
import './index.css'

import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import App from './App.jsx';
import Signup from './components/core/Auth/Signup.jsx';
import Home from './components/core/Home/Home.jsx'
import OTP from './components/core/Auth/OTP.jsx'
import { Provider, useSelector } from 'react-redux';
import appStore from './store/reducer/index.js';
import DashBoardRoute from './DashBoardRoute.jsx';
import CoursePage from './components/core/Course/MainCoursePage/CoursePage.jsx';
import CreateCourse from './components/core/Course/Instructor/CreateCourse.jsx'
import ShowCourseDetails from './components/core/Course/MainCoursePage/ShowCourseDetails.jsx';
import MyCourse from './components/core/Course/MyCourse.jsx';
import UserProfile from './components/core/User/Profile.jsx';
import {BagPage} from './components/core/User/BagPage.jsx'
import Student_ViewCourseContent from './components/core/Course/Student/ViewCourseContent.jsx';
import AboutUs from './components/core/other/About.jsx'
import ContactUs  from './components/core/other/ContactUs.jsx'
import { Instructor_ShowCourseDetails } from './components/core/Course/Instructor/ShowCourseDetails.jsx';

const router = createBrowserRouter  ([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/signup', element: <Signup /> },
      { path: '/course', element: <CoursePage /> },
      { path: '/show/:courseId', element: <ShowCourseDetails /> },
      { path: '/otp', element: <OTP /> },
      { path: '/cart', element: <BagPage /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/contactUs', element: <ContactUs /> },
      { path: '/student/course/show/:courseId', element: <Student_ViewCourseContent /> },
    ]

  } ,
  {
    path: '/dashbord',
    element: <DashBoardRoute />,
    children:[
      { path: '/dashbord/createCourse', element: <CreateCourse/> },
      { path: '/dashbord', element: <MyCourse /> ,},
      { path: '/dashbord/myProfile', element: <UserProfile/> },
      { path: '/dashbord/cart', element: <BagPage /> }, 
      { path: '/dashbord/show/:courseId', element: <Instructor_ShowCourseDetails /> },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
