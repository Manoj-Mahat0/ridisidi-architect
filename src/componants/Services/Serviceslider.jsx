// src/components/ServicePageBanner.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { bannerService } from "../../api/bannerService";
import { getCleanImageUrl } from "../../utils/imageUtils";

export default function ServicePageBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        const data = await bannerService.fetchBanners(0, 100, "Services Banner");
        const activeBanners = data.filter((b) => b.is_active);
        setBanners(activeBanners);
      } catch (err) {
        console.error("Error loading Services Banner:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();
  }, []);

  return (
    <div className="relative -mt-3">
      {loading ? (
        <p className="text-center py-6">Loading Services Banner...</p>
      ) : banners.length === 0 ? (
        <p className="text-center py-6">No Services Banner available</p>
      ) : (
        <Swiper
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              {/* ✅ Responsive height fix */}
              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
                <img
                  src={getCleanImageUrl(banner.image_url, banner.image_path)}
                  alt={banner.image_alt || "Banner"}
                  className="w-full h-full object-cover rounded-md"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
