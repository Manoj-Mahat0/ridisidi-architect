// src/api/serviceService.js
import api from './axiosConfig';

export const serviceService = {
  // GET all services (no authentication required)
  fetchServices: async (skip = 0, limit = 100) => {
    try {
      // Try with authenticated API first
      const response = await api.get(`/services?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.log('Authenticated API failed, trying direct fetch...', error.message);
      // Fallback to direct fetch if authenticated API fails
      try {
        const response = await fetch(`https://backend.riddhisiddhiarchitect.in/api/v1/services?skip=${skip}&limit=${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Direct fetch response:', data);
        return data;
      } catch (directError) {
        console.error('Both API methods failed:', directError);
        throw directError;
      }
    }
  },

  // POST new service (requires authentication)
  createService: async (formData) => {
    const response = await api.post('/services', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // PUT update existing service (requires authentication)
  updateService: async (id, formData) => {
    const response = await api.put(`/services/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // DELETE service (requires authentication)
  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};
