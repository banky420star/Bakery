import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDb } from './db.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(',') || true }));

app.get('/health', (_, res) => res.json({ ok: true, service: 'Artisans on the Alley API' }));
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

const port = process.env.PORT || 4000;
initDb();
app.listen(port, () => console.log(`API running on :${port}`));
