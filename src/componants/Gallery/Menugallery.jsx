import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { galleryService } from "../../api/galleryService";
import Projectslider from "./Projectslider";
import { getCleanImageUrl } from "../../utils/imageUtils";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://backend.riddhisiddhiarchitect.in";

export default function Menugallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadGallery = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await galleryService.fetchItems();
      const normalized = Array.isArray(data)
        ? data.map((g) => ({
            id: g.id ?? Math.random(),
            src: getCleanImageUrl(g.image_url, g.image_path),
          }))
        : [];
      setItems(normalized);
    } catch (err) {
      console.error("Failed to fetch Menugallery images:", err);
      setError(err);
      toast.error("Failed to load gallery.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  return (
    <>
      <Projectslider />

      <section className="text-black py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="uppercase tracking-widest text-sm font-semibold mb-2">
            Our Projects
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Explore Our Projects
          </h3>

          {error && !loading && (
            <div className="mb-4 text-sm text-red-600">
              Could not load gallery from server.
              <button
                onClick={loadGallery}
                className="ml-2 underline hover:no-underline text-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <LoadingGridPlaceholder />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative group overflow-hidden shadow-lg"
                >
                  <img
                    src={item.src}
                    alt="Gallery"
                    className="w-full h-64 object-cover transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <button
                      onClick={() => setSelectedImage(item.src)}
                      className="bg-white text-black px-4 py-1 text-sm uppercase font-medium rounded hover:bg-gray-300 transition"
                    >
                      View Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-gray-300"
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Full View"
            className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
          />
        </div>
      )}
    </>
  );
}

function LoadingGridPlaceholder() {
  const count = 9;
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 animate-pulse"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full h-64 bg-gray-200" />
      ))}
    </div>
  );
}

