
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import img21 from "../../../Public/Images/Kalyan Township, Duplex Cluster, Telgaria More, Chas.webp";
import img22 from "../../../Public/Images/Kalyan Township, Duplex, Telgaria More, Chas.webp";
import img26 from "../../../Public/Images/Marriage Hall, Mamarkudar,Bokaro.webp";
import img31 from "../../../Public/Images/Ramij Home,Ansari Mohalla, Chas, Bokaro.webp";
import img32 from "../../../Public/Images/Sagar Home, Jaina More, Bokaro.webp";
import img38 from "../../../Public/Images/Surya Prakash, Tetulia, Bokaro.webp";

const slidesData = [
  img21, img22, img26, img31, img32, img38,
].map((image, index) => ({
  id: index + 1,
  image,
}));

export default function Hero() {
  const [isHeroPart, setIsHeroPart] = useState(false);

  useEffect(() => {
    setIsHeroPart(true);
  }, []);

  // Test if images are loading
  console.log('Slides data:', slidesData);
  console.log('Is hero part:', isHeroPart);

  return (
    <div className="relative -mt-3">
      
      
      

      {isHeroPart && (
        <Swiper
          slidesPerView={1}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          style={{ height: '400px' }}
        >
          {slidesData.map(({ id, image }) => (
            <SwiperSlide key={id}>
              <div className="relative w-full h-full">
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
