# 🥃 LiquorIX: The Spirits Index

**A high-fidelity, data-driven discovery and comparison platform for elite spirits, localized for the Nagpur, MH market.**

LiquorIX is a premium, Awwwards-inspired web experience designed for spirits enthusiasts to explore, analyze, and compare global brands with real-time regional context.

---

## ✨ Key Features & UX Innovations

### 1. Cinematic Hero & Entry Loader
- **Elite Intro Sequence**: A multi-stage GSAP animation featuring 3D text zoom, golden shimmer effects, and a vertical "bottom-to-top" curtain reveal.
- **Interactive Visuals**: Hero section featuring a logic-driven 3D rotating product bottle (Amrut Fusion) and floating interactive data tags.
- **"The Film" Modal**: A cinematic, on-demand video overlay (`Watch_Film.mp4`) designed to optimize performance by loading high-duty assets only when requested.

### 2. "The Duel" (Comparison Engine)
- **Side-by-Side Analysis**: Select two brands to compare across multiple dimensions including price, ABV, origin, and age statements.
- **Taste Fingerprinting**: Dual-layered Radar Charts providing a head-to-head visual comparison of flavor profiles (Smoky, Sweet, Woody, Spicy, etc.).
- **Dynamic Selection Overlay**: Immersive search-based selection for choosing brands within the "Duel" interface.

### 3. Global Discovery & Search
- **The Collective (Gallery)**: A full-width responsive grid of the spirits database with real-time filtering by name, category, or origin.
- **Discovery Engine**: Reactive search functionality integrated directly into the home page for lightning-fast discovery.

### 4. Nagpur Regional Optimization
- **Localized Indices**: Live price indices and stock status tailored specifically for **Nagpur, Maharashtra**.
- **Real-Time Ticker**: A `LivePriceTicker` component tracking market fluctuations across favorite regional brands.

---

## 🛠️ Technical Stack

- **Frontend**: React 19 + Vite (HMR enabled)
- **Styling**: Tailwind CSS (Custom Design System with Glassmorphism)
- **Animations**: GSAP (GreenSock Animation Platform) + `@gsap/react`
- **Icons**: Lucide React
- **Typography**: Inter (Sans) + Serif display headings (Apple-style minimalism)
- **Routing**: React Router DOM (v7+)
- **Data Management**: Localized JSON architecture (`liquors.js`) with integrated taste profile metadata.

---

## 🚀 Performance & Optimization

- **Conditional Rendering**: Large cinematic video assets are conditionally rendered to ensure a 90+ Lighthouse performance score on initial entry.
- **GSAP Context Management**: Animations are correctly cleaned up using `useGSAP` or modern `useEffect` patterns to prevent memory leaks.
- **Native-Feel Touch Navigation**: Fully responsive mobile menu with staggered GSAP transitions for a smooth smartphone experience.

---

## 📂 Project Structure

- `src/pages`: Home, Gallery (Collective), Compare (The Duel), and Detail pages.
- `src/components`: Modular UI elements like `ComparisonCard`, `RadarChart`, `Navbar`, and `Hero`.
- `src/data`: Centralized spirits database and regional metadata.
- `public/`: High-resolution product imagery and cinematic MP4 assets.

---

## 🎯 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Navigate**:
   - `http://localhost:5173/` (Home)
   - `http://localhost:5173/gallery` (The Collective)
   - `http://localhost:5173/compare` (The Duel)

---

**Developed for the Elite Nagpur Palate. &copy; 2026 LiquorIX Platform.**
