import axios from "axios";
import {
  BUY_WALLET_REQUEST, BUY_WALLET_SUCCESS, BUY_WALLET_FAILURE,
  EXCHANGE_WALLET_REQUEST, EXCHANGE_WALLET_SUCCESS, EXCHANGE_WALLET_FAILURE,
  TRANSFER_WALLET_REQUEST, TRANSFER_WALLET_SUCCESS, TRANSFER_WALLET_FAILURE,
} from "./ActionType";
import { API_BASE_URL } from "../../config/api";
import { toast } from "react-toastify";
import { findUserById, getUserProfile } from "../Auth/Action";

const jwt = localStorage.getItem("jwt");


const config = {
  headers: { Authorization: `Bearer ${jwt}` }
};

export const buyWallet = (amount) => async (dispatch,getState) => {
  dispatch({ type: BUY_WALLET_REQUEST });
  const state = getState();
   const userId = state.auth.user?.id;
   console.log("UserId => ",userId )
  try {
    await axios.post(`${API_BASE_URL}/api/wallets/buy?reqAmount=${amount}`, null, config);
    dispatch({ type: BUY_WALLET_SUCCESS });
    dispatch(findUserById(userId));
    toast.success("Buy transaction successful!");
  } catch (error) {
    dispatch({ type: BUY_WALLET_FAILURE, payload: error.message });
    toast.error(error.response?.data || "Buy transaction failed!");
  }
};

export const exchangeWallet = (amount) => async (dispatch) => {
  dispatch({ type: EXCHANGE_WALLET_REQUEST });

  try {
    await axios.post(`${API_BASE_URL}/api/wallets/exchange?reqAmount=${amount}`, null, config);
    dispatch({ type: EXCHANGE_WALLET_SUCCESS });
    toast.success("Exchange transaction successful!");
  } catch (error) {
    dispatch({ type: EXCHANGE_WALLET_FAILURE, payload: error.message });
    toast.error(error.response?.data || "Exchange failed!");
  }
};

export const transferWallet = (transferData) => async (dispatch) => {
  dispatch({ type: TRANSFER_WALLET_REQUEST });

  try {
    await axios.post(`${API_BASE_URL}/api/wallets/transfer`, transferData, config);
    dispatch({ type: TRANSFER_WALLET_SUCCESS });
    toast.success("Transfer successful!");
  } catch (error) {
    dispatch({ type: TRANSFER_WALLET_FAILURE, payload: error.message });
    toast.error(error.response?.data || "Transfer failed!");
  }
};
