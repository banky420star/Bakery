# API_SPEC.md

Base URL (local): `http://localhost:4000`

## Health

* `GET /health` → `{ ok: true, service: "Artisans on the Alley API" }`

## Products

* `GET /products` → `[{ id, name, description, price_cents, image_url }]`
* `POST /products` → body `{ name, description, price_cents, image_url }` → `{ ok, id }`
* `PUT /products/:id` → body `{ name?, description?, price_cents?, image_url? }` → `{ ok }`
* `DELETE /products/:id` → `{ ok }`

## Orders

* `GET /orders` → latest first
* `POST /orders`

  * body:

    ```json
    {
      "items": [{"id":"prodId","name":"Country Sourdough","price_cents":6000,"qty":2}],
      "total_cents": 12000,
      "customer_name": "Jane",
      "customer_email": "jane@example.com",
      "customer_phone": "5551234",
      "delivery_method": "PICKUP", // or "DELIVERY"
      "address": "",
      "payment_method_id": "pm_card_visa"
    }
    ```
  * success: `{ ok: true, order_id }`
  * error: `{ ok: false, error }`

**Payment:** Stripe PaymentIntents confirmed server-side. Test with `pm_card_visa`.
