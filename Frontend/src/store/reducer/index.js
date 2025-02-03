import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice';
import fetchSlice from '../slices/fetchSlice';
import categorySlice from '../slices/categorySlice';
import courseSlice from '../slices/courseSlice';
import bagSlice from '../slices/bagSlice';
import instructorSlice from '../slices/insructor';


const appStore = configureStore({
  reducer:{
  auth:authSlice.reducer ,
  fetching:fetchSlice.reducer,
  category:categorySlice.reducer,
  course:courseSlice.reducer,
  bag:bagSlice.reducer,
  instructor:instructorSlice.reducer      
  }
})

export default appStore;