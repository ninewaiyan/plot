import { DELETE_NOTIFICATION_SUCCESS, MARK_ALL_NOTIFICATIONS_READ_SUCCESS } from "../Notification/ActionType";
import {
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
};

export const authReducer = (state = initialState, action) => {
  // console.log("Action.Palyload=>",action.payload)
  // console.log("Action.Type=>", action.type)
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };

    case GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };

    case FIND_USER_BY_ID_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };

    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        findUser: action.payload,
      };

    case LOGOUT:
      return initialState;

    case LOGIN_USER_FAILURE:
    case REGISTER_USER_FAILURE:
    case GET_USER_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case MARK_ALL_NOTIFICATIONS_READ_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          notifications: state.user.notifications.map((n) => ({
            ...n,
            read: true,
          })),
        },
      };

    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          notifications: state.user.notifications.filter(
            (n) => n.id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
