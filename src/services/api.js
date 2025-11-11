import axios from 'axios';

// Placeholder API service
// Will be replaced with actual backend endpoints later

const API_BASE_URL = 'https://api.sonnix.com'; // Placeholder URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints (placeholder)
export const login = async (email, password) => {
  // TODO: Connect to backend
  return { success: true, token: 'dummy-token', user: { name: 'Melos Kuqi', email } };
};

export const register = async (name, email, password) => {
  // TODO: Connect to backend
  return { success: true, token: 'dummy-token', user: { name, email } };
};

// Wallet endpoints (placeholder)
export const getWalletBalance = async () => {
  // TODO: Connect to backend
  return { balance: 125.50, tokens: 125 };
};

export const getTransactions = async () => {
  // TODO: Connect to backend
  return [];
};

// Events endpoints (placeholder)
export const getEvents = async () => {
  // TODO: Connect to backend
  return [];
};

export default api;

