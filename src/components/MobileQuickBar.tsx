import React from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';

export default function MobileQuickBar() {
  const scrollToForm = () => {
    const el = document.getElementById('kalkulace-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-3 py-2.5 shadow-2xl flex items-center gap-2 animate-fade-in">
      {/* Phone Call */}
      <a
        href="tel:+420608638304"
        className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-gray-900 font-extrabold text-xs border border-gray-300/80 transition-colors shadow-xs active:scale-[0.98]"
      >
        <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <span className="truncate">+420 608 638 304</span>
      </a>

      {/* Primary CTA */}
      <button
        onClick={scrollToForm}
        className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 transition-all active:scale-[0.98] cursor-pointer"
      >
        <span>Srovnat nabídky</span>
        <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
      </button>
    </div>
  );
}
