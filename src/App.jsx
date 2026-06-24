import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Always-on shell: navbar/footer/floating widgets are tiny and live in every
// view, so we keep them eagerly imported.
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import WhatsAppFAB from "./components/WhatsAppFAB";
import KwesBot from "../app/components/KwesBot";

import ErrorBoundary from "./components/ErrorBoundary";
import RouteFallback from "./components/RouteFallback";

// Route-level code splitting — each page is its own chunk so first paint
// stays fast even on 2G/3G connections (a real constraint in Kakuma).
const Home          = lazy(() => import("../app/components/Home"));
const About         = lazy(() => import("../app/components/About"));
const Programs      = lazy(() => import("../app/components/Programs"));
const Impact        = lazy(() => import("../app/components/Impact"));
const Contact       = lazy(() => import("../app/components/Contact"));
const Gallery       = lazy(() => import("./components/Gallery"));
const VocationalHub = lazy(() => import("../app/components/VocationalHub"));
const Donate        = lazy(() => import("../app/components/Donate"));
const News          = lazy(() => import("../app/components/News"));
const Partnership   = lazy(() => import("../app/components/Partnership"));
const Products      = lazy(() => import("../app/components/Products"));

import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ErrorBoundary>
            <Navbar />

            {/* GLOBAL FIX:
                • pt-32 (128px) guarantees the sticky h-24 navbar never covers
                  H1/paragraph text on any page.
                • bg/text classes here cascade to every route so dark mode is
                  instantly applied site-wide.
                • transition-colors animates the theme flip smoothly. */}
            <main className="page-container pt-32 min-h-[calc(100vh-8rem)] bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/programs" element={<Programs />} />
                  <Route path="/impact" element={<Impact />} />
                  <Route path="/vocational-hub" element={<VocationalHub />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/partnership" element={<Partnership />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/gallery" element={<Gallery />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
            <WhatsAppFAB />
            <KwesBot />
          </ErrorBoundary>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;