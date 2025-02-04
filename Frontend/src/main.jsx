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


const router = createBrowserRouter  ([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/signup', element: <Signup /> },
      { path: '/otp', element: <OTP /> },
    ]
  } ,
  {
    path: '/dashbord',
    element: <DashBoardRoute />
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
