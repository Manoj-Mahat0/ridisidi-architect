import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

const ServiceAdmin = lazy(() => import("./componants/Admin/ServiceAdmin"));
const GalleryAdmin = lazy(() => import("./componants/Admin/GalleryAdmin"));
const Banner = lazy(() => import("./componants/Admin/Banner"));
const ContactAdmin = lazy(() => import("./componants/Admin/ContactAdmin"));
const Users = lazy(() => import("./componants/Admin/Users"));
const Dashboard = lazy(() => import("./componants/Admin/Dashboard"));
const Login = lazy(() => import("./componants/Auth/Login")); 
const Home = lazy(() => import("./componants/Home/Home"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));

import LayOut from "./layout/LayOut";
import Loading from "./componants/pages/Loading";
import { Toaster } from "react-hot-toast";
import StickyContactButtons from "./componants/Home/Stickybutton";
import Menuaboutus from "./componants/Aboutus/Menuaboutus";
import Menugallery from "./componants/Gallery/Menugallery";
import Menucontactus from "./componants/Contactus/Menucontactus";
import Menuservices from "./componants/Services/Menuservices";
import Menuourteam from "./componants/Ourteam/Menuourteam";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`${isAdminRoute ? 'w-full' : 'max-w-6xl mx-auto px-4'} bg-white text-black min-h-screen relative`}>
      {children}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <StickyContactButtons />
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public Site with Layout */}
              <Route path="/" element={<LayOut />}>
                <Route index element={<Home />} />
                <Route path="menuaboutus" element={<Menuaboutus />} />
                <Route path="menugallery" element={<Menugallery />} />
                <Route path="menucontactus" element={<Menucontactus />} />
                <Route path="menuservices" element={<Menuservices />} />
                <Route path="menuourteam" element={<Menuourteam />} />
              </Route>

              {/* Login */}
              <Route path="/login" element={<LayOut />}>
                <Route index element={<Login />} />
              </Route>

              {/* Admin */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="banner" element={<Banner />} />
                <Route path="gallery" element={<GalleryAdmin />} />
                <Route path="services" element={<ServiceAdmin />} />
                <Route path="contacts" element={<ContactAdmin />} />
              </Route>
            </Routes>
          </Suspense>
          <Toaster />
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
