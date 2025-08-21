import React from "react";
import { NavLink } from "react-router-dom";
import img21 from "../../../Public/Images/Kalyan Township, Duplex Cluster, Telgaria More, Chas.webp";
import img26 from "../../../Public/Images/Marriage Hall, Mamarkudar,Bokaro.webp";
import img15 from "../../../Public/Images/Arvind Home Night View, Shashi Nagar PH-1, Chas.webp";
import img16 from "../../../Public/Images/Biru Singh Home, Varanasi.webp";
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
    src: img15,
    alt: "Small 4",
  },
  {
    src: img16,
    alt: "Small 5",
    big: true,

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
        <div className="grid lg:grid-cols-3 grid-rows-2 gap-4 mt-14">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative group overflow-hidden  shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${img.big ? "col-span-2 row-span-1" : ""
                }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full h-64 object-cover transition-transform duration-[2000ms] group-hover:scale-110`}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6 rounded-2xl">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
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
