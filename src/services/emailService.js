import emailjs from '@emailjs/browser';
import { toast } from '@/components/ui/use-toast';
import { EMAILJS_CONFIG } from '@/config';

export const sendOrderConfirmationEmail = (order, userEmail) => {
  if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'TU_SERVICE_ID') {
    console.warn("EmailJS no está configurado. Saltando envío de correo.");
    return;
  }

  const orderDetails = order.items.map(item => 
    `- ${item.name} (x${item.quantity}): €${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');

  const shippingInfo = order.shippingDetails ? 
    `\n\nDirección de Envío:\n${order.shippingDetails.fullName}\n${order.shippingDetails.address}\n${order.shippingDetails.city}, ${order.shippingDetails.postalCode}\n${order.shippingDetails.country}` : '';

  const templateParams = {
    user_email: userEmail,
    order_details: orderDetails + shippingInfo,
    total_amount: `€${order.total.toFixed(2)}`,
    to_admin: EMAILJS_CONFIG.ADMIN_EMAIL
  };

  emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams, EMAILJS_CONFIG.PUBLIC_KEY)
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       toast({
          title: "📧 Notificación Enviada",
          description: "El administrador ha sido notificado del nuevo pedido.",
        });
    }, (err) => {
       console.log('FAILED...', err);
       toast({
          title: "❌ Error al notificar",
          description: "No se pudo enviar el correo al administrador. Revisa la configuración de EmailJS.",
          variant: "destructive"
        });
    });
};