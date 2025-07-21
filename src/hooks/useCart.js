
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedOrder = localStorage.getItem('lastOrder');
      if (savedOrder) {
        setLastOrder(JSON.parse(savedOrder));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      setCart([]);
      setLastOrder(null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem('lastOrder', JSON.stringify(lastOrder));
    } else {
      localStorage.removeItem('lastOrder');
    }
  }, [lastOrder]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      let newCart;

      if (existingProductIndex > -1) {
        newCart = [...prevCart];
        newCart[existingProductIndex].quantity += quantity;
      } else {
        newCart = [...prevCart, { ...product, quantity }];
      }
      
      toast({
        title: "✅ Añadido al carrito",
        description: `${product.name} ha sido añadido a tu carrito.`,
      });

      return newCart;
    });
    setIsCartOpen(true);
  };
  
  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const productToRemove = prevCart.find(item => item.id === productId);
      const newCart = prevCart.filter(item => item.id !== productId);
      
      if (productToRemove) {
        toast({
          title: "🗑️ Eliminado del carrito",
          description: `${productToRemove.name} ha sido eliminado de tu carrito.`,
          variant: "destructive",
        });
      }

      return newCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setLastOrder(null);
    localStorage.removeItem('shoppingCart');
    localStorage.removeItem('lastOrder');
  };

  return {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    lastOrder,
    setLastOrder,
  };
};
