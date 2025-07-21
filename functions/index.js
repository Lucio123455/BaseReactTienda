// ✅ Firebase v2 API
const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const mercadopago = require("mercadopago");
const cors = require("cors");

// 🔒 Secret definido desde Firebase CLI
const MP_ACCESS_TOKEN = defineSecret("MP_ACCESS_TOKEN");

// 🔧 Opcional: limitar instancias por costo
setGlobalOptions({ maxInstances: 10 });

// 🌐 Middleware CORS
const corsHandler = cors({ origin: true });

// 🚀 Función HTTPS para crear la preferencia de pago
exports.createPreference = onRequest({ secrets: [MP_ACCESS_TOKEN] }, (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Método no permitido");
    }

    try {
      // ⚙️ Configurar MP con token secreto
      mercadopago.configure({
        access_token: process.env.MP_ACCESS_TOKEN,
      });
      const { items } = req.body;

      const preference = {
        items: items.map(item => ({
          title: item.name,
          unit_price: Number(item.price),
          quantity: item.quantity,
          currency_id: "ARS",
        })),
        back_urls: {
          success: 'https://base-react-tienda.vercel.app/payment-status?status=success',
          failure: 'https://base-react-tienda.vercel.app/payment-status?status=failure',
          pending: 'https://base-react-tienda.vercel.app/payment-status?status=pending'
        },
        auto_return: "approved",
      };

      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ preferenceId: response.body.id });
    } catch (error) {
      console.error("❌ Error al crear preferencia:", error);
      res.status(500).json({ error: "Error al crear la preferencia" });
    }
  });
});
