// src/api/bannerService.js
import api from './axiosConfig';

export const bannerService = {
  // fetchBanners: async (skip = 0, limit = 100) => {
  //   try {
  //     console.log('Trying authenticated API call...');
  //     // Try with authenticated API first
  //     const res = await api.get(`/banners?skip=${skip}&limit=${limit}`);
  //     console.log('Authenticated API response:', res.data);
  //     return res.data;
  //   } catch (error) {
  //     console.log('Authenticated API failed, trying direct fetch...', error.message);
  //     // Fallback to direct fetch if authenticated API fails
  //     try {
  //       const response = await fetch(`https://backend.riddhisiddhiarchitect.in/api/v1/banners?skip=${skip}&limit=${limit}`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log('Direct fetch response:', data);
  //       return data;
  //     } catch (directError) {
  //       console.error('Both API methods failed:', directError);
  //       throw directError;
  //     }
  //   }
  // },



  fetchBanners: async (skip = 0, limit = 100, title = "") => {
  try {
    console.log("Trying authenticated API call...");
    const res = await api.get(`/banners?skip=${skip}&limit=${limit}`);
    let data = res.data;

    // Apply frontend filtering
    if (title) {
      data = data.filter(banner =>
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

      // Apply frontend filtering
      if (title) {
        data = data.filter(banner =>
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

  createBanner: async (formData) => {
    const res = await api.post('/banners', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  updateBanner: async (id, formData) => {
    const res = await api.put(`/banners/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  deleteBanner: async (id) => {
    await api.delete(`/banners/${id}`);
  },
};





// src/api/bannerService.js
// import api from './axiosConfig';

// export const bannerService = {
//   fetchBanners: async (skip = 0, limit = 100, title = "") => {
//     try {
//       console.log("Trying authenticated API call...");
//       const res = await api.get(`/banners?skip=${skip}&limit=${limit}`);
//       let data = res.data;

//       // frontend filtering by title
//       if (title) {
//         data = data.filter(
//           (banner) =>
//             banner.title &&
//             banner.title.toLowerCase().includes(title.toLowerCase())
//         );
//       }

//       return data;
//     } catch (error) {
//       console.log("Authenticated API failed, trying direct fetch...", error.message);
//       try {
//         const response = await fetch(
//           `https://backend.riddhisiddhiarchitect.in/api/v1/banners?skip=${skip}&limit=${limit}`
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         let data = await response.json();

//         if (title) {
//           data = data.filter(
//             (banner) =>
//               banner.title &&
//               banner.title.toLowerCase().includes(title.toLowerCase())
//           );
//         }

//         return data;
//       } catch (directError) {
//         console.error("Both API methods failed:", directError);
//         throw directError;
//       }
//     }
//   },

//   createBanner: async (formData) => {
//     const res = await api.post("/banners", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data;
//   },

//   updateBanner: async (id, formData) => {
//     const res = await api.put(`/banners/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data;
//   },

//   deleteBanner: async (id) => {
//     await api.delete(`/banners/${id}`);
//   },
// };





