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
<<<<<<< HEAD
import DashBoardRoute from './DashBoardRoute.jsx';
=======
>>>>>>> 428ba9dfc8708b3c3a8820e623bfd3793c30a4f7


const router = createBrowserRouter  ([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/signup', element: <Signup /> },
      { path: '/otp', element: <OTP /> },
    ]
<<<<<<< HEAD
  } ,
  {
    path: '/dashbord',
    element: <DashBoardRoute />
=======
>>>>>>> 428ba9dfc8708b3c3a8820e623bfd3793c30a4f7
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
