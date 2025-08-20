import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getTokenExpiryTime, formatFormData } from "../../utils/tokenUtils";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [requestResetLoading, setRequestResetLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://backend.riddhisiddhiarchitect.in/api/v1/auth/login", {
        email,
        password,
      });

      if (response.data && response.data.access_token) {
        // Calculate token expiry time using utility function
        const expiryTime = getTokenExpiryTime(response.data.expires_in);
        
        // Create user data with all token information
        const userData = {
          email: email,
          role: "admin",
          accessToken: response.data.access_token,
          tokenType: response.data.token_type,
          refreshToken: response.data.refresh_token,
          expiresIn: expiryTime,
        };

        login(userData);
        toast.success("Login successful!");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 422) {
        toast.error("Please check your email and password format");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPasswordReset = async (e) => {
    e.preventDefault();
    setRequestResetLoading(true);

    try {
      // Since the request-password-reset endpoint doesn't exist, 
      // we'll show a manual reset key input form
      toast.info("Please enter the reset key manually. Contact your administrator if you don't have one.");
    } catch (error) {
      console.error("Password reset request failed:", error);
      toast.error("Failed to process reset request. Please try again.");
    } finally {
      setRequestResetLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);

    try {
      // Format data exactly as required by the API
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('reset_key', resetToken);
      formData.append('new_password', newPassword);
      
      console.log('Reset password request data:', {
        email,
        reset_key: resetToken,
        new_password: newPassword
      });
      
      const response = await axios.post("https://backend.riddhisiddhiarchitect.in/api/v1/auth/reset-password", 
        formData,
        {
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json'
          }
        }
      );
      
      console.log('Reset password response:', response.data);

      if (response.data && response.data.message) {
        toast.success(response.data.message || "Password reset successfully");
        setShowForgotPasswordModal(false);
        setResetToken("");
        setNewPassword("");
        setPassword(""); // Clear the login password field
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      if (error.response?.status === 422) {
        toast.error("Invalid reset key or email. Please check and try again.");
      } else if (error.response?.status === 400) {
        toast.error("Bad request. Please check your input.");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } finally {
      setResetLoading(false);
    }
  };

  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
    setResetToken("");
    setNewPassword("");
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    setResetToken("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 w-full max-w-sm">
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <h2 className="text-xl font-bold mb-6 text-center">Admin Login</h2>

          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700"
          />

          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={openForgotPasswordModal}
            disabled={!email}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Forgot Password?
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Contact your administrator to get a reset key
          </p>
        </form>

        {/* Forgot Password Modal */}
        {showForgotPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
                <button
                  onClick={closeForgotPasswordModal}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Email:</strong> {email}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Enter the reset key provided by your administrator</p>
                </div>

                <form onSubmit={handleResetPassword}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Reset Key</label>
                    <input
                      type="text"
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      placeholder="Enter reset key"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={resetLoading || !newPassword || !resetToken}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {resetLoading ? "Resetting..." : "Reset Password"}
                    </button>
                    
                    <button
                      type="button"
                      onClick={closeForgotPasswordModal}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
