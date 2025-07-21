import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from '@/components/ui/use-toast';
import { ChevronLeft } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/context/AuthContext';
import PageLayout from '@/components/layouts/PageLayout';
import ShippingForm from '@/components/checkout/ShippingForm';
import OrderSummary from '@/components/checkout/OrderSummary';

const ShippingPage = ({ cartItems, onShippingSubmit }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
  });

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      toast({
        title: "Tu carrito está vacío",
        description: "Añade productos antes de continuar.",
        variant: "destructive",
      });
      navigate('/shop');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const orderData = {
      id: uuidv4(),
      items: cartItems,
      total: subtotal,
      date: new Date().toISOString(),
      user: currentUser.email,
      shippingDetails: shippingDetails,
    };

    onShippingSubmit(orderData);

    toast({
      title: "Dirección guardada",
      description: "Ahora, procede con el pago.",
    });

    navigate('/checkout');
  };

  if (!cartItems || cartItems.length === 0) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const orderPreview = { items: cartItems, total: subtotal };

  return (
    <PageLayout>
      <Helmet>
        <title>Detalles de Envío - MINIMAL</title>
        <meta name="description" content="Confirma los detalles para el envío de tu pedido." />
      </Helmet>
      
      <div className="mb-8">
        <Link to="/shop" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Volver a la tienda
        </Link>
      </div>
      <h1 className="text-center text-3xl font-light text-gray-800 mb-8">Información de Envío</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="lg:order-last">
          <OrderSummary order={orderPreview} />
        </div>
        <ShippingForm 
          shippingDetails={shippingDetails}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </PageLayout>
  );
};

export default ShippingPage;