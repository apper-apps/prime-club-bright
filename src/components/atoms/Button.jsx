import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 focus:ring-indigo-500",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 hover:scale-105 focus:ring-slate-500",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105 focus:ring-emerald-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 hover:scale-105 focus:ring-red-500",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800 hover:scale-105 focus:ring-slate-500",
    outline: "border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white hover:scale-105 focus:ring-indigo-500",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl",
  };
  
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={iconSizes[size]} className="mr-2 animate-spin" />
      )}
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon name={icon} size={iconSizes[size]} className="mr-2" />
      )}
      {children}
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon name={icon} size={iconSizes[size]} className="ml-2" />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;