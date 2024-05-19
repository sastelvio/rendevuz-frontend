import { Middleware } from "@reduxjs/toolkit";
import {
  showNotification,
  NotificationType,
} from "../slices/notificationSlice";
import { isRejectedWithValue, isFulfilled, PayloadAction } from '@reduxjs/toolkit';

export const axiosMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const errorMessage = action.payload && typeof action.payload === 'object' && 'message' in action.payload
        ? (action.payload as { message: string }).message
        : "An error occurred!";

      dispatch(
        showNotification({
          type: NotificationType.Error,
          message: errorMessage,
        })
      );
    } else if (isFulfilled(action)) {
      const successMessage = action.payload && typeof action.payload === 'object' && 'message' in action.payload
        ? (action.payload as { message: string }).message
        : "Success!";

      dispatch(
        showNotification({
          type: NotificationType.Success,
          message: successMessage,
        })
      );
    }

    return next(action);
  };