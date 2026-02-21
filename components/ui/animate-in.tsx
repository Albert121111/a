'use client';

import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type AnimateInProps = PropsWithChildren<{
  delay?: number;
  y?: number;
  className?: string;
}>;

export function AnimateIn({ children, delay = 0, y = 20, className }: AnimateInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};
