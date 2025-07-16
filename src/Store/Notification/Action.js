import axios from "axios";
import {
  MARK_ALL_NOTIFICATIONS_READ_REQUEST,
  MARK_ALL_NOTIFICATIONS_READ_SUCCESS,
  MARK_ALL_NOTIFICATIONS_READ_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE,
} from "./ActionType";
import { api } from "../../config/api";
import { toast } from "react-toastify";

// 🔔 Mark all notifications as read
export const markAllNotificationsAsRead = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_ALL_NOTIFICATIONS_READ_REQUEST });

    await  api.put("/api/noti/read");

    dispatch({ type: MARK_ALL_NOTIFICATIONS_READ_SUCCESS });
  } catch (error) {
    dispatch({
      type: MARK_ALL_NOTIFICATIONS_READ_FAILURE,
      payload: error.response?.data?.message || error.message,
    });

  }
};


export const deleteNotification = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_NOTIFICATION_REQUEST });

    await api.delete(`/api/noti/${id}`);

    dispatch({ type: DELETE_NOTIFICATION_SUCCESS, payload: id });
    toast.success("Delete Notification Successful!")
  } catch (error) {
   toast.error(error.response?.data?.message || "Delete Noti Fail!");
    
    dispatch({
      type: DELETE_NOTIFICATION_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// export const deleteNotification = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: DELETE_NOTIFICATION_REQUEST });

//     const {
//       auth: { token },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     await api.delete(`/api/noti/${id}`);

//     dispatch({ type: DELETE_NOTIFICATION_SUCCESS, payload: id });
//     toast.success("Delete Notification Successful!");
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || "Delete Notification Failed!";
//     toast.error(errorMessage);

//     dispatch({
//       type: DELETE_NOTIFICATION_FAILURE,
//       payload: errorMessage,
//     });
//   }
// };

