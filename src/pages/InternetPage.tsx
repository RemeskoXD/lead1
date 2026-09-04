import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import LocalCoverage from '../components/LocalCoverage';
import MobileQuickBar from '../components/MobileQuickBar';
import SpeedAdvisor from '../components/SpeedAdvisor';
import { 
  Wifi, 
  Check, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  Clock, 
  HelpCircle, 
  Phone,
  Server,
  Download,
  Upload,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function InternetPage() {
  const [selectedSpeed, setSelectedSpeed] = useState<string>('100');
  const [formPlan, setFormPlan] = useState<string | undefined>(undefined);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const handleAdvisorSelect = (planName: string) => {
    setFormPlan(planName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const internetFaqs = [
    {
      question: 'Jak rychle zjistíte dostupnost internetu na mé adrese?',
      answer: 'Ověření probíhá okamžitě. Náš systém je napojen na velkoobchodní databáze CETIN, T-Mobile, O2, Vodafone i více než 100 lokálních optických providerů. Do několika minut víte, jaká maximální rychlost je u vás fyzicky možná.'
    },
    {
      question: 'Kolik přesně stojí modem k internetu?',
      answer: 'K základnímu akčnímu tarifu od 199 Kč/měsíc je pronájem moderního dvoupásmového Wi-Fi modemu za 70 Kč/měsíc. Máte tak kompletní spolehlivou linku včetně hardwaru za bezkonkurenčních 269 Kč měsíčně.'
    },
    {
      question: 'Musím stávající smlouvu vypovídat sám?',
      answer: 'Ne, podle zákona o elektronických komunikacích za vás celý převod a výpověď u stávajícího operátora může bezplatně vyřídit nový poskytovatel. Nedojde k žádnému přerušení signálu ani k překryvu plateb.'
    },
    {
      question: 'Co je to neveřejná nabídka a jak ji mohu získat?',
      answer: 'Operátoři mají běžné ceníky pro veřejnost na svých prodejnách. Pro akviziční partnery jako Optiva však uvolňují neveřejné slevy a retenční nabídky, ke kterým běžný zákazník nemá přístup. Stačí vyplnit poptávku a my vám ji zajistíme.'
    }
  ];

  const speeds = [
    {
      id: '100',
      speed: '100 Mb/s (Základ)',
      badge: 'Základní připojení',
      desc: 'Ideální pro 1–2 osoby, běžné surfování, e-maily, sociální sítě a sledování YouTube v HD.',
      tmobilePrice: 399,
      o2Price: 399,
      vodafonePrice: 390,
      optivaPrice: 199,
      modemNote: '+ modem 70 Kč/měs.',
      yearlySavings: 2400,
      features: ['100 Mb/s stahování', '20–30 Mb/s nahrávání', 'Neomezená data bez FUP', 'Podpora optiky i stabilního VDSL']
    },
    {
      id: '250',
      speed: '250 Mb/s',
      badge: 'Běžná domácnost',
      desc: 'Ideální pro 1–2 osoby, běžné surfování, Netflix ve Full HD a práci z domova.',
      tmobilePrice: 499,
      o2Price: 499,
      vodafonePrice: 490,
      optivaPrice: 299,
      modemNote: '+ modem 70 Kč/měs.',
      yearlySavings: 3120,
      features: ['250 Mb/s stahování', '50 Mb/s nahrávání', 'Neomezená data', 'Podpora optiky i VDSL/5G']
    },
    {
      id: '500',
      speed: '500 Mb/s',
      badge: 'Nejoblíbenější pro rodiny',
      isPopular: true,
      desc: 'Perfektní pro 3–5 osob, online hry, stahování velkých souborů a více 4K televizí naráz.',
      tmobilePrice: 599,
      o2Price: 649,
      vodafonePrice: 590,
      optivaPrice: 399,
      modemNote: '+ modem 70 Kč/měs.',
      yearlySavings: 3840,
      features: ['500 Mb/s stahování', '100–250 Mb/s nahrávání', 'Nulový lag pro hraní her', 'Stabilita i v odpoledních špičkách']
    },
    {
      id: '1000',
      speed: '1 000 Mb/s (Gigabit)',
      badge: 'Ultra rychlost bez limitu',
      desc: 'Extrémní gigabitová rychlost pro náročné uživatele, streamery a chytré domy.',
      tmobilePrice: 749,
      o2Price: 799,
      vodafonePrice: 790,
      optivaPrice: 499,
      modemNote: '+ modem 70 Kč/měs.',
      yearlySavings: 4680,
      features: ['1 000 Mb/s (1 Gb/s) stahování', 'Až 500 Mb/s nahrávání', 'Bleskové stahování gigabajtů za vteřiny', 'Prémiová optická linka']
    }
  ];

  const currentPlan = speeds.find(s => s.id === selectedSpeed) || speeds[0];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-gray-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <SEOHead 
        title="Optický internet na doma od 199 Kč/m (+ 70 Kč modem) | Optiva"
        description="Srovnání cen optického a VDSL internetu pro vaši adresu od 199 Kč/měsíc (+ 70 Kč modem). Porovnání T-Mobile, O2, Vodafone a lokálních optických providerů v ČR s úsporou až 45 %."
        keywords="optický internet, internet na doma od 199 Kč, levný internet, CETIN, VDSL internet, srovnání poskytovatelů internetu, T-Mobile internet, O2 internet, Vodafone internet"
        breadcrumbs={[{ name: 'Internet na doma', url: '/internet' }]}
        faqs={internetFaqs}
        productPrice={{
          name: "Optický a kabelový internet na doma",
          description: "Neveřejné ceny pevného internetu od 100 Mb/s do 1 000 Mb/s (Gigabit)",
          lowPrice: 199,
          priceCurrency: "CZK"
        }}
      />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Internet na doma' }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-transparent py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wide">
              <Wifi className="w-3.5 h-3.5" />
              Pevný optický i bezdrátový internet na doma
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 font-display tracking-tight leading-[1.1]">
              Nejrychlejší internet na vaší adrese od <span className="text-blue-600 underline decoration-emerald-400">199 Kč/m</span> <span className="text-base sm:text-xl font-semibold text-gray-500 whitespace-nowrap">(+ 70 Kč modem)</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl">
              Neplaťte zbytečně 600 nebo 700 Kč za běžné ceníkové tarify. Porovnáme pro vás optické sítě <strong>T-Mobile, O2, Vodafone</strong> i <strong>více než 100 lokálních optických providerů</strong> na vašem čísle popisném.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">Až 1 000 Mb/s</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Blesková optická vlákna</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-emerald-600 font-display">Ušetříte 35–45 %</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Neveřejné partnerské ceny</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">Bez výpadků</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Garantovaná stabilita linky</div>
              </div>
            </div>
          </div>

          {/* Right Lead Form */}
          <div className="lg:col-span-5">
            <LeadForm 
              title="Ověřit nejlevnější internet" 
              subtitle="Zadejte adresu a my za 30 vteřin zjistíme dostupnost optiky a neveřejné slevy."
              defaultService="Internet"
              badge="Ověření dostupnosti zdarma"
              preselectedPlan={formPlan}
            />
          </div>

        </div>
      </section>

      {/* Speed & Operator Price Matrix */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Transparentní ceník
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-display mt-3">
              Porovnání cen internetu: T-Mobile vs. O2 vs. Vodafone vs. Optiva
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Klikněte na požadovanou rychlost a podívejte se, kolik ušetříte každý měsíc.
            </p>
          </div>

          {/* Speed Selector Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-neutral-100 rounded-2xl border border-gray-200 gap-2">
              {speeds.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSpeed(s.id)}
                  className={cn(
                    "px-4 sm:px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer",
                    selectedSpeed === s.id
                      ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {s.speed}
                </button>
              ))}
            </div>
          </div>

          {/* Current selected speed detail comparison */}
          <div className="bg-gradient-to-b from-neutral-50 to-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
                  {currentPlan.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
                  Internet {currentPlan.speed}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {currentPlan.desc}
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400 font-bold uppercase">Garantovaná roční úspora:</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-display">
                  {currentPlan.yearlySavings.toLocaleString('cs-CZ')} Kč / rok
                </div>
              </div>
            </div>

            {/* Price comparison cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
              {/* T-Mobile */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#E20074] text-white text-[10px] font-black flex items-center justify-center">T</span>
                    <span className="font-bold text-gray-800 text-sm">T-Mobile</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentPlan.tmobilePrice} Kč</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">+ modem cca 60 Kč/měs.</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Běžný veřejný ceník</div>
              </div>

              {/* O2 */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#002D62] text-white text-[10px] font-black flex items-center justify-center">O₂</span>
                    <span className="font-bold text-gray-800 text-sm">O2</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentPlan.o2Price} Kč</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">+ modem 69–99 Kč/měs.</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Běžný veřejný ceník</div>
              </div>

              {/* Vodafone */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#E60000] text-white text-[10px] font-black flex items-center justify-center">V</span>
                    <span className="font-bold text-gray-800 text-sm">Vodafone</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentPlan.vodafonePrice} Kč</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">+ modem 70–100 Kč/měs.</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Běžný veřejný ceník</div>
              </div>

              {/* OPTIVA WINNER */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 border-2 border-emerald-500 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-bl-lg">
                  Vítěz testu
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-emerald-800 font-extrabold text-sm">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Optiva cena</span>
                  </div>
                  <div className="text-3xl font-extrabold text-blue-950 font-display">od {currentPlan.optivaPrice} Kč<span className="text-xs font-semibold text-gray-500">/m</span></div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Neveřejná vyjednaná cena (+ 70 Kč modem)</div>
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-4 pt-3 border-t border-emerald-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Úspora až 40 %
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-semibold text-gray-700">
                {currentPlan.features.map((feat, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    {feat}
                  </span>
                ))}
              </div>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Chci tuto rychlost za {currentPlan.optivaPrice} Kč
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* How we connect your home */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
              Jaké technologie internetu nabízíme?
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Nezáleží na tom, zda bydlíte v paneláku v centru, rodinném domě na kraji města nebo na venkově. Vždy najdeme nejlepší dostupnou technologii.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-display">Optický internet (FTTH)</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Nejmodernější a nejstabilnější připojení s rychlostmi až 1 Gb/s a bleskovým uploadem. Ideální pro moderní rodiny, streamování a hraní her.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-display">VDSL & Kabelový internet</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Dostupný pro více než 90 % domácností v ČR přes zmodernizované telefonní a kabelové linky. Rychlosti od 100 do 500 Mb/s.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-display">5G Internet vzduchem</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Připojení přes nejnovější 5G vysílače bez nutnosti tahání kabelů. Skvělá volba pro rodinné domy, novostavby a lokality bez optiky.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Speed Advisor Wizard */}
      <SpeedAdvisor onSelectPlan={handleAdvisorSelect} />

      {/* Regional Local Coverage */}
      <LocalCoverage />

      {/* Internet FAQ Section with Schema.org Accordion */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
              Otázky k internetu
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display mt-3">
              Často kladené dotazy k pevnému internetu
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {internetFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "border rounded-2xl transition-all duration-300",
                  openFaq === idx 
                    ? "border-blue-200 bg-blue-50/20 shadow-xs" 
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 group cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-display pr-4">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-blue-50 flex items-center justify-center text-gray-500 group-hover:text-blue-600 transition-colors flex-shrink-0">
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-dotted border-gray-200/80 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
            Zjistěte přesnou rychlost a cenu pro vaši adresu
          </h3>
          <p className="text-blue-200 text-sm max-w-xl mx-auto">
            Stačí zadat váš kontakt a náš specialista vám během chvíle nezávazně sdělí, které operátory a lokální optiky máte doma k dispozici.
          </p>
          <div className="pt-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold rounded-xl text-sm sm:text-base shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              Chci nezávaznou nabídku internetu
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <MobileQuickBar />
    </div>
  );
}
