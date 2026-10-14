'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ImageRevealProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-[4/5]", "aspect-[3/4]"
  priority?: boolean;
  delay?: number;
}

export function ImageReveal({
  children,
  src,
  alt = '',
  className = '',
  aspectRatio = 'aspect-[4/5]',
  priority = false,
  delay = 0,
}: ImageRevealProps) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.76, 0, 0.24, 1],
      }}
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
    >
      <motion.div
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1.0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-full"
      >
        {children ? (
          children
        ) : (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
