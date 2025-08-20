import { Outlet } from "react-router-dom";
import AdminSidebar from "../componants/Admin/AdminSidebar";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <AdminSidebar />
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 right-0 left-0 z-40 bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <FiUser className="text-white text-sm" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 truncate">
                {user?.email || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role || 'Administrator'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>

      <main className="flex-1 bg-gray-100 overflow-auto p-3 sm:p-4 lg:p-6 pt-16 lg:pt-3">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
