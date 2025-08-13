import Database from 'better-sqlite3';
export const db = new Database('shop.db');

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      description TEXT,
      price_cents INTEGER,
      image_url TEXT
    );
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      items_json TEXT,
      total_cents INTEGER,
      customer_name TEXT,
      customer_email TEXT,
      customer_phone TEXT,
      delivery_method TEXT,
      address TEXT,
      created_at INTEGER
    );
  `);
}
