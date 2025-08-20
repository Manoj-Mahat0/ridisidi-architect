import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiAlertCircle, FiEdit } from 'react-icons/fi';
import { bannerService } from '../../api/bannerService';
import { toast } from 'react-hot-toast';
import BannerModal from './BannerModal';
import { getCleanImageUrl, logImageUrlInfo } from '../../utils/imageUtils';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const fetchBanners = async () => {
    try {
      setLoadingBanners(true);
      const data = await bannerService.fetchBanners();
      setBanners(data);
    } catch (error) {
      toast.error("Failed to fetch banners");
    } finally {
      setLoadingBanners(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleCreateBanner = async (formData) => {
    setLoading(true);
    try {
      await bannerService.createBanner(formData);
      toast.success('Banner created successfully');
      fetchBanners();
      return true;
    } catch (error) {
      toast.error('Failed to create banner');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBanner = async (id, formData) => {
    setLoading(true);
    try {
      await bannerService.updateBanner(id, formData);
      toast.success('Banner updated successfully');
      fetchBanners();
      return true;
    } catch (error) {
      toast.error('Failed to update banner');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    setIsDeleting(true);
    try {
      await bannerService.deleteBanner(id);
      toast.success('Banner deleted');
      fetchBanners();
    } catch (error) {
      toast.error('Failed to delete banner');
    } finally {
      setIsDeleting(false);
    }
  };

  const openEditModal = (banner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🖼️ Banner Manager</h1>

      {/* Add Banner Button */}
      <div className="mb-8 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <FiPlus className="mr-2" />
          Add New Banner
        </button>
      </div>

      {/* Banner Modal */}
      <BannerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingBanner={editingBanner}
        onSubmit={async (formData) => {
          let success = false;
          if (editingBanner) {
            success = await handleUpdateBanner(editingBanner.id, formData);
          } else {
            success = await handleCreateBanner(formData);
          }
          if (success) {
            closeModal();
          }
        }}
        loading={loading}
      />

     

      {/* Display Banners */}
      <div className="bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold p-6 border-b">🎯 Current Banners</h2>
        {loadingBanners ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : banners.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500">
            <FiAlertCircle className="w-12 h-12 mb-4" />
            <p>No banners found. Upload your first banner!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="relative rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={getCleanImageUrl(banner.image_url, banner.image_path)}
                  alt={banner.image_alt || banner.title}
                  className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const cleanUrl = getCleanImageUrl(banner.image_url, banner.image_path);
                    console.error('Image failed to load:', cleanUrl);
                    logImageUrlInfo(banner.image_url, banner.image_path, cleanUrl);
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                  onLoad={() => {
                    const cleanUrl = getCleanImageUrl(banner.image_url, banner.image_path);
                    logImageUrlInfo(banner.image_url, banner.image_path, cleanUrl);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(banner)}
                    className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md"
                  >
                    <FiEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    disabled={isDeleting}
                    className="flex items-center text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiTrash2 className="mr-2" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm px-3 py-2">
                  <div className="font-semibold">{banner.title}</div>
                  {banner.description && (
                    <div className="text-xs opacity-80 truncate">{banner.description}</div>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    banner.is_active 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {banner.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
