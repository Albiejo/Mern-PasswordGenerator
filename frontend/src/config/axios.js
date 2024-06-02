import axios from "axios";
import { api } from "./api";

// Create axios instances
const userApi = axios.create({
  baseURL: api.userBaseURL,
  withCredentials: true,
});

const pwdApi = axios.create({
  baseURL: api.pwdBaseURL,
  withCredentials: true,
});

// Interceptor to add Authorization header
const addAuthToken = (config) => {
  const token = localStorage.getItem("Token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Apply interceptor to both axios instances
userApi.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
pwdApi.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));

// Export request functions
export const userApiRequest = async (apiConfig) => {
  try {
    const response = await userApi(apiConfig);
    return response.data;
  } catch (error) {
    console.error("Error in userApiRequest:", error);
    throw error;
  }
};

export const pwdApiRequest = async (apiConfig) => {
  try {
    const response = await pwdApi(apiConfig);
    return response.data;
  } catch (error) {
    console.error("Error in pwdApiRequest:", error);
    throw error;
  }
};
