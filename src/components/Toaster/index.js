import { ToastType, ToasterService } from "services/toaster";

const Toaster = ToasterService();

export const ErrorToaster = (errorMessage) => {
  Toaster.showToaster(errorMessage, ToastType.ERROR);
};

export const SuccessToaster = (successMessage) => {
  Toaster.showToaster(successMessage, ToastType.SUCCESS);
};
