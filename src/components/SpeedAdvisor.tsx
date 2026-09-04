import React, { useState } from 'react';
import { 
  Users, 
  Laptop, 
  Tv, 
  Gamepad2, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Zap, 
  ShieldCheck,
  RefreshCw,
  TrendingDown
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SpeedAdvisorProps {
  onSelectPlan?: (planName: string) => void;
}

export default function SpeedAdvisor({ onSelectPlan }: SpeedAdvisorProps) {
  // Step selections
  const [householdSize, setHouseholdSize] = useState<number>(3); // default 3-4 persons
  const [activity, setActivity] = useState<string>('streaming'); // default streaming
  const [devices, setDevices] = useState<string>('medium'); // default 4-7 devices

  // Compute recommended speed
  const calculateSpeed = () => {
    let score = 0;

    // Household size points
    if (householdSize === 1) score += 1;
    else if (householdSize === 2) score += 2;
    else if (householdSize === 3) score += 3;
    else score += 4;

    // Activity points
    if (activity === 'basic') score += 1;
    else if (activity === 'work') score += 2;
    else if (activity === 'streaming') score += 3;
    else if (activity === 'gaming') score += 4;

    // Devices points
    if (devices === 'low') score += 1;
    else if (devices === 'medium') score += 2;
    else score += 3;

    // Result recommendation based on total score (from 3 to 11)
    if (score <= 4) {
      return {
        speed: '100 Mb/s',
        name: 'Internet 100 Mb/s (Základ)',
        optivaPrice: 199,
        normalPrice: 399,
        yearlySavings: 2400,
        badge: 'Ideální pro vaši spotřebu',
        summary: 'Pro běžné surfování a HD videa naprosto dostačující. Nemá smysl platit víc, než skutečně využijete.',
        specs: ['Rychlé načítání webů a e-mailů', 'Full HD streamování bez záseků', 'Neomezená data']
      };
    } else if (score <= 6) {
      return {
        speed: '250 Mb/s',
        name: 'Internet 250 Mb/s (Běžná domácnost)',
        optivaPrice: 299,
        normalPrice: 499,
        yearlySavings: 3120,
        badge: 'Optimální poměr cena / výkon',
        summary: 'Perfektní volba pro pár nebo rodinu s home office a večerním Netflixem ve 4K.',
        specs: ['Plynulý home office & Teams hovory', 'Streamování 4K videa na 2 obrazovkách', 'Rychlé odesílání příloh']
      };
    } else if (score <= 8) {
      return {
        speed: '500 Mb/s',
        name: 'Internet 500 Mb/s (Nejoblíbenější)',
        optivaPrice: 399,
        normalPrice: 599,
        yearlySavings: 3840,
        badge: 'Doporučeno pro moderní rodinu',
        isPopular: true,
        summary: 'Všichni členové rodiny mohou být online současně bez jakéhokoliv zpomalení nebo lagů.',
        specs: ['Více 4K TV a tabletů současně', 'Nulová odezva pro online hry (PS5, PC)', 'Velká rezerva pro chytré spotřebiče']
      };
    } else {
      return {
        speed: '1 000 Mb/s (Gigabit)',
        name: 'Internet 1 000 Mb/s (Gigabit)',
        optivaPrice: 499,
        normalPrice: 799,
        yearlySavings: 4800,
        badge: 'Maximální rychlost bez kompromisů',
        summary: 'Špičková gigabitová linka pro náročné uživatele, stahování obřích souborů během vteřin a chytré domy.',
        specs: ['Okamžité stažení 50GB hry za 6 minut', 'Symetrická stabilita pro velké zálohy', 'Příprava na budoucí technologie']
      };
    }
  };

  const rec = calculateSpeed();

  const handleApply = () => {
    if (onSelectPlan) {
      onSelectPlan(rec.name);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-900/5 via-neutral-50 to-white border-y border-gray-200/80">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Interaktivní rádce rychlosti
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 font-display leading-tight">
            Jakou rychlost internetu skutečně potřebujete?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Klikněte na 3 otázky níže. Náš systém vám okamžitě doporučí ideální linku, abyste zbytečně nepřepláceli za to, co nevyužijete.
          </p>
        </div>

        {/* 3 Step Questionnaire Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls column */}
          <div className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/90 shadow-sm">
            {/* Step 1 */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                1. Kolik lidí je v domácnosti?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { value: 1, label: '1 osoba', sub: 'Single' },
                  { value: 2, label: '2 osoby', sub: 'Pár' },
                  { value: 3, label: '3–4 osoby', sub: 'Rodina' },
                  { value: 4, label: '5+ osob', sub: 'Velký dům' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setHouseholdSize(opt.value)}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center",
                      householdSize === opt.value
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20 scale-[1.02]"
                        : "bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-gray-100/80"
                    )}
                  >
                    <span className="font-extrabold text-sm">{opt.label}</span>
                    <span className={cn(
                      "text-[10px] mt-0.5",
                      householdSize === opt.value ? "text-blue-100" : "text-gray-400"
                    )}>
                      {opt.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-blue-600" />
                2. K čemu internet nejvíce využíváte?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'basic', label: 'Běžné surfování a sítě', desc: 'E-maily, zprávy, YouTube v HD' },
                  { id: 'work', label: 'Práce z domova (Home office)', desc: 'MS Teams, Zoom, přenos souborů' },
                  { id: 'streaming', label: 'Filmy a seriály v 4K', desc: 'Netflix, HBO, Disney+, chytrá TV' },
                  { id: 'gaming', label: 'Online hry a stahování', desc: 'Nízký ping, PS5, Steam, torrenty' }
                ].map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setActivity(act.id)}
                    className={cn(
                      "p-3 rounded-2xl border text-left transition-all cursor-pointer",
                      activity === act.id
                        ? "bg-blue-50 border-blue-500 text-blue-950 shadow-xs ring-2 ring-blue-500/20"
                        : "bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-gray-100/80"
                    )}
                  >
                    <div className="font-extrabold text-xs sm:text-sm flex items-center justify-between">
                      <span>{act.label}</span>
                      {activity === act.id && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                      {act.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-blue-600" />
                3. Kolik zařízení je najednou online?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'low', label: '1–3 zařízení', desc: '1 TV + 2 mobily' },
                  { id: 'medium', label: '4–7 zařízení', desc: 'TV, notebooky, mobily' },
                  { id: 'high', label: '8+ zařízení', desc: 'Chytrá domácnost' }
                ].map((dev) => (
                  <button
                    key={dev.id}
                    type="button"
                    onClick={() => setDevices(dev.id)}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center",
                      devices === dev.id
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20 scale-[1.02]"
                        : "bg-gray-50/70 border-gray-200 text-gray-700 hover:bg-gray-100/80"
                    )}
                  >
                    <span className="font-extrabold text-xs sm:text-sm">{dev.label}</span>
                    <span className={cn(
                      "text-[10px] mt-0.5",
                      devices === dev.id ? "text-blue-100" : "text-gray-400"
                    )}>
                      {dev.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result recommendation card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-blue-800/60 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Background glowing flair */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-extrabold uppercase tracking-wide">
                  {rec.badge}
                </span>
                <span className="text-xs text-blue-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Výsledek testu
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-display mb-1">
                {rec.speed}
              </h3>

              <p className="text-blue-200 text-xs sm:text-sm leading-relaxed mb-5">
                {rec.summary}
              </p>

              {/* Price comparison badge */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-5">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] text-blue-200 uppercase font-bold tracking-wider block">
                      Akční neveřejná cena Optiva
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
                      {rec.optivaPrice} Kč <span className="text-xs text-blue-200 font-normal">/ měsíčně</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-gray-400 line-through block">
                      Běžně {rec.normalPrice} Kč
                    </span>
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1 justify-end">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Ušetříte {rec.yearlySavings.toLocaleString('cs-CZ')} Kč/rok
                    </span>
                  </div>
                </div>
              </div>

              {/* Specs checklist */}
              <div className="space-y-2 mb-6">
                {rec.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-blue-100">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action */}
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm sm:text-base transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
            >
              <span>Chci ověřit tuto rychlost na adrese</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
