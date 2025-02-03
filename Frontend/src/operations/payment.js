import axios from "axios";
import toast from "react-hot-toast";
import { bagSliceAction } from "../store/slices/bagSlice";

// -------- Razor pay script loader function ----------
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};



// -------------- Razor pay order creation handler ----------
export const capturePayment = async (courseId, token) => {
  
  // Ensure script is loaded
  const isLoaded = await loadRazorpay(); 
  if (!isLoaded) {
    alert("Failed to load Razorpay. Please check your internet connection.");
    return;
  }

 // After script load make order reuest
  try {
    const res = await axios.get(`http://localhost:8080/payment/${courseId}`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    })

    // console.log('Payment order creation response --->> :' , res);
    if (res.data?.success) {
      return res.data;
    }

  } catch (error) {
    console.log('Payment order creation error : ', error?.message);
    toast.error(error?.response?.data?.message, {position:'bottom-right', duration: 1000 });
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// -------------- Verify the Payment -----------------
export const verifyPayment = async (navigate,dispatch,bodyData,token) => {
  const toastId = toast.loading("Verifying Payment...");
  try {
    const res = await axios.post(`http://localhost:8080/payment`, bodyData, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    })
    // console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", res)

    if (!res.data.success) {
      throw new Error(res.data.message)
    }

    toast.success("Payment Successful. You are enrolled into the course")
    navigate("/dashbord/")
    dispatch(bagSliceAction.removeToBag(bodyData.courseId));
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error(error?.response?.data?.message)
  }
  toast.dismiss(toastId)
}