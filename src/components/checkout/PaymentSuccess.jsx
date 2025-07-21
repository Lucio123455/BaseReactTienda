
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const pageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.9 },
};

const pageTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
};

const PaymentSuccess = () => {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex flex-col items-center justify-center min-h-[60vh] bg-white text-center px-4"
    >
      <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Gracias por tu compra!</h1>
      <p className="text-lg text-gray-600 max-w-md">
        Tu pedido ha sido confirmado. Hemos enviado los detalles a tu correo. Serás redirigido a la página principal en unos segundos.
      </p>
    </motion.div>
  );
};

export default PaymentSuccess;
