// src/api/contactService.js
import api from './axiosConfig';

export const contactService = {
  // POST contact form (no authentication required)
  submitContact: async (contactData) => {
    try {
      // Try with authenticated API first
      const response = await api.post('/contact', contactData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.log('Authenticated API failed, trying direct fetch...', error.message);
      // Fallback to direct fetch if authenticated API fails
      try {
        const response = await fetch('https://backend.riddhisiddhiarchitect.in/api/v1/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify(contactData),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Direct contact submission response:', data);
        return data;
      } catch (directError) {
        console.error('Both API methods failed for contact:', directError);
        throw directError;
      }
    }
  },

  // GET all contacts (requires authentication - for admin)
  fetchContacts: async (skip = 0, limit = 100) => {
    try {
      console.log('Trying authenticated API call for contacts...');
      // Try with authenticated API first
      const response = await api.get(`/contact/messages?skip=${skip}&limit=${limit}`);
      console.log('Authenticated API contacts response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Authenticated API failed, trying direct fetch...', error.message);
      // Fallback to direct fetch if authenticated API fails
      try {
        const response = await fetch(`https://backend.riddhisiddhiarchitect.in/api/v1/contact/messages?skip=${skip}&limit=${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Direct fetch contacts response:', data);
        return data;
      } catch (directError) {
        console.error('Both API methods failed for contacts:', directError);
        throw directError;
      }
    }
  },

  // PUT update contact (requires authentication - for admin)
  updateContact: async (id, contactData) => {
    const response = await api.put(`/contact/${id}`, contactData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

  // DELETE contact (requires authentication - for admin)
  deleteContact: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },
};
