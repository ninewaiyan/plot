import { Avatar } from "@mui/material";
import React, { useState } from "react";

const WalletTransactionHistory = ({ auth }) => {
  const [filter, setFilter] = useState("ALL");

  const currentUserId = auth?.findUser?.id;
  const transactions = auth?.findUser?.walletTransactions || [];

  // Define filters including pseudo "RECEIVE"
  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "ALL") return true;
    if (filter === "RECEIVE") return tx.type !== "BUY" && tx.receiverWallet?.userSummaryDto?.id === currentUserId;
    return tx.type === filter;
  });

  const formatTime = (timeString) =>
    new Date(timeString).toLocaleString();

  const getUserInfo = (tx) => {
    const isSender = tx.senderWallet?.userSummaryDto?.id === currentUserId;
    const isReceiver = tx.receiverWallet?.userSummaryDto?.id === currentUserId;

    if (tx.type === "BUY" || tx.type === "EXCHANGE") {
      return {
        name: "Plot Pay System",
        image: "/Logo.png",
      };
    } else if (tx.type === "TRANSFER") {
      if (isSender) {
        return {
          name: tx.receiverWallet?.userSummaryDto?.fullName?.split(" ")[0] || "Receiver",
          image: tx.receiverWallet?.userSummaryDto?.image || "https://via.placeholder.com/40",
        };
      } else if (isReceiver) {
        return {
          name: tx.senderWallet?.userSummaryDto?.fullName?.split(" ")[0] || "Sender",
          image: tx.senderWallet?.userSummaryDto?.image || "https://via.placeholder.com/40",
        };
      }
    }

    return {
      name: "Unknown",
      image: "https://via.placeholder.com/40",
    };
  };

  const getMessage = (tx) => {
    const mmkAmount = (tx.amount * 0.8).toFixed(0);
    const isSender = tx.senderWallet?.userSummaryDto?.id === currentUserId;
    const isReceiver = tx.receiverWallet?.userSummaryDto?.id === currentUserId;

    if (tx.type === "BUY") {
      return `You bought ${tx.amount} Likes with ${tx.mmAmount || mmkAmount} MMK`;
    } else if (tx.type === "EXCHANGE") {
      return `You exchanged ${tx.amount} Likes for ${mmkAmount} MMK`;
    } else if (tx.type === "TRANSFER") {
      if (isSender) {
        return `You sent ${tx.amount} Likes to ${tx.receiverWallet?.userSummaryDto?.fullName?.split(" ")[0]}`;
      } else if (isReceiver) {
        return `You received ${tx.amount} Likes from ${tx.senderWallet?.userSummaryDto?.fullName?.split(" ")[0]}`;
      }
    }

    return `${tx.type} - ${tx.amount} Likes`;
  };

  const getDescription = (tx) => {
    if (tx.type === "TRANSFER") {
      return tx.description || "";
    }
    return "";
  };

  return (
    <div className="bg-white shadow rounded-2xl p-4 mt-4">
      <h3 className="text-md font-semibold mb-4">Transaction History</h3>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["ALL", "BUY", "TRANSFER", "EXCHANGE", "RECEIVE"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredTransactions.length > 0 ? (
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {filteredTransactions.map((tx, index) => {
            const { name, image } = getUserInfo(tx);
            return (
              <div
                key={index}
                className="flex items-start justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={image}
                    alt={name}
                    className="w-10 h-10 rounded-full bx-border-circle object-cover"
                  />
                  <div>
                    <p className="font-medium">{name} <small  className="text-xs text-gray-400 whitespace-nowrap">{formatTime(tx.transactionTime)}</small></p>
                    
                    <p className="text-xs text-gray-700">{getMessage(tx)}</p>
                    {getDescription(tx) && (
                      <p className="text-xs text-gray-500 mt-1 italic">{getDescription(tx)}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No transactions found</p>
      )}
    </div>
  );
};

export default WalletTransactionHistory;
