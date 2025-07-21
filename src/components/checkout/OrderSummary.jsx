import React from 'react';

const OrderSummary = ({ order, isFinalSummary = false }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">{isFinalSummary ? 'Resumen Final' : 'Resumen del Pedido'}</h2>
      <div className="space-y-3 mb-6">
        {order.items.map(item => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isFinalSummary && <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-md" />}
              <div>
                <p className={`font-medium ${!isFinalSummary ? 'text-gray-600' : ''}`}>{item.name}</p>
                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
              </div>
            </div>
            <p className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>€{order.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío</span>
          <span className="font-semibold text-green-600">Gratis</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2">
          <span>Total</span>
          <span>€{order.total.toFixed(2)}</span>
        </div>
      </div>
      {isFinalSummary && order.shippingDetails && (
        <div className="border-t pt-6 mt-6">
          <h3 className="font-semibold mb-2">Enviar a:</h3>
          <p className="text-gray-600 text-sm">
            {order.shippingDetails.fullName}<br/>
            {order.shippingDetails.address}<br/>
            {order.shippingDetails.city}, {order.shippingDetails.postalCode}<br/>
            {order.shippingDetails.country}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;