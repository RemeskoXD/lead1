import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MobileQuickBar from '../components/MobileQuickBar';
import { 
  Tv, 
  Check, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Trophy, 
  Film, 
  Clock, 
  Smartphone,
  CheckCircle2,
  Tv2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function TvPage() {
  const [selectedPack, setSelectedPack] = useState<'basic' | 'family' | 'sport'>('family');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const tvFaqs = [
    {
      question: 'Potřebuji k internetové televizi speciální set-top box?',
      answer: 'Ve většině případů vůbec ne. Pokud máte Smart TV (Samsung, LG, Philips, Sony, TCL či jakoukoliv televizi se systémem Android TV nebo Apple TV), stačí si stáhnout aplikaci operátora a přihlásit se.'
    },
    {
      question: 'Funguje televize na internetu od jiného poskytovatele?',
      answer: 'Ano! Moderní IPTV televize funguje na jakémkoliv stabilním internetovém připojení v ČR i v celé Evropské unii. Nemusíte mít internet od stejného operátora.'
    },
    {
      question: 'Jaká minimální rychlost internetu je potřeba pro HD vysílání?',
      answer: 'Pro plynulé sledování jednoho HD streamu stačí rychlost cca 7–10 Mb/s. Pokud v domácnosti běží více televizí naráz, doporučujeme internet alespoň 50–100 Mb/s.'
    },
    {
      question: 'Kde mohu sledovat Ligu mistrů, Formuli 1 a Premier League?',
      answer: 'Vyberte si náš sportovní balíček, kde získáte kompletní stanice Nova Sport 1–6, Premier Sport a Canal+ Sport za nejnižší neveřejnou cenu na trhu.'
    }
  ];

  const packs = [
    {
      id: 'basic',
      title: 'Základní TV balíček (65+ kanálů)',
      subtitle: 'Všechny české a slovenské stanice v HD kvalitě se 7denním archivem pro nenáročné.',
      tmobile: '299 Kč',
      o2: '299 Kč',
      vodafone: '220 Kč',
      optiva: '59 Kč',
      savings: 'až 2 880 Kč / rok',
      features: ['65+ televizních kanálů v HD', 'Zpětné zhlédnutí 7 dní', 'Až 2 zařízení současně', 'Aplikace pro Smart TV'],
      badge: 'Základ za super cenu od 59 Kč'
    },
    {
      id: 'family',
      title: 'Rodinná TV (110–140 stanic)',
      subtitle: 'Kompletní filmové, dokumentární, hudební a dětské stanice pro celou rodinu.',
      tmobile: '499 Kč',
      o2: '549 Kč',
      vodafone: '470 Kč',
      optiva: '349 Kč',
      savings: 'až 2 400 Kč / rok',
      isPopular: true,
      features: ['110–140 kanálů ve Full HD', 'Filmové a dokumentární prémiové stanice', 'Dětské kanály v češtině', 'Až 4 zařízení současně'],
      badge: 'Nejoblíbenější volba'
    },
    {
      id: 'sport',
      title: 'Sport & Cinema MAX (HBO + Liga mistrů)',
      subtitle: 'Pro nejnáročnější fajnšmekry: Liga mistrů, Premier League, F1, Extraliga a balík HBO.',
      tmobile: '799 Kč',
      o2: '849 Kč',
      vodafone: '770 Kč',
      optiva: '549 Kč',
      savings: 'až 3 600 Kč / rok',
      features: ['Kompletní sportovní balík (Nova Sport 1–6, Premier Sport, Canal+)', 'Formule 1, fotbalová LM a hokej', 'HBO 1, 2, 3 + Cinemax v ceně', 'Až 100 hodin nahrávek na 30 dní'],
      badge: 'Kompletní zážitek'
    }
  ];

  const currentPack = packs.find(p => p.id === selectedPack) || packs[1];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-gray-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <SEOHead 
        title="Digitální televize (IPTV) od 59 Kč/m s archivem a sportem | Optiva"
        description="Srovnání internetové televize O2 TV, T-Mobile TV, Vodafone TV a nezávislých IPTV od 59 Kč/měsíc. Až 140 stanic, 7denní archiv, Liga mistrů, F1, HBO a sledování na 4 zařízeních bez set-top boxu."
        keywords="internetová televize od 59 Kč, IPTV televize, levná televize, O2 TV srovnání, T-Mobile TV, Vodafone TV, sportovní kanály, Nova Sport, Premier Sport, Liga mistrů živě"
        breadcrumbs={[{ name: 'Digitální televize', url: '/televize' }]}
        faqs={tvFaqs}
        productPrice={{
          name: "Digitální televize přes internet (IPTV)",
          description: "Chytrá televize se zpětným zhlédnutím a prémiovými sportovními i filmovými balíčky",
          lowPrice: 59,
          priceCurrency: "CZK"
        }}
      />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Digitální televize' }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-transparent py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wide">
              <Tv className="w-3.5 h-3.5" />
              Chytrá televize přes internet (IPTV)
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 font-display tracking-tight leading-[1.1]">
              Špičková televize s archivem a sportem od <span className="text-blue-600 underline decoration-emerald-400">59 Kč/m</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl">
              Nenechte si utéct žádný zápas Ligy mistrů, Premier League ani závod F1. Získejte moderní internetovou televizi s archivem až 7 dní zpětně, kterou spustíte na Smart TV bez nutnosti drahého set-top boxu.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">7 dní archiv</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Zpětné zhlédnutí pořadů</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-emerald-600 font-display">Až 4 zařízení</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">TV, mobil, tablet i PC</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">Bez vrtání</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Funguje na libovolném netu</div>
              </div>
            </div>
          </div>

          {/* Right Lead Form */}
          <div className="lg:col-span-5">
            <LeadForm 
              title="Získat nejvýhodnější televizi" 
              subtitle="Porovnáme O2 TV, T-Mobile TV, Vodafone TV i prémiové IPTV partnery s maximální slevou."
              defaultService="TV"
              badge="Akční nabídky televizí"
            />
          </div>

        </div>
      </section>

      {/* Comparison Matrix */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Srovnání televizních balíčků
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-display mt-3">
              Kolik zaplatíte za TV balíček u operátorů vs. s Optivou?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Vyberte si úroveň programové nabídky a porovnejte rozdíl v měsíčních platbách.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-neutral-100 rounded-2xl border border-gray-200 gap-2 flex-wrap justify-center">
              {packs.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPack(p.id as any)}
                  className={cn(
                    "px-4 sm:px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer",
                    selectedPack === p.id
                      ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Container */}
          <div className="bg-gradient-to-b from-neutral-50 to-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-1">
                  {currentPack.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
                  {currentPack.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {currentPack.subtitle}
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400 font-bold uppercase">Roční úspora:</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-display">
                  {currentPack.savings}
                </div>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
              {/* T-Mobile */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#E20074] text-white text-[10px] font-black flex items-center justify-center">T</span>
                    <span className="font-bold text-gray-800 text-sm">Magenta TV</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentPack.tmobile}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Běžná ceníková cena</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Veřejný ceník</div>
              </div>

              {/* O2 */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#002D62] text-white text-[10px] font-black flex items-center justify-center">O₂</span>
                    <span className="font-bold text-gray-800 text-sm">O2 TV</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentPack.o2}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Běžná ceníková cena</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Veřejný ceník</div>
              </div>

              {/* Vodafone */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#E60000] text-white text-[10px] font-black flex items-center justify-center">V</span>
                    <span className="font-bold text-gray-800 text-sm">Vodafone TV</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentPack.vodafone}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Běžná ceníková cena</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Veřejný ceník</div>
              </div>

              {/* Optiva Winner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 border-2 border-emerald-500 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-bl-lg">
                  Neveřejná cena
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-emerald-800 font-extrabold text-sm">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Optiva sazba</span>
                  </div>
                  <div className="text-3xl font-extrabold text-blue-950 font-display">od {currentPack.optiva}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Partnerská množstevní sleva</div>
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-4 pt-3 border-t border-emerald-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Ušetříte {currentPack.savings}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-semibold text-gray-700">
                {currentPack.features.map((feat, i) => (
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
                Chci tuto televizi za {currentPack.optiva}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Top TV Features Highlights */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-blue-950 mb-2 font-display">Živý sport bez kompromisů</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Liga mistrů UEFA, anglická Premier League, německá Bundesliga, hokejová Tipsport extraliga i Formule 1 živě v plném HD rozlišení.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold mb-4">
              <Film className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-blue-950 mb-2 font-display">Filmové pecky & HBO Max</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Stovky premiér měsíčně bez reklam. Stanice HBO 1–3, Cinemax, FilmBox i bohatá videotéka se stovkami filmů pro celou rodinu.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
              <Tv2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-blue-950 mb-2 font-display">Aplikace pro každou chytrou TV</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Žádné nevzhledné krabičky a další ovladač na stole. Aplikaci si jednoduše stáhnete přímo do televizí Samsung, LG, Android TV nebo Apple TV.
            </p>
          </div>
        </div>
      </section>

      {/* TV FAQ Section with Schema.org Accordion */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
              Otázky k televizi
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display mt-3">
              Často kladené dotazy k internetové televizi
            </h3>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {tvFaqs.map((faq, idx) => (
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

      <Footer />
      <MobileQuickBar />
    </div>
  );
}
