import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getSwiperConfig, prepareSlidesForLoop } from "../../utils/swiperUtils";
import img28 from "../../../Public/Images/Nimai Home, Shashi Nagar, PH-1, Chas, Bokaro.webp";
import img29 from "../../../Public/Images/Nurshing Home, Cooperative, Bokaro.webp";
import img30 from "../../../Public/Images/Poonam Home, Navin Cooperative, Chira Chas, Bokaro.webp";
import img31 from "../../../Public/Images/Ramij Home,Ansari Mohalla, Chas, Bokaro.webp";

const slidesData = [
  { id: 2, image: img29 },
  { id: 3, image: img30 },
  { id: 4, image: img31 },
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
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
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
