import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { toast } from "react-hot-toast";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Heropage.css";
import { bannerService } from "../../api/bannerService";
import { getCleanImageUrl, logImageUrlInfo } from "../../utils/imageUtils";

export default function Hero() {
  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(false);
  const [error, setError] = useState(null);

  // Sample data for testing (remove this when API is working)
  const sampleBanners = [
    {
      id: 1,
      title: "Sample Banner 1",
      description: "This is a sample banner description",
      image_alt: "Sample Banner 1",
      button_text: "Learn More",
      button_link: "#",
      is_active: true,
      sort_order: 0,
      image_path: "banners/sample1.png",
      image_url: "https://backend.riddhisiddhiarchitect.in/api/v1/images/banners/fe5978a3-853d-4962-9727-29eee4ac03e1.png",
      created_at: "2025-08-14T17:09:29",
      updated_at: "2025-08-14T17:11:59"
    }
  ];

  // Simple test to confirm component is rendering
  console.log('Hero component is rendering!');

  const fetchBanners = async () => {
    try {
      setLoadingBanners(true);
      setError(null);
      console.log('Fetching banners...');
      
      const data = await bannerService.fetchBanners();
      console.log('Banners fetched:', data);
      
      // Filter only active banners
      const activeBanners = data.filter(banner => banner.is_active);
      console.log('Active banners:', activeBanners);
      
      setBanners(activeBanners);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setError(error.message);
      // Use sample data if API fails
      console.log('Using sample data due to API error');
      setBanners(sampleBanners);
    } finally {
      setLoadingBanners(false);
    }
  };

  // Test function to manually test the API
  const testBannerAPI = async () => {
    try {
      console.log('Testing banner API manually...');
      const response = await fetch('https://backend.riddhisiddhiarchitect.in/api/v1/banners?skip=0&limit=100');
      const data = await response.json();
      console.log('Direct fetch result:', data);
      
      if (data && data.length > 0) {
        const activeBanners = data.filter(banner => banner.is_active);
        setBanners(activeBanners);
        toast.success('API test successful - loaded ' + activeBanners.length + ' banners');
      } else {
        toast.error('API returned no banners');
      }
    } catch (error) {
      console.error('Direct fetch error:', error);
      toast.error('API test failed');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);



  return (
    <div className="relative -mt-3">
      

      {loadingBanners ? (
        <div className="text-center py-8 text-lg font-semibold text-gray-600">
          Loading banners...
        </div>
      ) : error ? (
        <div className="text-center py-8 text-lg font-semibold text-red-600">
          Error: {error}
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-8 text-lg font-semibold text-gray-600">
          No banners available
        </div>
      ) : (
        <Swiper
          slidesPerView={1}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          style={{ height: '80vh' }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative select-none">
                                 <img
                   src={getCleanImageUrl(banner.image_url, banner.image_path)}
                   alt={banner.image_alt || `Banner ${banner.title}`}
                   className="w-full h-full object-cover"
                   onContextMenu={(e) => e.preventDefault()} // prevent right-click
                   draggable={false} // prevent dragging
                   onError={(e) => {
                     const cleanUrl = getCleanImageUrl(banner.image_url, banner.image_path);
                     console.error('Image failed to load:', cleanUrl);
                     logImageUrlInfo(banner.image_url, banner.image_path, cleanUrl);
                     console.error('Full banner object:', banner);
                   }}
                   onLoad={() => {
                     const cleanUrl = getCleanImageUrl(banner.image_url, banner.image_path);
                     logImageUrlInfo(banner.image_url, banner.image_path, cleanUrl);
                   }}
                 />
                {/* Banner content overlay */}
                {banner.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6">
                    <h2 className="text-2xl font-bold mb-2">{banner.title}</h2>
                    {banner.description && (
                      <p className="text-lg mb-4">{banner.description}</p>
                    )}
                    {banner.button_text && banner.button_link && (
                      <a
                        href={banner.button_link}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                      >
                        {banner.button_text}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
