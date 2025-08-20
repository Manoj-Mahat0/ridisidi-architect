// src/pages/OurServices.jsx
import React, { useEffect, useState } from "react";
import { galleryService } from "../../api/galleryService";

export default function OurServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log("Trying authenticated API call...");
        const res = await galleryService.fetchCategories(); // /gallery/categories
        console.log("Raw categories response:", res);

        if (Array.isArray(res)) {
          // Use all categories directly
          setServices(res);
        } else {
          console.error("Unexpected response format:", res);
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-container">
      <h2 className="text-center text-2xl font-bold mb-6">Our Services</h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">
                {service.category_name || service.title}
              </h3>
              <p className="text-gray-600">
                {service.description || "Innovative and functional design solutions."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
