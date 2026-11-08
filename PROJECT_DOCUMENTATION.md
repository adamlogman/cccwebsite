# Kivora — Modern E-Commerce Website
### University Project Documentation

---

## 1. Introduction

**Kivora** is a modern, fully responsive online shopping platform built as a university demonstration project. It simulates a real-world e-commerce experience: customers can browse a catalogue across six product categories, search and filter products, view detailed product pages, manage a shopping cart and wishlist, and complete a (simulated) checkout.

The purpose of the project is to demonstrate professional front-end development, UI/UX design and software architecture skills in a realistic commercial context.

## 2. Website Concept

Kivora is a general-merchandise store with the tagline **"Everything you love, delivered."** It offers:

- Mobile Phones
- Laptops & Computers
- Electronics & Accessories
- Clothing & Fashion
- Shoes & Accessories
- Home & Lifestyle

**Target audience:** students, young professionals and families aged roughly 18–45 who shop online regularly, value good prices, fast delivery and a clean, trustworthy shopping experience on both mobile and desktop.

The name "Kivora" is short, memorable and easy to pronounce in many languages. The logo is a rounded amber tile with a stylised "K", paired with the word-mark "Kivora." — the amber full stop echoes the accent colour.

## 3. Website Structure

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Brand introduction, promotions, featured content |
| Shop / Category | `/shop` | Browse, search, filter and sort all products |
| Product details | `/product/:id` | Full information about one product |
| Shopping cart | `/cart` | Review and edit selected items |
| Checkout | `/checkout` | Customer, shipping, delivery and payment details |
| Order confirmation | `/order-confirmation` | Summary after an order is placed |
| Wishlist | `/wishlist` | Products saved for later |
| Login | `/login` | Sign-in interface |
| Register | `/register` | Account creation interface |
| Account | `/account` | Simple profile overview and sign-out |
| About us | `/about` | Company story and values |
| Contact us | `/contact` | Contact form and details |

Every page shares a common **header** (announcement bar, logo, search, account/wishlist/cart icons, category navigation) and **footer** (links, contact info, payment methods).

## 4. Screen Descriptions

### 4.1 Header (all pages)
- **Announcement bar** in an amber gradient promoting free delivery and returns.
- **Main bar** (deep navy): logo, a large central search box, dark-mode toggle, account, wishlist and cart icons. Wishlist and cart icons show live count badges.
- **Category bar**: quick links to every category plus About and Contact.
- **Mobile**: a hamburger button opens a drop-down menu containing search, categories and account links.

### 4.2 Homepage
1. **Hero banner** — full-width photograph of tech and fashion products on a navy background, a bold headline, a sale badge and two calls to action ("Shop now", "View deals").
2. **Perks strip** — a floating white card overlapping the hero showing free delivery, returns, secure checkout and 24/7 support.
3. **Popular categories** — six image tiles linking to filtered shop pages.
4. **Featured products** — four hand-picked product cards.
5. **Special offers** — a dark navy band with the three largest discounts.
6. **Best sellers** — four popular products.
7. **Customer testimonials** — three review cards with star ratings.
8. **Newsletter** — amber gradient panel with validated email sign-up.
9. **Footer.**

### 4.3 Product card (reusable component)
Image (zooms on hover), discount label, wishlist heart, category, availability status (In stock / Only X left / Out of stock), name, star rating with review count, price and previous price, an "Add to cart" button and a "details" button. Cards lift with a soft shadow on hover.

### 4.4 Shop / Category page
- **Left sidebar** (collapsible on mobile): category list, price presets, custom min/max price inputs, "In stock only" checkbox.
- **Toolbar**: filter toggle (mobile), "Clear filters", and a **Sort by** menu (Featured, Price low→high, Price high→low, Top rated, Biggest discount).
- **Results grid** with result count; an **empty state** with a reset button when nothing matches.
- All filters are stored in the URL, so filtered views can be shared and the back button works.

### 4.5 Product details page
- Breadcrumb navigation.
- **Large image** with four clickable **thumbnails** (alternate views).
- Brand, name, rating, stock status, price, previous price and "You save" amount.
- Description, **quantity selector** (limited by stock), Add to cart and wishlist buttons.
- Trust points (delivery, returns, warranty).
- **Tabs** for Specifications and Customer reviews.
- **Related products** grid.

### 4.6 Shopping cart
- List of items with image, name, unit price, **+/- quantity controls**, line total and remove button.
- Progress message showing how much more is needed for free delivery.
- **Order summary**: subtotal, shipping, tax (8 %) and total.
- "Proceed to checkout" and "Continue shopping" buttons.
- Empty-cart state with a link back to the shop.

### 4.7 Checkout
Four numbered sections:
1. **Customer information** — name, email, phone.
2. **Shipping address** — street, city, postcode, country.
3. **Delivery option** — Standard ($5.99, free over $100), Express ($14.99) or Store pickup (free).
4. **Payment method** — Card, PayPal or Mobile Money. Card fields are validated (16-digit number, MM/YY expiry, 3–4 digit CVC).

The right column shows the item list and live order summary. Placing an order shows a short "Processing…" state, then redirects to the confirmation page. **No real payment is processed.**

### 4.8 Order confirmation
Success icon, personalised thank-you, order number, item list, total, shipping address, delivery method and payment method, with buttons to continue shopping.

### 4.9 Wishlist
Grid of saved products using the same product card, with an empty state.

