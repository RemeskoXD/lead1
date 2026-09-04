import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wifi, 
  Smartphone, 
  Tv, 
  Layers, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Flame, 
  TrendingDown, 
  Info,
  Sparkles,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface PlanItem {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  isPopular?: boolean;
  speeds?: string;
  features: string[];
  tmobile: {
    name: string;
    price: number;
    extraNote?: string;
  };
  o2: {
    name: string;
    price: number;
    extraNote?: string;
  };
  vodafone: {
    name: string;
    price: number;
    extraNote?: string;
  };
  optiva: {
    price: number;
    note: string;
    savingsYear: number;
  };
}

export interface CategoryData {
  id: string;
  name: string;
  icon: React.ElementType;
  formService: string;
  description: string;
  plans: PlanItem[];
}

const COMPARISON_DATA: CategoryData[] = [
  {
    id: 'internet',
    name: 'Internet na doma',
    icon: Wifi,
    formService: 'Internet',
    description: 'Porovnání pevných optických, VDSL a bezdrátových 5G internetových přípojek na doma.',
    plans: [
      {
        id: 'net-100',
        name: 'Internet 100 Mb/s (Základ)',
        subtitle: 'Spolehlivý internet pro 1–2 osoby, běžné brouzdání, e-maily, zprávy a YouTube.',
        speeds: '100 Mb/s stahování • 20–30 Mb/s odesílání',
        features: [
          'Neomezený objem přenesených dat bez limitu',
          'Vhodné pro běžné surfování a Full HD video',
          'Optická nebo stabilní kabelová/VDSL síť',
          'Zřízení s asistencí a modem za 70 Kč/měs.'
        ],
        tmobile: { name: 'Pevný internet 100', price: 399, extraNote: '+ modem 70 Kč/měs.' },
        o2: { name: 'Internet HD Základní', price: 399, extraNote: '+ modem 69 Kč/měs.' },
        vodafone: { name: 'Pevný internet 100', price: 390, extraNote: '+ modem 70 Kč/měs.' },
        optiva: {
          price: 199,
          note: 'Akční neveřejná cena (199 Kč/m + 70 Kč modem)',
          savingsYear: 2400
        }
      },
      {
        id: 'net-250',
        name: 'Internet 250 Mb/s',
        subtitle: 'Pro 1–2 člennou domácnost, běžné surfování a Full HD streamování videa.',
        speeds: '250 Mb/s stahování • 50 Mb/s odesílání',
        features: [
          'Neomezený objem přenesených dat',
          'Vhodné pro YouTube, Netflix a sociální sítě',
          'Optická nebo stabilní kabelová/VDSL síť',
          'Zřízení a aktivace s asistencí'
        ],
        tmobile: { name: 'Pevný internet 250', price: 499, extraNote: '+ modem 70 Kč/měs.' },
        o2: { name: 'Internet HD Bronzový', price: 499, extraNote: '+ modem 69 Kč/měs.' },
        vodafone: { name: 'Pevný internet 250', price: 490, extraNote: '+ modem 70 Kč/měs.' },
        optiva: {
          price: 299,
          note: 'Neveřejná partnerská sazba (+ 70 Kč modem)',
          savingsYear: 3120
        }
      },
      {
        id: 'net-500',
        name: 'Internet 500 Mb/s',
        subtitle: 'Nejžádanější rodinná rychlost – zvládne více zařízení, 4K filmy i Home Office.',
        badge: 'Nejvýhodnější volba',
        isPopular: true,
        speeds: '500 Mb/s stahování • 100–250 Mb/s odesílání',
        features: [
          'Ideální pro 3–5 členné rodiny',
          'Současné hraní online her a 4K TV bez sekání',
          'Bleskový přenos dat a nízká latence (ping)',
          'Garantovaná stabilita i ve špičkách'
        ],
        tmobile: { name: 'Pevný internet 500', price: 599, extraNote: '+ modem 60 Kč/měs.' },
        o2: { name: 'Internet HD Stříbrný', price: 649, extraNote: '+ modem 69 Kč/měs.' },
        vodafone: { name: 'Pevný internet 500', price: 590, extraNote: '+ modem 70 Kč/měs.' },
        optiva: {
          price: 399,
          note: 'Exkluzivní neveřejná cena pro Optiva klienty',
          savingsYear: 3840
        }
      },
      {
        id: 'net-1000',
        name: 'Gigabit 1 000 Mb/s',
        subtitle: 'Špičkový 1 Gb/s optický internet pro nejnáročnější uživatele a hráče her.',
        speeds: '1 000 Mb/s (1 Gb/s) • až 500 Mb/s odesílání',
        features: [
          'Maximální dostupná rychlost na trhu',
          'Okamžité stahování gigabajtových souborů',
          'Plynulý chod chytré domácnosti s desítkami prvků',
          'Prioritní technická podpora'
        ],
        tmobile: { name: 'Pevný internet 1 Gb/s', price: 749, extraNote: '+ modem 80 Kč/měs.' },
        o2: { name: 'Internet HD Zlatý', price: 799, extraNote: '+ modem 99 Kč/měs.' },
        vodafone: { name: 'Pevný internet 1 Gb/s', price: 790, extraNote: '+ modem 100 Kč/měs.' },
        optiva: {
          price: 499,
          note: 'Vyjednaná velkoobchodní / partnerská sazba',
          savingsYear: 4680
        }
      }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobilní tarify',
    icon: Smartphone,
    formService: 'Tarify',
    description: 'Srovnání mobilních paušálů s voláním a daty v moderní 5G síti po celé ČR.',
    plans: [
      {
        id: 'mob-12gb',
        name: 'Tarif 10–12 GB Data',
        subtitle: 'Perfektní pro běžné volání, chatování, sociální sítě a navigaci v autě.',
        speeds: '10–12 GB dat v plné 5G rychlosti',
        features: [
          'Neomezené volání do všech sítí v ČR',
          'Neomezené SMS do všech sítí v ČR',
          'Kompletní data platná i v rámci EU (roaming)',
          'Žádné skryté závazky na 2 roky'
        ],
        tmobile: { name: 'Next 12 GB', price: 645 },
        o2: { name: 'FREE+ Modrý 12 GB', price: 649 },
        vodafone: { name: 'Red Basic Lite 10 GB', price: 597 },
        optiva: {
          price: 349,
          note: 'Skrytý neveřejný tarif se slevou 45 %',
          savingsYear: 3600
        }
      },
      {
        id: 'mob-unlimited',
        name: 'Neomezená Data 5G',
        subtitle: 'Nejpopulárnější tarif! Surfujte bez počítání gigabajtů rychlostí 15–20 Mb/s.',
        badge: 'Bestseller',
        isPopular: true,
        speeds: 'Skutečně neomezená data • rychlost 15–20 Mb/s',
        features: [
          'Nikdy vám nedojdou mobilní data',
          'Plynulé přehrávání Full HD videí a hudby na cestách',
          'Neomezené volání a SMS po celé České republice',
          'Vysoký balík dat pro cestování v EU zdarma'
        ],
        tmobile: { name: 'Next Neomezeně 5G', price: 930 },
        o2: { name: 'NEO+ Stříbrný (20 Mb/s)', price: 949 },
        vodafone: { name: 'Super+ Neomezeně (20 Mb/s)', price: 897 },
        optiva: {
          price: 549,
          note: 'VIP partnerská sazba pro neomezená data',
          savingsYear: 4800
        }
      },
      {
        id: 'mob-max',
        name: 'Neomezená Data 5G MAX',
        subtitle: 'Absolutní svoboda bez jakéhokoliv rychlostního omezení pro náročné.',
        speeds: 'Plná maximální 5G rychlost bez limitu (až 1 000 Mb/s)',
        features: [
          'Plná dostupná rychlost 5G vysílačů',
          'Ideální jako mobilní hotspot pro notebook',
          'Neomezené volání i SMS v ČR a štědrý roaming',
          'Prémiová péče a přednostní obsluha'
        ],
        tmobile: { name: 'Next Neomezeně MAX', price: 1175 },
        o2: { name: 'NEO+ Zlatý MAX', price: 1199 },
        vodafone: { name: 'Premium 5G Neomezeně', price: 1197 },
        optiva: {
          price: 749,
          note: 'Neveřejná korporátní nabídka zpřístupněná pro vás',
          savingsYear: 5400
        }
      }
    ]
  },
  {
    id: 'tv',
    name: 'Digitální TV (IPTV)',
    icon: Tv,
    formService: 'TV',
    description: 'Internetová televize se zpětným přehráváním a aplikacemi pro televize i mobily.',
    plans: [
      {
        id: 'tv-basic',
        name: 'Základní TV balíček',
        subtitle: 'Kolem 65–80 TV stanic pro pohodové rodinné sledování v HD kvalitě s archivem.',
        speeds: '65–80 TV programů • 7 dní zpětně',
        features: [
          'Všechny české celoplošné stanice ve vysoké kvalitě',
          'Zpětné zhlédnutí pořadů až 7 dní zpět',
          'Aplikace pro Samsung, LG, Android TV, mobil i tablet',
          'Možnost pauzy a přeskakování reklam'
        ],
        tmobile: { name: 'T-Mobile TV Základ / S', price: 299 },
        o2: { name: 'O2 TV Modrá / Základ', price: 299 },
        vodafone: { name: 'Vodafone TV Základ', price: 220 },
        optiva: {
          price: 59,
          note: 'Akční IPTV nabídka od 59 Kč/měs.',
          savingsYear: 2880
        }
      },
      {
        id: 'tv-family',
        name: 'Rodinná TV (Rozšířená)',
        subtitle: 'Přes 110–140 kanálů včetně dokumentů, pohádek pro děti a filmových stanic.',
        badge: 'Oblíbené pro rodiny',
        isPopular: true,
        speeds: '110–140 TV programů • 7 dní zpětně • 4 zařízení',
        features: [
          'Dětské kanály (Disney, Minimax, Nickelodeon)',
          'Dokumenty (National Geographic, Discovery, Viasat)',
          'Filmové stanice (FilmBox, AMC, JOJ Cinema)',
          'Sledování až na 4 zařízeních současně v domácnosti'
        ],
        tmobile: { name: 'T-Mobile TV M (Rodina)', price: 549 },
        o2: { name: 'O2 TV Stříbrná', price: 549 },
        vodafone: { name: 'Vodafone TV Family / Komplet', price: 490 },
        optiva: {
          price: 329,
          note: 'Neveřejná cena s plným archivem stanic',
          savingsYear: 2640
        }
      },
      {
        id: 'tv-sport',
        name: 'Sport & Prémiové Filmy',
        subtitle: 'Kompletní Liga mistrů, Premier League, Formule 1, Extraliga ledního hokeje a HBO.',
        speeds: '140+ TV programů • Liga mistrů, F1, Premier League',
        features: [
          'Všechny prémiové sportovní kanály (Nova Sport 1–6, Premier Sport)',
          'Exkluzivní přenosy Ligy mistrů, Premier League a F1',
          'Filmové kanály HBO a přístup do filmotéky',
          'Záznam a nahrávání až na 100 hodin'
        ],
        tmobile: { name: 'T-Mobile TV L / XL', price: 749 },
        o2: { name: 'O2 TV Zlatá / Sport Max', price: 799 },
        vodafone: { name: 'Vodafone TV Allin / Sport', price: 750 },
        optiva: {
          price: 469,
          note: 'Speciální vyjednaný sportovně-filmový balíček',
          savingsYear: 3960
        }
      }
    ]
  },
  {
    id: 'bundles',
    name: 'Balíčky Vše v 1',
    icon: Layers,
    formService: 'Internet',
    description: 'Sdružení internetu, mobilního tarifu a televize na jednu fakturu s nejvyšší slevou.',
    plans: [
      {
        id: 'bundle-duo',
        name: 'Dvojkombinace: Internet 500 Mb/s + TV',
        subtitle: 'Rychlý internet a rodinná digitální televize dohromady.',
        speeds: '500 Mb/s internet + 80 TV stanic (7 dní zpětně)',
        features: [
          'Jedna přehledná platba měsíčně',
          'Vysoká stabilita pro streamování a práci',
          'Bezplatná asistence při sloučení služeb',
          'Úspora stovek korun každý měsíc oproti odděleným nákupům'
        ],
        tmobile: { name: 'Magenta 1 (Net 500 + TV S)', price: 948, extraNote: 'vč. běžných slev' },
        o2: { name: 'O2 Spolu (Net 500 + O2 TV)', price: 998, extraNote: 'vč. běžných slev' },
        vodafone: { name: 'GigaNet + Vodafone TV', price: 880, extraNote: 'vč. běžných slev' },
        optiva: {
          price: 549,
          note: 'Kombinovaný neveřejný balíček Optiva Duo',
          savingsYear: 4788
        }
      },
      {
        id: 'bundle-all',
        name: 'Vše v 1: Net 500 + Neomezený Mobil + TV',
        subtitle: 'Kompletní balík pro domácnost: stabilní optický net, neomezený mobil a TV.',
        badge: 'Maximální roční úspora',
        isPopular: true,
        speeds: '500 Mb/s optika + Neomezená 5G data + Rodinná TV',
        features: [
          'Kompletní vyřešení všech telekomunikací v rodině',
          'Reálné odstranění všech předražených ceníkových položek',
          'Žádné další skryté poplatky za modemy či aktivaci',
          'Osobní správce a vyjednavač pro celou smlouvu'
        ],
        tmobile: { name: 'Magenta 1 Komplet (3 služby)', price: 2078, extraNote: 'součet ceníkových cen' },
        o2: { name: 'O2 Spolu Komplet (3 služby)', price: 2147, extraNote: 'součet ceníkových cen' },
        vodafone: { name: 'Vodafone Komplet Trio', price: 1977, extraNote: 'součet ceníkových cen' },
        optiva: {
          price: 1190,
          note: 'Vyjednaný balíček s největší velkoodběratelskou slevou',
          savingsYear: 10644
        }
      }
    ]
  }
];

interface PriceComparatorProps {
  onSelectPlan?: (serviceType: string, planName: string, estimatedPrice?: string) => void;
  defaultViewMode?: 'cards' | 'table';
}

export default function PriceComparator({ 
  onSelectPlan, 
  defaultViewMode = 'table' 
}: PriceComparatorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('internet');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>(defaultViewMode);
  const [selectedOperatorComparison, setSelectedOperatorComparison] = useState<'all' | 'tmobile' | 'o2' | 'vodafone'>('all');

  const currentCategory = COMPARISON_DATA.find(c => c.id === activeCategory) || COMPARISON_DATA[0];

  const handleChoosePlan = (serviceType: string, planName: string, price: number) => {
    if (onSelectPlan) {
      onSelectPlan(serviceType, planName, `${price} Kč`);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="srovnavac" className="py-16 md:py-24 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header of Comparator */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <TrendingDown className="w-4 h-4 text-emerald-600" />
            Nezávislé a transparentní srovnání cen v ČR
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-950 font-display tracking-tight leading-[1.15]">
            Velké srovnání: T-Mobile vs. O2 vs. Vodafone
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 font-medium mt-4 leading-relaxed">
            Podívejte se, kolik si velcí operátoři běžně účtují na svých pultech a webech — a jaké <strong className="text-blue-900 font-bold">neveřejné ceny a slevy</strong> vám dokážeme zajistit my.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-neutral-100/90 rounded-2xl border border-gray-200/80 shadow-inner gap-1.5 max-w-full">
            {COMPARISON_DATA.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer",
                    isActive 
                      ? "bg-white text-blue-950 shadow-md scale-[1.02] border border-gray-100" 
                      : "text-gray-600 hover:text-gray-950 hover:bg-white/60"
                  )}
                >
                  <Icon className={cn("w-4 h-4 sm:w-4.5 sm:h-4.5", isActive ? "text-blue-600" : "text-gray-500")} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode & Filter Controls Sub-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-neutral-50 p-3.5 sm:p-4 rounded-2xl border border-gray-200/60">
          <div className="text-xs sm:text-sm text-gray-600 font-medium text-center sm:text-left">
            <span className="font-bold text-blue-950">{currentCategory.name}:</span> {currentCategory.description}
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="bg-white border border-gray-200 p-1 rounded-xl flex items-center shadow-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  viewMode === 'cards' 
                    ? "bg-blue-600 text-white shadow-xs" 
                    : "text-gray-600 hover:text-gray-900"
                )}
                title="Karty tarifů"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Karty</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  viewMode === 'table' 
                    ? "bg-blue-600 text-white shadow-xs" 
                    : "text-gray-600 hover:text-gray-900"
                )}
                title="Srovnávací tabulka"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Tabulka</span>
              </button>
            </div>
          </div>
        </div>

        {/* CARDS VIEW */}
        {viewMode === 'cards' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {currentCategory.plans.map((plan) => {
              // Calculate average operator price to show contrast
              const avgOperatorPrice = Math.round((plan.tmobile.price + plan.o2.price + plan.vodafone.price) / 3);
              const monthlyDiff = avgOperatorPrice - plan.optiva.price;
              const percentSaved = Math.round((monthlyDiff / avgOperatorPrice) * 100);

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "rounded-3xl border transition-all duration-300 flex flex-col justify-between relative bg-white overflow-hidden group hover:shadow-xl",
                    plan.isPopular 
                      ? "border-blue-600 shadow-lg shadow-blue-500/10 ring-2 ring-blue-600/20" 
                      : "border-gray-200/90 shadow-sm hover:border-blue-300"
                  )}
                >
                  {/* Popularity Badge */}
                  {plan.badge && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-700 text-white text-[11px] font-extrabold uppercase px-3.5 py-1 rounded-bl-xl tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      {plan.badge}
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="p-6 sm:p-7 border-b border-gray-100">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 font-display tracking-tight pr-14">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1.5 line-clamp-2">
                      {plan.subtitle}
                    </p>

                    {plan.speeds && (
                      <div className="mt-4 px-3 py-1.5 rounded-lg bg-blue-50/70 border border-blue-100/80 text-[11px] font-bold text-blue-800 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{plan.speeds}</span>
                      </div>
                    )}
                  </div>

                  {/* Operators Comparison Box */}
                  <div className="p-6 bg-neutral-50/70 border-b border-gray-100 space-y-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
                      <span>Běžné ceníkové ceny operátorů:</span>
                      <span className="text-[10px] text-gray-400 font-normal">veřejné weby</span>
                    </div>

                    {/* T-Mobile */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-200/70 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#E20074] text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                          T
                        </span>
                        <div>
                          <span className="font-bold text-gray-800">T-Mobile</span>
                          {plan.tmobile.extraNote && (
                            <span className="block text-[10px] text-gray-400 leading-none mt-0.5">{plan.tmobile.extraNote}</span>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-gray-700">{plan.tmobile.price} Kč <span className="text-[10px] font-normal text-gray-400">/ měs.</span></span>
                    </div>

                    {/* O2 */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-200/70 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#002D62] text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                          O₂
                        </span>
                        <div>
                          <span className="font-bold text-gray-800">O2</span>
                          {plan.o2.extraNote && (
                            <span className="block text-[10px] text-gray-400 leading-none mt-0.5">{plan.o2.extraNote}</span>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-gray-700">{plan.o2.price} Kč <span className="text-[10px] font-normal text-gray-400">/ měs.</span></span>
                    </div>

                    {/* Vodafone */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-200/70 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#E60000] text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                          V
                        </span>
                        <div>
                          <span className="font-bold text-gray-800">Vodafone</span>
                          {plan.vodafone.extraNote && (
                            <span className="block text-[10px] text-gray-400 leading-none mt-0.5">{plan.vodafone.extraNote}</span>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-gray-700">{plan.vodafone.price} Kč <span className="text-[10px] font-normal text-gray-400">/ měs.</span></span>
                    </div>
                  </div>

                  {/* OPTIVA HIGHLIGHT DEAL CARD */}
                  <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-emerald-50/30">
                    <div>
                      {/* Price header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[11px] uppercase tracking-wider">
                            Neveřejná cena Optiva
                          </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Ušetříte ~{percentSaved} %
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1 my-3">
                        <span className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-display">
                          od {plan.optiva.price} Kč
                        </span>
                        <span className="text-sm font-semibold text-gray-500">/ měsíc</span>
                      </div>

                      <p className="text-xs text-gray-500 mb-5 leading-relaxed font-medium">
                        {plan.optiva.note}
                      </p>

                      {/* Annual savings banner */}
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-bold flex items-center gap-2 mb-5">
                        <TrendingDown className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Roční úspora do peněženky: <strong className="text-emerald-700 underline">{plan.optiva.savingsYear.toLocaleString('cs-CZ')} Kč</strong></span>
                      </div>

                      {/* Features bullets */}
                      <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 font-medium mb-6">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3" strokeWidth={3} />
                            </div>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleChoosePlan(currentCategory.formService, plan.name, plan.optiva.price)}
                      className={cn(
                        "w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md",
                        plan.isPopular
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 active:scale-[0.98]"
                          : "bg-blue-900 hover:bg-blue-950 text-white shadow-blue-900/15 active:scale-[0.98]"
                      )}
                    >
                      <span>Chci tuto neveřejnou cenu</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DETAILED COMPARISON TABLE VIEW */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-neutral-100/80 border-b border-gray-200 text-gray-600">
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-[11px] min-w-[200px]">
                      Tarif / Rychlost
                    </th>
                    <th className="p-4 sm:p-5 font-bold text-gray-800 min-w-[130px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-sm bg-[#E20074] text-white text-[9px] font-black flex items-center justify-center">T</span>
                        <span>T-Mobile</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 font-bold text-gray-800 min-w-[130px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-sm bg-[#002D62] text-white text-[9px] font-black flex items-center justify-center">O₂</span>
                        <span>O2</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 font-bold text-gray-800 min-w-[130px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-sm bg-[#E60000] text-white text-[9px] font-black flex items-center justify-center">V</span>
                        <span>Vodafone</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 font-extrabold text-blue-950 bg-emerald-50/80 border-l border-emerald-200 min-w-[170px]">
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Neveřejná Optiva</span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-5 font-bold text-center text-gray-700 min-w-[150px]">
                      Akce
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentCategory.plans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-4 sm:p-5">
                        <div className="font-extrabold text-blue-950 text-sm sm:text-base font-display">
                          {plan.name}
                        </div>
                        <div className="text-gray-500 text-xs mt-0.5">
                          {plan.speeds || plan.subtitle}
                        </div>
                        {plan.badge && (
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                            {plan.badge}
                          </span>
                        )}
                      </td>

                      {/* T-Mobile */}
                      <td className="p-4 sm:p-5 text-gray-700">
                        <div className="font-bold text-sm">{plan.tmobile.price} Kč</div>
                        <div className="text-[10px] text-gray-400">{plan.tmobile.extraNote || 'měsíčně'}</div>
                      </td>

                      {/* O2 */}
                      <td className="p-4 sm:p-5 text-gray-700">
                        <div className="font-bold text-sm">{plan.o2.price} Kč</div>
                        <div className="text-[10px] text-gray-400">{plan.o2.extraNote || 'měsíčně'}</div>
                      </td>

                      {/* Vodafone */}
                      <td className="p-4 sm:p-5 text-gray-700">
                        <div className="font-bold text-sm">{plan.vodafone.price} Kč</div>
                        <div className="text-[10px] text-gray-400">{plan.vodafone.extraNote || 'měsíčně'}</div>
                      </td>

                      {/* Optiva Column (Highlighted) */}
                      <td className="p-4 sm:p-5 bg-emerald-50/50 border-l border-emerald-200">
                        <div className="text-base sm:text-lg font-extrabold text-emerald-800 font-display">
                          {plan.optiva.price} Kč
                        </div>
                        <div className="text-[11px] font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" />
                          Ušetříte {plan.optiva.savingsYear.toLocaleString('cs-CZ')} Kč/rok
                        </div>
                      </td>

                      {/* Action */}
                      <td className="p-4 sm:p-5 text-center">
                        <button
                          onClick={() => handleChoosePlan(currentCategory.formService, plan.name, plan.optiva.price)}
                          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                          Získat nabídku
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Disclaimer note */}
        <p className="mt-4 text-center text-xs text-gray-400 font-medium">
          * Uvedené ceny se nemusí shodovat s reálnými daty či aktuálními nabídkami poskytovatelů.
        </p>

        {/* Quick Links to Dedicated Service Subpages */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            to="/internet"
            className="p-3.5 rounded-2xl bg-white hover:bg-blue-50/80 border border-gray-200 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <Wifi className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700">Internet na doma</span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium mt-2 flex items-center gap-1 group-hover:text-blue-600">
              Od 199 Kč/m (+ 70 Kč modem) <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            to="/mobilni-tarify"
            className="p-3.5 rounded-2xl bg-white hover:bg-blue-50/80 border border-gray-200 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700">Mobilní tarify 5G</span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium mt-2 flex items-center gap-1 group-hover:text-blue-600">
              Neomezená data od 499 Kč <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            to="/televize"
            className="p-3.5 rounded-2xl bg-white hover:bg-blue-50/80 border border-gray-200 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                <Tv className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700">Digitální TV</span>
            </div>
            <span className="text-[11px] text-gray-400 font-medium mt-2 flex items-center gap-1 group-hover:text-blue-600">
              Sport & filmy od 59 Kč <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <Link
            to="/balicky"
            className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:bg-emerald-100 border border-emerald-300 transition-all flex flex-col justify-between group shadow-xs"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-extrabold text-emerald-950">Balíčky Vše v 1</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold mt-2 flex items-center gap-1">
              Úspora až 11 000 Kč <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Trust & Transparency Banner at Bottom of Comparator */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-blue-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Garantujeme bezplatné ověření dostupnosti
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Chcete zjistit přesnou nabídku pro vaši konkrétní adresu?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
              V různých městech a obcích mají operátoři a lokální poskytovatelé odlišné technologie (optika, 5G, VDSL). Náš specialista vám za 30 sekund prověří všechny dostupné možnosti.
            </p>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap cursor-pointer transform hover:scale-105 active:scale-95 flex-shrink-0"
          >
            Spočítat úsporu na mé adrese
          </button>
        </div>

        {/* Disclaimer note */}
        <div className="mt-6 text-center text-[11px] text-gray-400 leading-relaxed max-w-3xl mx-auto">
          * Uvedené ceny operátorů T-Mobile, O2 a Vodafone odpovídají standardním ceníkovým sazbám publikovaným na oficiálních webech poskytovatelů pro nové i stávající zákazníky bez individuálních retenčních nabídek. Zvýhodněné sazby Optiva reflektují neveřejné velkoobchodní tarify, partnerské akce a nabídky regionálních optických sítí.
        </div>

      </div>
    </section>
  );
}
