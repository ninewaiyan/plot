import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findUserById } from '../../Store/Auth/Action';

import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

import BuyModal from './BuyModal'; // 👈 Make sure the path is correct
import TransferModal from './TransferModal';
import ExchangeModal from './ExchangeModal';
import WalletTransactionHistory from './WalletTransactionHistory';

const formatNumber = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return num;
};

const Wallet = () => {
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [openExchangeModal, setOpenExchangeModal] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(findUserById(id));
  }, [id, dispatch]);

  const wallet = auth.findUser?.wallet;

  return (
    <div className="p-1 space-y-6 max-w-xl mx-auto">
      {/* Wallet Summary */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Wallet Summary</h2>
        <div className="flex justify-between text-gray-800">
          <div>
            <p className="text-gray-500 text-sm">Likes Balance</p>
            <p className="text-xl font-bold text-green-600">
              {wallet?.likesBalance }
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Likes Received</p>
            <p className="text-xl font-bold text-blue-600">
              {formatNumber(wallet?.totalLikesReceived || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon fontSize="small" />}
          onClick={() => setOpenBuyModal(true)}
          className="!bg-blue-500 hover:!bg-blue-600 !py-2 !text-sm !normal-case rounded-xl shadow"
          fullWidth
        >
          Buy
        </Button>

        <Button
          variant="contained"
          startIcon={<CompareArrowsIcon fontSize="small" />}
          onClick={() => setOpenTransferModal(true)}
          className="!bg-green-500 hover:!bg-green-600 !py-2 !text-sm !normal-case rounded-xl shadow"
          fullWidth
        >
          Transfer
        </Button>

        <Button
          variant="contained"
          startIcon={<CurrencyExchangeIcon fontSize="small" />}
          onClick={() => setOpenExchangeModal(true)}
          className="!bg-yellow-500 hover:!bg-yellow-600 !py-2 !text-sm !normal-case rounded-xl shadow"
          fullWidth
        >
          Exchange
        </Button>
      </div>

    
        <WalletTransactionHistory auth={auth} />
    

      <BuyModal open={openBuyModal} handleClose={() => setOpenBuyModal(false)} />
      <ExchangeModal open={openExchangeModal} handleClose={() => setOpenExchangeModal(false)} />
      <TransferModal open={openTransferModal} handleClose={() => setOpenTransferModal(false)} />


    </div>
  );
};

export default Wallet;
