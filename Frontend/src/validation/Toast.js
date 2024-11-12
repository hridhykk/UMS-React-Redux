import { ToastContainer,toast } from "react-toastify";

export const showToastMessage = (message,type) => {
    const options ={
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
    }

    if(type === 'error'){
        toast.error(message,options)
    }else if(type === 'success'){
        toast.success(message,options)
    }
    
  };