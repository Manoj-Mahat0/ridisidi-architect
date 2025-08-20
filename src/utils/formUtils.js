// Form utility functions

// Format data as form-urlencoded for API calls
export const formatFormData = (data) => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
};

// Format data as FormData for multipart uploads
export const createFormData = (data) => {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      if (key === 'is_active' || key === 'is_featured') {
        formData.append(key, data[key]);
      } else if (key === 'image' && (data[key] instanceof File || data[key] instanceof Blob)) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key].toString());
      }
    }
  });
  
  return formData;
};
