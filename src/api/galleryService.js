// src/api/galleryService.js
import api from './axiosConfig';

export const galleryService = {
  // ===== GALLERY CATEGORIES =====
  
  // GET all categories (no authentication required)
  fetchCategories: async (skip = 0, limit = 100) => {
    try {
      console.log('Trying authenticated API call for categories...');
      // Try with authenticated API first
      const response = await api.get(`/gallery/categories?skip=${skip}&limit=${limit}`);
      console.log('Authenticated API categories response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Authenticated API failed, trying direct fetch...', error.message);
      // Fallback to direct fetch if authenticated API fails
      try {
        const response = await fetch(`https://backend.riddhisiddhiarchitect.in/api/v1/gallery/categories?skip=${skip}&limit=${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Direct fetch categories response:', data);
        return data;
      } catch (directError) {
        console.error('Both API methods failed for categories:', directError);
        throw directError;
      }
    }
  },

  // POST new category (requires authentication)
  createCategory: async (formData) => {
    const response = await api.post('/gallery/categories', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  // PUT update existing category (requires authentication)
  updateCategory: async (id, formData) => {
    const response = await api.put(`/gallery/categories/${id}`, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  // DELETE category (requires authentication)
  deleteCategory: async (id) => {
    const response = await api.delete(`/gallery/categories/${id}`);
    return response.data;
  },

  // ===== GALLERY ITEMS =====
  
  // GET all items (no authentication required)
  fetchItems: async (categoryId = null, skip = 0, limit = 100) => {
    try {
      let url = `/gallery/items?skip=${skip}&limit=${limit}`;
      if (categoryId) {
        url += `&category_id=${categoryId}`;
      }
      
      console.log('Trying authenticated API call for items...', url);
      // Try with authenticated API first
      const response = await api.get(url);
      console.log('Authenticated API items response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Authenticated API failed, trying direct fetch...', error.message);
      // Fallback to direct fetch if authenticated API fails
      try {
        let url = `https://backend.riddhisiddhiarchitect.in/api/v1/gallery/items?skip=${skip}&limit=${100}`;
        if (categoryId) {
          url += `&category_id=${categoryId}`;
        }
        
        console.log('Trying direct fetch for items...', url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Direct fetch items response:', data);
        return data;
      } catch (directError) {
        console.error('Both API methods failed for items:', directError);
        throw directError;
      }
    }
  },

  // POST new item (requires authentication)
  createItem: async (formData) => {
    const response = await api.post('/gallery/items', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // PUT update existing item (requires authentication)
  updateItem: async (id, formData) => {
    const response = await api.put(`/gallery/items/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // DELETE item (requires authentication)
  deleteItem: async (id) => {
    const response = await api.delete(`/gallery/items/${id}`);
    return response.data;
  },
};