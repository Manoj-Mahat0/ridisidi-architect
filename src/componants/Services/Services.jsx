// src/pages/OurServices.jsx
import React, { useEffect, useState } from "react";
import { serviceService } from "../../api/serviceService";
import { getCleanImageUrl } from "../../utils/imageUtils";

export default function OurServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log("Trying authenticated API call...");
        const res = await serviceService.fetchServices();
        console.log("Raw services response:", res);
        console.log("Response type:", typeof res);
        console.log("Is array?", Array.isArray(res));
        console.log("Response keys:", res ? Object.keys(res) : 'null/undefined');

        if (Array.isArray(res)) {
          console.log("Setting services from array:", res);
          setServices(res);
        } else if (res?.data && Array.isArray(res.data)) {
          // some APIs return { data: [...] }
          console.log("Setting services from res.data:", res.data);
          setServices(res.data);
        } else if (res?.items && Array.isArray(res.items)) {
          // some APIs return { items: [...] }
          console.log("Setting services from res.items:", res.items);
          setServices(res.items);
        } else {
          console.error("Unexpected response format:", res);
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        console.error("Error details:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-container max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-3xl font-bold mb-10">Our Services</h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl hover:shadow-lg transition p-5 flex flex-col"
            >
              {/* ✅ Service Image */}
              {(service.image_path || service.image_url) && (
                <img
                  src={getCleanImageUrl(service.image_url, service.image_path)}
                  alt={service.name || "Service Image"}
                  className="w-full h-52 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    console.error('Image failed to load:', service.image_path || service.image_url);
                    e.target.style.display = 'none';
                  }}
                />
              )}

              {/* ✅ Service Title */}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {service.name || service.title}
              </h3>

              {/* ✅ Service Description */}
              <p className="text-gray-600 flex-1">
                {service.description ||
                  "Innovative and functional design solutions."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
