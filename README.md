<div align="center">

# 🌾 Smart Ration

**A digital queue-skipping system for India's Public Distribution System (PDS)**

Book a ration collection slot, get a QR token, skip the line.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green)](#license)

[Demo](https://smart-ration-app.vercel.app/) · [Features](#-features) · [Getting started](#-getting-started) · [Roadmap](#-roadmap)

</div>

---

## What is this

India's ration shop system serves over 800 million people through the Public Distribution System (PDS), but collection day usually means standing in a long, unpredictable queue with no idea how long the wait will be.

**Smart Ration** replaces that queue with a time slot. Citizens book a 30-minute collection window at their linked Fair Price Shop, receive a QR-coded digital token, and show up only when it's their turn. Shopkeepers scan the token to verify and complete the collection. Administrators get a live view of the entire network.

The project ships as three connected experiences in one app:

| Role | What they do |
|---|---|
| 🧑 **Citizen** | Check ration status, book a slot, get a QR token, view notifications |
| 🏪 **Shopkeeper** | See today's queue, scan tokens, mark collections complete, track stock |
| 🏛️ **Administrator** | Monitor bookings and completion rates across every shop in the network |

---

## ✨ Features

### For citizens
- 📊 **Dashboard** — ration status, family members, and the next booking at a glance
- 📅 **3-step booking flow** — pick a shop, choose a date and time slot, confirm — with inline validation so you can't submit an incomplete booking
- 🔲 **Digital QR token** — a verified, shareable token for the linked shop to scan on arrival
- 🔔 **Notification center** — stock alerts, shop holidays, and booking reminders with read/unread filtering
- 🌐 **Hindi/English toggle** — full UI translation, not just a label

### For shopkeepers
- 📋 **Live queue view** — today's bookings sorted by slot, searchable by name or booking ID
- 📷 **QR scan flow** — scan a citizen's token, verify their identity and ration card, mark the collection complete
- 📦 **Stock overview** — real-time levels for rice, wheat, sugar, and kerosene

### For administrators
- 📈 **Network dashboard** — total users, active shops, daily bookings, completion rate
- 📊 **Weekly activity chart** — bookings vs. completions, built with [Recharts](https://recharts.org)
- 🏬 **Shop performance table** — searchable, sortable view across every district
- 🕒 **Live activity feed** — new registrations, verifications, holidays, and low-stock alerts

### Across the app
- Loading skeletons, toast confirmations, and accessible keyboard focus states
- A single shared design system — no Tailwind, no component library, just deliberate CSS tokens
- Built entirely on mock data — no backend required to try it out

---

## 🖼️ Demo

> Switch between **Citizen**, **Shopkeeper**, and **Administrator** views from the top bar at any time — no login required in the current build.

| Citizen dashboard | Booking flow | Shopkeeper scan |
|---|---|---|
| Status, family, quick actions | 3-step slot booking with validation | QR verification + collection log |

---

## 🏗️ Tech stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| UI | [React 19](https://react.dev) + TypeScript |
| Styling | Custom CSS design tokens (`globals.css`) — no Tailwind |
| Icons | [lucide-react](https://lucide.dev) |
| Charts | [Recharts](https://recharts.org) |
| QR generation | [qrcode](https://www.npmjs.com/package/qrcode) |
| State | React Context (no external state library) |

---

## 🚀 Getting started

### Prerequisites
- Node.js 18.18 or later
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/<your-username>/smart-ration.git
cd smart-ration
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app. Use the **role switcher** in the top navigation bar to move between Citizen, Shopkeeper, and Administrator views.

### Build for production

```bash
npm run build
npm run start
```

---

## 📁 Project structure

```
smart-ration/
├── app/
│   ├── layout.tsx        # Root layout, metadata
│   ├── page.tsx           # Main app entry
│   └── globals.css        # Design system & global styles
├── public/                 # Static assets
├── next.config.mjs
├── tsconfig.json
└── package.json
```

> **Note:** the current build keeps all UI logic in a small number of files for clarity in this stage of the project. See [Roadmap](#-roadmap) for planned restructuring into `/components`, `/data`, and `/types`.

---

## 🗺️ Roadmap

This is an actively evolving prototype. Planned work, roughly in priority order:

**Core infrastructure**
- [ ] Backend API (Next.js API routes or a separate service) with PostgreSQL
- [ ] Real authentication — mobile OTP login, JWT sessions
- [ ] Live slot availability synced to a real database
- [ ] Environment-based configuration (`.env`)

**Citizen experience**
- [ ] SMS/WhatsApp booking confirmations for low-connectivity users
- [ ] Full regional language support beyond Hindi (Tamil, Telugu, Bengali, etc.)
- [ ] Offline-friendly booking confirmation page

**Shopkeeper portal**
- [ ] Real camera-based QR scanning (`html5-qrcode` or the Web Barcode Detection API)
- [ ] Offline mode for low-connectivity shops (service worker + cached queue)
- [ ] Editable stock levels with delivery logging

**Administrator portal**
- [ ] Holiday and shop closure management UI
- [ ] CSV/PDF export for reports
- [ ] Drill-down analytics per district and shop

**Platform-wide**
- [ ] Automated tests (Vitest for units, Playwright for E2E booking flow)
- [ ] WCAG accessibility audit and fixes
- [ ] PWA support — installable on low-end Android devices without an app store
- [ ] Component restructuring (`/components`, `/types`, `/data`) and Context/state cleanup

Contributions toward any of the above are welcome — see [Contributing](#-contributing).

---

## 🤝 Contributing

Issues and pull requests are welcome.

1. Fork the repo
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m "Add your feature"`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a pull request

Please keep PRs focused on a single change and describe what role (Citizen / Shopkeeper / Administrator) it affects.

---

## 📄 License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Built to help people spend less time standing in line.

</div>
