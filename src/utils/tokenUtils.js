// Token utility functions
export const isTokenExpired = (expiryTime) => {
  if (!expiryTime) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= expiryTime;
};

export const getTokenExpiryTime = (expiresIn) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime + expiresIn;
};

export const clearAllTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('adminUser');
  localStorage.removeItem('tokenExpiry');
};

export const getStoredTokens = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    tokenExpiry: localStorage.getItem('tokenExpiry'),
    user: localStorage.getItem('adminUser') ? JSON.parse(localStorage.getItem('adminUser')) : null
  };
};

// Utility function to format data as form-urlencoded
export const formatFormData = (data) => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
};
