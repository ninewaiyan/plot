import {
  BUY_WALLET_REQUEST, BUY_WALLET_SUCCESS, BUY_WALLET_FAILURE,
  EXCHANGE_WALLET_REQUEST, EXCHANGE_WALLET_SUCCESS, EXCHANGE_WALLET_FAILURE,
  TRANSFER_WALLET_REQUEST, TRANSFER_WALLET_SUCCESS, TRANSFER_WALLET_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  success: null
};

export const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_WALLET_REQUEST:
    case EXCHANGE_WALLET_REQUEST:
    case TRANSFER_WALLET_REQUEST:
      return { ...state, loading: true, error: null, success: null };

    case BUY_WALLET_SUCCESS:
    case EXCHANGE_WALLET_SUCCESS:
    case TRANSFER_WALLET_SUCCESS:
      console.log("Buy Process," , action.payload)
      return { ...state,
         loading: false,
         success: true };

    case BUY_WALLET_FAILURE:
    case EXCHANGE_WALLET_FAILURE:
    case TRANSFER_WALLET_FAILURE:
      return { ...state, loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
