import React, { useState, useEffect } from 'react';
import { FiMail, FiX, FiRefreshCw } from 'react-icons/fi';
import { contactService } from '../../api/contactService';
import { toast } from 'react-hot-toast';

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactService.fetchContacts();
      console.log('Contacts fetched:', data);
      // Sort contacts by created_at in descending order (latest first)
      const sortedContacts = data.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      setContacts(sortedContacts);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      setError(error.message || 'Failed to fetch contacts');
      
      // Show more specific error messages
      if (error.code === 'ERR_NETWORK') {
        toast.error('Network error. Please check your connection.');
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Failed to fetch contacts. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);



  // Open view modal
  const openViewModal = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleString();
  };

  // Test API manually
  const testContactAPI = async () => {
    try {
      console.log('Testing contact API manually...');
      const response = await fetch('https://backend.riddhisiddhiarchitect.in/api/v1/contact/messages?skip=0&limit=100');
      const data = await response.json();
      console.log('Direct fetch result:', data);
      
      if (response.ok) {
        toast.success('API test successful - loaded ' + (data.length || 0) + ' contacts');
        if (data && data.length > 0) {
          const sortedContacts = data.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
          );
          setContacts(sortedContacts);
          setError(null);
        }
      } else {
        toast.error(`API test failed: ${response.status} ${response.statusText}`);
        setError(`API Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Direct fetch error:', error);
      toast.error('API test failed: ' + error.message);
      setError('API Test Failed: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FiMail className="mr-3" />
          Contact Management
        </h1>
        <button
          onClick={fetchContacts}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Debug Info */}
      <div className="mb-4 p-3 bg-blue-100 rounded text-sm">
        <strong>Debug Info:</strong> Contact API Status
        <ul className="list-disc list-inside ml-2 mt-1">
          <li>Loading: {loading ? 'Yes' : 'No'}</li>
          <li>Error: {error ? error : 'None'}</li>
          <li>Retry Count: {retryCount}</li>
          <li>Contacts Loaded: {contacts.length}</li>
          <li>Last API Call: {new Date().toLocaleTimeString()}</li>
        </ul>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={testContactAPI}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
          >
            Test API Directly
          </button>
          <button
            onClick={() => {
              console.log('Current state:', { contacts, loading, error, retryCount });
            }}
            className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
          >
            Log State
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading contacts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">
          <FiMail className="w-16 h-16 mx-auto mb-4 text-red-300" />
          <p className="text-lg font-semibold">Failed to load contacts</p>
          <p className="text-sm mb-4">{error}</p>
          <button
            onClick={() => {
              setRetryCount(prev => prev + 1);
              fetchContacts();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry ({retryCount + 1})
          </button>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FiMail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">No contact submissions found</p>
          <p className="text-sm">Contact forms will appear here when submitted</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => openViewModal(contact)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contact.subject}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(contact.created_at)}
                    </td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Contact Modal */}
      {isViewModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold">Contact Details</h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedContact.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <p className="text-gray-900">{selectedContact.subject}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{formatDate(selectedContact.created_at)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedContact.is_read 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedContact.is_read ? 'Read' : 'Unread'}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedContact.is_responded 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedContact.is_responded ? 'Responded' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default ContactAdmin;
