import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  children, 
  variant = "default",
  size = "md",
  className, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full";
  
const variants = {
    default: "bg-gray-200 text-gray-700",
    primary: "bg-gradient-to-r from-teal-500 to-cyan-500 text-white",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
    warning: "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    info: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    outline: "border-2 border-teal-500 text-teal-600 bg-transparent",
    ghost: "text-gray-600 bg-gray-100/50",
  };
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;