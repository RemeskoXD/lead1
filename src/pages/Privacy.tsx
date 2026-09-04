import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-gray-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <SEOHead 
        title="Ochrana osobních údajů a GDPR | Optiva"
        description="Zásady zpracování a ochrany osobních údajů (GDPR) společnosti Optiva. Bezpečnost a transparentnost při srovnání telekomunikačních služeb."
        breadcrumbs={[{ name: 'Ochrana osobních údajů', url: '/ochrana-osobnich-udaju' }]}
      />
      <Navbar />
      <Breadcrumbs items={[{ label: 'Ochrana osobních údajů' }]} />

      {/* Content Container */}
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-16 flex-grow">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 md:p-12 border border-gray-100 relative overflow-hidden">
          {/* Subtle Decorative Backdrop Circle */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl pointer-events-none -z-10"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display tracking-tight">
              Zpracování a ochrana osobních údajů
            </h1>
          </div>

          <div className="space-y-6 text-gray-700 sm:text-lg leading-relaxed font-medium">
            <p className="text-gray-600">
              Uvědomujeme si citlivost vašich kontaktů a ochrana vašeho soukromí je pro nás absolutní prioritou. Vaše osobní údaje zpracováváme v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (známým jako GDPR) a dalšími platnými předpisy.
            </p>

            <div className="bg-neutral-50 p-5 rounded-2xl border border-gray-200/80">
              <h2 className="text-md sm:text-lg font-bold text-blue-950 mb-3 font-display">Identifikace správce údajů:</h2>
              <img 
                src="/legal-notice.png" 
                alt="" 
                aria-hidden="true"
                role="presentation"
                className="h-10 sm:h-12 w-auto max-w-full object-contain select-none" 
                loading="lazy" 
              />
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/60 shadow-inner">
              <h2 className="text-md sm:text-lg font-bold text-blue-950 mb-2 font-display">Jaké údaje sbíráme a proč?</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Zpracováváme pouze ty údaje, které nám dobrovolně poskytnete pro kalkulaci nejlepších nabídek: <strong>Jméno a příjmení</strong>, <strong>e-mail</strong> a <strong>mobilní telefon</strong>. Tyto informace slouží výhradně ke zpětnému kontaktování a doložení srovnání na míru vašim reálným potřebám.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-display">Používání souborů cookies:</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                Na našich stránkách využíváme nezbytné technické cookies pro zajištění funkčnosti webu a kalkulátoru. Na základě vašeho dobrovolného souhlasu v cookie liště můžeme využívat analytické a marketingové nástroje (např. Meta Pixel od společnosti Meta Platforms Inc.) k měření efektivity reklamních kampaní na sociálních sítích a optimalizaci služeb.
              </p>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open_cookie_settings'))}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-gray-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Upravit preference cookies
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-display">Vaše práva jako subjektu údajů:</h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 pl-4 list-disc">
                <li>Právo na přístup k vašim osobním údajům a zjištění, jaké údaje zpracováváme.</li>
                <li>Právo na opravu v případě nesprávných či neúplných údajů.</li>
                <li>Právo na výmaz (právo být zapomenut), pokud pominul důvod pro jejich zpracování.</li>
                <li>Právo podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ).</li>
              </ul>
            </div>

            <p className="text-gray-600 text-sm sm:text-base italic pt-2 border-t border-gray-100">
              V případě jakýchkoliv dotazů ohledně zpracování vašich údajů nás můžete kdykoliv bezplatně kontaktovat na naší infolince.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-100">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold tracking-tight transition-all text-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Zpět na hlavní srovnávač
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
