import { Router } from 'express';
import { db } from '../db.js';
import { v4 as uuid } from 'uuid';

const router = Router();

router.get('/', (_req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

router.post('/', (req, res) => {
  const { name, description, price_cents, image_url } = req.body;
  const id = uuid();
  db.prepare('INSERT INTO products (id,name,description,price_cents,image_url) VALUES (?,?,?,?,?)')
    .run(id, name, description, price_cents, image_url);
  res.json({ ok: true, id });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price_cents, image_url } = req.body;
  const stmt = db.prepare(`
    UPDATE products
    SET name=COALESCE(@name,name),
        description=COALESCE(@description,description),
        price_cents=COALESCE(@price_cents,price_cents),
        image_url=COALESCE(@image_url,image_url)
    WHERE id=@id
  `);
  stmt.run({ id, name, description, price_cents, image_url });
  res.json({ ok: true });
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM products WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
