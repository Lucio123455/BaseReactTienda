import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.6,
};

const PageLayout = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="pt-24 pb-20 bg-gray-50 min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.div>
  );
};

export default PageLayout;