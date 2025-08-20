// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { bannerService } from "../../api/bannerService";
// import { getCleanImageUrl } from "../../utils/imageUtils";

// export default function AboutSlider() {
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadBanners = async () => {
//       try {
//         setLoading(true);
//         const data = await bannerService.fetchBanners(0, 100, "Aboutus Banner");
//         const activeBanners = data.filter((b) => b.is_active);
//         setBanners(activeBanners);
//       } catch (err) {
//         console.error("Error loading aboutus banners:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadBanners();
//   }, []);

//   return (
//     <div className="relative -mt-3">
//       {loading ? (
//         <p className="text-center py-6">Loading aboutus banners...</p>
//       ) : banners.length === 0 ? (
//         <p className="text-center py-6">No aboutus banners available</p>
//       ) : (
//         <Swiper
//           slidesPerView={1}
//           navigation
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           modules={[Navigation, Autoplay]}
//           className="mySwiper"
//         >
//           {banners.map((banner) => (
//             <SwiperSlide key={banner.id}>
//               <div className="relative lg:h-[400px] h-full">
//                 <img
//                   src={getCleanImageUrl(banner.image_url, banner.image_path)}
//                   alt={banner.image_alt || banner.title}
//                   className="w-full h-full object-cover"
//                   draggable={false}
//                   onContextMenu={(e) => e.preventDefault()}
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { bannerService } from "../../api/bannerService";
import { getCleanImageUrl } from "../../utils/imageUtils";

export default function AboutSlider() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        // yaha "Aboutus Banner" title ke banners fetch honge
        const data = await bannerService.fetchBanners(0, 100, "Aboutus Banner");
        const activeBanners = data.filter((b) => b.is_active);
        setBanners(activeBanners);
      } catch (err) {
        console.error("Error loading About Us banners:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();
  }, []);

  return (
    <div className="relative -mt-3">
      {loading ? (
        <p className="text-center py-6">Loading About Us banners...</p>
      ) : banners.length === 0 ? (
        <p className="text-center py-6">No About Us banners available</p>
      ) : (
        <Swiper
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className="aboutSwiper"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative lg:h-[400px] h-full">
                <img
                  src={getCleanImageUrl(banner.image_url, banner.image_path)}
                  alt={banner.image_alt || banner.title}
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
