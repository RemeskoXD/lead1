import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Search, ShieldCheck, Users, Phone, PiggyBank, ArrowRight, Clock, Sparkles, ChevronDown, ChevronUp, Star, HelpCircle, TrendingDown } from 'lucide-react';
import { cn } from '../lib/utils';
import PriceComparator from '../components/PriceComparator';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import LocalCoverage from '../components/LocalCoverage';
import MobileQuickBar from '../components/MobileQuickBar';

export default function Landing() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [services, setServices] = useState<string[]>(['Internet']);
  const [currentPrice, setCurrentPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calcMonthly, setCalcMonthly] = useState<number>(1500);
  const [selectedPlanInfo, setSelectedPlanInfo] = useState<{ planName: string; estimatedPrice: string } | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const toggleService = (id: string) => {
    setServices(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const handleSelectPlanFromComparator = (serviceType: string, planName: string, estimatedPrice?: string) => {
    setServices([serviceType]);
    setSelectedPlanInfo({ planName, estimatedPrice: estimatedPrice || '' });
    
    const formEl = document.getElementById('kalkulace-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    if (services.length === 0) {
      alert('Vyberte prosím alespoň jednu službu.');
      return;
    }

    setLoading(true);
    try {
      const servicesString = selectedPlanInfo 
        ? `${services.join(', ')} [Vybráno ze srovnávače: ${selectedPlanInfo.planName} (${selectedPlanInfo.estimatedPrice})]`
        : services.join(', ');

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, services: servicesString, currentPrice }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Něco se pokazilo. Zkuste to prosím znovu.');
      }
    } catch (err) {
      alert('Chyba připojení k serveru.');
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: 'Je porovnání opravdu zcela zdarma a nezávazné?',
      a: 'Ano, naše služba je pro vás 100 % zdarma a k ničemu vás nezavazuje. Naším cílem je najít vám nejvýhodnější nabídku. Pokud se vám žádná nebude líbit, nic neplatíte a nic se nemění.'
    },
    {
      q: 'Jak je možné, že nabízíte nižší ceny než samotní operátoři?',
      a: 'Operátoři mají běžné ceníky pro veřejnost, ale pro partnery jako jsme my poskytují exkluzivní neveřejné nabídky a množstevní slevy. Díky tomu máme přístup k tarifům, které sami na internetu nebo pobočce neseženete.'
    },
    {
      q: 'Musím sám obíhat staré smlouvy a rušit současného operátora?',
      a: 'Všechny těžké kroky vyřídíme za vás. Postaráme se o hladký převod služeb, případnou výpověď u stávajícího operátora a dohlédneme na to, abyste nezůstali ani jediný den bez připojení.'
    },
    {
      q: 'Kdo mi s výběrem pomůže? Budu mluvit s robotem?',
      a: 'Rozhodně ne. Spojí se s vámi náš zkušený lidský specialista, který s vámi ochotně projde vaše stávající nastavení a najde nejlepší řešení na míru vašim reálným potřebám.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-gray-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <SEOHead 
        title="Optiva - Srovnávač internetu od 199 Kč, TV od 59 Kč a 5G tarifů"
        description="Nezávislý srovnávač operátorů v ČR. Ušetřete v průměru 3 140 Kč ročně na pevném optickém internetu, mobilních tarifech a digitální TV s neveřejnými slevami."
        keywords="srovnávač internetu, levný internet od 199 Kč, televize od 59 Kč, srovnání tarifů, T-Mobile, O2, Vodafone, optický internet, neomezená data, úspora za internet"
        faqs={faqs.map(f => ({ question: f.q, answer: f.a }))}
        productPrice={{
          name: "Srovnání a zprostředkování telekomunikačních služeb",
          description: "Neveřejné slevy a partnerské nabídky na internet, TV a mobilní tarify v ČR",
          lowPrice: 59,
          priceCurrency: "CZK"
        }}
      />
      <Navbar />

      {/* Hero Section Container */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-transparent py-12 md:py-20 lg:py-24">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-emerald-200/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <main className="max-w-6xl mx-auto px-4 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & Social proof checklists */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Doporučeno 98 % klientů
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 font-display leading-[1.1] tracking-tight">
              Platíte za internet a tarify zbytečně moc?
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
              Nemusíte složitě vyjednávat s operátory. Srovnáme stovky nabídek a <span className="text-blue-700 font-bold underline decoration-blue-300 decoration-wavy">vyjednáme pro vás neveřejné slevy</span>, které běžně na pobočce ani jinde na webu nezískáte.
            </p>
            
            <div className="flex flex-col-reverse sm:flex-row items-center sm:items-end justify-between gap-6 sm:gap-8 pt-4 sm:pt-6 border-t border-gray-100">
              <ul className="space-y-4 text-base sm:text-lg text-gray-700 font-medium w-full sm:w-auto">
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span>Ušetříme vám v průměru <strong className="text-blue-900 font-bold">až 3 000 Kč ročně</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span>Zabere to <strong className="text-blue-900 font-bold">pouhých 30 sekund</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span>Spolupracujeme se všemi předními operátory</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span>Naše analýza je <strong className="text-emerald-700 font-bold">100% zdarma a nezávazná</strong></span>
                </li>
              </ul>
              
              <div className="flex flex-col items-center text-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm max-w-[200px] flex-shrink-0 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Poradce
                </div>
                <img 
                  src="https://web2.itnahodinu.cz/lead/sova.webp" 
                  alt="Moudrá sova Optiva" 
                  className="w-24 h-auto object-contain mb-2 hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                  "Srovnáme skryté slevy i lokální poskytovatele z okolí."
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium High-Converting Form Card */}
          <div className="lg:col-span-5 relative">
            {/* Absolute Trust Badge above input */}
            <div className="absolute -top-4 left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-20 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              Zabezpečené spojení (SSL)
            </div>
            
            {/* Soft decorative glow backdrops */}
            <div className="absolute -inset-2.5 bg-blue-100/30 rounded-[2.5rem] transform rotate-1 -z-10 blur-sm"></div>
            <div className="absolute -inset-1.5 bg-blue-600/5 rounded-[2.5rem] transform -rotate-1 -z-10"></div>
            
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100/80 relative z-10">
              {submitted ? (
                <div className="text-center py-10 space-y-5 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-emerald-100/40">
                    <Check className="w-10 h-10" strokeWidth={3} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">Děkujeme!</h2>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Vaše poptávka byla úspěšně odeslána. Náš specialista již začíná vyhledávat slevy. Ozveme se vám zpět v nejbližší době.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-blue-600 font-bold hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                  >
                    Odeslat další poptávku
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form id="kalkulace-form" onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 font-display leading-tight">
                      Spočítejte své úspory
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
                      Zadejte základní údaje a my se pustíme do práce.
                    </p>
                  </div>

                  {selectedPlanInfo && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Vybráno ze srovnávače: <strong className="font-bold">{selectedPlanInfo.planName}</strong> {selectedPlanInfo.estimatedPrice && `(${selectedPlanInfo.estimatedPrice}/měs.)`}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedPlanInfo(null)}
                        className="text-gray-400 hover:text-gray-700 text-[11px] underline ml-2 cursor-pointer"
                      >
                        Zrušit
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Current Price */}
                    <div>
                      <label htmlFor="currentPrice" className="block text-sm font-bold text-gray-800 mb-1.5 flex justify-between items-center">
                        <span>Kolik platíte měsíčně? (Orientačně)</span>
                        <span className="text-xs text-gray-400 font-normal">Volitelné</span>
                      </label>
                      <div className="relative">
                        <input
                          id="currentPrice"
                          type="text"
                          value={currentPrice}
                          onChange={(e) => setCurrentPrice(e.target.value)}
                          placeholder="Např. 650 Kč"
                          className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-gray-300/70 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <span className="block text-sm font-bold text-gray-800 mb-2">
                        O které služby máte zájem?
                      </span>
                      <div className="bg-neutral-100 p-1.5 rounded-xl grid grid-cols-3 gap-1 shadow-inner">
                        {[
                          { id: 'Internet', label: 'Internet', price: 'od 199 Kč/m' },
                          { id: 'TV', label: 'Televize', price: 'od 59 Kč' },
                          { id: 'Tarify', label: 'Tarify', price: 'od 199 Kč/m' }
                        ].map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => toggleService(type.id)}
                            className={cn(
                              "relative py-2.5 px-1 rounded-lg transition-all flex flex-col items-center justify-center gap-0.5",
                              services.includes(type.id) 
                                ? "bg-white text-blue-900 shadow-md font-bold scale-[1.03]" 
                                : "text-gray-600 hover:text-gray-900 hover:bg-white/50 text-xs sm:text-sm"
                            )}
                          >
                            <span className="font-bold text-xs sm:text-sm tracking-tight">{type.label}</span>
                            <span className={cn(
                              "text-[10px] leading-none",
                              services.includes(type.id) ? "text-blue-600 font-semibold" : "text-gray-400"
                            )}>{type.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-1.5">
                        Vaše jméno a příjmení
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Např. Jan Novák"
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-gray-300/70 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-1.5">
                        E-mail (pro zaslání potvrzení)
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="novak@seznam.cz"
                        className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-gray-300/70 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-800 mb-1.5">
                        Mobilní telefon
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+420 777 123 456"
                          className="w-full px-4 py-3 bg-neutral-50 rounded-xl border border-gray-300/70 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 font-medium placeholder:text-gray-400 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg shadow-lg shadow-blue-500/20 transform transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? 'Vyhledávám...' : 'Srovnat nabídky a ušetřit'}
                    <ArrowRight className="w-5 h-5 flex-shrink-0" />
                  </button>
                  
                  <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                    Kliknutím na tlačítko souhlasíte se <Link to="/ochrana-osobnich-udaju" target="_blank" className="underline hover:text-gray-600 transition-colors">zpracováním osobních údajů</Link> pro nezávazné vyhodnocení.
                  </p>
                </form>
              )}
            </div>
          </div>
        </main>
      </section>

      {/* Modern Live Stats Banner */}
      <section className="bg-white py-8 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-gray-100">
            <div className="p-4">
              <div className="text-2xl sm:text-3.5xl font-extrabold text-blue-900 font-display">12 430+</div>
              <div className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Ušetřených zákazníků</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3.5xl font-extrabold text-emerald-600 font-display">3 140 Kč</div>
              <div className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Průměrná roční úspora</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3.5xl font-extrabold text-blue-900 font-display">164+</div>
              <div className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Poskytovatelů v porovnání</div>
            </div>
            <div className="p-4">
              <div className="text-2xl sm:text-3.5xl font-extrabold text-blue-900 font-display">ZDARMA</div>
              <div className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Služba pro klienta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultimátní Srovnávač Operátorů (T-Mobile vs. O2 vs. Vodafone vs. Optiva) */}
      <PriceComparator onSelectPlan={handleSelectPlanFromComparator} />

      {/* Visual Guide: Jak to funguje */}
      <section className="py-16 md:py-24 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full mb-3">Maximálně jednoduchý postup</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 font-display">Jak to u nás funguje?</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mt-4">
              Vyřídíme celý proces od začátku až do konce za vás. Bez papírování, bez stresu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative z-10">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  1
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3 font-display">Vyplníte formulář</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Zadáte své jméno, telefon a orientační představu. Na základě toho začneme okamžitě prohledávat databázi zohledňující nabídky pro vaši adresu.
                </p>
              </div>
              <div className="pt-6 text-xs text-blue-600 font-bold flex items-center gap-1">
                Zabere to jen 30 sekund <Clock className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  2
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3 font-display">Porovnáme a doporučíme</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Náš specialista prověří všechny velké operátory i spolehlivé lokální poskytovatele ve vaší lokalitě. Vybere ty s nejvyšším hodnocením a nejnižší cenou.
                </p>
              </div>
              <div className="pt-6 text-xs text-emerald-600 font-bold flex items-center gap-1">
                Garantujeme neveřejné slevy <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  3
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3 font-display">Začínáte šetřit</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Pokud se rozhodnete pro některou slevovou nabídku, postaráme se o kompletní vyřízení. Nebojte, nemusíte nic podepisovat pod nátlakem.
                </p>
              </div>
              <div className="pt-6 text-xs text-blue-600 font-bold flex items-center gap-1">
                Vybereme nejlepší řešení <PiggyBank className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outstanding comparison Pitch Box: Traditional vs Optiva */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 rounded-[2.5rem] shadow-2xl p-8 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold bg-blue-800 text-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  Srovnání výhodnosti
                </span>
                <h2 className="text-3xl md:text-4.5xl font-extrabold font-display leading-[1.1] tracking-tight">
                  Proč si vybrat srovnání právě s námi?
                </h2>
                <p className="text-blue-200 leading-relaxed text-sm sm:text-base">
                  Běžní lidé nakupující služby na přepážce nebo přímým voláním na infolinku operátora téměř vždy obdrží standardní drahý ceník. My máme páku v podobě tisíců odběrů, proto vám můžeme zprostředkovat neveřejné nabídky.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-sm">Zkušený tým vyjednavačů</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-sm">Prověřené lokální sítě</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="space-y-4 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10">
                  <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wider text-blue-300">Běžný nákup sám</span>
                    <span className="text-rose-400 font-bold text-xs uppercase bg-rose-500/10 px-2.5 py-1 rounded-full">Nevýhody</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-blue-100">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-extrabold flex-shrink-0">✕</span>
                      Dostanete pouze standardní ceníkové (nejdražší) ceny
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-extrabold flex-shrink-0">✕</span>
                      Sami musíte zdlouhavě porovnávat desítky různých webů
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-extrabold flex-shrink-0">✕</span>
                      Obtížné řešení případné papírové výpovědi u operátora
                    </li>
                  </ul>

                  <div className="pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Průběh s Optivou</span>
                    <span className="text-emerald-400 font-bold text-xs uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full">Výhody</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-extrabold flex-shrink-0">✓</span>
                      Garantovaný přístup k neveřejným a skrytým nabídkám
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-extrabold flex-shrink-0">✓</span>
                      Vše zařídíme za 30 sekund – bez přecházení webech
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-extrabold flex-shrink-0">✓</span>
                      Zcela bezplatná pomoc s hladkým přechodem k levnější službě
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Block */}
      <section className="py-16 md:py-24 bg-neutral-50 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full mb-3">Modelová kalkulačka</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 font-display">Kolik byste mohli ušetřit právě vy?</h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto mt-3">
              Pohybujte sliderem a podívejte se, jaké částky naši zákazníci průměrně ušetří za rok nebo pět let aktivního využívání Optivy.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 rounded-[2rem] shadow-2xl overflow-hidden border border-blue-900/45">
            <div className="grid md:grid-cols-2">
              
              {/* Left Slider Column */}
              <div className="p-8 sm:p-10 md:p-14 text-white flex flex-col justify-center bg-blue-950/40">
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display mb-4">Určete své výdaje</h3>
                <p className="text-blue-200 mb-8 text-sm sm:text-base leading-relaxed">
                  Kolik peněz za tyto telekomunikační služby utratíte měsíčně v současnosti?
                </p>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                      <label className="font-semibold text-blue-100 text-sm">Stávající výdaj (měsíčně):</label>
                      <span className="font-extrabold text-3xl bg-blue-800/60 text-emerald-300 px-4 py-1.5 rounded-2xl border border-blue-700/40">{calcMonthly} Kč</span>
                    </div>
                    <input 
                      type="range" 
                      min="500" 
                      max="5000" 
                      step="100"
                      value={calcMonthly}
                      onChange={(e) => setCalcMonthly(Number(e.target.value))}
                      className="w-full h-2.5 bg-blue-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                    <div className="flex justify-between text-xs text-blue-300 font-medium mt-3">
                      <span>500 Kč</span>
                      <span>2 500 Kč</span>
                      <span>5 000 Kč</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Result Column */}
              <div className="bg-white p-8 sm:p-10 md:p-14 flex flex-col justify-center">
                <div className="space-y-6 sm:space-y-8">
                  
                  <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100/80 shadow-inner group">
                    <div className="text-xs sm:text-sm font-bold text-emerald-600 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      <PiggyBank className="w-4 h-4 text-emerald-500" />
                      Průměrná úspora za 1 rok
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display">
                      cca {Math.round(calcMonthly * 0.30 * 12).toLocaleString('cs-CZ')} Kč
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100/80 shadow-inner">
                    <div className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      Průměrná úspora za 5 let
                    </div>
                    <div className="text-4xl sm:text-5xl font-extrabold text-blue-900 font-display">
                      cca {Math.round(calcMonthly * 0.30 * 60).toLocaleString('cs-CZ')} Kč
                    </div>
                  </div>
                  
                  <div>
                    <button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-colors shadow-lg shadow-blue-600/25 active:scale-[0.99] cursor-pointer"
                    >
                      Chci získat tyto úspory
                    </button>
                    <p className="text-center text-[11px] text-gray-400 mt-3.5 italic leading-relaxed">
                      * Odhadovaná úspora je spočítána na základě průměrné 30% slevy z neveřejných ceníků.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Local Coverage Section for regional SEO & trust */}
      <LocalCoverage />

      {/* Frequently Asked Questions (FAQ) with React State */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full mb-3">Máte otázky?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 font-display">Často kladené otázky</h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto mt-3">
              Máte pochybnosti o přechodu? Podívejte se na odpovědi na dotazy, na které se lidé nejčastěji ptají.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "border rounded-2xl transition-all duration-300",
                  openFaq === idx 
                    ? "border-blue-200 bg-blue-50/20 shadow-sm" 
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 group"
                >
                  <span className="text-sm sm:text-base font-display pr-4">{faq.q}</span>
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
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 font-semibold mb-3">Nenašli jste odpověď na vaši otázku?</p>
            <a 
              href="tel:+420608638304" 
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold transition-all text-sm group"
            >
              <Phone className="w-4 h-4" />
              Zavolejte nám přímo a rádi vám odpovíme
            </a>
          </div>
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="bg-neutral-100 py-12 border-t border-gray-200/60">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-xs sm:text-sm leading-relaxed">
          <h4 className="text-sm font-bold text-gray-700 mb-2 font-display uppercase tracking-wider">Nejlevnější telekomunikační služby v ČR</h4>
          <p>
            Specializujeme se na nezávislé a reálné vyhledávání nejvýhodnějších nabídek na českém trhu. Pokud hledáte <strong>levný internet</strong> na doma (přes optická vlákna, VDSL kabel i bezdrátovou technologii LTE/5G), <strong>levnou televizi</strong> se spoustou populárních programů nebo ten <strong>nejlevnější mobilní tarif</strong> na míru vašim hovorům i datovým potřebám, jste na správném místě. Spolehlivě spolupracujeme se všemi velkými operátory i lokálními poskytovateli, abychom vám zajistili špičkovou kvalitu a doložitelnou roční úsporu.
          </p>
        </div>
      </section>

      <Footer />
      <MobileQuickBar />
    </div>
  );
}
