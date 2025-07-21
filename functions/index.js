/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

require("dotenv").config();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const mercadopago = require("mercadopago");
const cors = require("cors"); // 👈 IMPORTANTE

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

const corsHandler = cors({ origin: true });

exports.createPreference = functions.https.onRequest((req, res) => {
  console.log('✅ createPreference fue llamada'); // 👈 log visible

  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      console.log('❌ Método no permitido:', req.method);
      return res.status(405).send("Método no permitido");
    }

    try {
      const { items } = req.body;

      console.log("📦 Items recibidos:", items);
      console.log("🧪 Items mapeados:", items.map(item => ({
        title: item.name,
        unit_price: Number(item.price),
        quantity: item.quantity
      })));

      const preference = {
        items: items.map(item => ({
          title: item.name,
          unit_price: Number(item.price),
          quantity: item.quantity,
          currency_id: "ARS",
        })),
        back_urls: {
          success: "https://example.com/success",
          failure: "https://example.com/failure",
          pending: "https://example.com/pending"
        },
        auto_return: "approved",
      };

      const response = await mercadopago.preferences.create(preference);
      console.log('✅ Preferencia creada:', response.body.id); // 👈

      res.status(200).json({ preferenceId: response.body.id });
    } catch (error) {
      console.error('❌ Error al crear la preferencia:', error); // 👈 este es clave
      res.status(500).json({ error: "Error al crear la preferencia" });
    }
  });
});


