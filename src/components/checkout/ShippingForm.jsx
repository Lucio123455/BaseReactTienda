import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ShippingForm = ({ shippingDetails, onInputChange, onSubmit }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">Dirección de Entrega</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nombre Completo</Label>
          <Input type="text" id="fullName" name="fullName" value={shippingDetails.fullName} onChange={onInputChange} required />
        </div>
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input type="text" id="address" name="address" value={shippingDetails.address} onChange={onInputChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">Ciudad</Label>
            <Input type="text" id="city" name="city" value={shippingDetails.city} onChange={onInputChange} required />
          </div>
          <div>
            <Label htmlFor="postalCode">Código Postal</Label>
            <Input type="text" id="postalCode" name="postalCode" value={shippingDetails.postalCode} onChange={onInputChange} required />
          </div>
        </div>
        <div>
          <Label htmlFor="country">País</Label>
          <Input type="text" id="country" name="country" value={shippingDetails.country} onChange={onInputChange} required />
        </div>
        <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800 py-3 mt-4">Continuar al Pago</Button>
      </form>
    </div>
  );
};

export default ShippingForm;