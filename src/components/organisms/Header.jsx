import { useLocation } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/contacts":
        return "Contacts";
      case "/pipeline":
        return "Deal Pipeline";
      case "/calendar":
        return "Calendar";
      case "/leaderboard":
        return "Leaderboard";
      default:
        return "Prime Club CRM";
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-4 py-4 lg:px-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {getPageTitle()}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome back to Prime Club CRM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ApperIcon name="Bell" size={20} />
          </Button>
          
          <Button variant="ghost" size="sm">
            <ApperIcon name="Settings" size={20} />
          </Button>
          
          <div className="h-8 w-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <ApperIcon name="User" size={16} className="text-white" />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;