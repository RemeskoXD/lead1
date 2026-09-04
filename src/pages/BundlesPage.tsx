import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MobileQuickBar from '../components/MobileQuickBar';
import { 
  Layers, 
  Check, 
  Sparkles, 
  ArrowRight, 
  TrendingDown, 
  Wifi, 
  Smartphone, 
  Tv, 
  PiggyBank, 
  Receipt,
  CheckCircle2,
  ShieldAlert,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function BundlesPage() {
  const [selectedBundle, setSelectedBundle] = useState<'duo' | 'trio_standard' | 'trio_premium'>('trio_standard');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const bundleFaqs = [
    {
      question: 'Jak je možné, že je balíček služeb o tolik levnější?',
      answer: 'Operátoři chtějí mít od zákazníka všechny služby najednou. Pokud spojíte internet, mobil a televizi do jedné smlouvy, uplatňují se maximální neveřejné množstevní slevy (až 45 % oproti nákupu jednotlivých služeb zvlášť).'
    },
    {
      question: 'Co když mi končí smlouva na internet a mobil v jinou dobu?',
      answer: 'To vůbec nevadí. Služby do balíčku zapojíme postupně tak, abyste nikde neplatili nic navíc. Vše za vás pohlídáme a naplánujeme bez výpadků.'
    },
    {
      question: 'Budu mít opravdu jen jednu jedinou fakturu?',
      answer: 'Ano. Místo 2–3 různých složenek nebo inkas budete měsíčně platit pouze jednu přehlednou souhrnnou částku a na zákaznické lince budete řešit vše s jedním operátorem.'
    }
  ];

  const bundles = [
    {
      id: 'duo',
      name: 'Duo Balíček (Internet + Mobil)',
      subtitle: 'Rychlý internet na doma + Neomezený mobilní tarif s 5G.',
      badge: 'Základní kombinace',
      tmobile: '1 224 Kč',
      o2: '1 248 Kč',
      vodafone: '1 187 Kč',
      optiva: '749 Kč',
      savingsMonthly: 475,
      savingsYearly: 5700,
      items: [
        { icon: Wifi, text: 'Optický / VDSL Internet 250 Mb/s' },
        { icon: Smartphone, text: 'Neomezený mobilní tarif s 5G daty' },
        { icon: Receipt, text: 'Jedna společná přehledná faktura' },
      ]
    },
    {
      id: 'trio_standard',
      name: 'Trio Vše v 1 (Internet + Mobil + TV)',
      subtitle: 'Kompletní domácnost: Bleskový internet 500 Mb/s + Neomezený tarif + Rodinná TV.',
      badge: 'Nejvýhodnější volba',
      isPopular: true,
      tmobile: '1 723 Kč',
      o2: '1 797 Kč',
      vodafone: '1 657 Kč',
      optiva: '990 Kč',
      savingsMonthly: 750,
      savingsYearly: 9000,
      items: [
        { icon: Wifi, text: 'Optický / VDSL Internet 500 Mb/s' },
        { icon: Smartphone, text: 'Neomezený mobilní tarif 5G s voláním' },
        { icon: Tv, text: 'Chytrá televize se 110+ kanály a 7denním archivem' },
        { icon: Flame, text: 'Bonus: O 45 % nižší cena než při koupi zvlášť' },
      ]
    },
    {
      id: 'trio_premium',
      name: 'Trio MAX VIP (Gigabit + Max data + Sport TV)',
      subtitle: 'Maximální výbava bez kompromisů: 1 000 Mb/s optika + Neomezená data MAX + Liga mistrů.',
      badge: 'Maximální luxus',
      tmobile: '2 598 Kč',
      o2: '2 747 Kč',
      vodafone: '2 557 Kč',
      optiva: '1 490 Kč',
      savingsMonthly: 1150,
      savingsYearly: 13800,
      items: [
        { icon: Wifi, text: 'Gigabitový internet 1 000 Mb/s (1 Gb/s)' },
        { icon: Smartphone, text: 'Neomezená data MAX plnou 5G rychlostí' },
        { icon: Tv, text: 'Sport & Cinema MAX (Nova Sport 1–6, Premier Sport, HBO)' },
        { icon: Sparkles, text: 'VIP osobní operátor na telefonu' },
      ]
    }
  ];

  const currentBundle = bundles.find(b => b.id === selectedBundle) || bundles[1];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-gray-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <SEOHead 
        title="Balíčky Vše v 1 – Sloučení internetu, TV a tarifu | Úspora až 11 000 Kč"
        description="Sloučením internetu na doma, mobilních tarifů a digitální televize do jednoho balíčku ušetříte až 11 000 Kč ročně. Jedna přehledná faktura, maximální množstevní sleva a převod bez starostí."
        keywords="balíčky internet tv mobil, vše v jednom, telekomunikační balíček, úspora za internet a televizi, sloučení služeb O2 T-Mobile Vodafone, sleva na balíček"
        breadcrumbs={[{ name: 'Kombinované balíčky', url: '/balicky' }]}
        faqs={bundleFaqs}
        productPrice={{
          name: "Kombinované balíčky Vše v 1 (Internet + TV + Mobil)",
          description: "Sloučené telekomunikační balíčky s maximální množstevní slevou",
          lowPrice: 749,
          priceCurrency: "CZK"
        }}
      />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Kombinované balíčky' }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-transparent py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wide">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              Maximální úspora: Balíčky Vše v 1
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 font-display tracking-tight leading-[1.1]">
              Sloučením služeb ušetříte až <span className="text-emerald-600 underline decoration-blue-400">11 000 Kč ročně</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl">
              Platíte zvlášť internet, zvlášť mobilní tarif a zvlášť televizi u různých poskytovatelů? Spojením do jednoho balíčku získáte obrovskou množstevní slevu, jednu jedinou fakturu a konec chaosu v platbách.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-emerald-600 font-display">Až 45 % sleva</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Oproti nákupu po částech</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">1 faktura</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Konec 3 různých účtů</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">Plynulý převod</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Vše vyřídíme za vás</div>
              </div>
            </div>
          </div>

          {/* Right Lead Form */}
          <div className="lg:col-span-5">
            <LeadForm 
              title="Chci spočítat balíček Vše v 1" 
              subtitle="Zadejte kontakt a my vám sestavíme nejvýhodnější balíček na míru s maximální slevou."
              defaultService="Tarify"
              badge="Akční nabídka balíčků"
            />
          </div>

        </div>
      </section>

      {/* Interactive Bundles Comparison */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Srovnání balíčků
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-display mt-3">
              Kolik ušetříte se sloučeným balíčkem?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Prozkoumejte naše 3 nejoblíbenější kombinace a spočítejte si okamžitý rozdíl v rozpočtu.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-neutral-100 rounded-2xl border border-gray-200 gap-2 flex-wrap justify-center">
              {bundles.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBundle(b.id as any)}
                  className={cn(
                    "px-4 sm:px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cursor-pointer",
                    selectedBundle === b.id
                      ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bundle card container */}
          <div className="bg-gradient-to-b from-neutral-50 to-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-1">
                  {currentBundle.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
                  {currentBundle.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {currentBundle.subtitle}
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400 font-bold uppercase">Čistá roční úspora:</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-display">
                  {currentBundle.savingsYearly.toLocaleString('cs-CZ')} Kč / rok
                </div>
              </div>
            </div>

            {/* Included components in the bundle */}
            <div className="my-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {currentBundle.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3.5 bg-white rounded-2xl border border-gray-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 leading-snug">{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Price comparisons */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#E20074] text-white text-[10px] font-black flex items-center justify-center">T</span>
                    <span className="font-bold text-gray-800 text-sm">T-Mobile Magenta</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentBundle.tmobile}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Běžný ceník balíčku</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Veřejná nabídka</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#002D62] text-white text-[10px] font-black flex items-center justify-center">O₂</span>
                    <span className="font-bold text-gray-800 text-sm">O2 Spolu</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentBundle.o2}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Běžný ceník balíčku</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Veřejná nabídka</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded bg-[#E60000] text-white text-[10px] font-black flex items-center justify-center">V</span>
                    <span className="font-bold text-gray-800 text-sm">Vodafone Karta</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-700 font-display">{currentBundle.vodafone}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Běžný ceník balíčku</div>
                </div>
                <div className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">Veřejná nabídka</div>
              </div>

              {/* Optiva Winner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 border-2 border-emerald-500 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-bl-lg">
                  Top nabídka
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-emerald-800 font-extrabold text-sm">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Optiva Balíček</span>
                  </div>
                  <div className="text-3xl font-extrabold text-blue-950 font-display">od {currentBundle.optiva}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Sloučená neveřejná cena</div>
                </div>
                <div className="text-xs font-bold text-emerald-800 mt-4 pt-3 border-t border-emerald-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Ušetříte {currentBundle.savingsYearly.toLocaleString('cs-CZ')} Kč ročně
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Chci nezávazně poptat {currentBundle.name}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Why bundle with Optiva */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
              Proč je sloučení služeb s Optivou nejvýhodnější?
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Zajistíme, aby celý přechod proběhl hladce bez papírování a bez jediného dne bez signálu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
                <PiggyBank className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-blue-950 mb-1 font-display">Až 11 000 Kč v kapse</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Peníze, které byste jinak posílali velkým korporacím na předražených účtech, zůstanou ve vašem rodinném rozpočtu.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3">
                <Receipt className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-blue-950 mb-1 font-display">Jediná platba měsíčně</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Už žádné hlídání 3 různých termínů splatnosti a dohadování se s několika různými call centry.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-blue-950 mb-1 font-display">Výpovědi zařídíme my</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Nemusíte nikam chodit ani stát fronty na pobočkách. Převedeme vaše čísla i internet podle zákona zdarma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle FAQ Section with Schema.org Accordion */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full">
              Otázky k balíčkům
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display mt-3">
              Často kladené dotazy ke sloučení služeb
            </h3>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {bundleFaqs.map((faq, idx) => (
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
