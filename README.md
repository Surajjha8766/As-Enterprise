# ElectroChip Enterprise — E-Commerce Web Application

A responsive, enterprise-grade e-commerce storefront for **ElectroChip Enterprise**, providing electronic components, semiconductor products, embedded systems, and industrial hardware.

Transcribed with 100% precision from the verified 30-item `Component Price List` spreadsheet, featuring manufacturer part numbers (MPNs), market-researched pricing, technical hardware specifications, and an RFQ requisition workflow.

---

## Technical Architecture & Compliance

- **Framework**: React 19 SPA running on Vite
- **Language**: JavaScript (ES6+), strictly `.jsx` components (No TypeScript, No `.tsx` or `interface` files)
- **Styling**: Tailwind CSS v4 with centralized CSS variable theme tokens (`--primary`, `--secondary`, `--accent`, `--page-bg`)
- **Navigation & Routing**: React Router DOM (v7) with 13 multi-page routes
- **State Management**: React Context API (`CartContext`) with local storage hydration
- **Icons**: `lucide-react`
- **Zero-Pill Discipline**: Unboxed metadata typography, rectangular and gently rounded controls, no AI-style purple gradients, no fake customer testimonials or unverified ISO badges.

---

## Product Catalog & Source Data

The product catalog (`src/data/products.js`) incorporates all 30 rows from the provided spreadsheet:

1. **Acoustic**: 12V DC Buzzer, 5V DC Buzzer
2. **Power & Cells**: AA 1.5V Cell Battery
3. **Optoelectronics**: 5mm Red LED, 3mm Green LED, 5mm Green LED, 5mm Yellow LED, 3mm Yellow LED, 5mm Blue LED
4. **Embedded & Dev Boards**: Arduino UNO R3 (ATmega328P)
5. **Displays**: LCD1602 Character LCD (16x2), TM1637 4-Digit Display
6. **Passives (SMD Chip Resistors & Trimpots)**:
   - 1 kΩ (1K0) SMD 0402 (`WR04X102JTL` - Walsin Technology)
   - 2 kΩ SMD 0402 1% Precision (`WR04X2001FTL` - Walsin Technology)
   - 3.3 kΩ SMD 0402 (`WR04X332JTL` - Walsin Technology)
   - 75 kΩ SMD 0402 1% Precision (`WR04X7502FTL` - Walsin Technology)
   - 10 kΩ Resistor
   - 1 kΩ Trimmer Potentiometer (`3386P-1K`)
   - Capacitor (RFQ required for undefined parameters)
7. **Semiconductors**: P2N2222A NPN Bipolar Transistor (TO-92, onsemi)
8. **Prototyping & Tools**:
   - MB-102 830-point Solderless Breadboard
   - 40-pin Male-to-Female Jumper Ribbon
   - 10×15 cm Phenolic Brown PCB
   - 63/37 Rosin Core Solder Wire (50g)
   - 60W Temperature Controlled Soldering Iron
9. **Sensors**: ZE16B-CO Electrochemical Carbon Monoxide Sensor Module (Winsen)
10. **Electromechanical & Thermal**: DPDT 6-Pin Switch, 12V DC Motor, 12V Brushless Fan, USB-A to USB-B Cable

---

## Pages & Routes

- `/` — Homepage (Hero, Featured Catalog, Category Navigation, Sourcing Process, FAQ preview)
- `/products` — Full 30-item searchable catalog with category, brand, and availability filters
- `/products/:id` — Detail view with vector hardware schematic, verified specifications, quantity selector, and RFQ option
- `/brands` — Directory of verified catalog brands (`Walsin Technology`, `Winsen Sensor`, `onsemi`, `Arduino`)
- `/partners` — Partnership & EMS distribution inquiry overview
- `/about` — Company background and sourcing integrity commitment
- `/contact` — Client-side validated contact form with honeypot spam prevention
- `/cart` — Order basket with itemized breakdown, quantity steppers, subtotal, and tax
- `/checkout` — Streamlined customer delivery form without mandatory login or accounts
- `/order-confirmation` — Generated session order reference, itemized receipt, print support, and Web Audio chime
- `/faq` — Comprehensive commercial, technical, and logistics FAQs
- `/privacy` — Transparent static frontend data handling disclosure
- `/cookie-preferences` — Granular consent toggles for essential vs analytics cookies
- `*` — Branded 404 Not Found page

---

## Installation & Development

```bash
# Install dependencies
npm install

# Start local development server on port 3000
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```
