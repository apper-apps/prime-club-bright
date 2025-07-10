import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry = null, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-4 rounded-full mb-4">
        <ApperIcon name="AlertCircle" size={48} className="text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-slate-400 mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
        >
          <ApperIcon name="RefreshCw" size={16} className="mr-2 inline" />
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default Error;