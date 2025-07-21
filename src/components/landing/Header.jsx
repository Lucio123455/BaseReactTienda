import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X, LogOut, UserCircle, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';

const Header = ({ onCartClick, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  }

  const handleScrollLink = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Colección', href: '/shop', type: 'link' },
    { name: 'Blog', href: '/blog', type: 'link' },
    { name: 'Sobre Nosotros', sectionId: 'about-us', type: 'scroll' },
    { name: 'Contacto', sectionId: 'inquiry', type: 'scroll' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gray-900 cursor-pointer"
            onClick={() => navigate('/')}
          >
            MINIMAL
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                onClick={() => item.type === 'link' ? navigate(item.href) : handleScrollLink(item.sectionId)}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-gray-900 text-white text-xs font-medium flex items-center justify-center text-center">
                  {cartCount}
                </span>
              )}
            </motion.button>

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.photoURL} alt={currentUser.email} />
                      <AvatarFallback>{getInitials(currentUser.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 rounded-xl border border-gray-200 bg-white shadow-xl p-2"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuLabel className="font-normal px-3 py-2">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-semibold text-gray-900">Mi Cuenta</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem
                    onClick={() => {
                      const isAdmin = currentUser.email === 'luciocienfuegos41@gmail.com';
                      navigate(isAdmin ? '/admin' : '/my-account');
                    }}
                    className="group px-3 py-2 rounded-md transition-colors hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  >
                    <UserCircle className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">Perfil</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="group px-3 py-2 rounded-md transition-colors hover:bg-red-50 cursor-pointer flex items-center space-x-2 mt-1"
                  >
                    <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                    <span className="text-sm text-red-600 group-hover:text-red-700">Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/auth')}
                className="hidden md:flex items-center px-5 py-2 text-sm font-medium text-gray-900 border-gray-300 hover:bg-gray-900 hover:text-white rounded-full transition-all"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>

            )}

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  item.type === 'link' ? navigate(item.href) : handleScrollLink(item.sectionId);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
            <button onClick={() => { onCartClick(); setIsMenuOpen(false); }} className="flex items-center w-full text-left text-gray-700 hover:text-gray-900 transition-colors font-medium">
              <ShoppingBag className="w-5 h-5 mr-2" /> Carrito ({cartCount})
            </button>
            <div className="border-t pt-4">
              {currentUser ? (
                <button onClick={handleLogout} className="flex items-center w-full text-left text-gray-700 hover:text-gray-900 transition-colors font-medium">
                  <LogOut className="w-5 h-5 mr-2" /> Cerrar Sesión
                </button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => navigate('/auth')}
                  className="hidden md:flex items-center px-5 py-2 text-sm font-medium text-gray-900 border-gray-300 hover:bg-gray-900 hover:text-white rounded-full transition-all"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </Button>

              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
