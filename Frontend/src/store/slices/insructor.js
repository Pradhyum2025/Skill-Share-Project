import { createSlice } from "@reduxjs/toolkit";

const instructorSlice  = createSlice({
  name:'insructor',
  initialState:[],
  reducers:{
    setInstructorData:(state,action)=>{
     return [...action.payload]
    },
    ChangeStatus:(state,action)=>{
      state.map(instructor=>{
        if(instructor._id===action.payload){
          instructor.status = instructor.status==='Active'?'Deactive':'Active';
        }
      })
      return state;
    }
  }
})

export default instructorSlice;

export const insructorSliceAction = instructorSlice.actions;