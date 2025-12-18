
export const cityData = [
    { name: 'Hamburg', slug: 'hamburg', zip: '20095', state: 'Hamburg' },
    { name: 'Lübeck', slug: 'luebeck', zip: '23552', state: 'Schleswig-Holstein' },
    { name: 'Kiel', slug: 'kiel', zip: '24103', state: 'Schleswig-Holstein' },
    { name: 'Rostock', slug: 'rostock', zip: '18055', state: 'Mecklenburg-Vorpommern' },
    { name: 'Schwerin', slug: 'schwerin', zip: '19053', state: 'Mecklenburg-Vorpommern' },
    { name: 'Neumünster', slug: 'neumuenster', zip: '24534', state: 'Schleswig-Holstein' },
    { name: 'Norderstedt', slug: 'norderstedt', zip: '22846', state: 'Schleswig-Holstein' },
    { name: 'Elmshorn', slug: 'elmshorn', zip: '25335', state: 'Schleswig-Holstein' },
    { name: 'Stade', slug: 'stade', zip: '21680', state: 'Niedersachsen' },
    { name: 'Lüneburg', slug: 'lueneburg', zip: '21335', state: 'Niedersachsen' },
    { name: 'Wismar', slug: 'wismar', zip: '23966', state: 'Mecklenburg-Vorpommern' },
    { name: 'Güstrow', slug: 'guestrow', zip: '18273', state: 'Mecklenburg-Vorpommern' },
    { name: 'Bad Segeberg', slug: 'bad-segeberg', zip: '23795', state: 'Schleswig-Holstein' },
    { name: 'Eutin', slug: 'eutin', zip: '23701', state: 'Schleswig-Holstein' },
    { name: 'Rendsburg', slug: 'rendsburg', zip: '24768', state: 'Schleswig-Holstein' },
    { name: 'Eckernförde', slug: 'eckernfoerde', zip: '24340', state: 'Schleswig-Holstein' },
    { name: 'Plön', slug: 'ploen', zip: '24306', state: 'Schleswig-Holstein' },
    { name: 'Oldenburg in Holstein', slug: 'oldenburg-holstein', zip: '23758', state: 'Schleswig-Holstein' },
    { name: 'Neustadt in Holstein', slug: 'neustadt-holstein', zip: '23730', state: 'Schleswig-Holstein' },
    { name: 'Ahrensburg', slug: 'ahrensburg', zip: '22926', state: 'Schleswig-Holstein' }
];

export const getCityBySlug = (slug) => cityData.find(city => city.slug === slug);
