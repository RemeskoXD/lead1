import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Settings, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'optiva_cookie_consent_v1';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
    timestamp: '',
  });

  useEffect(() => {
    // Check if consent is already saved
    try {
      const savedConsent = localStorage.getItem(STORAGE_KEY);
      if (!savedConsent) {
        // Small delay for smooth entrance
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
        applyConsent(parsed);
      }
    } catch {
      setIsVisible(true);
    }

    // Listen for custom event to reopen settings
    const handleReopen = () => {
      setShowSettings(true);
      setIsVisible(true);
    };

    window.addEventListener('open_cookie_settings', handleReopen);
    return () => window.removeEventListener('open_cookie_settings', handleReopen);
  }, []);

  const applyConsent = (prefs: CookiePreferences) => {
    // Expose consent status globally for Meta Pixel & Google Analytics scripts
    (window as any).__cookieConsent = prefs;

    // Dispatch global event for third-party tag managers / pixels
    window.dispatchEvent(
      new CustomEvent('cookie_consent_updated', {
        detail: prefs,
      })
    );

    // If Meta Pixel is loaded later, grant or revoke consent
    if (typeof (window as any).fbq === 'function') {
      if (prefs.marketing) {
        (window as any).fbq('consent', 'grant');
      } else {
        (window as any).fbq('consent', 'revoke');
      }
    }
  };

  const saveConsent = (updated: CookiePreferences) => {
    const consentWithTimestamp: CookiePreferences = {
      ...updated,
      necessary: true, // Always true
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentWithTimestamp));
    } catch {
      // Storage unavailable fallback
    }
    setPreferences(consentWithTimestamp);
    applyConsent(consentWithTimestamp);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: '',
    });
  };

  const handleRejectOptional = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Nastavení cookies"
      className="fixed bottom-0 inset-x-0 sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-md z-[100] p-4 sm:p-0"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200/90 shadow-2xl shadow-blue-950/20 p-5 sm:p-6 transition-all animate-in fade-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-100/90 text-amber-700 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-blue-950 font-display">
                Nastavení soukromí a cookies
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                V souladu s GDPR a ochranou osobních údajů
              </p>
            </div>
          </div>
        </div>

        {/* Short info */}
        <p className="text-xs text-gray-600 mt-3 leading-relaxed">
          Tento web používá soubory cookies k zajištění správného fungování a s vaším souhlasem také k měření návštěvnosti a personalizaci reklam (např. Meta Pixel).
        </p>

        {/* Detailed settings panel */}
        {showSettings && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            {/* Technické / Nezbytné */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-200/60 text-xs">
              <div className="pr-3">
                <span className="font-bold text-gray-900 block flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Nezbytné technické cookies
                </span>
                <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                  Nutné pro základní funkce webu, bezpečnost a zobrazení srovnávače. Nelze vypnout.
                </span>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/60 whitespace-nowrap">
                Vždy aktivní
              </span>
            </div>

            {/* Analytické */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-200/60 text-xs cursor-pointer hover:bg-gray-100/60 transition-colors">
              <div className="pr-3">
                <span className="font-bold text-gray-900 block">Analytické cookies</span>
                <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                  Pomáhají nám anonymně vyhodnocovat návštěvnost a zlepšovat funkčnost kalkulátoru.
                </span>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            {/* Marketingové (Meta Pixel) */}
            <label className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 border border-gray-200/60 text-xs cursor-pointer hover:bg-gray-100/60 transition-colors">
              <div className="pr-3">
                <span className="font-bold text-gray-900 block">Marketingové cookies (Meta Pixel)</span>
                <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                  Umožňují vyhodnocovat reklamní kampaně na Facebooku, Instagramu a sociálních sítích.
                </span>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
            </label>

            <div className="text-[11px] text-gray-400 text-center">
              Podrobné informace najdete v{' '}
              <Link to="/ochrana-osobnich-udaju" className="text-blue-600 underline hover:text-blue-800">
                Zásadách ochrany osobních údajů
              </Link>
              .
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition-all shadow-sm active:scale-95 cursor-pointer text-center"
            >
              Přijmout vše
            </button>
            <button
              type="button"
              onClick={handleRejectOptional}
              className="px-3.5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-gray-700 font-bold text-xs transition-all active:scale-95 cursor-pointer text-center"
            >
              Pouze nezbytné
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="text-xs text-gray-500 hover:text-blue-600 font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer py-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{showSettings ? 'Skrýt podrobnosti' : 'Přizpůsobit nastavení'}</span>
              {showSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showSettings && (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-blue-50"
              >
                Uložit výběr
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
