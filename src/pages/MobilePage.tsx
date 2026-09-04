import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MobileQuickBar from '../components/MobileQuickBar';
import { 
  Smartphone, 
  Check, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  Clock, 
  Phone,
  Signal,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function MobilePage() {
  const [selectedCategory, setSelectedCategory] = useState<'unlimited' | 'moderate' | 'max'>('unlimited');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const mobileFaqs = [
    {
      question: 'Zůstane mi moje stávající telefonní číslo?',
      answer: 'Ano, 100% vám zůstává vaše stávající telefonní číslo. Přenos čísla probíhá přes zákonný OKU kód, je zcela zdarma a trvá obvykle jen 2 až 3 pracovní dny bez jakéhokoliv výpadku spojení.'
    },
    {
      question: 'Budu platit nějakou pokutu za odchod od stávajícího operátora?',
      answer: 'Ne. Od novely zákona o elektronických komunikacích jsou veškeré sankce za odchod spotřebitelů i živnostníků zakázány. Od operátora můžete odejít kdykoliv bez pokut.'
    },
    {
      question: 'Mohu využít virtuální eSIM místo plastové SIM karty?',
      answer: 'Ano! Všichni naši operátorští partneři podporují okamžitou aktivaci přes QR kód (eSIM) do několika minut bez nutnosti čekat na doručení poštou.'
    },
    {
      question: 'Funguje 5G síť a data i v zahraničí po Evropské unii?',
      answer: 'Ano. Všechny tarify zahrnují plný EU Roaming (volání, SMS a velký datový balíček podle regulace) bez dalších příplatků, jako byste volali a datovali doma v ČR.'
    }
  ];

  const tariffCategories = [
    {
      id: 'moderate',
      title: 'Běžný uživatel (10–12 GB)',
      subtitle: 'Pro každodenní WhatsApp, navigaci v autě, sociální sítě a hudbu na cestách.',
      tmobile: '499 Kč',
      o2: '549 Kč',
      vodafone: '517 Kč',
      optiva: '349 Kč',
      savings: 'až 2 400 Kč / rok',
      features: ['Neomezené volání a SMS v ČR', '10 až 12 GB plnou 5G rychlostí', 'Roaming v celé EU v ceně', 'Bez závazku'],
      badge: 'Skvělý poměr cena/výkon'
    },
    {
      id: 'unlimited',
      title: 'Neomezená data 5G (Nejoblíbenější)',
      subtitle: 'Nikdy neřešte datové balíčky ani FUP. Pro streamování videí, podcasty a práci odkudkoli.',
      tmobile: '725 Kč',
      o2: '749 Kč',
      vodafone: '697 Kč',
      optiva: '499 Kč',
      savings: 'až 3 000 Kč / rok',
      isPopular: true,
      features: ['100% neomezený objem dat', 'Neomezené volání i SMS všem', 'Vysokorychlostní 5G síť', 'EU roaming s desítkami GB'],
      badge: 'Bestseller'
    },
    {
      id: 'max',
      title: 'Neomezená data MAX (Bez limitu)',
      subtitle: 'Maximální dostupná rychlost 5G bez jakéhokoliv stropu pro náročné profíky a hotspoty.',
      tmobile: '1 050 Kč',
      o2: '1 099 Kč',
      vodafone: '997 Kč',
      optiva: '649 Kč',
      savings: 'až 5 400 Kč / rok',
      features: ['Rychlost 5G bez omezení (až 1 000 Mb/s)', 'Neomezené volání, SMS a MMS', 'Mezinárodní minuty v balíčku', 'Bezplatná výměna za eSIM'],
      badge: 'Pro maximální výkon'
    }
  ];

  const currentCategory = tariffCategories.find(c => c.id === selectedCategory) || tariffCategories[1];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-gray-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <SEOHead 
        title="Neomezené mobilní tarify 5G od 199 Kč/m | Optiva srovnávač"
        description="Nezávislé srovnání neomezených mobilních tarifů v ČR s 5G sítěmi T-Mobile, O2 a Vodafone. Přenos čísla zdarma, bez závazku, s úsporou až 5 400 Kč ročně."
        keywords="mobilní tarify od 199 Kč, neomezená data, 5G tarify, levný tarif, srovnání tarifů T-Mobile O2 Vodafone, přenos čísla bez výpadku, eSIM ČR"
        breadcrumbs={[{ name: 'Mobilní tarify', url: '/mobilni-tarify' }]}
        faqs={mobileFaqs}
        productPrice={{
          name: "Neomezené mobilní tarify 5G",
          description: "Mobilní paušály s neomezeným voláním, SMS a 5G daty od 199 Kč",
          lowPrice: 199,
          priceCurrency: "CZK"
        }}
      />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Mobilní tarify' }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-transparent py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wide">
              <Smartphone className="w-3.5 h-3.5" />
              Srovnání mobilních tarifů v ČR
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 font-display tracking-tight leading-[1.1]">
              Neomezený tarif s 5G daty již od <span className="text-blue-600 underline decoration-emerald-400">499 Kč</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl">
              Platíte svému operátorovi za paušál 700, 800 nebo dokonce přes 1 000 Kč měsíčně? Získejte stejnou kvalitu sítě, ale s neveřejnou partnerskou slevou až 50 %. Číslo vám zůstane a převod proběhne do 3 dnů.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">Ponechání čísla</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Převod za 3 dny zdarma</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-emerald-600 font-display">Sleva až 45 %</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Neveřejné firemní podmínky</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">Bez sankcí</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Zákonná ochrana spotřebitele</div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-5">
            <LeadForm 
              title="Získat levnější mobilní tarif" 
              subtitle="Porovnáme tarify T-Mobile, O2 i Vodafone a vybereme nejvýhodnější neveřejnou nabídku."
              defaultService="Tarify"
              badge="Nezávazné srovnání tarifů"
            />
          </div>

        </div>
      </section>

      {/* Operator Comparison Matrix */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Srovnání na trhu
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-display mt-3">
              Kolik stojí stejný tarif u operátorů vs. s Optivou?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Vyberte si typ tarifu a porovnejte veřejný ceník s naší neveřejnou sazbou.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-neutral-100 rounded-2xl border border-gray-200 gap-2 flex-wrap justify-center">
              {tariffCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={cn(
                    "px-4 sm:px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer",
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Container */}
          <div className="bg-gradient-to-b from-neutral-50 to-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-1">
                  {currentCategory.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
                  {currentCategory.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {currentCategory.subtitle}
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400 font-bold uppercase">Roční úspora:</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-display">
                  {currentCategory.savings}
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
                    <span className="font-bold text-gray-800 text-sm">T-Mobile</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentCategory.tmobile}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Veřejný ceník pro 1 SIM</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Běžná cena</div>
              </div>

              {/* O2 */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#002D62] text-white text-[10px] font-black flex items-center justify-center">O₂</span>
                    <span className="font-bold text-gray-800 text-sm">O2 NEO</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentCategory.o2}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Veřejný ceník pro 1 SIM</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Běžná cena</div>
              </div>

              {/* Vodafone */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#E60000] text-white text-[10px] font-black flex items-center justify-center">V</span>
                    <span className="font-bold text-gray-800 text-sm">Vodafone Super</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentCategory.vodafone}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Veřejný ceník pro 1 SIM</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Běžná cena</div>
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
                  <div className="text-3xl font-extrabold text-blue-950 font-display">od {currentCategory.optiva}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Exkluzivní partnerská sleva</div>
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-4 pt-3 border-t border-emerald-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Ušetříte {currentCategory.savings}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-semibold text-gray-700">
                {currentCategory.features.map((feat, i) => (
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
                Chci tento tarif za {currentCategory.optiva}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Number Porting Guarantee */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                100% bezstarostný přenos čísla
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
                Vaše telefonní číslo vám samozřejmě zůstává
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mnoho lidí platí předražené účty ze strachu, že přijdou o své číslo nebo že přechod bude složitý. S námi je to hračka:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  Přenos čísla je ze zákona 100% zdarma.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  Vše proběhne během 3 pracovních dnů bez výpadku signálu.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  Podpora moderní eSIM i klasické plastové SIM karty.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-6 sm:p-8 rounded-2xl space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-800 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-bold text-sm">Žádné pokuty ani sankce</div>
                  <div className="text-xs text-blue-300">Zákon o elektronických komunikacích</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Podle novely zákona může každý zákazník odejít od stávajícího operátora kdykoli a zcela bez sankce. Pomůžeme vám vystavit OKU kód za pár minut.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md"
              >
                Chci nezávazně spočítat úsporu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile FAQ Section with Schema.org Accordion */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
              Otázky k tarifům
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display mt-3">
              Často kladené dotazy k mobilním tarifům
            </h3>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {mobileFaqs.map((faq, idx) => (
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
