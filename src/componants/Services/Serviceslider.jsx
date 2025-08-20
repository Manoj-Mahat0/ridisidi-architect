import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getSwiperConfig, prepareSlidesForLoop } from "../../utils/swiperUtils";
import img35 from "../../../Public/Images/Shopping cum Residence, Chira Chas, Bokaro.webp";
import img37 from "../../../Public/Images/Sunil Mahato,Bhalsundha, Chas, Bokaro.webp";

const slidesData = [
  { id: 2, image: img35 },
  { id: 4, image: img37 },
];

export default function Hero() {
  const [isHeroPart, setIsHeroPart] = useState(false);

  useEffect(() => {
    setIsHeroPart(true);
  }, []);

  // Prepare slides for loop mode and get optimal configuration
  const preparedSlides = prepareSlidesForLoop(slidesData, 4);
  const swiperConfig = getSwiperConfig(preparedSlides.length, {
    slidesPerView: 1,
    autoplayDelay: 3000,
    spaceBetween: 0
  });

  return (
    <div className="relative -mt-3">
      {isHeroPart && (
        <Swiper
          {...swiperConfig}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {preparedSlides.map(({ id, image }, index) => (
            <SwiperSlide key={`${id}-${index}`}>
              <div className="relative lg:h-[400px] h-full">
                <img
                  src={image}
                  alt={`Slide ${id}`}
                  className="w-full h-full object-cover"
                  onContextMenu={(e) => e.preventDefault()} // disable right-click
                  draggable={false} // disable drag
                  loading="lazy" // improve loading
                />
                <div
                  className="absolute inset-0 z-10"
                  onContextMenu={(e) => e.preventDefault()}
                ></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
