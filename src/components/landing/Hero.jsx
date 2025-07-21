import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = ({ onFeatureClick }) => {
  const navigate = useNavigate();

  return (
    <section className="hero-gradient pt-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="text-5xl lg:text-7xl font-light text-gray-900 leading-tight">
              Menos es
              <span className="block font-semibold text-gradient">Más</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Descubre la elegancia en la simplicidad. Nuestra colección minimalista redefine el estilo contemporáneo con piezas atemporales y versátiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button
                onClick={() => navigate('/shop')}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 text-lg font-medium"
              >
                Explorar Colección
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/blog')}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-medium"
              >
                Ver Blog
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl hover-lift">
              <img
                alt="Modelo usando ropa minimalista elegante"
                className="w-full h-[600px] object-cover"
                src="https://images.pexels.com/photos/32924594/pexels-photo-32924594.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
