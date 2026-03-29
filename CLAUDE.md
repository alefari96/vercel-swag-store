@AGENTS.md

# Vercel Swag Store — Project Context

## Purpose
Vercel Partner Certification assignment. Build a fictional Vercel Swag Store using Next.js 16 to demonstrate understanding of modern React Server Component patterns.

**Primary goal: learning Next.js 16 patterns correctly, not pixel-perfect design.**

The user wants to do steps manually to learn. Act as a senior Next.js engineer: explain the *why* behind every decision, guide rather than implement everything upfront.

---

## Stack

| Tool | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Required for assignment |
| Language | TypeScript | Type safety, standard in 2026 |
| Styling | Tailwind CSS v4 | Utility-first, zero runtime CSS, no CSS-in-JS issues with RSC |
| Components | shadcn/ui | Components are copied into the project (no external dependency), fully RSC-compatible |
| Data | External API | `https://vercel-swag-store-api.vercel.app/api` |

---

## API

- **Base URL**: `https://vercel-swag-store-api.vercel.app/api`
- **Auth header**: `x-vercel-protection-bypass: <token>`
- **Docs**: `https://vercel-swag-store-api.vercel.app/api/docs`

### Key Endpoints
- `GET /products` — list with `?search=`, `?category=`, `?featured=true`, `?page=`, `?limit=`
- `GET /products/{id}` — single product by id or slug
- `GET /products/{id}/stock` — real-time stock (NEVER cache this)
- `GET /categories` — all categories with product counts
- `GET /promotions` — active promotional banners
- `POST /cart/create` — creates cart, returns `x-cart-token` header
- `GET /cart` — cart contents (requires `x-cart-token` header)
- `POST /cart` — add item `{ productId, quantity }`
- `PATCH /cart/{itemId}` — update quantity (set 0 to remove)
- `DELETE /cart/{itemId}` — remove item
- `GET /store/config` — store configuration and feature flags

### Environment Variables
```
SWAG_API_URL=https://vercel-swag-store-api.vercel.app/api
SWAG_API_TOKEN=<bypass token from Vercel dashboard>
```

---

## Assignment Requirements

### Pages (3 required + cart)
- **Homepage** `/` — Featured products, promotions
- **Search** `/search` — Product listing with search and category filters
- **Product Detail** `/products/[slug]` — Single product + stock status + add to cart
- **Cart** `/cart` — Cart contents with update/remove

### Site-wide Requirements
- Persistent header with logo + nav links (Homepage, Search)
- Footer with copyright text and year
- Shared root layout rendering header and footer on all pages
- Mobile-friendly responsive design
- Root metadata in root layout
- Page-specific metadata overriding root metadata
- Open Graph metadata (`openGraph`) for social sharing
- Cache Components enabled (`use cache` directive)

---

## Next.js 16 Feature Mapping

### `"use cache"` directive
Where to use it — in `lib/api.ts`:
- `getProducts()` → cached, tag: `'products'`
- `getCategories()` → cached, tag: `'categories'`
- `getProduct(slug)` → cached, tag: `'product-' + slug`
- `getPromotions()` → cached, tag: `'promotions'`

Where NOT to use it:
- `getStock(productId)` — real-time data, must always be fresh
- Cart functions — per-user data, must always be fresh

### Suspense Boundaries
- `/products/[slug]` → wrap `<StockStatus>` in `<Suspense>` — the page is static/cached, but stock is always dynamic. This is the "static page with dynamic island" pattern.
- `/` Homepage → optionally wrap `<PromotionsBanner>` in `<Suspense>`

### Server Actions (`lib/actions.ts`)
- `createCart()` — POST /cart/create, saves token to httpOnly cookie
- `addToCart(productId, quantity)` — POST /cart
- `updateCartItem(itemId, quantity)` — PATCH /cart/{itemId}
- `removeCartItem(itemId)` — DELETE /cart/{itemId}

Cart token is stored in an **httpOnly cookie** — never exposed to client JS.

### Static vs Dynamic Rendering
| Route | Strategy | Why |
|---|---|---|
| `/` | Static | Data is cached, no dynamic inputs |
| `/search` | `force-dynamic` | `searchParams` opts the page into dynamic rendering |
| `/products/[slug]` | Static via `generateStaticParams` | Pre-render all products at build time |
| `/products/[slug]` → `<StockStatus>` | Dynamic (no cache) | Real-time stock availability |
| `/cart` | Dynamic | Per-user data from cookie |

---

## Project Structure

```
vercel-swag-store/
├── app/
│   ├── layout.tsx              # Root layout: Header + Footer + root metadata
│   ├── page.tsx                # Homepage
│   ├── search/
│   │   └── page.tsx            # Search page (force-dynamic)
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail (generateStaticParams)
│   └── cart/
│       └── page.tsx            # Cart page
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Server Component: logo + nav
│   │   └── footer.tsx          # Server Component: copyright + year
│   ├── product/
│   │   ├── product-card.tsx    # Product card (Server Component)
│   │   ├── product-grid.tsx    # Grid layout (Server Component)
│   │   └── stock-status.tsx    # Dynamic async Server Component (no cache)
│   ├── cart/
│   │   ├── add-to-cart-button.tsx  # Client Component (needs onClick)
│   │   └── cart-item.tsx           # Cart line item
│   └── ui/                     # shadcn/ui components (auto-generated)
├── lib/
│   ├── api.ts                  # All fetch functions with "use cache"
│   ├── actions.ts              # Server Actions for cart mutations
│   └── cookies.ts              # Cart token cookie helpers
└── types/
    └── index.ts                # TypeScript types: Product, Cart, Category, etc.
```

---

## Execution Steps

1. **Project setup** — `create-next-app`, shadcn/ui install, `.env.local`
2. **TypeScript types + API client** — `types/index.ts`, `lib/api.ts` with `"use cache"`
3. **Root layout** — Header, Footer as Server Components, root metadata
4. **Homepage** — Featured products + Suspense for promotions
5. **Search page** — Listing + category filters, `force-dynamic`
6. **Product detail page** — `generateStaticParams` + `<StockStatus>` in Suspense
7. **Cart** — Server Actions + httpOnly cookie for cart token
8. **Metadata & Open Graph** — `generateMetadata` for product pages
9. **Deploy to Vercel** — Connect repo, set env vars, verify cache behavior

---

## Key Learning Concepts (Per Step)

- **Why `"use cache"`?** Next.js 16 replaces `fetch` cache options with explicit `"use cache"` + `cacheTag()` / `cacheLife()`. More granular, works with any async function, not just `fetch`.
- **Why Server Components by default?** They run only on the server — no JS sent to client, can access secrets directly, can `await` async operations inline.
- **Why `"use client"` only when needed?** Client Components add JS bundle weight. Only use for: `useState`, `useEffect`, event handlers, browser APIs.
- **Why Suspense around stock?** It lets Next.js stream the page shell immediately (cached) and fill in the dynamic part (`<StockStatus>`) when it resolves. Without Suspense, the whole page would wait for the slowest data.
- **Why httpOnly cookie for cart token?** The cart API token should never be accessible to JavaScript in the browser (XSS protection). Server Actions read it server-side directly from cookies.
- **Why `generateStaticParams`?** Pre-generates all product pages at build time. Users get instant responses from CDN edge, not waiting for server-side rendering on every request.
