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
const baseStyles = "bg-white border border-gray-200 rounded-xl shadow-lg";
  
  const variants = {
    default: "bg-white border-gray-200",
    gradient: "bg-gradient-to-br from-white to-gray-50 border-gray-300",
    glass: "bg-white/80 backdrop-blur-sm border-gray-300/50",
    premium: "bg-gradient-to-br from-white via-white to-gray-50 border-gray-300 shadow-xl",
  };
  
  const hoverStyles = hoverable ? "transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/50" : "";

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