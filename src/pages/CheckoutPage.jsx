
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { ChevronLeft } from 'lucide-react';
import { MERCADO_PAGO_PUBLIC_KEY } from '@/config';
import PageLayout from '@/components/layouts/PageLayout';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentGateway from '@/components/checkout/PaymentGateway';
import ShippingForm from '@/components/checkout/ShippingForm';

const CheckoutPage = ({ cartItems, setLastOrder }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [step, setStep] = useState('shipping'); // 'shipping' | 'payment'
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '', address: '', city: '', postalCode: '', country: 'España'
  });
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      toast({
        title: "Tu carrito está vacío.",
        description: "Serás redirigido a la tienda.",
        variant: "destructive",
      });
      navigate('/shop');
    } else {
      initMercadoPago(MERCADO_PAGO_PUBLIC_KEY, { locale: 'es-ES' });
    }
  }, [cartItems, navigate]);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newOrder = {
      items: cartItems,
      total: total,
      shippingDetails: shippingDetails,
      user: {
        email: currentUser.email,
        uid: currentUser.uid,
      },
      createdAt: new Date().toISOString(),
    };
    setOrder(newOrder);
    setLastOrder(newOrder);
    setStep('payment');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const createPaymentPreference = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://us-central1-paginawebbasereact.cloudfunctions.net/createPreference',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [
              { name: 'Producto Test', price: 1, quantity: 1 },
            ],
          }),
        }
      );

      const data = await response.json();

      const mp = new window.MercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, {
        locale: 'es-AR',
      });

      mp.checkout({
        preference: { id: data.preferenceId },
        autoOpen: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error al iniciar el pago',
        description: 'No se pudo generar la preferencia.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Finalizar Compra - MINIMAL</title>
        <meta name="description" content="Completa tu compra de forma segura." />
      </Helmet>

      <div className="mb-8">
        <Link to="/shop" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Volver a la tienda
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 lg:gap-12">
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {step === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <ShippingForm
                  shippingDetails={shippingDetails}
                  onInputChange={handleInputChange}
                  onSubmit={handleShippingSubmit}
                />
              </motion.div>
            )}
            {step === 'payment' && order && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <PaymentGateway
                  order={order}
                  isLoading={isLoading}
                  createPaymentPreference={createPaymentPreference}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <OrderSummary order={order || { items: cartItems, total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) }} isFinalSummary={step === 'payment'} />
        </div>
      </div>
    </PageLayout>
  );
};

export default CheckoutPage;
