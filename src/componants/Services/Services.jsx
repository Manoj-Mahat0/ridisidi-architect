import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { serviceService } from "../../api/serviceService";
import { getCleanImageUrl } from "../../utils/imageUtils";

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [loading, setLoading] = useState(false);

 const fetchServices = async () => {
  try {
    setLoading(true);
    const data = await serviceService.fetchServices();
    console.log("Fetched Services:", data); 
    console.log("Services array check:", Array.isArray(data));
    console.log("Services length:", data?.length || 0);
    
    if (Array.isArray(data) && data.length > 0) {
      console.log("First service item:", data[0]);
      console.log("Service fields:", Object.keys(data[0]));
    }
    
    setServices(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching services:", error);
    toast.error("Failed to fetch services");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchServices();
  }, []);

  const categories = [
    "All",
    ...new Set(services.map((item) => item.name)), // using `name` field from API
  ];

  const filteredData =
    selectedCategory === "All"
      ? services
      : services.filter((item) => item.name === selectedCategory);

  return (
    <div className="py-10 px-4 mt-10">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Our Services
      </h2>

      

      <div className="flex justify-center gap-3 flex-wrap mb-10">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 text-sm font-medium border rounded-full transition-all ${
              selectedCategory === category
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl overflow-hidden group relative"
            >
              <img
                src={getCleanImageUrl(item.image_url, item.image_path)}
                alt={item.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  console.error('Image failed to load:', item.image_path);
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {item.description}
                </p>
                <button
                  onClick={() => setOpenModalIndex(index)}
                  className="mt-4 px-4 py-2 text-sm border border-black text-black rounded hover:bg-black hover:text-white transition"
                >
                  View More
                </button>
              </div>

              {/* Modal */}
              {openModalIndex === index && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4">
                  <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative shadow-xl max-h-[90vh] overflow-y-auto">
                    <button
                      onClick={() => setOpenModalIndex(null)}
                      className="absolute top-3 right-4 text-2xl text-gray-700 hover:text-red-500 transition"
                    >
                      &times;
                    </button>
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={getCleanImageUrl(item.image_url, item.image_path)}
                        alt={item.name}
                        className="w-full max-h-[50vh] object-contain rounded-md mb-4"
                        onError={(e) => {
                          console.error('Modal image failed to load:', item.image_path);
                          e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                        }}
                      />
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm text-justify">{item.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
