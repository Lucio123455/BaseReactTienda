import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProductCard from '../shop/ProductCard'; // Asegurate de que la ruta sea correcta

const FeaturedProducts = ({ products, onAddToCart, showViewAll = false }) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section id="collection" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Colección Esencial
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Piezas cuidadosamente seleccionadas que forman la base de un guardarropa atemporal
          </p>
        </motion.div>

        {featuredProducts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p>Aún no hay productos destacados. ¡Añade algunos desde el panel de administración!</p>
          </div>
        )}

        {showViewAll && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              asChild
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
            >
              <Link to="/shop">
                Ver toda la colección
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
