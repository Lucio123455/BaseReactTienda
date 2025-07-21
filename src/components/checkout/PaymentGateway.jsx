
import React from 'react';
import { Payment } from '@mercadopago/sdk-react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const PaymentGateway = ({ order, isLoading, createPaymentPreference, preferenceId }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pago Seguro</h2>
      <p className="text-gray-500 mb-6">Todas las transacciones son seguras y encriptadas.</p>
      
      {preferenceId ? (
        <Payment
          initialization={{
            amount: order.total,
            preferenceId: preferenceId,
          }}
          onSubmit={async () => {}}
          customization={{
            paymentMethods: {
              mercadoPago: 'all',
              creditCard: 'all',
              debitCard: 'all',
            },
          }}
        />
      ) : (
        <div className="text-center">
          <img src="https://logospng.org/download/mercado-pago/logo-mercado-pago-2048.png" alt="Mercado Pago" className="h-12 mx-auto mb-6"/>
          <p className="text-gray-600 mb-6">Haz clic en el botón para completar tu pago de forma segura a través de Mercado Pago.</p>
          <Button onClick={createPaymentPreference} disabled={isLoading} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-lg">
            {isLoading ? 'Procesando...' : `Pagar €${order.total.toFixed(2)}`}
          </Button>
          <p className="text-xs text-gray-400 mt-4 flex items-center justify-center">
            <Lock className="w-3 h-3 mr-1.5" /> Con la seguridad de Mercado Pago
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
