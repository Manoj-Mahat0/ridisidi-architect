import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getSwiperConfig, prepareSlidesForLoop } from "../../utils/swiperUtils";
import img21 from "../../../Public/Images/Kalyan Township, Duplex Cluster, Telgaria More, Chas.webp";
import img26 from "../../../Public/Images/Marriage Hall, Mamarkudar,Bokaro.webp";

const slidesData = [
  { id: 1, image: img26 },
  { id: 2, image: img21 },
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
