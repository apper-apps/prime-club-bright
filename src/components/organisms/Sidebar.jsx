import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Sidebar = ({ onClose }) => {
  const navigationItems = [
    { path: "/", label: "Dashboard", icon: "BarChart3" },
    { path: "/contacts", label: "Contacts", icon: "Users" },
    { path: "/pipeline", label: "Deal Pipeline", icon: "GitBranch" },
    { path: "/calendar", label: "Calendar", icon: "Calendar" },
    { path: "/leaderboard", label: "Leaderboard", icon: "Trophy" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Prime Club
              </h2>
              <p className="text-xs text-gray-600">CRM System</p>
            </div>
          </motion.div>
          
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              <ApperIcon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 p-4 space-y-2"
      >
        {navigationItems.map((item) => (
          <motion.div key={item.path} variants={itemVariants}>
            <NavLink
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ApperIcon
                    name={item.icon}
                    size={20}
                    className={`transition-all duration-200 ${
                      isActive ? "text-white" : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </motion.nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <ApperIcon name="Star" size={16} className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-900">Pro Tips</span>
          </div>
          <p className="text-xs text-gray-600">
            Use keyboard shortcuts to navigate faster through your pipeline!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;