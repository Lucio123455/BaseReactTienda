import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/shop/ProductCard';
import { cn } from '@/lib/utils';

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

const genders = [
  { key: 'mujer', name: 'Mujer' },
  { key: 'hombre', name: 'Hombre' },
];

const categories = {
  mujer: [
    { key: 'remeras', name: 'Remeras' },
    { key: 'pantalones', name: 'Pantalones & Faldas' },
    { key: 'vestidos', name: 'Vestidos' },
    { key: 'abrigos', name: 'Abrigos' },
    { key: 'calzado', name: 'Calzado' },
  ],
  hombre: [
    { key: 'remeras', name: 'Remeras' },
    { key: 'pantalones', name: 'Pantalones' },
    { key: 'calzado', name: 'Calzado' },
  ],
};

const ShopPage = ({ products, onAddToCart }) => {
  const [activeGender, setActiveGender] = useState('mujer');
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const genderMatch = product.gender === activeGender;
      const categoryMatch = activeCategory ? product.category === activeCategory : true;
      return genderMatch && categoryMatch;
    });
  }, [products, activeGender, activeCategory]);

  const handleGenderChange = (genderKey) => {
    setActiveGender(genderKey);
    setActiveCategory(null);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="pt-24 md:pt-32 pb-20 bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Tienda - MINIMAL</title>
        <meta name="description" content="Explora nuestra colección completa de ropa minimalista. Calidad premium y diseños atemporales para un estilo de vida moderno." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-4 sm:mb-6">
            Nuestra Colección
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Cada pieza está diseñada con un propósito, combinando materiales de la más alta calidad con una estética limpia y atemporal.
          </p>
        </motion.div>

        <div className="sticky top-16 bg-gray-50/80 backdrop-blur-sm z-10 py-4 mb-8 md:mb-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 bg-gray-200 p-1 rounded-full">
              {genders.map(gender => (
                <button
                  key={gender.key}
                  onClick={() => handleGenderChange(gender.key)}
                  className={cn(
                    "px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors",
                    activeGender === gender.key ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {gender.name}
                </button>
              ))}
            </div>
            <div className="w-full flex justify-center flex-wrap items-center gap-4 pb-2 -mb-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "text-sm font-medium transition-colors flex-shrink-0",
                  activeCategory === null ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
                )}
              >
                Todo
              </button>
              {categories[activeGender].map(category => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={cn(
                    "text-sm font-medium transition-colors flex-shrink-0",
                    activeCategory === category.key ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShopPage;
