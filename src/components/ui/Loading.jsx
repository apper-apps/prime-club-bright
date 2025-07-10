import { motion } from "framer-motion";

const Loading = ({ variant = "default", className = "" }) => {
  const skeletonVariants = {
    default: (
      <div className={`space-y-4 p-6 ${className}`}>
        <div className="h-8 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 space-y-4">
              <div className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded animate-pulse" />
              <div className="h-8 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded animate-pulse w-2/3" />
            </div>
          ))}
        </div>
      </div>
    ),
    table: (
      <div className={`space-y-4 p-6 ${className}`}>
        <div className="h-10 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    ),
    kanban: (
      <div className={`p-6 ${className}`}>
        <div className="flex gap-6 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex-shrink-0 w-80 space-y-4">
              <div className="h-8 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-24 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    timeline: (
      <div className={`p-6 ${className}`}>
        <div className="flex gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="flex-1 h-8 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {skeletonVariants[variant] || skeletonVariants.default}
    </motion.div>
  );
};

export default Loading;