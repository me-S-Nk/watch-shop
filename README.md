# ✦ MEGA LUX
https://me-s-nk.github.io/watch-shop/

### Premium Swiss Watch Boutique · Digital Experience

<p align="center">
  <strong>Luxury is not about having more. It is about having what matters.</strong>
</p>

<p align="center">
  A premium e-commerce experience for collectors of exceptional Swiss timepieces.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Responsive-Design-8B7355?style=for-the-badge" alt="Responsive Design"/>
</p>

---

## ◈ About

**MEGA LUX** is a concept premium watch boutique designed around the visual language of haute horlogerie.

The project combines:

* sophisticated editorial typography;
* dark luxury aesthetics;
* gold accent system;
* immersive product presentation;
* dynamic catalog interactions;
* persistent cart and wishlist;
* responsive navigation;
* multi-step checkout interface;
* product filtering and search;
* reusable JavaScript architecture.

The goal was not simply to create an online store.

> **The goal was to recreate the feeling of entering a private watch boutique through the browser.**

---

## ✦ Experience

### Home

The landing page introduces the MEGA LUX identity through a cinematic hero section, curated collections and featured timepieces.

**Highlights**

* Full-screen hero experience
* Editorial typography
* Featured watches
* Brand positioning
* Trust indicators
* Customer testimonials
* Newsletter subscription
* Scroll-based reveal animations

---

### Collection

A complete product catalog with dynamic filtering and sorting.

**Available controls**

* Brand
* Category
* Gender
* Price range
* Special badges
* New arrivals
* Limited editions
* Sale items
* Sorting
* Search

---

### Product Experience

Every watch has its own dynamically generated product page.

Each product contains:

* Brand
* Model
* Reference number
* Price
* Rating
* Reviews
* Availability
* Materials
* Movement
* Case diameter
* Water resistance
* Power reserve
* Crystal
* Bracelet
* Detailed description
* Product gallery
* Related models

---

### Cart

The shopping cart is handled entirely on the client side.

Users can:

* add products;
* remove products;
* change quantities;
* view totals;
* continue shopping;
* proceed to checkout.

Cart state is persisted using:

```text
localStorage
```

so the selection survives page reloads.

---

### Wishlist

A persistent favorites system allows users to save watches for later.

Wishlist state is also stored locally and synchronized across the interface.

---

### Checkout

The project includes a multi-step checkout experience designed to reproduce a premium e-commerce flow:

```text
Cart
  ↓
Customer information
  ↓
Delivery
  ↓
Payment
  ↓
Order confirmation
```

The interface supports payment selection, form formatting and order submission states.

---

## ◇ Design System

The visual identity is intentionally minimal.

### Color direction

```text
████████  Deep Black
████████  Charcoal
████████  Warm Gold
████████  Soft White
████████  Neutral Gray
```

The interface relies on contrast rather than excessive decoration.

### Typography

The project combines:

* **Playfair Display** — luxury/editorial headings
* **Cormorant Garamond** — refined display typography
* **Inter** — interface and body typography

This creates a visual hierarchy between:

```text
EDITORIAL
    ↓
PRODUCT
    ↓
INTERFACE
```

---

## ⚡ Features

| Feature                 | Status |
| ----------------------- | :----: |
| Premium responsive UI   |    ✅   |
| Multi-page architecture |    ✅   |
| Dynamic product catalog |    ✅   |
| Product filtering       |    ✅   |
| Product sorting         |    ✅   |
| Product search          |    ✅   |
| Product detail pages    |    ✅   |
| Shopping cart           |    ✅   |
| Persistent cart         |    ✅   |
| Wishlist                |    ✅   |
| Persistent wishlist     |    ✅   |
| Multi-step checkout UI  |    ✅   |
| Payment selection UI    |    ✅   |
| Toast notifications     |    ✅   |
| Mobile navigation       |    ✅   |
| Mega menu               |    ✅   |
| Scroll progress         |    ✅   |
| Reveal animations       |    ✅   |
| Dynamic breadcrumbs     |    ✅   |
| Related products        |    ✅   |
| Newsletter form         |    ✅   |
| Responsive layout       |    ✅   |

---

## 🧩 Architecture

The project intentionally uses a lightweight frontend architecture without unnecessary dependencies.

```text
┌──────────────────────────────────────┐
│              MEGA LUX               │
│          Premium Frontend           │
└──────────────────┬───────────────────┘
                   │
          ┌────────┴────────┐
          │                 │
       HTML5              CSS3
          │                 │
          └────────┬────────┘
                   │
              JavaScript
                   │
       ┌───────────┼───────────┐
       │           │           │
     Data       Application    Shell
       │           │           │
 PRODUCTS     Interactions   Navigation
             Cart / Wishlist
             Search / Filter
             Checkout
```

---

## 📁 Project Structure

```text
watch/
│
├── index.html
├── catalog.html
├── product.html
├── about.html
├── contacts.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── data.js
│   └── shell.js
│
├── hero_banner.png
│
├── watch_1.png
├── watch_2.png
├── watch_3.png
├── watch_4.png
└── watch_5.png
```

---

## 🧠 JavaScript Architecture

### `data.js`

Contains the product catalog and product metadata.

Each product is represented as a structured object:

```javascript
{
  id: 1,
  brand: "Audemars Piguet",
  name: "Royal Oak Chronograph",
  model: "Ref. 26331ST",
  price: 48500,
  category: "sport",
  gender: "men",
  material: "Steel",
  movement: "Automatic",
  diameter: "41mm",
  waterResistance: "50m",
  image: "watch_1.png"
}
```

