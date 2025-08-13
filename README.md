# Artisans on the Alley

A rustic, prepaid online shop for freshly baked & handcrafted goods.

## Project Structure

```
artisans-on-the-alley/
├── PLAN.md              # Development roadmap and branch plan
├── STYLEGUIDE.md        # Brand colors and design guidelines
├── API_SPEC.md          # Backend API documentation
├── env.example          # Environment variables template
├── backend/             # Express + SQLite API
├── mobile/              # Expo React Native app
└── admin/               # Next.js admin panel
```

## Quick Start

### Backend Setup
```bash
cd backend
cp ../env.example .env   # Add your STRIPE_SECRET
npm install
npm run dev              # Runs on http://localhost:4000
```

### Mobile App
```bash
cd mobile
npm install
npm start                # Opens Expo dev tools
```

### Admin Panel
```bash
cd admin
npm install
npm run dev              # Runs on http://localhost:5173
```

## Features

- **Backend**: Express API with SQLite database, Stripe payment processing
- **Mobile**: React Native app with product browsing, cart, and checkout
- **Admin**: Next.js panel for product management and order viewing

## Development Branches

1. `feat/backend-core` - API foundation
2. `feat/mobile-storefront` - Customer-facing app
3. `feat/admin-minimal` - Staff management interface
4. `chore/styling-consistency` - Design system alignment
5. `ops/env-and-deploy` - Production configuration

## Brand Colors

- Background: `#f7f3e8`
- Text: `#4a3b2a`
- Accent: `#b47a3c`
- Muted: `#d8c7a6`
