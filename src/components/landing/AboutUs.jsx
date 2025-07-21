import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section id="about-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              Sobre Nosotros
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              MINIMAL nació de la creencia de que el verdadero estilo reside en la simplicidad. Creamos piezas fundamentales para un guardarropa moderno, donde la calidad y el diseño atemporal son los protagonistas.
            </p>
            <p className="text-lg text-gray-600">
              Cada prenda está pensada para ser versátil, duradera y, sobre todo, para que te sientas increíble al usarla. Nos enfocamos en cortes precisos, materiales nobles y una producción consciente. Menos es más, y en MINIMAL, menos es todo.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="overflow-hidden rounded-xl"
          >
            <img 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              alt="Taller de diseño de moda minimalista con telas y bocetos"
             src="https://images.unsplash.com/photo-1650826125683-f4e9c4e62f16" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;