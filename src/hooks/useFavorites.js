import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getFavoriteIds } from '@/lib/firestore';

export const useFavorites = () => {
  const { currentUser } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (currentUser) {
      setLoading(true);
      const ids = await getFavoriteIds(currentUser.uid);
      setFavoriteIds(new Set(ids));
      setLoading(false);
    } else {
      setFavoriteIds(new Set());
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleToggleFavorite = (productId, isFavorite) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (isFavorite) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  return { favoriteIds, loading, handleToggleFavorite, refetch: fetchFavorites };
};