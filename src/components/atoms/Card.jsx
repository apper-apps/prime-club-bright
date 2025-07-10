import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const Card = React.forwardRef(({ 
  children, 
  variant = "default",
  hoverable = false,
  className, 
  ...props 
}, ref) => {
  const baseStyles = "bg-slate-800 border border-slate-700 rounded-xl shadow-lg";
  
  const variants = {
    default: "bg-slate-800 border-slate-700",
    gradient: "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600",
    glass: "bg-slate-800/50 backdrop-blur-sm border-slate-600/50",
    premium: "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-600 shadow-xl",
  };
  
  const hoverStyles = hoverable ? "transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/50" : "";

  const CardComponent = hoverable ? motion.div : "div";
  const motionProps = hoverable ? {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <CardComponent
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
});

Card.displayName = "Card";

export default Card;