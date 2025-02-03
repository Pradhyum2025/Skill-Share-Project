import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: 'course',
  initialState: [],
  reducers: {
    setCourses: (state, action) => {
      return [...action.payload]
    },
    setSingleCourses: (state, action) => {
      return [action.payload]
    }
    ,
    setCourseStatus: (state, action) => {
      state.map(course => {
        if (course._id === action.payload) {
          course.status = course.status === 'Approved' ? 'Draft' : 'Approved';
        }
      })
      return state;
    }
  }
})

export default courseSlice;

export const courseSliceAction = courseSlice.actions;