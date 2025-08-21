import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Heropage.css";
import { bannerService } from "../../api/bannerService";
import { getCleanImageUrl } from "../../utils/imageUtils";

export default function Hero() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        // fetch only homepage banners
        const data = await bannerService.fetchBanners(0, 100, "Homepage Banner");
        const activeBanners = data.filter((b) => b.is_active);
        setBanners(activeBanners);
      } catch (err) {
        console.error("Error loading homepage banners:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();
  }, []);

  return (
    <div className="relative -mt-3">
      {loading ? (
        <p className="text-center py-6">Loading homepage banners...</p>
      ) : banners.length === 0 ? (
        <p className="text-center py-6">No homepage banners available</p>
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
              <div className="relative select-none w-full h-64 sm:h-80 md:h-[80vh]">
                <img
                  src={getCleanImageUrl(banner.image_url, banner.image_path)}
                  alt="Banner"
                  className="w-full h-full object-cover"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
