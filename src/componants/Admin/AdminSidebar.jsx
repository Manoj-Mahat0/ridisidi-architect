import React, { useState } from 'react';
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiLogOut,
  FiMenu,
  FiX,
  FiImage,
  FiUser,
  FiMail
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axiosConfig';
import toast from 'react-hot-toast';

const menuItems = [
  { label: 'Dashboard', icon: FiHome, path: '/admin' },
  { label: 'Banner', icon: FiImage, path: '/admin/banner' },
  { label: 'Gallery', icon: FiImage, path: '/admin/gallery' },
  { label: 'Services', icon: FiSettings, path: '/admin/services' },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    } finally {
      logout();
      navigate('/login');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-[#1F2937] text-white rounded-md shadow-lg"
        >
          {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        h-screen bg-[#1F2937] text-white 
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isOpen ? 'w-64' : 'w-20'} 
        lg:block
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700 flex-shrink-0">
          {isOpen && <h2 className="text-lg font-semibold">Admin Panel</h2>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:bg-gray-700 rounded hidden lg:block"
          >
            <FiMenu size={20} />
          </button>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 text-white hover:bg-gray-700 rounded lg:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="px-4 py-4 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FiUser className="text-white" size={18} />
            </div>
            {isOpen && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">
                  {user?.email || 'Admin User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.role || 'Administrator'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto mt-6 space-y-2 px-2 pb-20">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <item.icon className="text-xl flex-shrink-0" />
                {isOpen && <span className="ml-4 text-sm truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-2 pb-4 bg-[#1F2937] border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-gray-300 hover:text-white"
          >
            <FiLogOut className="text-xl flex-shrink-0" />
            {isOpen && <span className="ml-4 text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
