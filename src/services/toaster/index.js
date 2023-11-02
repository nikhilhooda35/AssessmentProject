import { Typography } from "@mui/material";
import { toast } from "react-toastify";

export const ToastType = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  SUCCESS_ACTION: "success_action",
  ATTENTION: "attention",
};

const toastId = {
  current: null,
};
const actionToastStyle = {
  backgroundColor: "white",
  color: "white",
  borderRadius: 20,
};
const actionToastStyleRed = {
  backgroundColor: "red",
  color: "white",
  borderRadius: 20,
  width: 350,
};
const closeButton = ({ closeToast }) => {
  return (
    <Typography
      fontSize={14}
      noWrap
      component="div"
      color={"#fff"}
      minWidth="60px"
      alignSelf="center"
      fontWeight={"700"}
      fontFamily={"Poppins"}
      onClick={closeToast}
      fontStyle={"bold"}
    >
      OKAY
    </Typography>
  );
};
export const ToasterService = () => {
  const showToaster = (message, type, onCloseCallback) => {
     if (message && message.length > 0 && type && type.length > 0) {
      if (type === ToastType.SUCCESS) {
         toastId.current = toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (type === ToastType.SUCCESS_ACTION) {
        hideToaster();
        toastId.current = toast.success(message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          icon: false,
          draggable: false,
          progress: undefined,
          style: actionToastStyle,
          closeButton: closeButton,
        });
      }
      if (type === ToastType.ERROR) {
        toastId.current =  toast.error(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (type === ToastType.ATTENTION) {
        hideToaster();
        toastId.current = toast.error(message, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          icon: false,
          draggable: false,
          progress: undefined,
          style: actionToastStyleRed,
          closeButton: closeButton,
          onClose: () => onCloseCallback && onCloseCallback(),
        });
      }
      if (type === ToastType.WARNING) {
        toastId.current = toast.warn(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const hideToaster = () => {
    toast.dismiss(toastId.current);
  };

  return {
    showToaster,
    hideToaster,
  };
};
