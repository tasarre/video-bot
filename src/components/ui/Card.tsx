import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  gradient = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={clsx(
        "rounded-3xl p-6 shadow-xl backdrop-blur-sm border border-white/10",
        gradient 
          ? "bg-gradient-dark" 
          : "bg-background-card",
        hover && "hover:shadow-2xl hover:shadow-accent-pink/20 transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
};