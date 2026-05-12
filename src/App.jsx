import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

import Home from "../app/components/Home";
import About from "../app/components/About";
import Programs from "../app/components/Programs";
import Impact from "../app/components/Impact";
import Contact from "../app/components/Contact";
import Gallery from "./components/Gallery";
import Donation from "../pages/Donation";
import VocationalHub from "../app/components/VocationalHub";
import DonationPage from "../app/components/DonationPage";
import News from "../app/components/News";
import Partnership from "../app/components/Partnership";
import WhatsAppFAB from "./components/WhatsAppFAB";

import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Navbar />

          {/* GLOBAL FIX:
              • pt-32 (128px) guarantees the sticky h-24 navbar never covers
                H1/paragraph text on any page.
              • bg/text classes here cascade to every route so dark mode is
                instantly applied site-wide.
              • transition-colors animates the theme flip smoothly. */}
          <main className="page-container pt-32 min-h-[calc(100vh-8rem)] bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/vocational-hub" element={<VocationalHub />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="/news" element={<News />} />
              <Route path="/partnership" element={<Partnership />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppFAB />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;