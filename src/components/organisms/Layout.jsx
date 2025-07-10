import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";
import { motion } from "framer-motion";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-64 bg-white border-r border-gray-200 shadow-xl"
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="min-h-screen bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;