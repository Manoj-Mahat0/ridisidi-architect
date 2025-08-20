import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const WelcomeSection = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="lg:py-20 py-10 ">

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold uppercase">
            Riddhi Siddhi
          </h2>
          <h2 className="text-3xl md:text-4xl font-semibold uppercase">
            Architect
          </h2>

        </div>

        <div className="md:w-[54vw] text-base md:text-lg leading-relaxed space-y-4 text-justify">
          <p>
            Welcome to Riddhi Siddhi Architect – Bokaro’s Leading Architecture Firm.
          </p>
          <p>
            At Riddhi Siddhi Architect, we are recognized as one of the top architecture firms in Bokaro, delivering innovative, sustainable, and timeless design solutions. From luxury residences, urban masterplans, and commercial complexes to institutional buildings and interior design, we bring a multidisciplinary approach to every project. Our client-centric process, paired with cutting-edge technology and a passion for excellence, sets us apart as pioneers in the Indian architectural landscape.
          </p>

          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="border border-black px-4 py-2 uppercase mt-4 hover:bg-black hover:text-white transition"
            >
              View All
            </button>
          )}
        </div>
      </div>


      {showMore && (
        <div className="w-full space-y-4 pt-8 text-base md:text-lg leading-relaxed text-justify">
          <p>
            Whether you're planning a dream home or a landmark development, trust Riddhi Siddhi Architect to shape your vision with unmatched creativity and precision. Explore our portfolio and discover why we are one of the best architects in Bokaro.
          </p>
          <p>
            Our approach to architecture is to create spaces that not only satisfy the functional needs of our clients but also become their companions in sharing unforgettable moments in their lives. We understand that our client's homes and workplaces are more than just physical structures—they reflect their personality, aspirations, and style. We aim to create designs that enhance and enrich their lives by seamlessly integrating with their environment.
          </p>
          <NavLink to='/menuaboutus'>
            <button
              className="border border-black px-4 py-2 uppercase mt-4 hover:bg-black hover:text-white transition"
            >
              Know More
            </button>
          </NavLink>
        </div>
      )}

    </section>
  );
};

export default WelcomeSection;




























