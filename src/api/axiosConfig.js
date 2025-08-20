import axios from 'axios';
import { clearAllTokens } from '../utils/tokenUtils';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://backend.riddhisiddhiarchitect.in/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Try to refresh the token
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('https://backend.riddhisiddhiarchitect.in/api/v1/auth/refresh', {
            refresh_token: refreshToken
          });
          
          if (response.data.access_token) {
            // Update stored tokens
            localStorage.setItem('accessToken', response.data.access_token);
            if (response.data.refresh_token) {
              localStorage.setItem('refreshToken', response.data.refresh_token);
            }
            
            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, logout user
          clearAllTokens();
          window.location.href = '/login';
        }
      } else {
        // No refresh token, logout user
        clearAllTokens();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
