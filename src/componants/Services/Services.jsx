// src/pages/OurServices.jsx
import React, { useEffect, useState } from "react";
import { serviceService } from "../../api/serviceService";
import { getCleanImageUrl } from "../../utils/imageUtils";

export default function OurServices() {
  const [services, setServices] = useState([]);
  const [groupedServices, setGroupedServices] = useState({});

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
          
          // Group services by category
          const grouped = res.reduce((acc, service) => {
            // Extract category from service name (e.g., "RESIDENTIAL PROJECT" -> "RESIDENTIAL")
            let category = "Other Services";
            
            if (service.name.includes("RESIDENTIAL")) {
              category = "Residential Projects";
            } else if (service.name.includes("COMMERCIAL")) {
              category = "Commercial Projects";
            } else if (service.name.includes("INTERIOR")) {
              category = "Interior Design";
            } else if (service.name.includes("LANDSCAPE")) {
              category = "Landscape Design";
            } else if (service.name.includes("RENOVATION")) {
              category = "Renovation";
            } else if (service.name.includes("PLANNING")) {
              category = "Planning & Consultation";
            }
            
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(service);
            return acc;
          }, {});
          
          setGroupedServices(grouped);
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
        <div className="space-y-12">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category} className="category-section">
              {/* Category Heading */}
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
                {category}
              </h3>
              
              {/* Services Grid for this category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service, idx) => (
                  <div
                    key={service.id || idx}
                    className="bg-white shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 p-6 flex flex-col transform hover:-translate-y-1"
                  >
                    {/* Service Image */}
                    {service.image_path && (
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={getCleanImageUrl(service.image_url, service.image_path)}
                          alt={service.name || "Service Image"}
                          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error('Image failed to load:', service.image_path);
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    {/* Service Title */}
                    <h4 className="text-xl font-semibold mb-3 text-gray-800">
                      {service.name}
                    </h4>

                    {/* Service Description */}
                    <p className="text-gray-600 flex-1 mb-4">
                      {service.description || "Innovative and functional design solutions."}
                    </p>

                    {/* Service Features (if available) */}
                    {service.features && service.features.length > 0 && (
                      <div className="mt-auto">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Features:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {service.features.map((feature, featureIdx) => (
                            <li key={featureIdx} className="flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Service Status Badge */}
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        service.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.is_active ? 'Active' : 'Inactive'}
                      </span>
                      {service.sort_order > 0 && (
                        <span className="text-xs text-gray-500">
                          Priority: {service.sort_order}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
