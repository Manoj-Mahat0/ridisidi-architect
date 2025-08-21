import React, { useEffect, useState } from "react";
import { serviceService } from "../../api/serviceService";
import { getCleanImageUrl } from "../../utils/imageUtils";

export default function OurServices() {
  const [services, setServices] = useState([]);
  const [groupedServices, setGroupedServices] = useState({});
  const [activeTab, setActiveTab] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceService.fetchServices();
        let servicesArray = [];

        if (Array.isArray(res)) {
          servicesArray = res;
        } else if (res?.data && Array.isArray(res.data)) {
          servicesArray = res.data;
        } else if (res?.items && Array.isArray(res.items)) {
          servicesArray = res.items;
        } else {
          console.error("Unexpected response format:", res);
          servicesArray = [];
        }

        setServices(servicesArray);


        const grouped = servicesArray.reduce((acc, service) => {
          let category = "Interior Design";

          if (service.name.toUpperCase().includes("RESIDENTIAL")) {
            category = "Residential Projects";
          } else if (service.name.toUpperCase().includes("COMMERCIAL")) {
            category = "Commercial Projects";
          } else if (service.name.toUpperCase().includes("INTERIOR")) {
            category = "Interior Design";
          } else if (service.name.toUpperCase().includes("LANDSCAPE")) {
            category = "Landscape Design";
          } else if (service.name.toUpperCase().includes("RENOVATION")) {
            category = "Renovation";
          } else if (service.name.toUpperCase().includes("PLANNING")) {
            category = "Planning & Consultation";
          }

          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(service);
          return acc;
        }, {});

        setGroupedServices(grouped);


        setCategories(["All", ...Object.keys(grouped)]);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);


  const getServicesToDisplay = () => {
    if (activeTab === "All") {
      return services;
    }
    return groupedServices[activeTab] || [];
  };

  return (
    <div className="services-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-10">
        Our Services
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${activeTab === category
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>


          <div className="services-grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getServicesToDisplay().map((service, idx) => (
                <div
                  key={service.id || idx}
                  className="bg-white shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 p-4 sm:p-6 flex flex-col transform hover:-translate-y-1"
                >

                  {service.image_path && (
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={getCleanImageUrl(service.image_url, service.image_path)}
                        alt={service.name || "Service Image"}
                        className="w-full h-40 sm:h-48 md:h-56 object-cover transform hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">
                    {service.name}
                  </h4>


                  <p className="text-gray-600 text-sm sm:text-base flex-1 mb-4">
                    {service.description || "Innovative and functional design solutions."}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="mt-auto">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">
                        Features:
                      </h5>
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
                </div>
              ))}
            </div>
          </div>

          {getServicesToDisplay().length === 0 && activeTab !== "All" && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base sm:text-lg">
                No services available in {activeTab} category.
              </p>
              <button
                onClick={() => setActiveTab("All")}
                className="mt-4 px-5 py-2 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Services
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
