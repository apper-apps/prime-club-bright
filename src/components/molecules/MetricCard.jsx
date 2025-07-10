import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  trend = null, 
  color = "indigo",
  delay = 0,
  className = "" 
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = parseInt(value) || 0;
      const duration = 1000;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedValue(end);
          clearInterval(counter);
        } else {
          setAnimatedValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

const colorClasses = {
    teal: "from-teal-500 to-cyan-500",
    rose: "from-rose-500 to-pink-500",
    violet: "from-violet-500 to-purple-500",
    orange: "from-orange-500 to-amber-500",
    sky: "from-sky-500 to-blue-500",
    indigo: "from-indigo-500 to-purple-500",
    emerald: "from-emerald-500 to-emerald-600",
    amber: "from-amber-500 to-amber-600",
    red: "from-red-500 to-red-600",
    blue: "from-blue-500 to-blue-600",
  };

  const iconBgClasses = {
    teal: "from-teal-500/10 to-cyan-500/10",
    rose: "from-rose-500/10 to-pink-500/10",
    violet: "from-violet-500/10 to-purple-500/10",
    orange: "from-orange-500/10 to-amber-500/10",
    sky: "from-sky-500/10 to-blue-500/10",
    indigo: "from-indigo-500/10 to-purple-500/10",
    emerald: "from-emerald-500/10 to-emerald-600/10",
    amber: "from-amber-500/10 to-amber-600/10",
    red: "from-red-500/10 to-red-600/10",
    blue: "from-blue-500/10 to-blue-600/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <Card variant="premium" hoverable className="p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${iconBgClasses[color]}`}>
            <ApperIcon name={icon} size={24} className={`bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`} />
          </div>
          {trend && (
            <div className={`flex items-center text-sm ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <ApperIcon name={trend > 0 ? "TrendingUp" : "TrendingDown"} size={16} className="mr-1" />
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        
<div className="space-y-2">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <motion.p
            className={`text-3xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
          >
            {typeof value === "string" && value.includes("%") 
              ? `${animatedValue}%` 
              : animatedValue.toLocaleString()}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;