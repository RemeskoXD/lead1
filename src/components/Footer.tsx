import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* Quick category banner */}
      <div className="bg-neutral-50 py-10 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <h5 className="font-extrabold text-blue-950 uppercase tracking-wider text-xs mb-3 font-display">
              Internet
            </h5>
            <ul className="space-y-2 text-gray-500 font-medium">
              <li><Link to="/internet" className="hover:text-blue-700 transition-colors">Optický internet</Link></li>
              <li><Link to="/internet" className="hover:text-blue-700 transition-colors">VDSL & Kabelový internet</Link></li>
              <li><Link to="/internet" className="hover:text-blue-700 transition-colors">5G internet na doma</Link></li>
              <li><Link to="/#srovnavac" className="hover:text-blue-700 transition-colors">Srovnání poskytovatelů</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-blue-950 uppercase tracking-wider text-xs mb-3 font-display">
              Mobilní tarify
            </h5>
            <ul className="space-y-2 text-gray-500 font-medium">
              <li><Link to="/mobilni-tarify" className="hover:text-blue-700 transition-colors">Neomezená data 5G</Link></li>
              <li><Link to="/mobilni-tarify" className="hover:text-blue-700 transition-colors">Tarify s 10–12 GB</Link></li>
              <li><Link to="/mobilni-tarify" className="hover:text-blue-700 transition-colors">Rodinné paušály</Link></li>
              <li><Link to="/mobilni-tarify" className="hover:text-blue-700 transition-colors">Přenos čísla do 3 dnů</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-blue-950 uppercase tracking-wider text-xs mb-3 font-display">
              Digitální TV
            </h5>
            <ul className="space-y-2 text-gray-500 font-medium">
              <li><Link to="/televize" className="hover:text-blue-700 transition-colors">Základní IPTV balíčky</Link></li>
              <li><Link to="/televize" className="hover:text-blue-700 transition-colors">Sportovní TV (Liga mistrů, F1)</Link></li>
              <li><Link to="/televize" className="hover:text-blue-700 transition-colors">Rodinné a filmové kanály</Link></li>
              <li><Link to="/televize" className="hover:text-blue-700 transition-colors">Aplikace pro Smart TV</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-blue-950 uppercase tracking-wider text-xs mb-3 font-display">
              O srovnání
            </h5>
            <ul className="space-y-2 text-gray-500 font-medium">
              <li><Link to="/balicky" className="hover:text-blue-700 transition-colors">Balíčky Vše v 1</Link></li>
              <li><Link to="/jak-to-funguje" className="hover:text-blue-700 transition-colors">Jak to funguje?</Link></li>
              <li><Link to="/ochrana-osobnich-udaju" className="hover:text-blue-700 transition-colors">Ochrana osobních údajů</Link></li>
              <li>
                <a href="tel:+420608638304" className="text-blue-700 font-bold hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> +420 608 638 304
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO paragraph */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-400 text-xs leading-relaxed">
        <p>
          Optiva je nezávislý srovnávač telekomunikačních služeb v České republice. Prověřujeme nabídky operátorů T-Mobile, O2, Vodafone a desítek regionálních poskytovatelů optického internetu. Naším cílem je vyjednat pro koncové zákazníky neveřejné, velkoobchodní a retenční slevy bez zbytečných závazků a skrytých poplatků. Služba je pro poptávajícího 100% bezplatná a nezávazná.
        </p>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <div>
            © {new Date().getFullYear()} <strong className="text-gray-800">Optiva</strong>. Všechna práva vyhrazena.
            <span className="block sm:inline sm:ml-2 text-gray-400 font-normal">
              Uvedené ceny se nemusí shodovat s reálnými daty.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open_cookie_settings'))}
              className="hover:text-blue-600 transition-colors cursor-pointer text-xs"
            >
              Nastavení cookies
            </button>
            <Link to="/ochrana-osobnich-udaju" className="hover:text-blue-600 transition-colors">
              Zásady ochrany osobních údajů (GDPR)
            </Link>
            <a href="tel:+420608638304" className="hover:text-blue-600 transition-colors font-bold">
              Infolinka: +420 608 638 304
            </a>
          </div>
        </div>
      </div>

      {/* Verification / operator details badge at the very bottom */}
      <div className="pb-6 pt-3 flex justify-center items-center select-none px-4">
        <img 
          src="/legal-notice.png" 
          alt="" 
          aria-hidden="true"
          role="presentation"
          className="h-8 sm:h-9 md:h-10 w-auto max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity select-none"
          loading="lazy"
        />
      </div>
    </footer>
  );
}