The catalog currently contains **12 product records**.

---

### `app.js`

Responsible for the main application logic:

```text
Cart
Wishlist
Search
Filtering
Sorting
Product cards
Checkout
Notifications
Animations
Navigation interactions
LocalStorage
```

The application exposes more than 30 reusable interaction functions.

---

### `shell.js`

Provides the shared application shell across pages.

It handles:

* navigation;
* mega menu;
* announcement bar;
* cart drawer;
* wishlist drawer;
* search interface;
* mobile menu;
* footer;
* shared UI components;
* page state;
* navigation highlighting.

This keeps the individual HTML pages focused on their actual content.

---

## 💾 State Management

No external state-management library is required.

The project uses browser `localStorage`.

### Cart

```javascript
localStorage.getItem("ce_cart")
```

### Wishlist

```javascript
localStorage.getItem("ce_wishlist")
```

This provides lightweight persistence without requiring a backend.

---

## 🔎 Catalog Filtering

Products can be filtered through URL parameters.

Examples:

```text
catalog.html?brand=Rolex
```

```text
catalog.html?category=sport
```

```text
catalog.html?badge=limited
```

```text
catalog.html?badge=new
```

```text
catalog.html?minprice=2000000&maxprice=6000000
```

This makes catalog states directly shareable.

---

## 🛒 Product Flow

The primary customer journey is designed as:

```text
HOME
  │
  ├── Featured Collection
  │
  └── Explore
        │
        ▼
     CATALOG
        │
        ├── Search
        ├── Filter
        └── Sort
              │
              ▼
          PRODUCT
              │
        ┌─────┴─────┐
        │           │
     Wishlist     Cart
                    │
                    ▼
                Checkout
                    │
                    ▼
             Order Confirmation
```

---

## 📱 Responsive Design

The interface is designed to adapt across:

```text
Desktop
   ↓
Tablet
   ↓
Mobile
```

The navigation automatically transforms into a mobile interaction model while maintaining the visual identity of the desktop experience.

The product grid, hero sections, navigation, drawers and checkout components are designed with responsive behavior in mind.

---

## 🛠 Tech Stack

### Core

* HTML5
* CSS3
* Vanilla JavaScript

### Browser APIs

* `localStorage`
* `URLSearchParams`
* `Intl.NumberFormat`
* DOM API

### Typography

* Google Fonts
* Playfair Display
* Cormorant Garamond
* Inter

### Architecture

* Multi-page frontend
* Shared JavaScript shell
* Data-driven product rendering
* Client-side state persistence
* No frontend framework required

---

## 🚀 Getting Started

This project does not require Node.js, npm or a backend server.

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Enter the project

```bash
cd YOUR_REPOSITORY/watch
```

### 3. Run

The simplest option is to open:

```text
index.html
```

directly in a browser.

For the best development experience, use **VS Code + Live Server**.

---

## 🌐 Deployment

Because the project is a static frontend, it can be deployed to practically any static hosting provider.

Suitable options include:

* GitHub Pages
* Vercel
* Netlify
* Cloudflare Pages
* Render Static Sites

No backend infrastructure is required for the current version.

---

## 🔐 Current Scope

This project is currently a **frontend e-commerce concept**.

The following components are UI/client-side implementations rather than production backend services:

```text
Payment processing
Order persistence
Authentication
Customer accounts
Inventory synchronization
Real payment gateways
Email delivery
CRM integration
Backend database
```

For production deployment, these components can be connected to a dedicated backend/API.

---

## 📈 Production Roadmap

### Phase I — Backend

```text
REST API
PostgreSQL
Authentication
User accounts
Orders
Inventory
Admin panel
```

### Phase II — Commerce

```text
Real payment gateway
Order processing
Shipping integration
Email notifications
Invoice generation
```

### Phase III — Luxury Experience

```text
Personalized recommendations
Advanced product search
Virtual concierge
Appointment booking
Private client accounts
Wishlist synchronization
```

### Phase IV — Infrastructure

```text
CDN
Image optimization
Caching
Analytics
SEO
Performance monitoring
Security hardening
```

---

## 🎯 Design Philosophy

MEGA LUX follows one central principle:

> **The interface should feel expensive without feeling complicated.**

Every component is designed around:

**Typography → Space → Contrast → Motion → Product**

Rather than filling the interface with visual effects, the design gives products enough space to become the visual focus.

---

## ✦ Project Highlights

```text
12
PRODUCT MODELS

5
CORE PAGES

30+
JAVASCRIPT INTERACTIONS

100%
VANILLA FRONTEND

0
FRAMEWORK DEPENDENCIES
```

---

## 🖼 Preview

### Homepage

> Add your GitHub screenshot here.

```markdown
![MEGA LUX Homepage](./screenshots/home.png)
```

### Catalog

```markdown
![MEGA LUX Catalog](./screenshots/catalog.png)
```

### Product

```markdown
![MEGA LUX Product Page](./screenshots/product.png)
```

### Mobile

```markdown
![MEGA LUX Mobile](./screenshots/mobile.png)
```

---

## 👨‍💻 Author

Designed and developed with a focus on:

```text
Frontend Development
UI / UX
Responsive Design
JavaScript Architecture
E-commerce Interfaces
Premium Digital Experiences
```

---

<p align="center">

### MEGA LUX

**Swiss Horology · Refined Digital Experience**

<br>

`Built with HTML · CSS · JavaScript`

<br>

✦   **Crafted for those who appreciate time.**   ✦

</p>
