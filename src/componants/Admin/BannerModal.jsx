import React, { useState, useEffect } from 'react';
import { FiUpload, FiX, FiSave } from 'react-icons/fi';
import { getCleanImageUrl } from '../../utils/imageUtils';

const BannerModal = ({ isOpen, onClose, editingBanner, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_alt: '',
    button_text: '',
    button_link: '',
    is_active: true,
    sort_order: 0
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (editingBanner) {
      setFormData({
        title: editingBanner.title || '',
        description: editingBanner.description || '',
        image_alt: editingBanner.image_alt || '',
        button_text: editingBanner.button_text || '',
        button_link: editingBanner.button_link || '',
        is_active: editingBanner.is_active !== undefined ? editingBanner.is_active : true,
        sort_order: editingBanner.sort_order || 0
      });
      if (editingBanner.image_url || editingBanner.image_path) {
        setImagePreview(getCleanImageUrl(editingBanner.image_url, editingBanner.image_path));
      }
    } else {
      setFormData({
        title: '',
        description: '',
        image_alt: '',
        button_text: '',
        button_link: '',
        is_active: true,
        sort_order: 0
      });
      setImagePreview('');
    }
    setSelectedFile(null);
  }, [editingBanner]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitFormData = new FormData();
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      if (key === 'is_active') {
        submitFormData.append(key, formData[key]);
      } else {
        submitFormData.append(key, formData[key].toString());
      }
    });
    
    // Add image if selected
    if (selectedFile) {
      submitFormData.append('image', selectedFile);
    }
    
    onSubmit(submitFormData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">
            {editingBanner ? 'Edit Banner' : 'Add New Banner'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
            </label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter banner title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter banner description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                name="image_alt"
                value={formData.image_alt}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter image alt text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                name="button_text"
                value={formData.button_text}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter button text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Link
              </label>
              <input
                type="url"
                name="button_link"
                value={formData.button_link}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter button link URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleInputChange}
                min="0"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter sort order"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700">
              Active Banner
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {editingBanner ? 'Update Image (optional)' : 'Image *'}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={!editingBanner}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            />
            {(imagePreview || selectedFile) && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 transition-colors"
            >
              {editingBanner ? <FiSave className="mr-2" /> : <FiUpload className="mr-2" />}
              {loading ? 'Saving...' : (editingBanner ? 'Update Banner' : 'Create Banner')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerModal;