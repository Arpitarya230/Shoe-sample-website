# AERO Footwear — Premium Full-Stack Portfolio & Customizer Store

Welcome to **AERO**, a modern, high-fidelity portfolio and interactive e-commerce showcase designed for an elite footwear brand. Combining pristine editorial layouts with biomechanical science narratives and a fully interactive **programmatic 3D shoe customizer**, this application delivers a world-class landing page experience.

---

## 🎨 Design System & Visual Identity

The AERO visual experience is styled with a professional, dark, ultra-premium aesthetic:
*   **Typography**: Clean, tech-forward headings powered by Google Font **Outfit** paired with structured data tags in **JetBrains Mono**.
*   **Color Palette**: Stark pitch-blacks (`#111111`, `#0C0C0C`), elegant off-whites (`#FFFFFF`, `#EAEAEA`), and high-energy propulsion orange (`#FF6B00`) as the primary visual signature.
*   **Aesthetic Treatments**: Multi-pass background spot lighting, floating micro-particle rings, glassmorphism panel backdrops (`backdrop-blur-md`), and responsive mouse-parallax containers.

---

## 🚀 Key Functional Features

### 1. Programmatic 3D Shoe Customizer
Built from scratch using vanilla **Three.js** inside a React viewport:
*   Constructs a highly detailed athletic shoe model programmatically out of segmented geometries (rockered outsoles, layered sugarcane foam midsoles, translucent embedded nitrogen air pods, tension laces, and side-logo stabilizers).
*   Allows users to rotate on 3 axes via mouse-dragging or phone-touch, zoom in/out with the scroll-wheel, and paint individual elements (Uppers, Midsoles, Outsoles, Laces, and Accents) in real-time.
*   Includes built-in design presets (e.g., *AERO Fire*, *Alabaster Luxe*, *Midnight Stealth*, *Cyber Neon*).

### 2. Integrated E-commerce Flow & Quick View
*   **Smart Filter Engine**: Seamlessly categories shoes into *Running*, *Sneakers*, *Hiking*, *Sports*, and *Limited Edition* lines.
*   **Quick View Modal**: Renders detailed materials spec sheets, interactive size-selection buttons (US 7-12), physical color swatches, and reactive quantity adjustments.
*   **Persistent Mini Cart & Wishlist**: Dropdowns in the sticky header track added items, calculate totals, handle items removal, and simulate secure vault checkout procedures.

### 3. Biomechanical Tech & Statistics
*   Highlights 5 core shoes technologies (Active-Air Cushion, Bio-Foam Midsole, Carbon Propulsion Plate, AeroKnit Mesh, and Hydrophobic Membrane) accompanied by performance gauges that animate when hovered.
*   **Animated Counter Boards**: Numeric milestones (100K+ Runners, 50+ Countries) count up dynamically on load to reflect global athletic heritage.

### 4. Portfolio Media Archive
*   Beautiful filtered grid portraying behind-the-scenes prototype sketching, weather labs, robotic friction testing, and sprinters starting block trials.
*   **Interactive Lightbox**: Clicking any asset launches an expansive keyboard-navigable preview overlay with description cards.

### 5. Full-Stack Express.js Backend API
Lightweight Express routes power data delivery, fully integrated with Vite's development middleware:
*   `GET /api/shoes`: Resolves the active database of featured footwear models.
*   `GET /api/categories`: Delivers the metadata of available shoe families.
*   `GET /api/testimonials`: Supplies active user endorsements.
*   `POST /api/contact`: Accepts concierge inquiry form entries, parses values, saves submissions locally, and responds with secure confirmation receipt notices.

---

## 🛠️ Architecture & Tech Stack

*   **Frontend**: React (Vite, TypeScript, Tailwind CSS v4, Lucide Icons, Three.js)
*   **Backend**: Node.js, Express.js, TypeScript Compiler (`tsx`)
*   **Production Bundling**: `esbuild` compiles TypeScript server-side entries directly into highly efficient CommonJS bundles (`dist/server.cjs`), solving native ES relative import path checks and speeding up container launches.

---

## 💻 Local Development & Command Terminal

Before starting, ensure you have Node.js installed in your environment.

### 1. Install Dependencies
```bash
npm install
```

### 2. Boot the Full-Stack Dev Server
Launches the Express server on port `3000` with hot asset rebuilding:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live preview.

### 3. Build & Package for Production
Compiles the static assets and bundles the server script into `dist/`:
```bash
npm run build
```

### 4. Start Standalone Container Build
Launches the self-contained production bundle:
```bash
npm start
```
