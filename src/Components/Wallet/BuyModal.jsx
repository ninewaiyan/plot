import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { buyWallet } from "../../Store/Wallet/Action";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import { getUserProfile } from "../../Store/Auth/Action";

export default function BuyModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [showBalance, setShowBalance] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinValues, setPinValues] = useState(new Array(6).fill(""));

  const wallet = JSON.parse(localStorage.getItem("plotPay")) || {
    balance: 2000000,
    pin: "111111",
  };

  const exchangeRate = 1;

  const formik = useFormik({
    initialValues: { reqAmount: "" },
    validationSchema: Yup.object({
      reqAmount: Yup.number()
        .required("Amount is required")
        .positive("Must be positive")
        .max(wallet.balance, "Insufficient balance"),
    }),
    onSubmit: () => setShowPinInput(true),
  });

  const convertedLikes = Math.floor(formik.values.reqAmount / exchangeRate || 0);

  const pinRefs = useRef([]);

  // Handle single digit input for PIN boxes
  const handlePinChange = (e, idx) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return; // only allow single digit numbers

    const newPinValues = [...pinValues];
    newPinValues[idx] = val;
    setPinValues(newPinValues);

    // Move focus forward if digit entered
    if (val && idx < 5) {
      pinRefs.current[idx + 1].focus();
    }
  };

  // Handle backspace for PIN inputs
  const handlePinKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !pinValues[idx] && idx > 0) {
      pinRefs.current[idx - 1].focus();
    }
  };

  const handlePinSubmit = () => {
    const enteredPin = pinValues.join("");
    if (enteredPin === wallet.pin) {
      const newBalance = wallet.balance - Number(formik.values.reqAmount);
      const updatedWallet = { ...wallet, balance: newBalance };
      localStorage.setItem("plotPay", JSON.stringify(updatedWallet));

      dispatch(buyWallet(formik.values.reqAmount));
      toast.success("Buy successful via Plot Pay!");
      handleClose();
      // Reset PIN inputs and form
      setPinValues(new Array(6).fill(""));
      formik.resetForm();
      setShowPinInput(false);
    } else {
      toast.error("Incorrect PIN!");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        {/* Close X button when PIN input is shown */}
        {showPinInput && (
          <button
            onClick={() => {
              setShowPinInput(false);
              setPinValues(new Array(6).fill(""));
            }}
            className="absolute top-4 left-4 p-1 rounded-full hover:bg-gray-200 transition"
            aria-label="Close"
          >
            <CloseIcon fontSize="small" />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3 mb-4">
          <img
            src="/Logo.png"
            alt="PlotPay"
            className="h-20 w-20 rounded-full"
          />
          <div>
            <h1 className="text-lg font-bold text-purple-700">Plot Pay Wallet</h1>
            <p className="text-xs text-gray-500">Secure Payment with Likes</p>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-6">
          <Avatar
            src={user?.image || undefined}
            alt={user?.fullName || "User"}
            sx={{ width: 40, height: 40 }}
          />
          <div>
            <h2 className="text-md font-semibold">{user?.fullName}</h2>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              {showBalance ? (
                <>
                  <span>{wallet.balance.toLocaleString()} MMK</span>
                  <VisibilityIcon
                    onClick={() => setShowBalance(false)}
                    className="cursor-pointer"
                  />
                </>
              ) : (
                <>
                  <span>
                    {String(wallet.balance).slice(0, 1) +
                      "*".repeat(String(wallet.balance).length - 1)}
                  </span>
                  <VisibilityOffIcon
                    onClick={() => setShowBalance(true)}
                    className="cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Buy Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-lg">
              Amount to Buy (MMK)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                MMK
              </span>
              <input
                type="number"
                name="reqAmount"
                value={formik.values.reqAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter amount"
                className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-300 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={showPinInput}
              />
            </div>
            {formik.touched.reqAmount && formik.errors.reqAmount && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.reqAmount}</p>
            )}
          </div>

          {formik.values.reqAmount && !formik.errors.reqAmount && (
            <p className="text-gray-700 text-md">
              Buying rate:{" "}
              <span className="font-semibold">{exchangeRate} MMK</span> = 1 Like
              <br />
              You will receive:{" "}
              <span className="text-blue-600 font-semibold">{convertedLikes} Likes</span>
            </p>
          )}

          {/* PIN Input Boxes */}
          {showPinInput && (
            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-2 text-lg">
                Enter 6-digit PIN
              </label>
              <div className="flex justify-between max-w-xs mx-auto gap-3">
                {pinValues.map((value, idx) => (
                  <input
                    key={idx}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    ref={(el) => (pinRefs.current[idx] = el)}
                    onChange={(e) => handlePinChange(e, idx)}
                    onKeyDown={(e) => handlePinKeyDown(e, idx)}
                    className="w-12 h-12 text-center text-xl font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={handlePinSubmit}
                className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Confirm Buy
              </button>
            </div>
          )}

          {/* Buttons */}
          {!showPinInput && (
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Buy
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
