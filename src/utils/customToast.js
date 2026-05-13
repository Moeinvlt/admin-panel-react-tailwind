import { toast } from "react-toastify"

const defaultOptions = {
    autoClose: 3000,             
    closeOnClick: true,            
    pauseOnHover: true,           
    draggable: true,
    closeButton: false,
    // theme: "dark"  
}

export const Toasty = (message, type = 'default', customOptions = {}) => {

  const finalOptions = { ...defaultOptions, ...customOptions };


  switch (type) {
    case 'success':
      toast.success(message, finalOptions);
      break;
    case 'error':
      toast.error(message, finalOptions);
      break;
    case 'info':
      toast.info(message, finalOptions);
      break;
    case 'warning':
      toast.warning(message, finalOptions);
      break;
    default:
      toast(message, finalOptions);
  }
};