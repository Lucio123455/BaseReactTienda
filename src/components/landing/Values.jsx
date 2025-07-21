import React from 'react';
import { motion } from 'framer-motion';
import { Star, Truck, Shield, Heart } from 'lucide-react';

const valuesData = [
  {
    icon: Star,
    title: "Calidad Premium",
    description: "Materiales de la más alta calidad seleccionados cuidadosamente"
  },
  {
    icon: Truck,
    title: "Envío Gratuito",
    description: "Entrega gratuita en pedidos superiores a €100"
  },
  {
    icon: Shield,
    title: "Garantía Total",
    description: "30 días de garantía de satisfacción completa"
  },
  {
    icon: Heart,
    title: "Sostenible",
    description: "Producción ética y materiales sostenibles"
  }
];

const Values = () => {

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Nuestros Valores
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprometidos con la calidad, sostenibilidad y el diseño atemporal
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {valuesData.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              className="text-center space-y-4 p-6 bg-white rounded-xl shadow-sm hover-lift"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <value.icon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Values;