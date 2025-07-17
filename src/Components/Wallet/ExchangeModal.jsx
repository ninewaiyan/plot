import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exchangeWallet } from "../../Store/Wallet/Action";
import { findUserById } from "../../Store/Auth/Action";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar } from "@mui/material";

export default function ExchangeModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const user = auth.user;
  const likeBalance = auth.findUser?.wallet?.likesBalance || 0;

  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const wallet = JSON.parse(localStorage.getItem("plotPay")) || {
    balance: 2000000,
    pin: "111111",
  };

  const formik = useFormik({
    initialValues: { likeAmount: "" },
    validationSchema: Yup.object({
      likeAmount: Yup.number()
        .typeError("Must be a number")
        .required("Amount is required")
        .positive("Must be greater than 0")
        .max(likeBalance, "Insufficient Like balance"),
    }),
    onSubmit: () => {
      setShowPinPrompt(true);
    },
  });

  const mmkValue = ((formik.values.likeAmount || 0) * 0.98).toFixed(2);

  if (!open) return null;

  const handleConfirmExchange = async () => {
    if (pin !== wallet.pin) {
      setPinError(true);
      toast.error("Incorrect PIN");
      return;
    } else {
      const mmkValueNumber = parseFloat(mmkValue);
      const newBalance = wallet.balance + mmkValueNumber;
      const updatedWallet = { ...wallet, balance: newBalance };
      localStorage.setItem("plotPay", JSON.stringify(updatedWallet));
    }

    await dispatch(exchangeWallet(formik.values.likeAmount));
    await dispatch(findUserById(user?.id));

    toast.success("Exchange successful!");
    setShowPinPrompt(false);
    setPin("");
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      {/* Main Exchange Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-50">
          <h1 className="text-center text-2xl font-bold text-blue-800 mb-2">
            Plot Pay
          </h1>
          <h2 className="text-xl font-bold text-center mb-4 text-blue-700">
            Exchange Likes to MMK
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <Avatar
              src={user?.image}
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold">{user?.fullName}</p>
              <p className="text-sm text-gray-500">
                Total Likes: <span className="font-mono">{likeBalance}</span>{" "}
                Likes
              </p>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <input
              type="number"
              min="1"
              name="likeAmount"
              placeholder="Enter Like amount"
              value={formik.values.likeAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-xl px-4 py-3 mb-1 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.likeAmount && formik.errors.likeAmount
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.likeAmount && formik.errors.likeAmount && (
              <p className="text-red-500 text-sm mb-2">
                {formik.errors.likeAmount}
              </p>
            )}

            <p className="mb-4 text-sm text-gray-600">
              You will receive{" "}
              <span className="font-bold text-blue-600">{mmkValue} MMK</span>{" "}
              (1 Like = 0.98 MMK)
            </p>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700"
                disabled={showPinPrompt}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                disabled={showPinPrompt}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* PIN Prompt Overlay */}
      {showPinPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Confirm with your PIN
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Enter your 6-digit PlotPay PIN
            </p>

            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={pin[index] || ""}
                  className={`w-12 h-12 text-center text-xl border ${
                    pinError ? "border-red-500" : "border-gray-300"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  onChange={(e) => {
                    const newPin = pin.split("");
                    newPin[index] = e.target.value.replace(/[^0-9]/g, "");
                    setPin(newPin.join(""));

                    // auto move to next input
                    const next = document.getElementById(`pin-${index + 1}`);
                    if (e.target.value && next) next.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !pin[index] && index > 0) {
                      const prev = document.getElementById(`pin-${index - 1}`);
                      if (prev) prev.focus();
                    }
                  }}
                />
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setShowPinPrompt(false);
                  setPin("");
                  setPinError(false);
                }}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Back
              </button>
              <button
                onClick={handleConfirmExchange}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
