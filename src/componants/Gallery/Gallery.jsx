import React from "react";
import { NavLink } from "react-router-dom";
import img21 from "../../../Public/Images/Kalyan Township, Duplex Cluster, Telgaria More, Chas.webp";
import img26 from "../../../Public/Images/Marriage Hall, Mamarkudar,Bokaro.webp";
import img14 from "../../../Public/Images/Arvind Home Day View, Shashi Nagar PH-1, Chas.webp";
import img15 from "../../../Public/Images/Arvind Home Night View, Shashi Nagar PH-1, Chas.webp";
import img16 from "../../../Public/Images/Binod Home, Day View, Baghmara,Dhnabad.webp";
const images = [
  {
    src: img21,
    alt: "Big 1",
    big: true,
  },
  {
    src: img26,
    alt: "Small 2",
  },
  {
    src: img14,
    alt: "Small 3",
  },
  {
    src: img15,
    alt: "Small 4",
  },
  {
    src: img16,
    alt: "Small 5",
  },
];

const ProjectGallery = () => {
  return (
    <>

      <div className="lg:-mt-7 -mt-0" >
        <div className="flex items-center">
          <h2 className="text-2xl md:text-3xl font-semibold uppercase">Project</h2>
          <div className="flex-grow border-t border-black ml-4"></div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 grid-rows-2 gap-1 mt-14">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative group overflow-hidden ${img.big ? "col-span-2 row-span-1" : ""
                }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                onContextMenu={(e) => e.preventDefault()} // disables 
  draggable={false}
              />
              
              {img.title && (
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center
                "
                onContextMenu={(e) => e.preventDefault()}
                >
                  <h2 className="text-white text-lg font-semibold">{img.title}</h2>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <NavLink to='/Menugallery'>
            <button
              className="border border-black px-4 py-2 uppercase mt-4 hover:bg-black hover:text-white transition"
            >
              Know More
            </button>
          </NavLink>
        </div>

      </div>
    </>
  );
};

export default ProjectGallery;
