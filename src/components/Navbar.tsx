import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Wifi, Smartphone, Tv, Layers, Info, TrendingDown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Srovnávač', path: '/#srovnavac', isAnchor: true, icon: TrendingDown },
    { name: 'Internet na doma', path: '/internet', icon: Wifi },
    { name: 'Mobilní tarify', path: '/mobilni-tarify', icon: Smartphone },
    { name: 'Televize (IPTV)', path: '/televize', icon: Tv },
    { name: 'Balíčky Vše v 1', path: '/balicky', icon: Layers, badge: 'Sleva až 45%' },
    { name: 'Jak to funguje', path: '/jak-to-funguje', icon: Info },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <>
      {/* Top trust notification bar */}
      <div className="bg-blue-900 text-blue-100 py-1.5 px-4 text-center text-xs sm:text-sm font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-6">
          <span className="flex items-center gap-2 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Srovnáváme kalkulace pro 164 lokálních i velkých operátorů v ČR
          </span>
          <span className="hidden md:inline text-blue-300">|</span>
          <span className="hidden md:inline font-bold text-emerald-300">Průměrná úspora klientů: 3 140 Kč ročně</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div>
              <span className="text-2xl sm:text-2xl font-extrabold text-blue-900 tracking-tight font-display group-hover:text-blue-700 transition-colors">
                Optiva
              </span>
              <span className="block text-[9px] sm:text-[10px] text-gray-500 font-semibold tracking-wider uppercase leading-none mt-0.5">
                Kompletní srovnání
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const isAnchor = link.isAnchor;

              if (isAnchor) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className="px-3 py-2 rounded-xl text-xs xl:text-sm font-bold text-gray-600 hover:text-blue-950 hover:bg-neutral-100 transition-all flex items-center gap-1.5"
                  >
                    <span>{link.name}</span>
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 relative",
                    active 
                      ? "text-blue-900 bg-blue-50/80 font-extrabold" 
                      : "text-gray-600 hover:text-blue-950 hover:bg-neutral-100"
                  )}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Phone + Mobile Burger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xl:flex flex-col items-end text-right">
              <span className="text-xs text-gray-500 font-semibold uppercase">Bezplatná konzultace</span>
              <span className="text-gray-400 text-[10px]">Po-Pá 8:00 - 18:00</span>
            </div>

            <a 
              href="tel:+420608638304" 
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-neutral-100 text-gray-800 hover:bg-blue-50 hover:text-blue-700 rounded-full transition-all duration-300 font-bold border border-gray-200/80 shadow-xs text-xs sm:text-sm group flex-shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span>+420 608 638 304</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 py-5 space-y-2 animate-fade-in">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Kategorie srovnání:
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all",
                    active 
                      ? "bg-blue-50 text-blue-900" 
                      : "text-gray-700 hover:bg-neutral-50 hover:text-blue-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-xs",
                      active ? "bg-blue-600 text-white" : "bg-neutral-100 text-gray-600"
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{link.name}</span>
                  </div>

                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-gray-100">
              <a
                href="tel:+420608638304"
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md"
              >
                <Phone className="w-4 h-4" />
                Zavolat specialistovi (+420 608 638 304)
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
