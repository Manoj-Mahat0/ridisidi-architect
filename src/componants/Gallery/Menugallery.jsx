import React, { useEffect, useState, useCallback } from "react";
import { galleryService } from "../../api/galleryService";
import Projectslider from "./Projectslider";
import { getCleanImageUrl } from "../../utils/imageUtils";

export default function Menugallery() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadGallery = useCallback(async () => {
    setLoading(true);
    try {
      const cats = await galleryService.fetchCategories();

      const categoriesWithItems = await Promise.all(
        cats.map(async (cat) => {
          try {
            const items = await galleryService.fetchItems(cat.id);
            const normalizedItems = Array.isArray(items)
              ? items.map((g) => ({
                  id: g.id ?? Math.random(),
                  src: getCleanImageUrl(g.image_url, g.image_path),
                }))
              : [];
            return { ...cat, items: normalizedItems };
          } catch {
            return { ...cat, items: [] };
          }
        })
      );

      setCategories(categoriesWithItems);
    } catch {
      setCategories([]);
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
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="uppercase tracking-widest text-sm font-semibold mb-2 text-center">
            Our Projects
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Explore Our Projects
          </h3>

          {loading ? (
            <LoadingGridPlaceholder />
          ) : (
            <div className="space-y-12">
              {categories.map(
                (cat) =>
                  cat.items.length > 0 && (
                    <div key={cat.id}>
                      {/* Category Heading */}
                      <h4 className="text-2xl font-semibold mb-4">
                        {cat.name}
                      </h4>

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {cat.items.map((item) => (
                          <div
                            key={item.id}
                            className="relative group overflow-hidden rounded-lg shadow-lg"
                          >
                        <img
  src={item.src}
  alt="Gallery"
  className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover transform duration-300 group-hover:scale-110"
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
                    </div>
                  )
              )}
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
            className="max-h-[90vh] max-w-[90vw] rounded shadow-lg object-contain"
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
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 animate-pulse"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full h-56 sm:h-64 md:h-72 bg-gray-200 rounded-lg" />
      ))}
    </div>
  );
}
