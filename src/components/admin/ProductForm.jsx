import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

const INITIAL_FORM_STATE = {
  name: '',
  price: '',
  stock: '',
  description: '',
  gender: '',
  category: '',
  image: '',
  featured: false,
};

const ProductForm = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        description: product.description,
        gender: product.gender,
        category: product.category,
        image: product.image,
        featured: product.featured || false,
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (checked) => {
    setFormData({ ...formData, featured: checked });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  const categories = {
    mujer: ["remeras", "pantalones", "vestidos", "abrigos", "calzado"],
    hombre: ["remeras", "pantalones", "calzado"],
  };

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-light">{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <Button variant="ghost" size="icon" type="button" onClick={onClose}><X className="h-5 w-5" /></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Precio (€)</Label>
            <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Género</Label>
            <Select name="gender" onValueChange={(value) => handleSelectChange('gender', value)} value={formData.gender} required>
              <SelectTrigger><SelectValue placeholder="Seleccionar género" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mujer">Mujer</SelectItem>
                <SelectItem value="hombre">Hombre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select name="category" onValueChange={(value) => handleSelectChange('category', value)} value={formData.category} disabled={!formData.gender} required>
              <SelectTrigger><SelectValue placeholder="Seleccionar categoría" /></SelectTrigger>
              <SelectContent>
                {formData.gender && categories[formData.gender].map(cat => <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="image">URL de la Imagen del Producto</Label>
            <Input id="image" name="image" type="text" value={formData.image} onChange={handleInputChange} placeholder="https://ejemplo.com/imagen.jpg" required />
            {formData.image && <img src={formData.image} alt="Vista previa" className="mt-2 h-24 w-24 object-cover rounded-md" />}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="featured" checked={formData.featured} onCheckedChange={handleCheckboxChange} />
          <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Producto Destacado (aparece en la página principal)
          </Label>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando...' : 'Guardar Producto'}</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;