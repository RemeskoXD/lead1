import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, Sparkles, Phone, Lock, Clock, MapPin, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { searchCzechCities, POPULAR_CZECH_CITIES, CzechCity } from '../data/czechCities';

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  defaultService?: string;
  preselectedPlan?: string;
  showServiceSelector?: boolean;
}

export default function LeadForm({
  title = "Spočítejte své úspory",
  subtitle = "Zadejte základní údaje a my vám do několika minut najdeme nejlevnější řešení.",
  badge = "100% nezávazné srovnání zdarma",
  defaultService = "Internet",
  preselectedPlan,
  showServiceSelector = true,
}: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [services, setServices] = useState<string[]>([defaultService]);
  const [currentPrice, setCurrentPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // City autocomplete states
  const [citySuggestions, setCitySuggestions] = useState<CzechCity[]>([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (address.trim().length >= 1) {
      const results = searchCzechCities(address, 5);
      setCitySuggestions(results);
    } else {
      setCitySuggestions([]);
    }
  }, [address]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node)) {
        setShowCityDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectCity = (city: CzechCity) => {
    setAddress(city.name);
    setShowCityDropdown(false);
  };

  const toggleService = (id: string) => {
    setServices(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    try {
      const extraDetails = [
        services.length > 0 ? services.join(', ') : defaultService,
        preselectedPlan ? `Plán: ${preselectedPlan}` : '',
        address ? `Lokalita/Adresa: ${address}` : ''
      ].filter(Boolean).join(' | ');

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          phone, 
          email, 
          services: extraDetails, 
          currentPrice 
        }),
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

  return (
    <div className="relative">
      <div className="absolute -inset-2 bg-blue-600/10 rounded-[2.5rem] blur-xl transform -rotate-1 pointer-events-none"></div>
      
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100/90 relative z-10">
        {submitted ? (
          <div className="text-center py-10 space-y-5 animate-fade-in">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
              <Check className="w-10 h-10" strokeWidth={3} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
              Poptávka byla odeslána!
            </h3>
            <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed max-w-sm mx-auto">
              Náš specialista již začíná ověřovat neveřejné ceníky a dostupnost. V nejbližší době se vám ozveme zpět s nezávaznou kalkulací.
            </p>
            <div className="pt-2">
              <button 
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-sm text-blue-600 font-bold hover:text-blue-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                Odeslat další poptávku
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="text-center pb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 uppercase tracking-wide mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 font-display leading-tight">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                {subtitle}
              </p>
            </div>

            {preselectedPlan && (
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Vybraný plán: {preselectedPlan}</span>
              </div>
            )}

            {showServiceSelector && (
              <div>
                <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  O jaké služby máte zájem?
                </span>
                <div className="grid grid-cols-3 gap-1.5 bg-neutral-100 p-1.5 rounded-xl">
                  {[
                    { id: 'Internet', label: 'Internet', price: 'od 199 Kč' },
                    { id: 'TV', label: 'Televize', price: 'od 59 Kč' },
                    { id: 'Tarify', label: 'Tarif', price: 'od 199 Kč' }
                  ].map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => toggleService(srv.id)}
                      className={cn(
                        "py-2 px-1 rounded-lg text-center transition-all cursor-pointer",
                        services.includes(srv.id)
                          ? "bg-white text-blue-950 font-bold shadow-xs scale-[1.02]"
                          : "text-gray-500 hover:text-gray-900 text-xs"
                      )}
                    >
                      <div className="text-xs font-bold">{srv.label}</div>
                      <div className="text-[10px] text-blue-600 font-semibold">{srv.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-3">
              <div className="relative" ref={cityDropdownRef}>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700">
                    Město / Adresa <span className="text-gray-400 font-normal">(pro přesné ověření optiky)</span>
                  </label>
                  <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> Našeptávač ČR
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setShowCityDropdown(true);
                    }}
                    onFocus={() => setShowCityDropdown(true)}
                    placeholder="Např. Praha, Brno, Ostrava, Plzeň..."
                    className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-50 rounded-xl border border-gray-300/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm transition-all placeholder:text-gray-400 font-medium"
                  />
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Smart Autocomplete Dropdown */}
                {showCityDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-blue-100 shadow-xl shadow-blue-950/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                    {citySuggestions.length > 0 ? (
                      <div className="py-1">
                        <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/70 border-b border-gray-100 flex items-center justify-between">
                          <span>Doporučená města a lokality ČR</span>
                          <span>Kliknutím doplníte</span>
                        </div>
                        {citySuggestions.map((city, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => selectCity(city)}
                            className="w-full px-3.5 py-2 text-left hover:bg-blue-50/80 flex items-center justify-between group transition-colors cursor-pointer border-b border-gray-50 last:border-0"
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-blue-500 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700">
                                {city.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {city.zip && (
                                <span className="text-[10px] text-gray-400 font-mono">
                                  {city.zip}
                                </span>
                              )}
                              <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                                {city.region}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : address.trim().length === 0 ? (
                      <div className="p-3">
                        <div className="text-[11px] font-bold text-gray-500 mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Nejčastěji hledaná města:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {POPULAR_CZECH_CITIES.slice(0, 8).map((city, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => selectCity(city)}
                              className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 text-xs font-semibold transition-all cursor-pointer"
                            >
                              {city.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Jméno a příjmení *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jan Novák"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 rounded-xl border border-gray-300/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm transition-all placeholder:text-gray-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+420 777 123 456"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 rounded-xl border border-gray-300/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm transition-all placeholder:text-gray-400 font-bold text-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    E-mail <span className="text-gray-400 font-normal">(pro kalkulaci)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="novak@email.cz"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 rounded-xl border border-gray-300/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>Kolik nyní přibližně platíte?</span>
                  <span className="text-[11px] text-gray-400 font-normal">Volitelné</span>
                </label>
                <input
                  type="text"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  placeholder="Např. 600 Kč měsíčně"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 rounded-xl border border-gray-300/80 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Chci získat nejlepší nabídku</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 font-medium pt-1">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-emerald-600" /> Bezpečné SSL</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-600" /> Do 30 sekund hotovo</span>
            </div>

            <p className="text-[11px] text-center text-gray-400 leading-relaxed pt-1">
              Odesláním souhlasíte se <Link to="/ochrana-osobnich-udaju" target="_blank" className="underline hover:text-gray-600">zpracováním osobních údajů</Link> za účelem nezávazné nabídky.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
