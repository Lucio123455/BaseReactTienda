
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingBag, ChevronLeft } from 'lucide-react';
import { getProduct as fetchProduct } from '@/lib/firestore';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.6,
};

const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      setLoading(true);
      const foundProduct = await fetchProduct(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.image);
      } else {
        navigate('/');
      }
      setLoading(false);
    };
    loadProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return null; 
  }

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
  };

  const relatedImages = product.relatedImages || [];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="pt-24 pb-20"
    >
      <Helmet>
        <title>{product.name} - MINIMAL</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/shop" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Volver a la tienda
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            <motion.div 
              key={mainImage}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-xl shadow-lg"
            >
              <img src={mainImage} alt={product.name} className="w-full h-auto object-cover aspect-[4/5]" />
            </motion.div>
            <div className={`grid grid-cols-4 gap-4 ${relatedImages.length === 0 ? 'hidden' : ''}`}>
              {[product.imageUrl, ...relatedImages].map((img, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-gray-900' : 'border-transparent'} hover:border-gray-400 transition-all`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`Vista ${index + 1} de ${product.name}`} className="w-full h-full object-cover aspect-square" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-light text-gray-800 mb-6">€{product.price}</p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{product.description}</p>
            
            {product.details && product.details.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Detalles</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center border rounded-lg p-2">
                <button onClick={() => handleQuantityChange(-1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center text-xl font-medium">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1 bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg font-medium">
                Añadir al Carrito <ShoppingBag className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
