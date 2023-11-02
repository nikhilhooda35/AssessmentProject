import { createAction} from "@reduxjs/toolkit";

/**
 * Forgot Password Slice
 */

export const forgotPasswordCreator = createAction(
  "FORGOT_PASSWORD"
);

export const forgotPasswordCreatorTypeName = forgotPasswordCreator().type;
