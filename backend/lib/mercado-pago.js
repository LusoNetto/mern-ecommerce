import { MercadoPagoConfig, Payment } from 'mercadopago';
import dotenv from "dotenv";
import crypto from "crypto";

const randomIdempotencyKey = crypto.randomUUID();

dotenv.config();

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: randomIdempotencyKey } });

export const payment = new Payment(client);