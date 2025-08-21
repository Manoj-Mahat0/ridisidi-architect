// src/api/bannerService.js
import api from "./axiosConfig";

export const bannerService = {
  // ===== Fetch Banners =====
  fetchBanners: async (skip = 0, limit = 100, title = "") => {
    try {
      console.log("Trying authenticated API call...");
      const res = await api.get(`/banners?skip=${skip}&limit=${limit}`);
      let data = res.data;

      // Frontend filtering
      if (title) {
        data = data.filter((banner) =>
          banner.title.toLowerCase().includes(title.toLowerCase())
        );
      }

      console.log("Filtered response:", data);
      return data;
    } catch (error) {
      console.log("Authenticated API failed, trying direct fetch...", error.message);

      try {
        const response = await fetch(
          `https://backend.riddhisiddhiarchitect.in/api/v1/banners?skip=${skip}&limit=${limit}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();

        // Frontend filtering
        if (title) {
          data = data.filter((banner) =>
            banner.title.toLowerCase().includes(title.toLowerCase())
          );
        }

        console.log("Filtered direct fetch response:", data);
        return data;
      } catch (directError) {
        console.error("Both API methods failed:", directError);
        throw directError;
      }
    }
  },

  // ===== Create Banner =====
  createBanner: async (formData) => {
    const res = await api.post("/banners", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // ===== Update Banner =====
  updateBanner: async (id, formData) => {
    const res = await api.put(`/banners/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // ===== Delete Banner =====
  deleteBanner: async (id) => {
    await api.delete(`/banners/${id}`);
  },
};
