
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/AuthContext';
import { getFavorites } from '@/lib/firestore';
import PageLayout from '@/components/layouts/PageLayout';
import ProductCard from '@/components/shop/ProductCard';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from 'lucide-react';

const MyAccountPage = () => {
  const { currentUser } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favoriteIds, handleToggleFavorite, refetch } = useFavorites();

  const fetchFavoriteProducts = useCallback(async () => {
    if (currentUser) {
      setLoading(true);
      const favs = await getFavorites(currentUser.uid);
      setFavoriteProducts(favs);
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchFavoriteProducts();
  }, [fetchFavoriteProducts]);

  const onAddToCart = (product) => {
    toast({
      title: "Función no implementada",
      description: "La función de añadir al carrito desde esta página no está implementada.",
    });
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    const nameParts = currentUser?.firstName ? [currentUser.firstName, currentUser.lastName] : email.split('@');
    return nameParts[0][0].toUpperCase() + (nameParts.length > 1 && nameParts[1] ? nameParts[1][0].toUpperCase() : '');
  };
  
  const onFavoriteToggled = (productId, isFavorite) => {
    handleToggleFavorite(productId, isFavorite);
    if (!isFavorite) {
      setFavoriteProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Mi Cuenta - MINIMAL</title>
        <meta name="description" content="Gestiona tu cuenta y tus productos favoritos." />
      </Helmet>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="h-24 w-24 border-2 border-gray-200">
          <AvatarImage src={currentUser?.photoURL} alt={currentUser?.email} />
          <AvatarFallback className="text-3xl">{getInitials(currentUser?.email)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mi Cuenta</h1>
          <p className="text-lg text-gray-600 mt-2">
            Bienvenido, {currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName}` : currentUser?.email}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Heart className="w-6 h-6 mr-3 text-red-500" />
          Mis Favoritos
        </h2>
        {loading ? (
          <p>Cargando tus favoritos...</p>
        ) : favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isFavorite={favoriteIds.has(product.id)}
                onToggleFavorite={onFavoriteToggled}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes favoritos</h3>
            <p className="mt-1 text-sm text-gray-500">Haz clic en el corazón de un producto para guardarlo aquí.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MyAccountPage;
