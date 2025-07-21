import { useState, useEffect } from 'react';
import { getProducts as fetchProductsFromDB } from '@/lib/firestore';
import { useToast } from '@/components/ui/use-toast';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsFromFirestore = await fetchProductsFromDB();
      setProducts(productsFromFirestore);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error al cargar productos",
        description: "No se pudieron cargar los productos desde la base de datos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, refetch: fetchProducts };
};