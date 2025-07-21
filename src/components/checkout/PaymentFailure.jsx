
import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const PaymentFailure = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-center px-4"
    >
      <XCircle className="w-24 h-24 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Oh no! Hubo un problema</h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        No pudimos procesar tu pago. Por favor, inténtalo de nuevo o contacta con soporte si el problema persiste.
      </p>
      <div className="flex space-x-4">
        <Button asChild>
          <Link to="/checkout">
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/shop">Volver a la tienda</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default PaymentFailure;
