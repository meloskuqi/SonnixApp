import React, { createContext, useState, useContext } from 'react';
import { dummyTransactions, dummyTickets } from '../services/dummyData';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(125.50);
  const [tokens, setTokens] = useState(125);
  const [transactions, setTransactions] = useState(dummyTransactions);
  const [tickets, setTickets] = useState(dummyTickets);

  const addFunds = (amount) => {
    setBalance(balance + amount);
    setTokens(tokens + amount);
    
    const newTransaction = {
      id: transactions.length + 1,
      type: "Add Funds",
      amount: amount,
      description: "Added funds via Credit Card",
      date: new Date().toISOString().split('T')[0],
      status: "completed",
      isPositive: true,
    };
    
    setTransactions([newTransaction, ...transactions]);
  };

  const sendMoney = (recipient, amount) => {
    if (balance >= amount) {
      setBalance(balance - amount);
      setTokens(tokens - amount);
      
      const newTransaction = {
        id: transactions.length + 1,
        type: "Sent",
        amount: -amount,
        description: `Sent to ${recipient}`,
        date: new Date().toISOString().split('T')[0],
        status: "completed",
        isPositive: false,
      };
      
      setTransactions([newTransaction, ...transactions]);
      return { success: true };
    }
    return { success: false, error: 'Insufficient balance' };
  };

  const requestRefund = (transactionId) => {
    // Dummy refund logic
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction) {
      const refundAmount = Math.abs(transaction.amount);
      setBalance(balance + refundAmount);
      setTokens(tokens + refundAmount);
      
      const newTransaction = {
        id: transactions.length + 1,
        type: "Refund",
        amount: refundAmount,
        description: `Refund for ${transaction.description}`,
        date: new Date().toISOString().split('T')[0],
        status: "completed",
        isPositive: true,
      };
      
      setTransactions([newTransaction, ...transactions]);
      return { success: true };
    }
    return { success: false, error: 'Transaction not found' };
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        tokens,
        transactions,
        tickets,
        addFunds,
        sendMoney,
        requestRefund,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

