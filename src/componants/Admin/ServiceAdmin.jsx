import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { serviceService } from '../../api/serviceService';
import ServiceEditModal from './ServiceEditModal';
import ServiceDeleteModal from './ServiceDeleteModal';
import { getCleanImageUrl, logImageUrlInfo } from '../../utils/imageUtils';

const ServiceAdmin = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload form state
  const [uploading, setUploading] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [newIsActive, setNewIsActive] = useState(true);
  const [newSortOrder, setNewSortOrder] = useState(0);
  const [imageFile, setImageFile] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.fetchServices();
      console.log('Services fetched:', data);
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newName || !newDescription || !imageFile) {
      toast.error('Name, description and image are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', newName);
    formData.append('description', newDescription);
    formData.append('icon', newIcon);
    formData.append('is_active', newIsActive);
    formData.append('sort_order', newSortOrder);
    formData.append('image', imageFile);

    try {
      setUploading(true);
      await serviceService.createService(formData);
      toast.success('Service added successfully');
      fetchServices();
      setIsUploadModalOpen(false);
      // Reset form
      setNewName('');
      setNewDescription('');
      setNewIcon('');
      setNewIsActive(true);
      setNewSortOrder(0);
      setImageFile(null);
    } catch (error) {
      console.error('Failed to add service:', error);
      toast.error('Failed to add service');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async (formData) => {
    try {
      setLoading(true);
      await serviceService.updateService(selectedService.id, formData);
      toast.success('Service updated successfully');
      fetchServices();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update service:', error);
      toast.error('Failed to update service');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await serviceService.deleteService(selectedService.id);
      toast.success('Service deleted successfully');
      fetchServices();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete service:', error);
      toast.error('Failed to delete service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Service Management</h1>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          <FiPlus className="w-5 h-5" />
          Add Service
        </button>
      </div>

        

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading services...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No services found</p>
          <p className="text-sm">Add your first service to get started</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl overflow-hidden shadow-lg bg-white transition hover:shadow-xl"
            >
              <div className="relative">
                                  <img
                    src={getCleanImageUrl(service.image_url, service.image_path)}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const cleanUrl = getCleanImageUrl(service.image_url, service.image_path);
                      console.error('Image failed to load:', cleanUrl);
                      logImageUrlInfo(service.image_url, service.image_path, cleanUrl);
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                    onLoad={() => {
                      const cleanUrl = getCleanImageUrl(service.image_url, service.image_path);
                      logImageUrlInfo(service.image_url, service.image_path, cleanUrl);
                    }}
                  />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    service.is_active 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {service.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
                <p className="text-gray-600 text-sm mt-2">{service.description}</p>
                {service.icon && (
                  <p className="text-gray-500 text-xs mt-1">Icon: {service.icon}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">Sort Order: {service.sort_order}</p>
                <div className="flex justify-end mt-4 space-x-3">
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setIsEditModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpload}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">Add New Service</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Service Name *"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              
              <textarea
                placeholder="Description *"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                rows="3"
                required
              ></textarea>
              
              <input
                type="text"
                placeholder="Icon (optional)"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              />
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newIsActive}
                  onChange={(e) => setNewIsActive(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Active Service
                </label>
              </div>
              
              <input
                type="number"
                placeholder="Sort Order"
                value={newSortOrder}
                onChange={(e) => setNewSortOrder(parseInt(e.target.value) || 0)}
                className="w-full border px-3 py-2 rounded-md"
                min="0"
              />
              
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full"
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modals */}
      <ServiceEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        service={selectedService}
        onSubmit={handleEdit}
        loading={loading}
      />

      <ServiceDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default ServiceAdmin;
