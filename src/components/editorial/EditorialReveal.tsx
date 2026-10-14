import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface EditorialRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export function EditorialReveal({
  children,
  className = '',
  delay = 0,
  y = 36,
  duration = 0.9,
}: EditorialRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default EditorialReveal;
