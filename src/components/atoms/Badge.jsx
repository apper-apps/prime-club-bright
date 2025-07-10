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
    default: "bg-slate-700 text-slate-200",
    primary: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
    warning: "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    info: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    outline: "border-2 border-indigo-500 text-indigo-400 bg-transparent",
    ghost: "text-slate-400 bg-slate-800/50",
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