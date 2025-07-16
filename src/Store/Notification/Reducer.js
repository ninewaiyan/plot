import {
  MARK_ALL_NOTIFICATIONS_READ_REQUEST,
  MARK_ALL_NOTIFICATIONS_READ_SUCCESS,
  MARK_ALL_NOTIFICATIONS_READ_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE,
} from "../Actions/ActionType";

const initialState = {
  notifications: [], // store them locally if not in auth
  loading: false,
  error: null,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARK_ALL_NOTIFICATIONS_READ_REQUEST:
    case DELETE_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case MARK_ALL_NOTIFICATIONS_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: state.notifications.map((n) => ({
          ...n,
          read: true,
        })),
      };

    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };

    case MARK_ALL_NOTIFICATIONS_READ_FAILURE:
    case DELETE_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
