import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

import Home from "./pages/Home.jsx";
import Collections from "./pages/Collections.jsx";
import DesignDetails from "./pages/DesignDetails.jsx";
import RequestForm from "./pages/RequestForm.jsx";
import RequestSuccess from "./pages/RequestSuccess.jsx";
import About from "./pages/About.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminDesigns from "./pages/admin/AdminDesigns.jsx";
import AdminDesignForm from "./pages/admin/AdminDesignForm.jsx";
import AdminCategories from "./pages/admin/AdminCategories.jsx";
import AdminRequests from "./pages/admin/AdminRequests.jsx";
import AdminRequestDetails from "./pages/admin/AdminRequestDetails.jsx";

const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-black">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollToTop />
      <ErrorBoundary>
        <Routes>
          {/* Public site */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/collections" element={<PublicLayout><Collections /></PublicLayout>} />
          <Route path="/design/:slug" element={<PublicLayout><DesignDetails /></PublicLayout>} />
          <Route path="/request/:slug" element={<PublicLayout><RequestForm /></PublicLayout>} />
          <Route path="/request-success" element={<PublicLayout><RequestSuccess /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="designs" element={<AdminDesigns />} />
            <Route path="designs/new" element={<AdminDesignForm />} />
            <Route path="designs/:id/edit" element={<AdminDesignForm />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="requests/:id" element={<AdminRequestDetails />} />
          </Route>

          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
