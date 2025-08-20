import React from 'react';
import { FiUsers, FiUserPlus, FiUserCheck, FiUserX } from 'react-icons/fi';

const Users = () => {
  // Dummy user data for demonstration
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'User' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Inactive', role: 'User' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active', role: 'User' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', status: 'Pending', role: 'User' },
  ];

  // User statistics
  const stats = {
    total: users.length,
    active: users.filter(user => user.status === 'Active').length,
    inactive: users.filter(user => user.status === 'Inactive').length,
    pending: users.filter(user => user.status === 'Pending').length,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>
      
      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            <FiUsers className="text-blue-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="p-3 bg-green-100 rounded-full mr-4">
            <FiUserCheck className="text-green-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-500">Active Users</p>
            <p className="text-2xl font-semibold">{stats.active}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="p-3 bg-red-100 rounded-full mr-4">
            <FiUserX className="text-red-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-500">Inactive Users</p>
            <p className="text-2xl font-semibold">{stats.inactive}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="p-3 bg-yellow-100 rounded-full mr-4">
            <FiUserPlus className="text-yellow-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-500">Pending Users</p>
            <p className="text-2xl font-semibold">{stats.pending}</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${user.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                    ${user.status === 'Inactive' ? 'bg-red-100 text-red-800' : ''}
                    ${user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;