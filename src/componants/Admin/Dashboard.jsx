import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axiosConfig';
import { bannerService } from '../../api/bannerService';
import { serviceService } from '../../api/serviceService';
import { galleryService } from '../../api/galleryService';
import { contactService } from '../../api/contactService';

import {
  FiUsers,
  FiPieChart,
  FiUser,
  FiCalendar,
  FiMail,
  FiImage,
  FiSettings,
  FiFolder
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DashboardCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-white p-4 lg:p-6 rounded-lg shadow-md border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs lg:text-sm text-gray-500">{title}</p>
        <p className="text-lg lg:text-2xl font-semibold mt-1 lg:mt-2">{value}</p>
      </div>
      <Icon className="text-xl lg:text-2xl text-gray-400" />
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    banners: 0,
    services: 0,
    galleryCategories: 0,
    galleryItems: 0,
    contacts: 0
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/me');
        setUserProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const [banners, services, categories, items, contacts] = await Promise.all([
          bannerService.fetchBanners(),
          serviceService.fetchServices(),
          galleryService.fetchCategories(),
          galleryService.fetchItems(),
          contactService.fetchContacts()
        ]);

        setStats({
          banners: banners.length || 0,
          services: services.length || 0,
          galleryCategories: categories.length || 0,
          galleryItems: items.length || 0,
          contacts: contacts.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    if (user?.accessToken) {
      fetchUserProfile();
      fetchStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="p-4 lg:p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      

      {/* User Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FiUser className="text-2xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                {userProfile?.full_name || 'Admin User'}
              </h1>
              <p className="text-gray-600 text-sm lg:text-base flex items-center gap-2">
                <FiMail className="text-sm" />
                {userProfile?.email || user?.email}
              </p>
              <p className="text-gray-500 text-xs lg:text-sm flex items-center gap-2">
                <FiCalendar className="text-sm" />
                Member since {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              userProfile?.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {userProfile?.is_active ? 'Active' : 'Inactive'}
            </span>
            {userProfile?.is_superuser && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Super User
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <DashboardCard title="Total Banners" value={stats.banners} icon={FiImage} color="border-blue-500" />
        <DashboardCard title="Total Services" value={stats.services} icon={FiSettings} color="border-green-500" />
        <DashboardCard title="Gallery Items" value={stats.galleryItems} icon={FiFolder} color="border-yellow-500" />
        <DashboardCard title="Contact Messages" value={stats.contacts} icon={FiMail} color="border-red-500" />
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <FiImage className="text-2xl text-blue-500" />
            <span className="text-sm text-gray-500">{stats.banners} items</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Banner Management</h3>
          <p className="text-gray-600 text-sm mb-4">Manage website banners and promotional content</p>
          <button 
            onClick={() => window.location.href = '/admin/banner'}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Manage Banners →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <FiSettings className="text-2xl text-green-500" />
            <span className="text-sm text-gray-500">{stats.services} items</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Management</h3>
          <p className="text-gray-600 text-sm mb-4">Manage architectural services and offerings</p>
          <button 
            onClick={() => window.location.href = '/admin/services'}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Manage Services →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <FiFolder className="text-2xl text-yellow-500" />
            <span className="text-sm text-gray-500">{stats.galleryItems} items</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Gallery Management</h3>
          <p className="text-gray-600 text-sm mb-4">Manage project gallery and portfolio items</p>
          <button 
            onClick={() => window.location.href = '/admin/gallery'}
            className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
          >
            Manage Gallery →
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <FiMail className="text-2xl text-red-500" />
            <span className="text-sm text-gray-500">{stats.contacts} messages</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Management</h3>
          <p className="text-gray-600 text-sm mb-4">View and manage contact form submissions</p>
          <button 
            onClick={() => window.location.href = '/admin/contacts'}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            View Contacts →
          </button>
        </div>
      </div>

      {/* Recent Activity Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 mb-6 lg:mb-8">
        <h2 className="text-base lg:text-lg font-semibold mb-4">Content Overview</h2>
        <div className="h-64 lg:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { category: 'Banners', count: stats.banners },
                { category: 'Services', count: stats.services },
                { category: 'Gallery Items', count: stats.galleryItems },
                { category: 'Contacts', count: stats.contacts },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
