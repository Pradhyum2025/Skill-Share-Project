import { redirect } from "react-router-dom";

export default function isUserAdmin(){

  const currUser = JSON.parse(localStorage.getItem('currUser'));
  console.log(currUser)
  if(currUser?.accountType==='Admin'){
    return redirect('/dashbord/categories');
  }else{
    return;
  }
  }