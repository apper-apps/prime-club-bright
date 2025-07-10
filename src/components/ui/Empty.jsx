import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item", 
  action = null,
  icon = "Database",
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-full mb-6">
        <ApperIcon name={icon} size={48} className="text-slate-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-slate-400 mb-8 max-w-md">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
        >
          <ApperIcon name={action.icon || "Plus"} size={20} className="mr-2 inline" />
          {action.text}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;