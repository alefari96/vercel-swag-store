# Architectural Decisions — Vercel Swag Store

Traccia delle scelte architetturali prese durante il progetto.

---

## Setup & Tooling

| Decisione | Scelta | Motivazione |
|---|---|---|
| Framework | Next.js 16 (App Router) | Requisito assignment + RSC nativo |
| Package manager | pnpm | Più veloce di npm, disk space efficiente |
| Linguaggio | TypeScript | Type safety, standard 2026 |
| Styling | Tailwind CSS v4 | Zero runtime CSS, no CSS-in-JS conflicts con RSC |
| Componenti UI | shadcn/ui | Copiati nel progetto (no dipendenza npm), modificabili, RSC-compatible |
| Dati | API esterna (`vercel-swag-store-api.vercel.app`) | Fornita dall'assignment |

### shadcn/ui: perché non è una "normale" dipendenza
`shadcn/ui` non vive in `node_modules`. Il comando `pnpm dlx shadcn@latest init` copia i componenti dentro `components/ui/`. Questo significa:
- Puoi modificarli senza fork di una libreria
- Aggiornamenti sono opt-in (run shadcn add di nuovo)
- Nessun rischio di breaking change da upstream

---

## Caching Strategy (`"use cache"`)

Next.js 16 abbandona le `fetch` cache options (`{ cache: 'force-cache' }`) a favore della directive `"use cache"` a livello di funzione.

| Funzione | Cache | Tag | Motivo |
|---|---|---|---|
| `getProducts()` | ✅ | `products` | Dati statici, cambiano raramente |
| `getCategories()` | ✅ | `categories` | Dati statici |
| `getProduct(slug)` | ✅ | `product-{slug}` | Dati statici per prodotto |
| `getPromotions()` | ✅ | `promotions` | Dati statici |
| `getStock(productId)` | ❌ | — | Real-time, deve sempre essere fresco |
| Cart functions | ❌ | — | Dati per-utente, sempre freschi |

---

## Rendering Strategy

| Route | Strategia | Motivo |
|---|---|---|
| `/` | Static | Solo dati cachati, nessun input dinamico |
| `/search` | `force-dynamic` | `searchParams` opta la pagina in dynamic rendering |
| `/products/[slug]` | Static + `generateStaticParams` | Pre-render a build time → CDN edge, risposta istantanea |
| `/products/[slug]` → `<StockStatus>` | Dynamic (Suspense island) | Stock real-time dentro una pagina altrimenti statica |
| `/cart` | Dynamic | Dati per-utente letti da cookie |

### Pattern "Static page with dynamic island"
Su `/products/[slug]`: la pagina è statica e servita dal CDN. Solo `<StockStatus>` è wrappato in `<Suspense>` e streammato dinamicamente. Senza Suspense, tutta la pagina aspetterebbe il dato più lento.

---

## Sicurezza: Cart Token

Il token del carrello (restituito da `POST /cart/create`) viene salvato in un **httpOnly cookie**, non in `localStorage` o stato React.

- **Perché httpOnly?** JavaScript nel browser non può leggerlo → protetto da XSS
- **Come viene usato?** Solo via Server Actions (`lib/actions.ts`) che leggono il cookie server-side
- **Mai esposto al client JS**

---

## Struttura Componenti

- **Server Components by default** — nessun JS inviato al client, possono fare `await` inline, accedono a secrets direttamente
- **`"use client"` solo quando necessario** — `useState`, `useEffect`, event handlers, browser API
- Unici Client Components previsti: `AddToCartButton` (onClick), `CartItem` (interazioni update/remove)

---

## Variabili d'Ambiente

| Variabile | Visibilità | Uso |
|---|---|---|
| `SWAG_API_URL` | Server-only | Base URL API |
| `SWAG_API_TOKEN` | Server-only | Header `x-vercel-protection-bypass` |

Nessuna variabile `NEXT_PUBLIC_` — tutto rimane server-side.

---

## Stato Avanzamento

- [x] Step 1 — Project setup (`create-next-app`, shadcn/ui, `.env.local`)
- [x] Step 2 — TypeScript types + API client (`types/index.ts`, `lib/api.ts`)
- [x] Step 3 — Root layout (Header, Footer, root metadata)
- [ ] Step 4 — Homepage (featured products + Suspense promotions)
- [ ] Step 5 — Search page (`force-dynamic`, filtri categoria)
- [ ] Step 6 — Product detail (`generateStaticParams` + StockStatus in Suspense)
- [ ] Step 7 — Cart (Server Actions + httpOnly cookie)
- [ ] Step 8 — Metadata & Open Graph
- [ ] Step 9 — Deploy su Vercel
