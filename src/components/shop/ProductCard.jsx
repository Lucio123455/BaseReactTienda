import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-xl mb-4 hover-lift">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.imageUrl || product.image}
            alt={product.name}
            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className="w-full bg-white text-gray-900 hover:bg-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            Añadir al Carrito <ShoppingBag className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 hover:text-gray-600">{product.name}</h3>
        </Link>
        <p className="text-xl font-semibold text-gray-900">€{product.price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;

