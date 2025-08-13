import { Router } from 'express';
import { db } from '../db.js';
import { v4 as uuid } from 'uuid';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET || '');
const router = Router();

router.get('/', (_req, res) => {
  const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  res.json(orders);
});

router.post('/', async (req, res) => {
  const {
    items, total_cents,
    customer_name, customer_email, customer_phone,
    delivery_method, address,
    payment_method_id
  } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount: total_cents,
      currency: 'usd',
      payment_method: payment_method_id,
      confirm: true
    });

    const id = uuid();
    db.prepare(`
      INSERT INTO orders (id, items_json, total_cents, customer_name, customer_email, customer_phone, delivery_method, address, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, JSON.stringify(items), total_cents, customer_name, customer_email, customer_phone, delivery_method, address || '', Date.now());

    res.json({ ok: true, order_id: id });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

export default router;
