import { toast, ToastOptions, ToastPosition } from "react-toastify"

const notificationService = {
   success: (message: string, position: ToastPosition = "top-center", options?: ToastOptions) => {
      toast.success(message, {
         position,
         autoClose: 10000,
         draggable: true,
         ...options,
      })
   },
   error: (message: string, position: ToastPosition = "top-center", options?: ToastOptions) => {
      toast.error(message, {
         position,
         autoClose: 3000,
         draggable: true,
         ...options,
      })
   },
   info: (message: string, position: ToastPosition = "top-center", options?: ToastOptions) => {
      toast.info(message, {
         position,
         autoClose: 3000,
         draggable: true,
         ...options,
      })
   },
   warning: (message: string, position: ToastPosition = "top-center", options?: ToastOptions) => {
      toast.warn(message, {
         position,
         autoClose: 3000,
         draggable: true,
         ...options,
      })
   },
}

export default notificationService

// autoClose: 3000,
// closeOnClick: true,

// style: {
//     backgroundColor: '#4CAF50', // Customize background color
//     color: '#FFFFFF', // Customize text color
// },
