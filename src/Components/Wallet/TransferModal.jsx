

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Avatar, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { API_BASE_URL } from '../../config/api';
import { transferWallet } from '../../Store/Wallet/Action';
import { findUserById } from '../../Store/Auth/Action';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import TagFacesIcon from '@mui/icons-material/TagFaces';

export default function TransferModal({ open, handleClose, initialUserId = null }) {

  const dispatch = useDispatch();
  const { findUser: user } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({ amount: '', description: '' });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const jwt = localStorage.getItem('jwt');
  const wallet = JSON.parse(localStorage.getItem('plotPay')) || {
    balance: 0,
    pin: '111111',
  };

  const debounceTimeout = useRef(null);

  // Fetch user by ID if initialUserId provided
  useEffect(() => {
    if (initialUserId) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/users/${initialUserId}`, {
            headers: { Authorization: `Bearer ${jwt}` },
          });
          setSelectedUser(res.data);
          setSearchTerm('');
          setSearchResults([]);
        } catch (error) {
          toast.error('Failed to fetch user info');
        }
      };
      fetchUser();
    } else {
      setSelectedUser(null);
    }
  }, [initialUserId, jwt]);

  useEffect(() => {
    if (!searchTerm.trim() || selectedUser) {
      setSearchResults([]);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/search?query=${searchTerm}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        const filtered = res.data.filter(u => u.id !== user.id);
        setSearchResults(filtered);
      } catch (err) {
        toast.error('Failed to search users');
      }
    }, 400);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, user?.id, selectedUser]);

  const validationSchema = Yup.object({
    amount: Yup.number()
      .required('Amount is required')
      .min(1, 'Amount must be at least 1')
      .max(wallet.balance, 'Insufficient balance'),
    description: Yup.string(),
  });

  const handleConfirmTransfer = async () => {
    if (pin.length !== 6 || pin !== wallet.pin) {
      setPinError(true);
      toast.error('Incorrect PIN');
      return;
    }

    try {
      setLoading(true);
      const transferData = {
        amount: Number(formValues.amount),
        receiverId: selectedUser.id,
        description: formValues.description,
      };

      await dispatch(transferWallet(transferData));
      await dispatch(findUserById(user.id));
      handleClose();
      resetAll();
    } catch {
      // errors handled in action
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setStep(1);
    setSearchTerm('');
    setSearchResults([]);
    setSelectedUser(null);
    setPin('');
    setPinError(false);
    setFormValues({ amount: '', description: '' });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 space-y-4 relative">
        <h2 className="text-xl font-semibold text-gray-700">
          {step === 1 ? 'Transfer Likes' : 'Confirm Transfer'}
        </h2>

        {step === 1 && (
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={values => {
              setFormValues(values);
              setStep(2);
            }}
          >
            {formik => (
              <Form className="space-y-4 relative">
                {!selectedUser && (
                  <>
                    <input
                      type="text"
                      placeholder="Search user..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    {searchResults.length > 0 && (
                      <div className="max-h-40 overflow-y-auto border rounded-lg">
                        {searchResults.map(u => (
                          <div
                            key={u.id}
                            onClick={() => {
                              setSelectedUser(u);
                              setSearchTerm('');
                              setSearchResults([]);
                            }}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
                              selectedUser?.id === u.id ? 'bg-gray-200' : ''
                            }`}
                          >
                            <Avatar src={u.profileImage} className="w-8 h-8" />
                            <span>{u.fullName}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {selectedUser && (
                  <div className="flex items-center gap-3 mt-2">
                    <Avatar src={selectedUser.profileImage} className="w-10 h-10" />
                    <div>
                      <p className="font-medium">{selectedUser.fullName}</p>
                      <p className="text-sm text-gray-500">{selectedUser.email}</p>
                    </div>
                  </div>
                )}

                <div>
                  <Field
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    className="w-full border rounded-lg px-4 py-2"
                  />
                  <ErrorMessage name="amount" component="p" className="text-sm text-red-500" />
                </div>

                <div className="relative">
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Optional description"
                    className="w-full border rounded-lg px-4 py-2 resize-none"
                  />
                  <Button
                    size="small"
                    style={{ position: 'absolute', top: 30, right: 0 }}
                    onClick={() => setShowEmojiPicker(prev => !prev)}
                  >
                    <TagFacesIcon className="text-[#1d9bf0]" />
                  </Button>
                  {showEmojiPicker && (
                    <div className="absolute z-50 right-0 top-full ">
                      <Picker
                        data={data}
                        onEmojiSelect={emoji =>
                          formik.setFieldValue('description', formik.values.description + emoji.native)
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedUser}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Next
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {step === 2 && selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar src={selectedUser.profileImage} className="w-12 h-12" />
              <div>
                <p className="font-semibold text-lg">{selectedUser.fullName}</p>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>
            </div>

            <p>
              <strong>Amount:</strong> {formValues.amount}
            </p>
            {formValues.description && (
              <p>
                <strong>Description:</strong> {formValues.description}
              </p>
            )}

            <div>
              <label className="text-sm text-gray-600 block mb-1">Enter PIN</label>
              <div className="flex gap-2 justify-center">
                {Array(6)
                  .fill()
                  .map((_, index) => (
                    <input
                      key={index}
                      type="password"
                      maxLength={1}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className={`w-10 h-12 border rounded-lg text-center text-xl font-bold tracking-widest ${
                        pinError ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none`}
                      value={pin[index] || ''}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/, '');
                        if (!val) return;
                        const newPin = pin.split('');
                        newPin[index] = val;
                        setPin(newPin.join(''));
                        const next = document.getElementById(`pin-${index + 1}`);
                        if (next) next.focus();
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Backspace') {
                          e.preventDefault();
                          const newPin = pin.split('');
                          if (newPin[index]) {
                            newPin[index] = '';
                            setPin(newPin.join(''));
                          } else {
                            const prev = document.getElementById(`pin-${index - 1}`);
                            if (prev) prev.focus();
                          }
                        }
                      }}
                      id={`pin-${index}`}
                    />
                  ))}
              </div>
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setPin('');
                  setPinError(false);
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                disabled={loading}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirmTransfer}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Transferring...' : 'Confirm Transfer'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
