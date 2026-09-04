import React, { useState } from 'react';
import { MapPin, CheckCircle2, Search, ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export interface CityCoverage {
  name: string;
  region: string;
  providers: string;
}

const ALL_CITIES: CityCoverage[] = [
  // Hlavní město Praha
  { name: 'Praha', region: 'Hlavní město', providers: 'CETIN optika/VDSL, Vodafone kabel, Pe3ny Net, Centrio optika, AIM, O2' },
  { name: 'Praha - Jižní Město', region: 'Praha 11', providers: 'Centrio FTTH, CETIN optika, Vodafone, Pe3ny Net, T-Mobile optika' },
  { name: 'Praha - Černý Most', region: 'Praha 14', providers: 'CETIN optika, Vodafone kabel, AIM optika, O2 5G, T-Mobile' },
  { name: 'Praha - Stodůlky', region: 'Praha 13', providers: 'CETIN optika, Vodafone kabel, AIM, T-Mobile Magenta, O2' },
  { name: 'Praha - Vinohrady a Žižkov', region: 'Praha 2 a 3', providers: 'CETIN VDSL/FTTH, Vodafone GigaNet, Pe3ny Net, O2' },
  { name: 'Praha - Dejvice a Břevnov', region: 'Praha 6', providers: 'CETIN optika, Vodafone kabel, O2 5G, Pe3ny Net' },

  // Jihomoravský kraj
  { name: 'Brno', region: 'Jihomoravský kraj', providers: 'Netbox optika, PODA FTTH, CETIN, Vodafone kabel, O2, Infos Art' },
  { name: 'Znojmo', region: 'Jihomoravský kraj', providers: 'PODA optika, CETIN VDSL/FTTH, Vodafone, Video-Sat, O2' },
  { name: 'Hodonín', region: 'Jihomoravský kraj', providers: 'Moravanet, PODA, CETIN optika, Vodafone, T-Mobile' },
  { name: 'Břeclav', region: 'Jihomoravský kraj', providers: 'Nej.cz optika, CETIN, Vodafone kabel, O2, B-Net' },
  { name: 'Vyškov', region: 'Jihomoravský kraj', providers: 'PODA, Vyškov.net, CETIN optika, Vodafone, O2' },
  { name: 'Blansko', region: 'Jihomoravský kraj', providers: 'Blansko Free, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Kyjov', region: 'Jihomoravský kraj', providers: 'PODA optika, CETIN VDSL/FTTH, Moravanet, Vodafone, O2' },
  { name: 'Boskovice', region: 'Jihomoravský kraj', providers: 'CETIN optika, Vodafone, O2, T-Mobile, B-Net' },

  // Moravskoslezský kraj
  { name: 'Ostrava', region: 'Moravskoslezský kraj', providers: 'PODA FTTH, Nej.cz kabel, CETIN optika, Vodafone kabel, O2' },
  { name: 'Havířov', region: 'Moravskoslezský kraj', providers: 'PODA FTTH, Nej.cz, CETIN optika, Vodafone kabel, O2' },
  { name: 'Opava', region: 'Moravskoslezský kraj', providers: 'PODA optika, Grape SC, CETIN, Vodafone kabel, T-Mobile' },
  { name: 'Frýdek-Místek', region: 'Moravskoslezský kraj', providers: 'PODA FTTH, Nej.cz, CETIN optika, Vodafone, O2' },
  { name: 'Karviná', region: 'Moravskoslezský kraj', providers: 'PODA FTTH, Nej.cz kabel, CETIN optika, Vodafone, O2' },
  { name: 'Třinec', region: 'Moravskoslezský kraj', providers: 'Nej.cz optika, PODA, CETIN optika, Vodafone, O2' },
  { name: 'Český Těšín', region: 'Moravskoslezský kraj', providers: 'PODA optika, Nej.cz, CETIN, Vodafone, O2' },
  { name: 'Nový Jičín', region: 'Moravskoslezský kraj', providers: 'KTNJ kabel, PODA optika, CETIN, Vodafone, T-Mobile' },
  { name: 'Krnov', region: 'Moravskoslezský kraj', providers: 'PODA optika, Nej.cz, CETIN VDSL/FTTH, Vodafone, O2' },
  { name: 'Bohumín', region: 'Moravskoslezský kraj', providers: 'PODA FTTH, Nej.cz, CETIN optika, Vodafone, O2' },
  { name: 'Orlová', region: 'Moravskoslezský kraj', providers: 'PODA FTTH, Nej.cz, CETIN optika, Vodafone, O2' },
  { name: 'Bruntál', region: 'Moravskoslezský kraj', providers: 'PODA, CETIN VDSL/FTTH, Vodafone, T-Mobile, O2' },
  { name: 'Kopřivnice', region: 'Moravskoslezský kraj', providers: 'KTK kabelová televize, PODA, CETIN optika, Vodafone, O2' },

  // Plzeňský kraj
  { name: 'Plzeň', region: 'Plzeňský kraj', providers: 'PilsFree optika, CETIN FTTH, Vodafone kabel, O2, Starnet' },
  { name: 'Klatovy', region: 'Plzeňský kraj', providers: 'Starnet optika, PilsFree, CETIN, Vodafone, O2' },
  { name: 'Rokycany', region: 'Plzeňský kraj', providers: 'PilsFree, CETIN optika, Vodafone kabel, O2, Starnet' },
  { name: 'Tachov', region: 'Plzeňský kraj', providers: 'Westnet, Starnet, CETIN VDSL/FTTH, Vodafone, O2' },
  { name: 'Domažlice', region: 'Plzeňský kraj', providers: 'Chodskonet, Starnet, CETIN optika, Vodafone, O2' },
  { name: 'Sušice', region: 'Plzeňský kraj', providers: 'Starnet optika, CETIN VDSL, Vodafone, O2, T-Mobile' },

  // Jihočeský kraj
  { name: 'České Budějovice', region: 'Jihočeský kraj', providers: 'Starnet optika, Inext, CETIN FTTH, Vodafone kabel, O2' },
  { name: 'Tábor', region: 'Jihočeský kraj', providers: 'Starnet optika, Nej.cz, CETIN optika, Vodafone kabel, O2' },
  { name: 'Písek', region: 'Jihočeský kraj', providers: 'Starnet optika, Písek.net, CETIN VDSL/FTTH, Vodafone, O2' },
  { name: 'Jindřichův Hradec', region: 'Jihočeský kraj', providers: 'JHComp optika, Starnet, CETIN, Vodafone, O2' },
  { name: 'Strakonice', region: 'Jihočeský kraj', providers: 'Starnet optika, Strakonice.net, CETIN, Vodafone, O2' },
  { name: 'Český Krumlov', region: 'Jihočeský kraj', providers: 'Starnet, Inext, CETIN optika, Vodafone, O2' },
  { name: 'Prachatice', region: 'Jihočeský kraj', providers: 'Starnet optika, CETIN VDSL/FTTH, Vodafone, O2' },
  { name: 'Milevsko', region: 'Jihočeský kraj', providers: 'Starnet, CETIN VDSL/FTTH, Vodafone, O2, T-Mobile' },

  // Liberecký kraj
  { name: 'Liberec', region: 'Liberecký kraj', providers: 'Nej.cz optika, CETIN FTTH, Vodafone kabel, T-Mobile optika, O2' },
  { name: 'Jablonec nad Nisou', region: 'Liberecký kraj', providers: 'Nej.cz kabel, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Česká Lípa', region: 'Liberecký kraj', providers: 'CL-NET optika, Nej.cz, CETIN, Vodafone, O2' },
  { name: 'Turnov', region: 'Liberecký kraj', providers: 'Nej.cz optika, CETIN FTTH, Vodafone, T-Mobile, O2' },
  { name: 'Semily', region: 'Liberecký kraj', providers: 'Nej.cz, CETIN VDSL/FTTH, Vodafone, O2, T-Mobile' },
  { name: 'Nový Bor', region: 'Liberecký kraj', providers: 'CL-NET, CETIN optika, Vodafone, Nej.cz, O2' },

  // Olomoucký kraj
  { name: 'Olomouc', region: 'Olomoucký kraj', providers: 'Fofrnet optika, PODA FTTH, Nej.cz, CETIN optika, Vodafone, O2' },
  { name: 'Prostějov', region: 'Olomoucký kraj', providers: 'Fofrnet, Nej.cz optika, PODA, CETIN, Vodafone kabel, O2' },
  { name: 'Přerov', region: 'Olomoucký kraj', providers: 'Nej.cz, PODA optika, Fofrnet, CETIN, Vodafone kabel, O2' },
  { name: 'Šumperk', region: 'Olomoucký kraj', providers: 'ŠumperkNet, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Hranice', region: 'Olomoucký kraj', providers: 'PODA optika, Nej.cz, CETIN, Vodafone kabel, O2' },
  { name: 'Jeseník', region: 'Olomoucký kraj', providers: 'WMS s.r.o. optika, CETIN VDSL, Vodafone, O2, T-Mobile' },
  { name: 'Litovel', region: 'Olomoucký kraj', providers: 'Fofrnet, CETIN optika, Vodafone, O2, PODA' },
  { name: 'Zábřeh', region: 'Olomoucký kraj', providers: 'ŠumperkNet, CETIN optika, Vodafone, O2, T-Mobile' },

  // Královéhradecký kraj
  { name: 'Hradec Králové', region: 'Královéhradecký kraj', providers: 'Magentic / HKFree, CETIN FTTH, Vodafone kabel, O2, T-Mobile optika' },
  { name: 'Trutnov', region: 'Královéhradecký kraj', providers: 'HDnet s.r.o. optika, CETIN FTTH, Vodafone, O2, T-Mobile' },
  { name: 'Náchod', region: 'Královéhradecký kraj', providers: 'NáchodNet, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Jičín', region: 'Královéhradecký kraj', providers: 'Dragon Internet, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Dvůr Králové nad Labem', region: 'Královéhradecký kraj', providers: 'HDnet, CETIN VDSL/FTTH, Vodafone, O2, T-Mobile' },
  { name: 'Vrchlabí', region: 'Královéhradecký kraj', providers: 'HDnet optika, CETIN VDSL, Vodafone, O2, T-Mobile' },
  { name: 'Jaroměř', region: 'Královéhradecký kraj', providers: 'Magentic, CETIN optika, Vodafone, O2, T-Mobile' },

  // Pardubický kraj
  { name: 'Pardubice', region: 'Pardubický kraj', providers: 'FreeNet Pardubice, CETIN FTTH, Vodafone kabel, O2, T-Mobile optika' },
  { name: 'Chrudim', region: 'Pardubický kraj', providers: 'Chrudimka.cz, FreeNet, CETIN optika, Vodafone, O2' },
  { name: 'Svitavy', region: 'Pardubický kraj', providers: 'CMS TV kabel, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Ústí nad Orlicí', region: 'Pardubický kraj', providers: 'Olicko.cz, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Česká Třebová', region: 'Pardubický kraj', providers: 'CETIN optika, Vodafone kabel, O2, T-Mobile' },
  { name: 'Litomyšl', region: 'Pardubický kraj', providers: 'CMS TV, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Vysoké Mýto', region: 'Pardubický kraj', providers: 'Chrudimka.cz, CETIN optika, Vodafone, O2' },

  // Ústecký kraj
  { name: 'Ústí nad Labem', region: 'Ústecký kraj', providers: 'Nej.cz optika, Grape SC, CETIN FTTH, Vodafone kabel, O2' },
  { name: 'Most', region: 'Ústecký kraj', providers: 'Nej.cz kabel, Grape SC, CETIN optika, Vodafone kabel, O2' },
  { name: 'Teplice', region: 'Ústecký kraj', providers: 'Nej.cz optika, CETIN FTTH, Vodafone kabel, O2, T-Mobile' },
  { name: 'Děčín', region: 'Ústecký kraj', providers: 'Nej.cz kabel, CETIN optika, Vodafone kabel, O2' },
  { name: 'Chomutov', region: 'Ústecký kraj', providers: 'Grape SC, Nej.cz, CETIN optika, Vodafone kabel, O2' },
  { name: 'Litoměřice', region: 'Ústecký kraj', providers: 'L-Net optika, Nej.cz, CETIN optika, Vodafone, O2' },
  { name: 'Litvínov', region: 'Ústecký kraj', providers: 'Nej.cz kabel, Grape SC, CETIN, Vodafone, O2' },
  { name: 'Žatec', region: 'Ústecký kraj', providers: 'Žatec Net, Nej.cz, CETIN optika, Vodafone, O2' },
  { name: 'Louny', region: 'Ústecký kraj', providers: 'LounyNet, Nej.cz, CETIN optika, Vodafone, O2' },
  { name: 'Roudnice nad Labem', region: 'Ústecký kraj', providers: 'L-Net, CETIN optika, Vodafone kabel, O2' },
  { name: 'Kadaň', region: 'Ústecký kraj', providers: 'Grape SC, Nej.cz, CETIN optika, Vodafone, O2' },

  // Zlínský kraj
  { name: 'Zlín', region: 'Zlínský kraj', providers: 'Avonet FTTH (centrála), CETIN optika, Vodafone, T-Mobile optika, O2' },
  { name: 'Kroměříž', region: 'Zlínský kraj', providers: 'Avonet optika, Nej.cz, CETIN optika, Vodafone kabel, O2' },
  { name: 'Vsetín', region: 'Zlínský kraj', providers: 'Avonet optika, Vsetín.net, CETIN, Vodafone, O2' },
  { name: 'Uherské Hradiště', region: 'Zlínský kraj', providers: 'Avonet optika, Slovácko.net, CETIN, Vodafone kabel, O2' },
  { name: 'Valašské Meziříčí', region: 'Zlínský kraj', providers: 'Avonet, Nej.cz optika, CETIN, Vodafone, O2' },
  { name: 'Otrokovice', region: 'Zlínský kraj', providers: 'Avonet FTTH, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Rožnov pod Radhoštěm', region: 'Zlínský kraj', providers: 'BeskydNet, Avonet, CETIN optika, Vodafone, O2' },
  { name: 'Uherský Brod', region: 'Zlínský kraj', providers: 'Avonet, Slovácko.net, CETIN optika, Vodafone, O2' },

  // Kraj Vysočina
  { name: 'Jihlava', region: 'Kraj Vysočina', providers: 'M-Soft / Metronet FTTH, CETIN optika, Vodafone kabel, O2' },
  { name: 'Třebíč', region: 'Kraj Vysočina', providers: 'Třebíč NET (Yashica), CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Havlíčkův Brod', region: 'Kraj Vysočina', providers: 'M-Soft optika, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Žďár nad Sázavou', region: 'Kraj Vysočina', providers: 'ZdarNet optika, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Pelhřimov', region: 'Kraj Vysočina', providers: 'Starnet optika, CETIN VDSL/FTTH, Vodafone, O2' },
  { name: 'Humpolec', region: 'Kraj Vysočina', providers: 'M-Soft, Starnet, CETIN optika, Vodafone, O2' },
  { name: 'Velké Meziříčí', region: 'Kraj Vysočina', providers: 'ZdarNet, CETIN optika, Vodafone, O2, T-Mobile' },

  // Karlovarský kraj
  { name: 'Karlovy Vary', region: 'Karlovarský kraj', providers: 'Nej.cz kabel, Dragon Internet, CETIN optika, Vodafone kabel, O2' },
  { name: 'Cheb', region: 'Karlovarský kraj', providers: 'Nej.cz optika, CETIN optika, Vodafone kabel, O2, T-Mobile' },
  { name: 'Sokolov', region: 'Karlovarský kraj', providers: 'Nej.cz kabel, CETIN optika, Vodafone kabel, O2' },
  { name: 'Ostrov', region: 'Karlovarský kraj', providers: 'Nej.cz kabel, CETIN optika, Vodafone, O2, Dragon' },
  { name: 'Aš', region: 'Karlovarský kraj', providers: 'Nej.cz, CETIN VDSL/FTTH, Vodafone, O2, T-Mobile' },

  // Středočeský kraj
  { name: 'Kladno', region: 'Středočeský kraj', providers: 'Klfree.net, CETIN optika, Vodafone kabel, O2, T-Mobile optika' },
  { name: 'Mladá Boleslav', region: 'Středočeský kraj', providers: 'Dragon Internet FTTH (centrála), CETIN optika, Vodafone kabel, O2' },
  { name: 'Příbram', region: 'Středočeský kraj', providers: 'PBnet, Starnet optika, CETIN optika, Vodafone kabel, O2' },
  { name: 'Kolín', region: 'Středočeský kraj', providers: 'Kolín Free, Nej.cz, CETIN optika, Vodafone kabel, O2' },
  { name: 'Kutná Hora', region: 'Středočeský kraj', providers: 'Nej.cz, FreeNet, CETIN optika, Vodafone, O2' },
  { name: 'Mělník', region: 'Středočeský kraj', providers: 'Melnicek.cz, CETIN optika, Vodafone kabel, O2' },
  { name: 'Beroun', region: 'Středočeský kraj', providers: 'BerounNet, CETIN optika, Vodafone kabel, O2' },
  { name: 'Brandýs nad Labem - Stará Boleslav', region: 'Středočeský kraj', providers: 'BrandysNet, CETIN optika, Vodafone kabel, O2' },
  { name: 'Benešov', region: 'Středočeský kraj', providers: 'Starnet optika, CETIN optika, Vodafone, O2' },
  { name: 'Nymburk', region: 'Středočeský kraj', providers: 'Poděbrady Net, Nej.cz, CETIN optika, Vodafone, O2' },
  { name: 'Poděbrady', region: 'Středočeský kraj', providers: 'Poděbrady Net optika, CETIN optika, Vodafone, O2' },
  { name: 'Rakovník', region: 'Středočeský kraj', providers: 'RakovnikNet, CETIN optika, Vodafone kabel, O2' },
  { name: 'Neratovice', region: 'Středočeský kraj', providers: 'Nej.cz kabel, CETIN optika, Vodafone, O2' },
  { name: 'Říčany', region: 'Středočeský kraj', providers: 'Pe3ny Net, CETIN optika, Vodafone, O2, T-Mobile' },
  { name: 'Jesenice', region: 'Středočeský kraj', providers: 'CETIN optika, Vodafone, O2 5G, T-Mobile optika' },
  { name: 'Slaný', region: 'Středočeský kraj', providers: 'Klfree.net, CETIN optika, Vodafone kabel, O2' },
  { name: 'Kralupy nad Vltavou', region: 'Středočeský kraj', providers: 'Nej.cz kabel, CETIN optika, Vodafone, O2' },
  { name: 'Vlašim', region: 'Středočeský kraj', providers: 'Starnet optika, CETIN VDSL/FTTH, Vodafone, O2' },
];

const INITIAL_VISIBLE_COUNT = 12;

export default function LocalCoverage() {
  const [filter, setFilter] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredCities = ALL_CITIES.filter(c => 
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.region.toLowerCase().includes(filter.toLowerCase()) ||
    c.providers.toLowerCase().includes(filter.toLowerCase())
  );

  // If user is searching, show all matched cities. Otherwise respect the expand toggle.
  const isSearching = filter.trim().length > 0;
  const displayedCities = isSearching || isExpanded 
    ? filteredCities 
    : filteredCities.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <section className="py-16 bg-white border-t border-gray-100 relative">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Dostupnost po celé České republice
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 font-display mt-3 tracking-tight">
            Ověřujeme optické a bezdrátové sítě ve vašem městě
          </h2>
          
          <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed">
            Máme přímé velkoobchodní napojení na národní optickou infrastrukturu CETIN i desítky nezávislých lokálních optických providerů po celé ČR.
          </p>

          {/* Quick city search filter */}
          <div className="max-w-md mx-auto mt-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                if (e.target.value.trim().length > 0) {
                  setIsExpanded(true);
                }
              }}
              placeholder="Hledat město nebo kraj (např. Brno, Plzeň, Ostrava...)"
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none text-xs sm:text-sm font-medium transition-all"
            />
            {filter && (
              <button 
                onClick={() => setFilter('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Zrušit
              </button>
            )}
          </div>
          
          {isSearching && (
            <p className="text-xs text-gray-500 mt-2">
              Nalezeno: <strong>{filteredCities.length}</strong> {filteredCities.length === 1 ? 'město' : filteredCities.length < 5 ? 'města' : 'měst'}
            </p>
          )}
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {displayedCities.map((city) => (
            <div 
              key={city.name}
              className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/80 hover:bg-blue-50/60 border border-gray-200/80 hover:border-blue-200 transition-all flex flex-col justify-between group cursor-default"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-extrabold text-xs sm:text-sm text-blue-950 group-hover:text-blue-700 transition-colors truncate">
                      {city.name}
                    </h3>
                  </div>
                  <span className="text-[10px] text-blue-700/80 font-medium block">
                    {city.region}
                  </span>
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug line-clamp-2">
                    {city.providers}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ověřeno
                </span>
                <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                  od 199 Kč
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rozbalení / Sbalení tlačítko (pokud uživatel nevyhledává) */}
        {!isSearching && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all shadow-sm cursor-pointer active:scale-95 border",
                isExpanded
                  ? "bg-neutral-100 hover:bg-neutral-200 text-gray-800 border-gray-300"
                  : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
              )}
            >
              <span>
                {isExpanded 
                  ? `Sbalit seznam měst (zobrazit méně)` 
                  : `Rozbalit všechna města v ČR (${ALL_CITIES.length} měst)`
                }
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-blue-600" />
              )}
            </button>
          </div>
        )}

        {/* Footer Call-to-action note */}
        <div className="mt-8 text-center pt-4 border-t border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-2xl mx-auto">
            Nenašli jste v rychlém přehledu vaši obec? Prověřujeme dostupnost pro <strong>jakoukoliv adresu a číslo popisné ve všech 6 258 obcích ČR</strong>.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-bold transition-colors cursor-pointer"
          >
            <span>Zadat moji adresu k bezplatnému prověření na míru</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
