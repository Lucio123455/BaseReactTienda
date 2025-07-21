const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const functions = require("firebase-functions");
const mercadopago = require("mercadopago");
const cors = require("cors");

if (process.env.FUNCTIONS_EMULATOR === 'true') {
  require("dotenv").config(); // Solo se usa localmente
}

setGlobalOptions({ maxInstances: 10 });

mercadopago.configure({
  access_token: functions.config().mercadopago.token
});

const corsHandler = cors({ origin: true });

exports.createPreference = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Método no permitido");
    }

    try {
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
      console.error('Error al crear preferencia:', error);
      res.status(500).json({ error: "Error al crear la preferencia" });
    }
  });
});