### 4.10 Login / Register
Centred card with logo and validated fields (email format, minimum password length, password confirmation). On success the user is "signed in" locally and redirected to the account page.

### 4.11 About / Contact
About presents the brand story, key statistics and three values. Contact provides a validated message form and cards with address, phone, email and hours.

## 5. Colour Scheme

| Role | Colour | Use |
|---|---|---|
| Deep Navy | ≈ #14213D | Header, footer, hero and offer bands — conveys trust and premium quality |
| Electric Blue | ≈ #2563EB | Primary buttons, links, active filters — clear, clickable actions |
| Amber | ≈ #F59E0B | Accent: logo, discount labels, sale badges, checkout CTA — draws attention to value |
| Light Gray | ≈ #F8FAFC | Page background — reduces glare and makes white cards stand out |
| Slate | ≈ #1E293B | Body text — softer than pure black but highly readable |
| White | #FFFFFF | Cards and inputs |
| Green / Red | — | Success (in stock, order placed) and error (validation, out of stock) states |

Navy and blue create a calm, trustworthy base — important when customers are spending money — while amber adds warmth and energy and is reserved for promotions and the most important actions. All colours are defined once as design tokens (in `src/styles.css`), and a full **dark mode** palette is included.

## 6. Typography

- **Sora** (headings, prices, logo) — a geometric sans-serif with a modern, confident character that gives the brand a tech-forward personality.
- **Manrope** (body text, UI) — a highly legible humanist sans-serif that stays readable at small sizes on mobile screens.

A clear type scale (from 12 px labels to 60 px hero headlines), generous line height for descriptions, and tight letter spacing on headings create a strong visual hierarchy.

## 7. User Experience (UX)

- **Findability**: search is always visible in the header; categories are one click away from any page.
- **Shareable state**: filters and sorting live in the URL.
- **Instant feedback**: toast notifications confirm adding to cart, wishlist changes, subscriptions and messages; badges update immediately.
- **Forgiving forms**: inline error messages appear under each invalid field and clear as the user types.
- **Loading and empty states**: skeleton placeholders while saved data loads; friendly empty states with a clear next step.
- **Persistence**: cart, wishlist, sign-in and last order are saved in the browser's local storage, so nothing is lost on refresh.
- **Accessibility**: semantic HTML landmarks, labelled icon buttons, `aria-invalid` on fields, visible focus rings, alt text for images and sufficient colour contrast.

## 8. User Interface (UI)

- Card-based layout with rounded corners (14–24 px) and soft layered shadows for depth.
- Consistent spacing on a 4 px grid and a 1280 px maximum content width.
- Subtle motion: cards lift on hover, images zoom, content fades up on load.
- Dark navy "bands" break up the long homepage and highlight promotions.
- Reusable components (product card, rating stars, page header, empty state, order summary) keep every page visually consistent.

## 9. Main Features

| Feature | Description |
|---|---|
| Product search | Matches product name, brand and category from the header search |
| Category filter | Sidebar list and header links |
| Price filter | Presets plus custom min/max |
| Availability filter | "In stock only" |
| Sorting | Featured, price ascending/descending, rating, discount |
| Shopping cart | Add, remove, change quantity (capped at stock), live totals |
| Delivery pricing | Free standard delivery from $100; express and pickup options |
| Tax | 8 % estimated tax |
| Wishlist | Toggle from any card or product page |
| Checkout | Validated multi-section form with simulated payment |
| Order confirmation | Persisted summary of the last order |
| Accounts | Demo sign-in / registration stored locally |
| Dark mode | Toggle in the header, remembered between visits |
| Notifications | Toasts for every important action |

## 10. Responsive Design

The layout is mobile-first and uses breakpoints for tablet (≥ 640/768 px) and desktop (≥ 1024 px):

- Product grids adapt from **1 → 2 → 3 → 4 columns**.
- Category tiles go from 2 → 3 → 6 columns.
- The header collapses into a **hamburger menu** on small screens; search moves into the menu on phones.
- The shop sidebar becomes a toggleable filter panel on mobile.
- Cart and checkout switch from a single column to a two-column layout with a sticky order summary on desktop.

## 11. Technologies Used

| Technology | Role |
|---|---|
| **React 19** | Component-based user interface |
| **TypeScript** | Type safety and maintainable code |
| **TanStack Start / TanStack Router** | File-based routing, page metadata (SEO) and server-side rendering |
| **Vite** | Fast development server and build tool |
| **Tailwind CSS v4** | Utility-first styling driven by design tokens |
| **shadcn/ui + Radix** | Accessible base components (buttons, toasts) |
| **Lucide** | Consistent icon set |
| **Sonner** | Toast notifications |
| **Local Storage** | Persistent cart, wishlist, user and last order |
| **Vitest** | Unit tests for cart, shipping and tax rules |

Product data (18 realistic products with descriptions, specifications and reviews) lives in `src/lib/products.ts`. Cart state is managed by a React context in `src/lib/store.tsx`, with the pricing rules in `src/lib/cart-math.ts`.

## 12. Conclusion

Kivora delivers a complete, polished e-commerce front end that looks and behaves like a commercial store. It meets every project objective: a distinctive brand identity, a professional and responsive interface, all required pages, and genuinely interactive functionality — search, filtering, sorting, cart, wishlist, validated forms and a simulated checkout with persistent data. The modular, typed code base makes it straightforward to extend with a real back end, payment provider or product database in future.
