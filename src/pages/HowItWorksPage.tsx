import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import MobileQuickBar from '../components/MobileQuickBar';
import { 
  ShieldCheck, 
  Users, 
  Phone, 
  PiggyBank, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  Clock,
  ThumbsUp,
  Award,
  HeartHandshake
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Vyplníte krátký nezávazný formulář',
      desc: 'Zadáte své telefonní číslo, případně lokalitu nebo současnou útratu. Celé to trvá méně než 30 vteřin a k ničemu vás to nezavazuje.',
      badge: '30 vteřin'
    },
    {
      num: '02',
      title: 'Prověříme neveřejné ceníky a optiku',
      desc: 'Náš specialista prověří technickou dostupnost na vaší adrese v centrální databázi CETIN, T-Mobile, Vodafone i lokálních sítí a vyhledá neveřejné akční slevy.',
      badge: 'Během několika minut'
    },
    {
      num: '03',
      title: 'Představíme vám konkrétní úsporu',
      desc: 'Zavoláme vám nebo pošleme přehlednou kalkulaci. Pokud se vám nabídka zalíbí, můžeme pokračovat. Pokud ne, nic neplatíte a nic se nemění.',
      badge: '100% zdarma'
    },
    {
      num: '04',
      title: 'Převedeme služby bez přerušení',
      desc: 'Zajistíme administrativu, vystavení OKU kódů, případnou výpověď stávajícímu operátorovi a dohlédneme na to, abyste nezůstali ani vteřinu bez připojení.',
      badge: 'Bez starostí'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-gray-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <SEOHead 
        title="Jak funguje srovnávač Optiva | 100% Nezávisle a Zdarma"
        description="Přečtěte si, jak Optiva získává neveřejné velkoobchodní slevy na internet, TV a mobilní tarify. Naše služby jsou pro zákazníky zcela bezplatné a nezávazné."
        keywords="jak funguje srovnávač internetu, nezávislý srovnávač operátorů, neveřejné slevy telekomunikace, převod smlouvy bez sankce"
        breadcrumbs={[{ name: 'Jak to funguje', url: '/jak-to-funguje' }]}
        faqs={[
          { question: 'Kdo platí vaše služby, když jsou pro mě zdarma?', answer: 'Naše odměna je hrazena z provizí operátorů za přivedeného zákazníka. Koncový zákazník neplatí ani korunu navíc.' },
          { question: 'Co když mám u stávajícího operátora ještě smlouvu?', answer: 'Podle zákona o elektronických komunikacích mohou spotřebitelé odejít bez sankcí. Pomůžeme vám vystavit OKU kód.' },
          { question: 'Jak je zajištěno, že nezůstanu bez internetu?', answer: 'Při změně poskytovatele koordinujeme termín aktivace nové linky před odpojením staré.' }
        ]}
      />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Jak to funguje' }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-transparent py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wide">
              <HeartHandshake className="w-3.5 h-3.5" />
              Transparentnost a férovost
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 font-display tracking-tight leading-[1.1]">
              Jak Optiva funguje a proč jsou naše ceny tak nízké?
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl">
              Nejsme další anonymní operátor. Jsme nezávislý tým specialistů, kteří denně srovnávají trh a díky vysokým objemům poptávek vyjednávají pro běžné rodiny velkoobchodní a retenční slevy, na které jednotlivec na pobočce nedosáhne.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">Nezávislost</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Nestraníme žádnému operátorovi</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-emerald-600 font-display">0 Kč poplatky</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Služba je pro klienty zdarma</div>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="text-xl font-extrabold text-blue-950 font-display">Lidský přístup</div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Žádné otravné robotické hlasy</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <LeadForm 
              title="Vyzkoušejte nezávazné srovnání" 
              subtitle="Zadejte kontakt a my vám do několika minut ukážeme, kolik můžete ušetřit."
              badge="100% bezplatná služba"
            />
          </div>

        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Postup krok za krokem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-display mt-3">
              Jak probíhá celá spolupráce?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Vše máme vyladěné tak, abyste s převodem neměli žádnou zbytečnou práci a ušetřili maximum peněz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-neutral-50 rounded-3xl p-6 border border-gray-200/80 flex flex-col justify-between hover:border-blue-300 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-blue-900/30 font-display">{s.num}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-blue-950 mb-2 font-display">{s.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Deep Dive */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
              Časté otázky zákazníků
            </h3>
            <p className="text-gray-500 text-sm mt-1">Vše, co potřebujete vědět před odesláním poptávky</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
              <h4 className="font-bold text-blue-950 text-base mb-2">Kdo platí vaše služby, když jsou pro mě zdarma?</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Naše odměna je hrazena z provizí operátorů za přivedeného spokojeného zákazníka. Vy jako koncový zákazník neplatíte nám ani korunu navíc – naopak získáváte zvýhodněnou cenu, kterou operátoři běžným jednotlivcům nenabízejí.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
              <h4 className="font-bold text-blue-950 text-base mb-2">Co když mám u stávajícího operátora ještě smlouvu?</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Podle české legislativy a novely zákona o elektronických komunikacích mohou spotřebitelé odejít bez jakýchkoliv pokut a sankcí. Rádi projdeme vaši současnou smlouvu a řekneme vám přesně, jak a kdy můžete okamžitě ušetřit.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
              <h4 className="font-bold text-blue-950 text-base mb-2">Jak je zajištěno, že nezůstanu bez internetu?</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Při změně poskytovatele koordinujeme termín aktivace nové služby tak, aby nová linka běžela dříve, než se odpojí ta stará. Tím zaručujeme 100% kontinuitu pro práci z domova i běžnou zábavu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileQuickBar />
    </div>
  );
}
