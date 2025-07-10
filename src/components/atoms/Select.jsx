import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = React.forwardRef(({ 
  options = [],
  placeholder = "Select an option",
  error,
  className,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none";
  
  const errorStyles = error ? "border-red-500 focus:ring-red-500" : "";

  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          baseStyles,
          errorStyles,
          "pr-12",
          className
        )}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
        <ApperIcon name="ChevronDown" size={18} />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;