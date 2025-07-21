import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Hero from '@/components/landing/Hero';
import FeaturedProducts from '@/components/landing/FeaturedProducts';
import Values from '@/components/landing/Values';
import AboutUs from '@/components/landing/AboutUs';
import Inquiry from '@/components/landing/Inquiry';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const HomePage = ({ products, onAddToCart, onFeatureClick }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Helmet>
        <title>MINIMAL - Ropa Minimalista Premium</title>
        <meta name="description" content="Descubre nuestra colección de ropa minimalista premium. Diseños atemporales, calidad excepcional y estilo sofisticado para el guardarropa moderno." />
      </Helmet>
      <Hero onFeatureClick={onFeatureClick} />
      <FeaturedProducts products={products} onAddToCart={onAddToCart} showViewAll={true} />
      <Values />
      <AboutUs />
      <Inquiry />
    </motion.div>
  );
};

export default HomePage;