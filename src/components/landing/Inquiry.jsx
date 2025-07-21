import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Send, LogIn } from 'lucide-react';
import emailjs from 'emailjs-com';

const Inquiry = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inquiry.trim()) {
      toast({
        title: '🤔 Campo vacío',
        description: 'Por favor, escribe tu consulta antes de enviar.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: currentUser.email,
      message: inquiry,
    };

    emailjs
      .send(
        'service_9yi2k9c',     // ← Reemplazá con tu Service ID
        'template_iu7gbjt',    // ← Reemplazá con tu Template ID
        templateParams,
        'HePpSSl5Z9WGj1SQc'         // ← Reemplazá con tu Public Key
      )
      .then(() => {
        toast({
          title: '✅ ¡Consulta Enviada!',
          description: 'Hemos recibido tu mensaje. Te responderemos pronto.',
        });
        setInquiry('');
        setLoading(false);
      })
      .catch((error) => {
        toast({
          title: '❌ Error',
          description: 'No se pudo enviar la consulta. Inténtalo más tarde.',
          variant: 'destructive',
        });
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <section id='inquiry' className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
            ¿Tienes una consulta?
          </h2>

          {currentUser ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-4">
              <p className="text-xl text-gray-300 text-center mb-6">
                Déjanos tu pregunta y nuestro equipo se pondrá en contacto contigo.
              </p>
              <Textarea
                placeholder="Escribe tu mensaje aquí..."
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-white min-h-[120px]"
                disabled={loading}
              />
              <Button 
                type="submit"
                className="w-full bg-white text-gray-900 hover:bg-gray-200 px-8 py-3 font-medium text-lg"
                disabled={loading}
              >
                {loading ? 'Enviando...' : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Consulta
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Por favor, inicia sesión para poder enviar tus consultas a nuestro equipo.
              </p>
              <Button 
                onClick={() => navigate('/auth')}
                className="mt-8 bg-white text-gray-900 hover:bg-gray-200 px-8 py-3 font-medium text-lg"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Iniciar Sesión para Consultar
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Inquiry;

