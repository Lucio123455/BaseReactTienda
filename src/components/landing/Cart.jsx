
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose, cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const navigate = useNavigate();

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-900">Tu Carrito</h2>
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-900">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                  <ShoppingBag className="w-24 h-24 mb-4 text-gray-300" />
                  <p className="text-xl font-medium">Tu carrito está vacío</p>
                  <p className="mt-2">¡Añade algunos productos para empezar!</p>
                  <Button onClick={onClose} className="mt-6">Seguir Comprando</Button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex items-start space-x-4">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg"/>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-gray-500">€{item.price}</p>
                          </div>
                          <button onClick={() => onRemoveFromCart(item.id)} className="p-1 text-gray-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-3 mt-2">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full border hover:bg-gray-100">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full border hover:bg-gray-100">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-900">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-900">€{subtotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 text-center mb-4">Los gastos de envío e impuestos se calculan en la pantalla de pago.</p>
                <Button onClick={handleCheckout} className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3 text-lg">
                  Finalizar Compra
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
