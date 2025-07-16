import {
  COLLECT_FAILURE,
  COLLECT_REQUEST,
  COLLECT_SUCCESS,
  FIND_PLOT_BY_ID_FAILURE,
  FIND_PLOT_BY_ID_REQUEST,
  FIND_PLOT_BY_ID_SUCCESS,
  GET_ALL_PLOTS_SUCCESS,
  GET_USER_PLOTS_SUCCESS,
  GET_USERS_PLOT_SUCCESS,
  GET_USERS_PLOTS_SUCCESS,
  LIKE_PLOT_FAILURE,
  LIKE_PLOT_REQUEST,
  LIKE_PLOT_SUCCESS,
  PLOT_CREATE_FAILURE,
  PLOT_CREATE_REQUEST,
  PLOT_CREATE_SUCCESS,
  PLOT_DELETE_FAILURE,
  PLOT_DELETE_REQUEST,
  PLOT_DELETE_SUCCESS,
  REPLOT_SUCCESS,
  USER_LIKE_PLOT_FAILURE,
  USER_LIKE_PLOT_REQUEST,
  USER_LIKE_PLOT_SUCCESS,
  VIEW_PLOT_FAILURE,
  VIEW_PLOT_SUCCESS,
  UPDATE_PLOT_SUCCESS,
  UPDATE_PLOT_FAILURE,
  UPDATE_PLOT_REQUEST,
} from "./ActionType";
const initialState = {
  loading: false,
  data: null,
  error: null,
  plots: [],
  plot: null,
};

export const plotReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLOT_CREATE_REQUEST:
    case PLOT_DELETE_REQUEST:
    case USER_LIKE_PLOT_REQUEST:
    case LIKE_PLOT_REQUEST:
    case COLLECT_REQUEST:
    case UPDATE_PLOT_REQUEST:
    case FIND_PLOT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case PLOT_CREATE_FAILURE:
    case PLOT_DELETE_FAILURE:
    case USER_LIKE_PLOT_FAILURE:
    case LIKE_PLOT_FAILURE:
    case COLLECT_FAILURE:
    case UPDATE_PLOT_FAILURE:
    case FIND_PLOT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case PLOT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        plots: [action.payload, ...state.plots],
      };

    case GET_ALL_PLOTS_SUCCESS:
    case GET_USER_PLOTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        plots: action.payload,
      };

    case USER_LIKE_PLOT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        likedPlots: action.payload,
      };

    case LIKE_PLOT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        like: action.payload,
      };

    case PLOT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        plots: state.plots.filter((plot) => plot.id !== action.payload),
      };

    case COLLECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        collect: action.payload,
      };

    case FIND_PLOT_BY_ID_SUCCESS:
    case REPLOT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        plot: action.payload,
        plots: [
          action.payload,
          ...state.plots.filter((p) => p.id !== action.payload.id),
        ],
      };
    case VIEW_PLOT_SUCCESS:
      return {
        ...state,
        plot: {
          ...state.plot,
          plot: action.payload, // ✅ update current plot
        },
      };

    case VIEW_PLOT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
      
  case UPDATE_PLOT_SUCCESS:
  return {
    ...state,
    plots: state.plots.map((plot) =>
      plot.id === action.payload.id ? action.payload : plot
    ),
  };

    default:
      return state;
  }
};
