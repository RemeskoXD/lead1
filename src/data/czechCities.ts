export interface CzechCity {
  name: string;
  region: string;
  zip?: string;
  popular?: boolean;
}

export const POPULAR_CZECH_CITIES: CzechCity[] = [
  { name: 'Praha', region: 'Hlavní město', zip: '110 00', popular: true },
  { name: 'Brno', region: 'Jihomoravský kraj', zip: '602 00', popular: true },
  { name: 'Ostrava', region: 'Moravskoslezský kraj', zip: '702 00', popular: true },
  { name: 'Plzeň', region: 'Plzeňský kraj', zip: '301 00', popular: true },
  { name: 'Liberec', region: 'Liberecký kraj', zip: '460 01', popular: true },
  { name: 'Olomouc', region: 'Olomoucký kraj', zip: '779 00', popular: true },
  { name: 'České Budějovice', region: 'Jihočeský kraj', zip: '370 01', popular: true },
  { name: 'Hradec Králové', region: 'Královéhradecký kraj', zip: '500 02', popular: true },
  { name: 'Ústí nad Labem', region: 'Ústecký kraj', zip: '400 01', popular: true },
  { name: 'Pardubice', region: 'Pardubický kraj', zip: '530 02', popular: true },
  { name: 'Zlín', region: 'Zlínský kraj', zip: '760 01', popular: true },
  { name: 'Havířov', region: 'Moravskoslezský kraj', zip: '736 01', popular: true },
  { name: 'Kladno', region: 'Středočeský kraj', zip: '272 01', popular: true },
  { name: 'Most', region: 'Ústecký kraj', zip: '434 01', popular: true },
  { name: 'Opava', region: 'Moravskoslezský kraj', zip: '746 01', popular: true },
  { name: 'Frýdek-Místek', region: 'Moravskoslezský kraj', zip: '738 01', popular: true },
  { name: 'Karviná', region: 'Moravskoslezský kraj', zip: '733 01', popular: true },
  { name: 'Jihlava', region: 'Kraj Vysočina', zip: '586 01', popular: true },
  { name: 'Teplice', region: 'Ústecký kraj', zip: '415 01', popular: true },
  { name: 'Děčín', region: 'Ústecký kraj', zip: '405 02', popular: true },
  { name: 'Karlovy Vary', region: 'Karlovarský kraj', zip: '360 01', popular: true },
  { name: 'Chomutov', region: 'Ústecký kraj', zip: '430 01', popular: true },
  { name: 'Jablonec nad Nisou', region: 'Liberecký kraj', zip: '466 01', popular: true },
  { name: 'Mladá Boleslav', region: 'Středočeský kraj', zip: '293 01', popular: true },
  { name: 'Prostějov', region: 'Olomoucký kraj', zip: '796 01', popular: true },
  { name: 'Přerov', region: 'Olomoucký kraj', zip: '750 02', popular: true },
  { name: 'Česká Lípa', region: 'Liberecký kraj', zip: '470 01', popular: true },
  { name: 'Třebíč', region: 'Kraj Vysočina', zip: '674 01', popular: true },
  { name: 'Třinec', region: 'Moravskoslezský kraj', zip: '739 61', popular: true },
  { name: 'Tábor', region: 'Jihočeský kraj', zip: '390 01', popular: true },
  { name: 'Znojmo', region: 'Jihomoravský kraj', zip: '669 02', popular: true },
  { name: 'Kolín', region: 'Středočeský kraj', zip: '280 02', popular: true },
  { name: 'Příbram', region: 'Středočeský kraj', zip: '261 01', popular: true },
  { name: 'Cheb', region: 'Karlovarský kraj', zip: '350 02', popular: true },
  { name: 'Písek', region: 'Jihočeský kraj', zip: '397 01', popular: true },
  { name: 'Trutnov', region: 'Královéhradecký kraj', zip: '541 01', popular: true },
  { name: 'Kroměříž', region: 'Zlínský kraj', zip: '767 01', popular: true },
  { name: 'Vsetín', region: 'Zlínský kraj', zip: '755 01', popular: true },
  { name: 'Šumperk', region: 'Olomoucký kraj', zip: '787 01', popular: true },
  { name: 'Valašské Meziříčí', region: 'Zlínský kraj', zip: '757 01', popular: true },
  { name: 'Litvínov', region: 'Ústecký kraj', zip: '436 01', popular: true },
  { name: 'Hodonín', region: 'Jihomoravský kraj', zip: '695 01', popular: true },
  { name: 'Nový Jičín', region: 'Moravskoslezský kraj', zip: '741 01', popular: true },
  { name: 'Uherské Hradiště', region: 'Zlínský kraj', zip: '686 01', popular: true },
  { name: 'Český Těšín', region: 'Moravskoslezský kraj', zip: '737 01', popular: true },
  { name: 'Krnov', region: 'Moravskoslezský kraj', zip: '794 01', popular: true },
  { name: 'Sokolov', region: 'Karlovarský kraj', zip: '356 01', popular: true },
  { name: 'Břeclav', region: 'Jihomoravský kraj', zip: '690 02', popular: true },
  { name: 'Havlíčkův Brod', region: 'Kraj Vysočina', zip: '580 01', popular: true },
  { name: 'Litoměřice', region: 'Ústecký kraj', zip: '412 01', popular: true },
  { name: 'Chrudim', region: 'Pardubický kraj', zip: '537 01', popular: true },
  { name: 'Žďár nad Sázavou', region: 'Kraj Vysočina', zip: '591 01', popular: true },
  { name: 'Strakonice', region: 'Jihočeský kraj', zip: '386 01', popular: true },
  { name: 'Kopřivnice', region: 'Moravskoslezský kraj', zip: '742 21', popular: true },
  { name: 'Bohumín', region: 'Moravskoslezský kraj', zip: '735 81', popular: true },
  { name: 'Klatovy', region: 'Plzeňský kraj', zip: '339 01', popular: true },
  { name: 'Jindřichův Hradec', region: 'Jihočeský kraj', zip: '377 01', popular: true },
  { name: 'Vyškov', region: 'Jihomoravský kraj', zip: '682 01', popular: true },
  { name: 'Kutná Hora', region: 'Středočeský kraj', zip: '284 01', popular: true },
  { name: 'Náchod', region: 'Královéhradecký kraj', zip: '547 01', popular: true },
  { name: 'Jirkov', region: 'Ústecký kraj', zip: '431 11', popular: true },
  { name: 'Blansko', region: 'Jihomoravský kraj', zip: '678 01', popular: true },
  { name: 'Žatec', region: 'Ústecký kraj', zip: '438 01', popular: true },
  { name: 'Mělník', region: 'Středočeský kraj', zip: '276 01', popular: true },
  { name: 'Hranice', region: 'Olomoucký kraj', zip: '753 01', popular: true },
  { name: 'Beroun', region: 'Středočeský kraj', zip: '266 01', popular: true },
  { name: 'Louny', region: 'Ústecký kraj', zip: '440 01', popular: true },
  { name: 'Otrokovice', region: 'Zlínský kraj', zip: '765 02', popular: true },
  { name: 'Kralupy nad Vltavou', region: 'Středočeský kraj', zip: '278 01', popular: true },
  { name: 'Kadaň', region: 'Ústecký kraj', zip: '432 01', popular: true },
  { name: 'Bruntál', region: 'Moravskoslezský kraj', zip: '792 01', popular: true },
  { name: 'Ostrov', region: 'Karlovarský kraj', zip: '363 01', popular: true },
  { name: 'Svitavy', region: 'Pardubický kraj', zip: '568 02', popular: true },
  { name: 'Česká Třebová', region: 'Pardubický kraj', zip: '560 02', popular: true },
  { name: 'Rožnov pod Radhoštěm', region: 'Zlínský kraj', zip: '756 61', popular: true },
  { name: 'Uherský Brod', region: 'Zlínský kraj', zip: '688 01', popular: true },
  { name: 'Brandýs nad Labem-Stará Boleslav', region: 'Středočeský kraj', zip: '250 01', popular: true },
  { name: 'Neratovice', region: 'Středočeský kraj', zip: '277 11', popular: true },
  { name: 'Pelhřimov', region: 'Kraj Vysočina', zip: '393 01', popular: true },
  { name: 'Rakovník', region: 'Středočeský kraj', zip: '269 01', popular: true },
  { name: 'Nymburk', region: 'Středočeský kraj', zip: '288 02', popular: true },
  { name: 'Poděbrady', region: 'Středočeský kraj', zip: '290 01', popular: true },
  { name: 'Benešov', region: 'Středočeský kraj', zip: '256 01', popular: true },
  { name: 'Říčany', region: 'Středočeský kraj', zip: '251 01', popular: true },
  { name: 'Český Krumlov', region: 'Jihočeský kraj', zip: '381 01', popular: true },
  { name: 'Rokycany', region: 'Plzeňský kraj', zip: '337 01', popular: true },
  { name: 'Varnsdorf', region: 'Ústecký kraj', zip: '407 47', popular: true },
  { name: 'Turnov', region: 'Liberecký kraj', zip: '511 01', popular: true },
  { name: 'Jeseník', region: 'Olomoucký kraj', zip: '790 01', popular: true },
  { name: 'Roudnice nad Labem', region: 'Ústecký kraj', zip: '413 01', popular: true },
  { name: 'Ústí nad Orlicí', region: 'Pardubický kraj', zip: '562 01', popular: true },
  { name: 'Chodov', region: 'Karlovarský kraj', zip: '357 35', popular: true },
  { name: 'Klášterec nad Ohří', region: 'Ústecký kraj', zip: '431 51', popular: true },
  { name: 'Mariánské Lázně', region: 'Karlovarský kraj', zip: '353 01', popular: true },
  { name: 'Aš', region: 'Karlovarský kraj', zip: '352 01', popular: true },
  { name: 'Bílina', region: 'Ústecký kraj', zip: '418 01', popular: true },
  { name: 'Vrchlabí', region: 'Královéhradecký kraj', zip: '543 01', popular: true },
  { name: 'Vysoké Mýto', region: 'Pardubický kraj', zip: '566 01', popular: true },
  { name: 'Boskovice', region: 'Jihomoravský kraj', zip: '680 01', popular: true },
  { name: 'Kyjov', region: 'Jihomoravský kraj', zip: '697 01', popular: true },
  { name: 'Holešov', region: 'Zlínský kraj', zip: '769 01', popular: true },
  { name: 'Nový Bor', region: 'Liberecký kraj', zip: '473 01', popular: true },
  { name: 'Vlašim', region: 'Středočeský kraj', zip: '258 01', popular: true },
  { name: 'Domažlice', region: 'Plzeňský kraj', zip: '344 01', popular: true },
  { name: 'Tachov', region: 'Plzeňský kraj', zip: '347 01', popular: true },
  { name: 'Semily', region: 'Liberecký kraj', zip: '513 01', popular: true },
  { name: 'Prachatice', region: 'Jihočeský kraj', zip: '383 01', popular: true },
  { name: 'Sušice', region: 'Plzeňský kraj', zip: '342 01', popular: true },

  // Praha městské části
  { name: 'Praha 1 - Staré Město, Malá Strana', region: 'Hlavní město Praha', zip: '110 00' },
  { name: 'Praha 2 - Vinohrady, Vyšehrad', region: 'Hlavní město Praha', zip: '120 00' },
  { name: 'Praha 3 - Žižkov', region: 'Hlavní město Praha', zip: '130 00' },
  { name: 'Praha 4 - Nusle, Podolí, Krč, Chodov', region: 'Hlavní město Praha', zip: '140 00' },
  { name: 'Praha 5 - Smíchov, Košíře, Motol', region: 'Hlavní město Praha', zip: '150 00' },
  { name: 'Praha 6 - Dejvice, Bubeneč, Břevnov', region: 'Hlavní město Praha', zip: '160 00' },
  { name: 'Praha 7 - Holešovice, Letná', region: 'Hlavní město Praha', zip: '170 00' },
  { name: 'Praha 8 - Karlín, Libeň, Bohnice', region: 'Hlavní město Praha', zip: '180 00' },
  { name: 'Praha 9 - Vysočany, Prosek, Hloubětín', region: 'Hlavní město Praha', zip: '190 00' },
  { name: 'Praha 10 - Vršovice, Strašnice, Hostivař', region: 'Hlavní město Praha', zip: '100 00' },
  { name: 'Praha 11 - Jižní Město, Opatov, Háje', region: 'Hlavní město Praha', zip: '149 00' },
  { name: 'Praha 13 - Stodůlky, Lužiny, Nové Butovice', region: 'Hlavní město Praha', zip: '158 00' },
  { name: 'Praha 14 - Černý Most, Hloubětín', region: 'Hlavní město Praha', zip: '198 00' },

  // Brno městské části
  { name: 'Brno - Střed', region: 'Brno-město', zip: '602 00' },
  { name: 'Brno - Královo Pole', region: 'Brno-město', zip: '612 00' },
  { name: 'Brno - Žabovřesky', region: 'Brno-město', zip: '616 00' },
  { name: 'Brno - Bystrc', region: 'Brno-město', zip: '635 00' },
  { name: 'Brno - Líšeň', region: 'Brno-město', zip: '628 00' },
  { name: 'Brno - Bohunice', region: 'Brno-město', zip: '625 00' },
  { name: 'Brno - Sever (Lesná, Husovice)', region: 'Brno-město', zip: '638 00' },

  // Ostrava městské části
  { name: 'Ostrava - Moravská Ostrava a Přívoz', region: 'Ostrava-město', zip: '702 00' },
  { name: 'Ostrava - Poruba', region: 'Ostrava-město', zip: '708 00' },
  { name: 'Ostrava - Jih (Hrabůvka, Dubina)', region: 'Ostrava-město', zip: '700 30' },
  { name: 'Ostrava - Mariánské Hory', region: 'Ostrava-město', zip: '709 00' }
];

/**
 * Normalize string by stripping accents/diacritics and converting to lowercase
 */
export function normalizeCzechText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Search curated Czech cities with instant matching and ranking
 */
export function searchCzechCities(query: string, limit = 6): CzechCity[] {
  const clean = normalizeCzechText(query);
  if (!clean || clean.length < 1) return [];

  return POPULAR_CZECH_CITIES
    .filter((city) => {
      const cityName = normalizeCzechText(city.name);
      const region = normalizeCzechText(city.region);
      const zip = city.zip ? city.zip.replace(/\s+/g, '') : '';
      const cleanNoSpaces = clean.replace(/\s+/g, '');

      return (
        cityName.includes(clean) ||
        region.includes(clean) ||
        (zip && zip.includes(cleanNoSpaces))
      );
    })
    .sort((a, b) => {
      const aName = normalizeCzechText(a.name);
      const bName = normalizeCzechText(b.name);

      // Exact startsWith gets highest priority
      const aStarts = aName.startsWith(clean);
      const bStarts = bName.startsWith(clean);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // Popularity
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;

      return a.name.localeCompare(b.name, 'cs');
    })
    .slice(0, limit);
}
