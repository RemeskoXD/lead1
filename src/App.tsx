/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import Privacy from './pages/Privacy';
import InternetPage from './pages/InternetPage';
import MobilePage from './pages/MobilePage';
import TvPage from './pages/TvPage';
import BundlesPage from './pages/BundlesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import CookieBanner from './components/CookieBanner';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/internet" element={<InternetPage />} />
        <Route path="/mobilni-tarify" element={<MobilePage />} />
        <Route path="/televize" element={<TvPage />} />
        <Route path="/balicky" element={<BundlesPage />} />
        <Route path="/jak-to-funguje" element={<HowItWorksPage />} />
        <Route path="/ochrana-osobnich-udaju" element={<Privacy />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <CookieBanner />
    </BrowserRouter>
  );
}

