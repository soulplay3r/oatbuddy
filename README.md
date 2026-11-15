# Mito.living — D2C Overnight Oats Store

A Next.js storefront for three overnight oats flavours (Mango Mischief, Strawberry Love and Chocolate Brownie) plus the Discovery Trio bundle.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · lucide-react · a cart saved in localStorage (no backend).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript only
npm run build && npm start   # production build
```

## Where to edit things

| What | File |
| --- | --- |
| Brand name, wordmark, tagline, announcement bar, contact, Instagram, shipping note, hero/trio photo paths | `src/data/site-config.ts` |
| Products: names, copy, **prices**, colours, images, ingredients, nutrition, allergens, preparation, storage, availability | `src/data/products.ts` |
| Discovery Trio contents and **price** | `src/data/products.ts` (`bundles`) |
| Homepage hero copy, Why Mito cards, Our Story copy, founder note | `src/data/content.ts` |
| FAQs (grouped: Usage, Ingredients, Safety, Shipping & orders) | `src/data/faqs.ts` |
| Customer reviews and video testimonials (verified customers only) | `src/data/reviews.ts` |
| Founders, advisors and credentials (Our Story) | `src/data/team.ts` |
| Ingredient spotlight (homepage) | `src/data/ingredients.ts` |
| Blog articles | `src/data/articles.ts` |
| Bottle label text (tagline, protein badge) | `src/data/site-config.ts` (`packaging`) |
| Colours and fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| Payment gateway integration point | `src/lib/checkout.ts` |

### Placeholders, by design

- `price: null` shows **"Price coming soon"**, and cart totals show **"To be confirmed"**. In development, a dashed `DEV: price not set` tag also appears. Never use `0` as a stand-in price.
- Product facts left as `null` show a clearly labelled "to be confirmed" box on product pages.
- An image with `src: null` renders an **original concept illustration** of the bottle, labelled as an illustration. To use real photography, put the files in `public/images/products/` and set `src`, e.g. `"/images/products/mango-front.jpg"`. Each product's gallery supports four slots: `front`, `closeup`, `flavour` and `lifestyle`.
- Contact and Instagram show "coming soon" until set. The policy pages are placeholders.

## Not included (intentionally)

Payment gateway, backend/database, accounts and admin. Checkout validates the form and shows a "payments not enabled" confirmation. It sends nothing and stores no customer data.
