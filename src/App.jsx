
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { AnimatePresence } from 'framer-motion';

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Cart from '@/components/landing/Cart';
import AppRoutes from '@/routes/AppRoutes';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import Loading from './components/ui/loading';

function App() {
  const { products, loading: productsLoading } = useProducts();
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen,
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    lastOrder,
    setLastOrder,
  } = useCart();
  const location = useLocation();
  const { toast } = useToast();

  const handleFeatureClick = () => {
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  if (productsLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white text-gray-900 text-lg font-light">
        <Loading/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cart.reduce((count, item) => count + item.quantity, 0)}
        onFeatureClick={handleFeatureClick}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <AppRoutes 
            location={location}
            products={products}
            cart={cart}
            lastOrder={lastOrder}
            addToCart={addToCart}
            setLastOrder={setLastOrder}
            clearCart={clearCart}
            handleFeatureClick={handleFeatureClick}
          />
        </AnimatePresence>
      </main>

      <Footer onFeatureClick={handleFeatureClick} />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <Toaster />
    </div>
  );
}

export default App;
