import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiFolder, FiImage } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { galleryService } from '../../api/galleryService';
import { formatFormData, createFormData } from '../../utils/formUtils';
import { getCleanImageUrl, logImageUrlInfo } from '../../utils/imageUtils';

const GalleryAdmin = () => {
  // State for categories
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCategoryDeleteModalOpen, setIsCategoryDeleteModalOpen] = useState(false);

  // State for items
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  // const [isItemDeleteModalOpen, setIsItemDeleteModalOpen] = useState(false); // REMOVE

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    is_active: true,
    sort_order: 0
  });

  // Item form state
  const [itemForm, setItemForm] = useState({
    title: '',
    description: '',
    image_alt: '',
    client_name: '',
    project_date: '',
    location: '',
    is_featured: false,
    is_active: true,
    sort_order: 0,
    category_id: ''
  });
  const [itemImage, setItemImage] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await galleryService.fetchCategories();
      console.log('Categories fetched:', data);
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fetch items
  const fetchItems = async () => {
    try {
      setLoadingItems(true);
      const data = await galleryService.fetchItems();
      console.log('Items fetched:', data);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      toast.error('Failed to fetch items');
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  // Category handlers
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = formatFormData(categoryForm);
      if (selectedCategory) {
        await galleryService.updateCategory(selectedCategory.id, formData);
        toast.success('Category updated successfully');
      } else {
        await galleryService.createCategory(formData);
        toast.success('Category created successfully');
      }
      fetchCategories();
      setIsCategoryModalOpen(false);
      setSelectedCategory(null);
      setCategoryForm({ name: '', description: '', is_active: true, sort_order: 0 });
    } catch (error) {
      console.error('Failed to save category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleCategoryDelete = async () => {
    try {
      await galleryService.deleteCategory(selectedCategory.id);
      toast.success('Category deleted successfully');
      fetchCategories();
      setIsCategoryDeleteModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('Failed to delete category');
    }
  };

  // Item handlers
  const handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = createFormData({ ...itemForm, image: itemImage });
      
      if (selectedItem) {
        await galleryService.updateItem(selectedItem.id, formData);
        toast.success('Item updated successfully');
      } else {
        await galleryService.createItem(formData);
        toast.success('Item created successfully');
      }
      fetchItems();
      setIsItemModalOpen(false);
      setSelectedItem(null);
      setItemForm({
        title: '', description: '', image_alt: '', client_name: '',
        project_date: '', location: '', is_featured: false,
        is_active: true, sort_order: 0, category_id: ''
      });
      setItemImage(null);
    } catch (error) {
      console.error('Failed to save item:', error);
      toast.error('Failed to save item');
    }
  };

  // Remove handleItemDelete function
  // const handleItemDelete = async () => {
  //   try {
  //     await galleryService.deleteItem(selectedItem.id);
  //     toast.success('Item deleted successfully');
  //     fetchItems();
  //     setIsItemDeleteModalOpen(false);
  //     setSelectedItem(null);
  //   } catch (error) {
  //     console.error('Failed to delete item:', error);
  //     toast.error('Failed to delete item');
  //   }
  // };

  // Open category modal for editing
  const openCategoryEdit = (category) => {
    setSelectedCategory(category);
    setCategoryForm({
      name: category.name || '',
      description: category.description || '',
      is_active: category.is_active !== undefined ? category.is_active : true,
      sort_order: category.sort_order || 0
    });
    setIsCategoryModalOpen(true);
  };

  // Open item modal for editing
  const openItemEdit = (item) => {
    setSelectedItem(item);
    setItemForm({
      title: item.title || '',
      description: item.description || '',
      image_alt: item.image_alt || '',
      client_name: item.client_name || '',
      project_date: item.project_date ? new Date(item.project_date).toISOString().split('T')[0] : '',
      location: item.location || '',
      is_featured: item.is_featured || false,
      is_active: item.is_active !== undefined ? item.is_active : true,
      sort_order: item.sort_order || 0,
      category_id: item.category_id || ''
    });
    setIsItemModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Gallery Management</h1>

      {/* Categories Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
            <FiFolder className="mr-2" />
            Categories
          </h2>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCategoryForm({ name: '', description: '', is_active: true, sort_order: 0 });
              setIsCategoryModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            <FiPlus className="w-5 h-5" />
            Add Category
          </button>
        </div>

        

        {loadingCategories ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No categories found</p>
            <p className="text-sm">Add your first category to get started</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    category.is_active 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {category.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <p className="text-gray-500 text-xs mb-3">Sort Order: {category.sort_order}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => openCategoryEdit(category)}
                    className="text-blue-600 hover:text-blue-800 transition p-1"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsCategoryDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-700 transition p-1"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Items Section */}
      <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
            <FiImage className="mr-2" />
            Gallery Items
          </h2>
          <button
            onClick={() => {
              setSelectedItem(null);
              setItemForm({
                title: '', description: '', image_alt: '', client_name: '',
                project_date: '', location: '', is_featured: false,
                is_active: true, sort_order: 0, category_id: ''
              });
              setItemImage(null);
              setIsItemModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            <FiPlus className="w-5 h-5" />
            Add Item
          </button>
        </div>


        {loadingItems ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No items found</p>
            <p className="text-sm">Add your first gallery item to get started</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={getCleanImageUrl(item.image_url, item.image_path)}
                    alt={item.image_alt || item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const cleanUrl = getCleanImageUrl(item.image_url, item.image_path);
                      console.error('Image failed to load:', cleanUrl);
                      logImageUrlInfo(item.image_url, item.image_path, cleanUrl);
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                    onLoad={() => {
                      const cleanUrl = getCleanImageUrl(item.image_url, item.image_path);
                      logImageUrlInfo(item.image_url, item.image_path, cleanUrl);
                    }}
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {item.is_featured && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-500 text-white">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.is_active 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <div className="text-xs text-gray-500 space-y-1 mb-3">
                    <p><strong>Client:</strong> {item.client_name}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Date:</strong> {item.project_date ? new Date(item.project_date).toLocaleDateString() : 'Not specified'}</p>
                    <p><strong>Category:</strong> {item.category?.name || 'Uncategorized'}</p>
                    <p><strong>Sort Order:</strong> {item.sort_order}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => openItemEdit(item)}
                      className="text-blue-600 hover:text-blue-800 transition p-1"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
        {/* Delete button removed */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {selectedCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Category Name *"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
              <textarea
                placeholder="Description *"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                className="w-full border px-3 py-2 rounded-md"
                rows="3"
                required
              />
              <input
                type="number"
                placeholder="Sort Order"
                value={categoryForm.sort_order}
                onChange={(e) => setCategoryForm({...categoryForm, sort_order: parseInt(e.target.value) || 0})}
                className="w-full border px-3 py-2 rounded-md"
                min="0"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={categoryForm.is_active}
                  onChange={(e) => setCategoryForm({...categoryForm, is_active: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Active Category
                </label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {selectedCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold">
                {selectedItem ? 'Edit Item' : 'Add Item'}
              </h2>
            <button
                onClick={() => setIsItemModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>
            </div>
            <form onSubmit={handleItemSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title *"
                  value={itemForm.title}
                  onChange={(e) => setItemForm({...itemForm, title: e.target.value})}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Client Name"
                  value={itemForm.client_name}
                  onChange={(e) => setItemForm({...itemForm, client_name: e.target.value})}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <textarea
                placeholder="Description *"
                value={itemForm.description}
                onChange={(e) => setItemForm({...itemForm, description: e.target.value})}
                className="w-full border px-3 py-2 rounded-md"
                rows="3"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={itemForm.location}
                  onChange={(e) => setItemForm({...itemForm, location: e.target.value})}
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  type="date"
                  value={itemForm.project_date}
                  onChange={(e) => setItemForm({...itemForm, project_date: e.target.value})}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={itemForm.category_id}
                  onChange={(e) => setItemForm({...itemForm, category_id: e.target.value})}
                  className="w-full border px-3 py-2 rounded-md"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Sort Order"
                  value={itemForm.sort_order}
                  onChange={(e) => setItemForm({...itemForm, sort_order: parseInt(e.target.value) || 0})}
                  className="w-full border px-3 py-2 rounded-md"
                  min="0"
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={itemForm.is_active}
                    onChange={(e) => setItemForm({...itemForm, is_active: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Active Item</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={itemForm.is_featured}
                    onChange={(e) => setItemForm({...itemForm, is_featured: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Featured Item</label>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setItemImage(e.target.files[0])}
                className="w-full"
                required={!selectedItem}
              />
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
              <button
                type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                  {selectedItem ? 'Update' : 'Create'}
              </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modals */}
      {isCategoryDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Category</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsCategoryDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleCategoryDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove item delete modal */}
      {/* {isItemDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Item</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedItem?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsItemDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleItemDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default GalleryAdmin;
