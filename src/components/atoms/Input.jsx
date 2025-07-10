import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Input = React.forwardRef(({ 
  type = "text", 
  placeholder,
  icon,
  iconPosition = "left",
  error,
  className,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";
  
  const errorStyles = error ? "border-red-500 focus:ring-red-500" : "";
  
  const iconStyles = icon ? (iconPosition === "left" ? "pl-12" : "pr-12") : "";

  return (
    <div className="relative">
      {icon && (
        <div className={cn(
          "absolute top-1/2 transform -translate-y-1/2 text-slate-400",
          iconPosition === "left" ? "left-4" : "right-4"
        )}>
          <ApperIcon name={icon} size={18} />
        </div>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={cn(
          baseStyles,
          errorStyles,
          iconStyles,
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;