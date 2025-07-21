
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CheckoutPage from '@/pages/CheckoutPage';
import PaymentStatusPage from '@/pages/PaymentStatusPage';
import AuthPage from '@/pages/AuthPage';
import AdminPage from '@/pages/AdminPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import MyAccountPage from '@/pages/MyAccountPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminRoute from '@/components/auth/AdminRoute';
import BlogPostCard from '../components/blog/BlogPostCard';

const AppRoutes = ({ location, products, cart, lastOrder, addToCart, setLastOrder, clearCart, handleFeatureClick }) => {
  return (
    <Routes location={location} key={location.pathname}>
      <Route 
        path="/" 
        element={<HomePage products={products.slice(0, 6)} onAddToCart={addToCart} onFeatureClick={handleFeatureClick} />} 
      />
      <Route 
        path="/shop" 
        element={<ShopPage products={products} onAddToCart={addToCart} />} 
      />
      <Route 
        path="/product/:id" 
        element={<ProductDetailPage onAddToCart={addToCart} />} 
      />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <CheckoutPage 
              cartItems={cart} 
              setLastOrder={setLastOrder}
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payment-status"
        element={
          <ProtectedRoute>
            <PaymentStatusPage 
              lastOrder={lastOrder}
              onSuccessfulCheckout={clearCart}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/my-account"
        element={
          <ProtectedRoute>
            <MyAccountPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
