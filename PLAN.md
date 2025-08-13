# PLAN.md

**Goal:** Ship a rustic, prepaid online shop (products → cart → pay) for **Artisans on the Alley** with a tiny admin to CRUD products + view orders. No automation/workflows.

## Branch Plan (in order)

1. `feat/backend-core`

   * Express + SQLite.
   * `/products` (GET, POST, PUT, DELETE).
   * `/orders` (POST charge, GET list).
   * CORS + `.env`.
   * Seed script (optional).
   * **Acceptance:** `npm run dev` serves `/health`, CRUD works, Stripe intent confirms in test mode.

2. `feat/mobile-storefront`

   * Expo app.
   * Screens: Products, Cart, Checkout.
   * Theming via `src/theme.js`.
   * **Acceptance:** Can browse products from API, add to cart, mock pay (dev uses `pm_card_visa`).

3. `feat/admin-minimal`

   * Next.js admin panel.
   * Pages: Dashboard (metrics later), Products (CRUD UI), Orders (table).
   * **Acceptance:** Staff can add/edit/delete products; see paid orders.

4. `chore/styling-consistency`

   * Enforce theme tokens across mobile + admin.
   * Typography + spacing pass.
   * **Acceptance:** Visual parity with STYLEGUIDE.

5. `ops/env-and-deploy`

   * `.env` variants, scripts, health checks.
   * (Optional) Dockerfiles.
   * **Acceptance:** Local run scripts & sample prod config compile clean.
