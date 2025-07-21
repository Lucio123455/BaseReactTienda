
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { sendOrderConfirmationEmail } from '@/services/emailService';
import PageLayout from '@/components/layouts/PageLayout';
import PaymentSuccess from '@/components/checkout/PaymentSuccess';
import PaymentFailure from '@/components/checkout/PaymentFailure';

const PaymentStatusPage = ({ lastOrder, onSuccessfulCheckout }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'success' && lastOrder) {
      sendOrderConfirmationEmail(lastOrder, currentUser.email);
      onSuccessfulCheckout();
      
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status, lastOrder, currentUser, onSuccessfulCheckout, navigate]);

  return (
    <PageLayout>
      <Helmet>
        <title>{status === 'success' ? 'Pago Exitoso' : 'Error en el Pago'} - MINIMAL</title>
        <meta name="description" content="Estado de tu transacción." />
      </Helmet>
      {status === 'success' ? <PaymentSuccess /> : <PaymentFailure />}
    </PageLayout>
  );
};

export default PaymentStatusPage;
