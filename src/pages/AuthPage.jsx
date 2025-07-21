import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { addUser } from '@/lib/firestore';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.6,
};

const AuthPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
        toast({
            title: <div className="flex items-center"><AlertCircle className="mr-2 h-4 w-4 text-red-500" />Error de Registro</div>,
            description: "La contraseña debe tener al menos 6 caracteres.",
            variant: "destructive",
        });
        return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await addUser(user.uid, {
        firstName,
        lastName,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      toast({
        title: <div className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" />¡Cuenta Creada!</div>,
        description: "Has sido registrado exitosamente.",
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: <div className="flex items-center"><AlertCircle className="mr-2 h-4 w-4 text-red-500" />Error de Registro</div>,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: <div className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-green-500" />¡Bienvenido de vuelta!</div>,
        description: "Has iniciado sesión correctamente.",
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: <div className="flex items-center"><AlertCircle className="mr-2 h-4 w-4 text-red-500" />Error de Inicio de Sesión</div>,
        description: "Email o contraseña incorrectos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="pt-32 pb-20 flex items-center justify-center bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Acceso - MINIMAL</title>
        <meta name="description" content="Inicia sesión o crea una cuenta para continuar." />
      </Helmet>
      <div className="w-full max-w-md px-4">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="signup">Crear Cuenta</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-b-lg shadow-md">
              <h2 className="text-2xl font-semibold text-center mb-2">¡Hola de nuevo!</h2>
              <p className="text-center text-gray-500 mb-6">Inicia sesión para continuar con tu compra.</p>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <Input id="email-signin" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signin">Contraseña</Label>
                  <Input id="password-signin" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </Button>
              </form>
            </motion.div>
          </TabsContent>
          <TabsContent value="signup">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-b-lg shadow-md">
              <h2 className="text-2xl font-semibold text-center mb-2">Crea tu Cuenta</h2>
              <p className="text-center text-gray-500 mb-6">Es rápido y fácil. ¡Únete a nosotros!</p>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName-signup">Nombre</Label>
                    <Input id="firstName-signup" type="text" placeholder="Juan" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName-signup">Apellido</Label>
                    <Input id="lastName-signup" type="text" placeholder="Pérez" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Contraseña</Label>
                  <Input id="password-signup" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              </form>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default AuthPage;