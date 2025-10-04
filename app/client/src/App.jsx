// src/App.js
import React, { useState, useEffect, memo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ShipsyLanding from "./components/landing";
import DashboardStats from "./components/DashboardStats";
import MyShipments from "./components/MyShipments";
import AllShipments from "./components/AllShipments";
import DashboardNavbar from "./components/DashboardNavbar";
import Chatbot from "./components/Chatbot";

// Fake authentication hook
const useAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  // const isAuth = true;
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
};

// Dashboard Layout Component
const DashboardLayout = memo(({ children }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const location = useLocation();

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname.replace("/", "");
    const tabMap = {
      dashboard: "Dashboard",
      myshipments: "MyShipments",
      allshipments: "AllShipments"
    };
    setActiveTab(tabMap[path] || "Dashboard");
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-gray-800 overflow-hidden relative bg-[#FFFFFF]">
      <DashboardNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="mt-25">
        {children}
      </div>
      {/* Chatbot - only visible when user is logged in */}
      <Chatbot />
    </div>
  );
});

DashboardLayout.displayName = 'DashboardLayout';

// Page transition animation
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <ShipsyLanding />
            </motion.div>
          }
        />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <DashboardStats />
                </motion.div>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/myshipments"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <MyShipments />
                </motion.div>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/allshipments"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <AllShipments />
                </motion.div>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
      {/* Toast Container at root level */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}
