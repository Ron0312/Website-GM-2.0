import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { TrendingUp, Clock, ArrowUpFromLine, ArrowDownToLine, ShieldCheck, BookOpen, Phone, ChevronDown, ArrowRight, X, Menu, BadgeCheck, Star, Calculator, Zap, Info, Flame, Droplets, Leaf, Trees, ArrowLeft, Ruler, Weight, Check, Download, Tractor, Factory, Truck, MapPin, CheckCircle, Coins, Heart, AlertTriangle, Settings, Home, Wrench, Lock, Unlock, ChevronRight, Send, Sparkles, RefreshCw, Building2, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
const tankDetails = [
  {
    slug: "1-2t-oberirdisch",
    name: "1,2 t Flüssiggastank (oberirdisch)",
    type: "oberirdisch",
    capacity: "1,2 t",
    volume: "2.700 Liter",
    dimensions: "2,50 x 1,25 m",
    weight: "550 kg",
    power: "35 kW",
    image: null,
    description: "Der kompakte 1,2 t Flüssiggastank ist die ideale Lösung für Ferienhäuser, kleine Einfamilienhäuser oder als Zusatzheizung. Durch seine geringen Abmessungen findet er auch in kleineren Gärten Platz.",
    features: [
      "Ideal für geringen Platzbedarf",
      "Schnelle und einfache Aufstellung",
      "Kostengünstige Installation",
      "Gut geeignet für Niedrigenergiehäuser"
    ],
    technicalData: {
      "Durchmesser": "1.250 mm",
      "Länge": "2.500 mm",
      "Gewicht": "ca. 550 kg",
      "Volumen": "2.700 Liter",
      "Füllmenge": "ca. 2.160 Liter (bei 85%)",
      "Material": "Feinkornbaustahl",
      "Beschichtung": "Epoxidharz-Beschichtung (hellgrün)"
    },
    installation: "Aufgrund des Gewichts ist ein solides Fundament zwingend erforderlich. Kranwagen für Aufstellung notwendig. gasmöller liefert bei Bedarf eine Fundamentplatte mit (gegen Aufpreis). Außerdem unterstützen wir Sie durch unsere Partner beim Anschluss der Heizung oder bei Erdarbeiten.",
    seoTitle: "1,2 t Flüssiggastank oberirdisch kaufen | Maße & Preis | gasmöller",
    seoDesc: "Kleiner 1,2t Flüssiggastank (2700l) oberirdisch. Ideal für Ferienhäuser. Alle Maße, Daten & Preise. Jetzt Angebot anfordern!"
  },
  {
    slug: "2-1t-oberirdisch",
    name: "2,1 t Flüssiggastank (oberirdisch)",
    type: "oberirdisch",
    capacity: "2,1 t",
    volume: "4.850 Liter",
    dimensions: "4,30 x 1,25 m",
    weight: "980 kg",
    power: "60 kW",
    image: null,
    description: "Unser Standard-Tank für das klassische Einfamilienhaus. Mit 4.850 Litern Volumen deckt dieser Tank in der Regel den Jahresbedarf eines 4-Personen-Haushalts ab, sodass Sie nur einmal im Jahr tanken müssen.",
    features: [
      "Der Klassiker für Eigenheime",
      "Nur 1x jährlich tanken (bei Standard-Verbrauch)",
      "Robust und langlebig",
      "Gutes Preis-Leistungs-Verhältnis"
    ],
    technicalData: {
      "Durchmesser": "1.250 mm",
      "Länge": "4.300 mm",
      "Gewicht": "ca. 980 kg",
      "Volumen": "4.850 Liter",
      "Füllmenge": "ca. 4.100 Liter (bei 85%)",
      "Material": "Feinkornbaustahl",
      "Beschichtung": "Epoxidharz-Beschichtung (hellgrün)"
    },
    installation: "Aufgrund des Gewichts ist ein solides Fundament zwingend erforderlich. Kranwagen für Aufstellung notwendig. gasmöller liefert bei Bedarf eine Fundamentplatte mit (gegen Aufpreis). Außerdem unterstützen wir Sie durch unsere Partner beim Anschluss der Heizung oder bei Erdarbeiten.",
    seoTitle: "2,1 t Flüssiggastank oberirdisch | Standardgröße für EFH | gasmöller",
    seoDesc: "2,1t (4850l) Flüssiggastank oberirdisch kaufen. Der Standard für Einfamilienhäuser. Maße, Technische Daten & Installation."
  },
  {
    slug: "2-9t-oberirdisch",
    name: "2,9 t Flüssiggastank (oberirdisch)",
    type: "oberirdisch",
    capacity: "2,9 t",
    volume: "6.400 Liter",
    dimensions: "5,50 x 1,25 m",
    weight: "1.300 kg",
    power: "90 kW",
    image: null,
    description: "Der Maxi-Tank für Mehrfamilienhäuser, große Villen oder gewerbliche Anwendungen. Er bietet maximale Unabhängigkeit und Versorgungssicherheit auch bei hohem Verbrauch.",
    features: [
      "Großes Speichervolumen",
      "Für Mehrfamilienhäuser und Gewerbe",
      "Seltenes Nachtanken",
      "Auch für Prozesswärme geeignet"
    ],
    technicalData: {
      "Durchmesser": "1.250 mm",
      "Länge": "5.500 mm",
      "Gewicht": "ca. 1.300 kg",
      "Volumen": "6.400 Liter",
      "Füllmenge": "ca. 5.400 Liter (bei 85%)",
      "Material": "Feinkornbaustahl",
      "Beschichtung": "Epoxidharz-Beschichtung (hellgrün)"
    },
    installation: "Aufgrund des Gewichts ist ein solides Fundament zwingend erforderlich. Kranwagen für Aufstellung notwendig. gasmöller liefert bei Bedarf eine Fundamentplatte mit (gegen Aufpreis). Außerdem unterstützen wir Sie durch unsere Partner beim Anschluss der Heizung oder bei Erdarbeiten.",
    seoTitle: "2,9 t Flüssiggastank oberirdisch | Großtank für Gewerbe | gasmöller",
    seoDesc: "2,9t (6400l) Flüssiggastank oberirdisch. Für MFH & Gewerbe. Maximale Kapazität. Alle technischen Daten hier."
  },
  {
    slug: "1-2t-unterirdisch",
    name: "1,2 t Flüssiggastank (unterirdisch)",
    type: "unterirdisch",
    capacity: "1,2 t",
    volume: "2.700 Liter",
    dimensions: "2,50 x 1,25 m",
    weight: "600 kg",
    power: "35 kW",
    image: null,
    description: "Die unsichtbare Lösung für kleine Gärten. Der 1,2 t Tank verschwindet komplett unter der Erde, nur der Domdeckel bleibt sichtbar. Perfekt, wenn die Optik des Gartens nicht gestört werden soll.",
    features: [
      "Unsichtbar im Garten",
      "Begehbar (Deckel)",
      "Platzsparend",
      "Ideal bei kleinen Grundstücken"
    ],
    technicalData: {
      "Durchmesser": "1.250 mm",
      "Länge": "2.500 mm",
      "Gewicht": "ca. 600 kg",
      "Volumen": "2.700 Liter",
      "Füllmenge": "ca. 2.160 Liter (bei 85%)",
      "Material": "Feinkornbaustahl",
      "Beschichtung": "Epoxidharz-Beschichtung (hellgrün)"
    },
    installation: "Erfordert Erdarbeiten (Grube). Der Tank wird in ein Sandbett gelegt. Auftriebssicherung bei hohem Grundwasser beachten. Wir unterstützen Sie gerne bei der Planung und vermitteln qualifizierte Partner für Erdarbeiten.",
    seoTitle: "1,2 t Flüssiggastank unterirdisch | Unsichtbar & Platzsparend",
    seoDesc: "Unterirdischer 1,2t Tank (2700l). Perfekt für kleine Gärten. Verschwindet im Boden. Jetzt informieren & Angebot holen."
  },
  {
    slug: "2-1t-unterirdisch",
    name: "2,1 t Flüssiggastank (unterirdisch)",
    type: "unterirdisch",
    capacity: "2,1 t",
    volume: "4.850 Liter",
    dimensions: "4,30 x 1,25 m",
    weight: "1.100 kg",
    power: "60 kW",
    image: null,
    description: "Der beliebteste unterirdische Tank. Er kombiniert das Volumen für ein klassisches Einfamilienhaus mit der unauffälligen Optik einer Erddeckung. Die Gartenfläche bleibt nutzbar.",
    features: [
      "Standardgröße für EFH",
      "Keine Störung der Gartenoptik",
      "Hohe Sicherheit",
      "Wertsteigerung der Immobilie"
    ],
    technicalData: {
      "Durchmesser": "1.250 mm",
      "Länge": "4.300 mm",
      "Gewicht": "ca. 1.100 kg",
      "Volumen": "4.850 Liter",
      "Füllmenge": "ca. 4.100 Liter (bei 85%)",
      "Material": "Feinkornbaustahl",
      "Beschichtung": "Epoxidharz-Beschichtung (hellgrün)"
    },
    installation: "Einbau in eine Baugrube, Einbettung in steinfreien Sand. Domschacht bleibt zugänglich für Befüllung und Wartung. Wir unterstützen Sie gerne bei der Planung und vermitteln qualifizierte Partner für Erdarbeiten.",
    seoTitle: "2,1 t Flüssiggastank unterirdisch | Der Standard für EFH",
    seoDesc: "2,1t (4850l) Erdtank kaufen. Unsichtbare Energieversorgung für Ihr Einfamilienhaus. Maße & Einbau-Infos."
  },
  {
    slug: "2-9t-unterirdisch",
    name: "2,9 t Flüssiggastank (unterirdisch)",
    type: "unterirdisch",
    capacity: "2,9 t",
    volume: "6.400 Liter",
    dimensions: "5,50 x 1,25 m",
    weight: "1.500 kg",
    power: "90 kW",
    image: null,
    description: "Maximale Energie, unsichtbar gelagert. Für große Objekte mit hohem Wärmebedarf, die keine Kompromisse bei der Ästhetik eingehen wollen.",
    features: [
      "Höchste Kapazität",
      "Vollständig verdeckt",
      "Für gehobene Ansprüche",
      "Sicher und langlebig"
    ],
    technicalData: {
      "Durchmesser": "1.250 mm",
      "Länge": "5.500 mm",
      "Gewicht": "ca. 1.500 kg",
      "Volumen": "6.400 Liter",
      "Füllmenge": "ca. 5.400 Liter (bei 85%)",
      "Material": "Feinkornbaustahl",
      "Beschichtung": "Epoxidharz-Beschichtung (hellgrün)"
    },
    installation: "Große Baugrube erforderlich. Professionelle Einbringung mit Kran. Ideal in der Bauphase zu installieren. Wir unterstützen Sie gerne bei der Planung und vermitteln qualifizierte Partner für Erdarbeiten.",
    seoTitle: "2,9 t Flüssiggastank unterirdisch | Großtank für Profis",
    seoDesc: "2,9t (6400l) Flüssiggastank für den Erdeinbau. Für Gewerbe & Mehrfamilienhäuser. Technische Daten & Preise."
  }
];
const SITE_URL = "https://www.gasmoeller.de";
const DEFAULT_IMAGE = `${SITE_URL}/logos/Icon-01.webp`;
const seoData = {
  "start": {
    title: "gasmöller - Ihr Partner für Flüssiggas im Norden",
    description: "Unabhängig. Fair. Norddeutsch. Flüssiggastanks kaufen statt mieten. Ihr Experte seit 2005. Jetzt Angebot anfordern!",
    image: `${SITE_URL}/images/gas-order-hero.webp`
    // Hero image
  },
  "tanks": {
    title: "Flüssiggastank kaufen | Oberirdisch & Unterirdisch | gasmöller",
    description: "Kaufen Sie Ihren Flüssiggastank statt zu mieten. 1,2t, 2,1t und 2,9t Tanks verfügbar. Unabhängigkeit von großen Versorgern.",
    image: DEFAULT_IMAGE
  },
  "gas": {
    title: "Flüssiggas bestellen | Aktuelle Preise & Lieferung | gasmöller",
    description: "Flüssiggas günstig bestellen. Lieferung in Schleswig-Holstein, Hamburg & Niedersachsen. Fairer Preis, schnelle Lieferung.",
    image: `${SITE_URL}/images/gas-order-hero.webp`
  },
  "wissen": {
    title: "Wissen & Ratgeber | Alles über Flüssiggas | gasmöller",
    description: "Ratgeber zu Flüssiggas, Tanksicherheit, Prüfintervalle und Energiespartipps. Informieren Sie sich hier.",
    image: DEFAULT_IMAGE
  },
  "gewerbe": {
    title: "Gewerbegas & Prozesswärme | gasmöller",
    description: "Individuelle Flüssiggas-Lösungen für Gewerbe, Landwirtschaft und Industrie. Prozesswärme, Hallenheizung und mehr.",
    image: DEFAULT_IMAGE
  },
  "ueber-uns": {
    title: "Über gasmöller | Ihr unabhängiger Energieversorger",
    description: "Lernen Sie gasmöller kennen. Seit 2005 Ihr zuverlässiger Partner für Flüssiggas im Norden. Unser Team und unsere Werte.",
    image: DEFAULT_IMAGE
  },
  "kontakt": {
    title: "Kontakt | gasmöller Kundenservice",
    description: "Kontaktieren Sie uns. Telefonisch unter 04551 89 70 89 oder per E-Mail. Wir beraten Sie gerne kostenlos.",
    image: DEFAULT_IMAGE
  },
  "rechner": {
    title: "Spar-Rechner | Flüssiggas Kostenvergleich | gasmöller",
    description: "Vergleichen Sie Ihre aktuellen Flüssiggaskosten. Sehen Sie, wie viel Sie mit einem eigenen Tank sparen können.",
    image: DEFAULT_IMAGE
  },
  "pruefungen": {
    title: "Tankprüfungen & Service | Äußere & Innere Prüfung | gasmöller",
    description: "Gesetzliche Tankprüfungen (2 & 10 Jahre) für Flüssiggastanks. Zuverlässiger Service, faire Preise. Jetzt Termin vereinbaren.",
    image: DEFAULT_IMAGE
  }
};
const getSeoForPath = (path) => {
  const cleanPath = path.replace(/^\//, "");
  let data = {
    title: seoData["start"].title,
    description: seoData["start"].description,
    image: seoData["start"].image,
    url: `${SITE_URL}/${cleanPath}`,
    type: "website"
  };
  if (cleanPath.startsWith("tanks/")) {
    const slug = cleanPath.split("/")[1];
    const tank = tankDetails.find((t) => t.slug === slug);
    if (tank) {
      data = {
        title: tank.seoTitle || `${tank.name} kaufen | gasmöller`,
        description: tank.seoDesc || `Kaufen Sie den ${tank.name}. ${tank.capacity} Kapazität.`,
        image: tank.image || DEFAULT_IMAGE,
        url: `${SITE_URL}/${cleanPath}`,
        type: "product"
      };
    }
  } else {
    let section = "start";
    if (cleanPath === "" || cleanPath === "index.html") section = "start";
    else {
      const p = cleanPath.replace(/\/$/, "").replace(/\.html$/, "").toLowerCase();
      if (seoData[p]) section = p;
    }
    if (seoData[section]) {
      data = {
        ...data,
        ...seoData[section],
        url: section === "start" ? SITE_URL : `${SITE_URL}/${section}`
      };
    }
  }
  return data;
};
const TopBar = () => /* @__PURE__ */ jsx("div", { className: "bg-gas-dark text-white text-xs py-2 hidden lg:block border-b border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 flex justify-between items-center", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex space-x-6", children: [
    /* @__PURE__ */ jsxs("span", { className: "flex items-center text-white/80", children: [
      /* @__PURE__ */ jsx(TrendingUp, { size: 12, className: "mr-1.5 text-green-400" }),
      " Preistendenz: ",
      /* @__PURE__ */ jsx("strong", { className: "text-white ml-1", children: "Stabil / Sinkend" })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "flex items-center text-white/80", children: [
      /* @__PURE__ */ jsx(Clock, { size: 12, className: "mr-1.5" }),
      " Heute geöffnet bis 17:00"
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "flex space-x-6", children: [
    /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors text-white/80", children: "Kundenportal Login" }),
    /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors text-white/80", children: "Karriere" })
  ] })
] }) });
const Navigation = ({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen, openWizard }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedMobileItems, setExpandedMobileItems] = useState({});
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleMobileItem = (id) => {
    setExpandedMobileItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const navLinks = [
    { id: "start", label: "Startseite" },
    {
      id: "tanks",
      label: "Tanks & Kauf",
      dropdownType: "mega",
      subLinks: [
        {
          label: "Oberirdisch",
          id: "oberirdisch",
          icon: ArrowUpFromLine,
          items: [
            { id: "tanks/1-2t-oberirdisch", label: "1,2 t Tank (2700 L)" },
            { id: "tanks/2-1t-oberirdisch", label: "2,1 t Tank (4850 L)" },
            { id: "tanks/2-9t-oberirdisch", label: "2,9 t Tank (6400 L)" }
          ]
        },
        {
          label: "Unterirdisch",
          id: "unterirdisch",
          icon: ArrowDownToLine,
          items: [
            { id: "tanks/1-2t-unterirdisch", label: "1,2 t Tank (2700 L)" },
            { id: "tanks/2-1t-unterirdisch", label: "2,1 t Tank (4850 L)" },
            { id: "tanks/2-9t-unterirdisch", label: "2,9 t Tank (6400 L)" }
          ]
        }
      ]
    },
    { id: "gas", label: "Gas bestellen" },
    {
      id: "service",
      label: "Service",
      dropdownType: "simple",
      subLinks: [
        { id: "pruefungen", label: "Prüfungen & Sicherheit", description: "TÜV & Wartung", icon: ShieldCheck },
        { id: "wissen", label: "Wissen & Ratgeber", description: "FAQ & Tipps", icon: BookOpen },
        { id: "kontakt", label: "Kontakt & Notfall", description: "Wir sind für Sie da", icon: Phone }
      ]
    },
    { id: "gewerbe", label: "Gewerbe" },
    { id: "ueber-uns", label: "Über Uns" }
  ];
  const handleLinkClick = (link) => {
    if (!link.subLinks) {
      setActiveSection(link.id);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 w-full z-50 font-sans", children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsx("nav", { className: `transition-all duration-300 border-b border-white/10 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-white py-4"}`, children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center cursor-pointer", onClick: () => setActiveSection("start"), children: /* @__PURE__ */ jsx("img", { src: "/logos/Icon-01.webp", alt: "gasmöller", width: "2222", height: "747", className: `transition-all duration-300 w-auto ${isScrolled ? "h-10" : "h-12"}` }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden xl:flex space-x-1 bg-gray-50/50 p-1 rounded-full border border-gray-100", children: navLinks.map((link) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative group",
          onMouseEnter: () => link.subLinks && setOpenDropdown(link.id),
          onMouseLeave: () => setOpenDropdown(null),
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleLinkClick(link),
                className: `
                                            ${activeSection === link.id || link.subLinks && activeSection.startsWith(link.id) ? "bg-white text-gas shadow-sm font-bold" : "text-gray-500 hover:text-gas hover:bg-white/50"}
                                            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center whitespace-nowrap
                                        `,
                children: [
                  link.label,
                  link.subLinks && /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: "ml-1 opacity-50 group-hover:rotate-180 transition-transform duration-300" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(AnimatePresence, { children: openDropdown === link.id && link.subLinks && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 10, scale: 0.98 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 10, scale: 0.98 },
                transition: { duration: 0.2 },
                className: "absolute left-0 top-full pt-4 w-auto min-w-full z-50",
                children: link.dropdownType === "mega" ? /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-xl shadow-gas/5 border border-gray-100 overflow-hidden flex w-[600px] p-2", children: link.subLinks.map((group, idx) => /* @__PURE__ */ jsx("div", { className: "w-1/2 p-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-4 h-full border border-gray-100/50 hover:border-gas-light/50 transition-colors", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-4 text-gas", children: [
                    group.icon && /* @__PURE__ */ jsx(group.icon, { size: 24 }),
                    /* @__PURE__ */ jsx("span", { className: "font-bold text-lg text-gray-900", children: group.label })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-1", children: group.items.map((sub) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => {
                        setActiveSection(sub.id);
                        setOpenDropdown(null);
                      },
                      className: "block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-white hover:text-gas hover:shadow-sm transition-all",
                      children: sub.label
                    },
                    sub.id
                  )) })
                ] }) }, idx)) }) : (
                  /* SIMPLE MENU (Service) */
                  /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl shadow-xl shadow-gas/5 border border-gray-100 overflow-hidden p-2 w-72", children: link.subLinks.map((sub) => /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => {
                        setActiveSection(sub.id);
                        setOpenDropdown(null);
                      },
                      className: "w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors group/item flex items-start space-x-4",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "bg-gas-light/30 text-gas p-2 rounded-lg group-hover/item:bg-gas group-hover/item:text-white transition-colors", children: sub.icon && /* @__PURE__ */ jsx(sub.icon, { size: 20 }) }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gray-900 group-hover/item:text-gas transition-colors", children: sub.label }),
                          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-0.5", children: sub.description })
                        ] })
                      ]
                    },
                    sub.id
                  )) })
                )
              }
            ) })
          ]
        },
        link.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs("a", { href: "tel:04551897089", className: "flex flex-col items-end text-right mr-2 group", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-gray-400 tracking-wider group-hover:text-gas transition-colors", children: "Kostenlose Beratung" }),
          /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-gas leading-none", children: "04551 89 70 89" })
        ] }),
        /* @__PURE__ */ jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => openWizard ? openWizard("tank") : setActiveSection("kontakt"), className: "bg-gas hover:bg-gas-dark text-white px-6 py-3 rounded-full shadow-lg shadow-gas/20 font-bold text-sm uppercase tracking-wider transition-all flex items-center", children: [
          "Angebot ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "ml-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "xl:hidden flex items-center", children: /* @__PURE__ */ jsx("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "text-gray-800 hover:text-gas p-2", children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 28 }) : /* @__PURE__ */ jsx(Menu, { size: 28 }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl overflow-hidden z-40 max-h-[85vh] overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-2", children: [
      navLinks.map((link) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              if (!link.subLinks) {
                setActiveSection(link.id);
                setMobileMenuOpen(false);
              } else {
                toggleMobileItem(link.id);
              }
            },
            className: "w-full text-left px-5 py-4 text-lg font-bold text-gray-900 flex justify-between items-center hover:bg-gray-100 transition-colors",
            children: [
              link.label,
              link.subLinks && /* @__PURE__ */ jsx(ChevronDown, { size: 20, className: `text-gray-400 transition-transform duration-300 ${expandedMobileItems[link.id] ? "rotate-180" : ""}` })
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: link.subLinks && expandedMobileItems[link.id] && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            className: "border-t border-gray-200/50",
            children: /* @__PURE__ */ jsx("div", { className: "px-5 py-4 space-y-4 bg-gray-50/50", children: link.dropdownType === "mega" ? link.subLinks.map((group, idx) => /* @__PURE__ */ jsxs("div", { className: "mb-4 last:mb-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-gas uppercase tracking-wider mb-2 flex items-center", children: [
                group.icon && /* @__PURE__ */ jsx(group.icon, { size: 14, className: "mr-2" }),
                " ",
                group.label
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2", children: group.items.map((sub) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setActiveSection(sub.id);
                    setMobileMenuOpen(false);
                  },
                  className: "block w-full text-left py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-gas shadow-sm border border-transparent hover:border-gray-100 transition-all",
                  children: sub.label
                },
                sub.id
              )) })
            ] }, idx)) : (
              /* Logic for Simple Menu in Mobile */
              link.subLinks.map((sub) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    setActiveSection(sub.id);
                    setMobileMenuOpen(false);
                  },
                  className: "flex items-center w-full text-left py-3 px-3 rounded-xl hover:bg-white text-base text-gray-600 transition-colors border border-transparent hover:border-gray-100 hover:shadow-sm",
                  children: [
                    sub.icon && /* @__PURE__ */ jsx(sub.icon, { size: 18, className: "mr-3 text-gas-light" }),
                    sub.label
                  ]
                },
                sub.id
              ))
            ) })
          }
        ) })
      ] }, link.id)),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        openWizard ? openWizard("tank") : setActiveSection("kontakt");
        setMobileMenuOpen(false);
      }, className: "w-full text-center px-4 py-4 text-lg font-bold text-white bg-gas rounded-xl mt-4 shadow-lg shadow-gas/20", children: "Jetzt Angebot anfordern" })
    ] }) }) })
  ] });
};
const Hero = ({ setActiveSection, openWizard }) => /* @__PURE__ */ jsxs("header", { className: "relative bg-white pt-48 pb-24 lg:pt-64 lg:pb-48 overflow-hidden", children: [
  /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-900/10 z-10" }),
    /* @__PURE__ */ jsx("img", { src: "/images/gas-order-hero.webp", alt: "Landschaft Norddeutschland", width: "1920", height: "1080", className: "w-full h-full object-cover absolute inset-0" })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20", children: /* @__PURE__ */ jsx("div", { className: "lg:grid lg:grid-cols-2 lg:gap-20 items-center", children: /* @__PURE__ */ jsx("div", { className: "text-left text-white", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [
    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full mb-8 shadow-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
      /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold uppercase tracking-widest", children: "Seit 2005 · Norddeutsch · Ehrlich" })
    ] }),
    /* @__PURE__ */ jsxs("h1", { className: "text-6xl tracking-tight font-extrabold sm:text-7xl lg:text-8xl mb-8 leading-tight drop-shadow-lg", children: [
      "Energie.",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300", children: "Freiheit." })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-xl text-gray-100 leading-relaxed mb-10 max-w-lg font-medium drop-shadow-md", children: "Schluss mit teuren Mietverträgen. Werden Sie Eigentümer Ihres Tanks und kaufen Sie Gas, wo es am günstigsten ist." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => openWizard ? openWizard("tank") : setActiveSection("tanks"), className: "px-8 py-4 bg-gas hover:bg-gas-dark text-white text-base font-bold rounded-full shadow-xl shadow-gas/30 transition-all uppercase tracking-wide border-2 border-transparent", children: "Tank kaufen" }),
      /* @__PURE__ */ jsx(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => openWizard ? openWizard("gas") : setActiveSection("gas"), className: "px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gas text-base font-bold rounded-full shadow-lg transition-all uppercase tracking-wide flex items-center justify-center backdrop-blur-sm", children: "Gas bestellen" })
    ] })
  ] }) }) }) })
] });
const TrustBar = () => /* @__PURE__ */ jsxs("div", { className: "bg-white py-8 md:py-12 border-b border-gray-100 relative z-30 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-around space-y-6 md:space-y-0 px-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity w-full md:w-auto justify-start md:justify-center", children: [
    /* @__PURE__ */ jsx(ShieldCheck, { size: 40, className: "text-gas flex-shrink-0" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "font-bold text-lg text-gray-800", children: "TÜV Geprüft" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Sicherheit & Qualität" })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "h-px w-full bg-gray-100 md:hidden" }),
  /* @__PURE__ */ jsx("div", { className: "h-10 w-px bg-gray-200 hidden md:block" }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity w-full md:w-auto justify-start md:justify-center", children: [
    /* @__PURE__ */ jsx(BadgeCheck, { size: 40, className: "text-gas flex-shrink-0" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "font-bold text-lg text-gray-800", children: "DIN 51622" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Reinste Propan-Qualität" })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "h-px w-full bg-gray-100 md:hidden" }),
  /* @__PURE__ */ jsx("div", { className: "h-10 w-px bg-gray-200 hidden md:block" }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity w-full md:w-auto justify-start md:justify-center", children: [
    /* @__PURE__ */ jsx(Star, { size: 40, className: "text-gas flex-shrink-0" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "font-bold text-lg text-gray-800", children: "5.0 / 5.0" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Kundenzufriedenheit" })
    ] })
  ] })
] });
const TankCard = ({ tank, onContact }) => {
  let scaleClass = "w-24";
  if (tank.capacity === "2,1 t") scaleClass = "w-32";
  if (tank.capacity === "2,9 t") scaleClass = "w-40";
  return /* @__PURE__ */ jsxs(motion.div, { whileHover: { y: -8 }, className: `bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${tank.highlight ? "border-2 border-gas ring-4 ring-gas/10 shadow-2xl relative z-10" : "border border-gray-100 shadow-lg hover:shadow-xl"}`, children: [
    tank.highlight && /* @__PURE__ */ jsx("div", { className: "bg-gas text-white text-[10px] font-bold uppercase text-center py-1.5 tracking-widest", children: "Empfehlung" }),
    /* @__PURE__ */ jsxs("div", { className: "h-48 bg-gray-50 flex items-center justify-center p-6 relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-gray-500 border border-gray-100", children: tank.capacity }),
      /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 60", className: `${scaleClass} h-auto text-gray-300 fill-current drop-shadow-lg transition-all duration-300`, loading: "lazy", children: [
        /* @__PURE__ */ jsx("rect", { x: "10", y: "15", width: "80", height: "30", rx: "10" }),
        /* @__PURE__ */ jsx("rect", { x: "5", y: "25", width: "5", height: "10" }),
        /* @__PURE__ */ jsx("rect", { x: "90", y: "25", width: "5", height: "10" }),
        /* @__PURE__ */ jsx("rect", { x: "40", y: "10", width: "20", height: "5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 text-center flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-text mb-1", children: tank.name }),
      /* @__PURE__ */ jsx("p", { className: "text-gas font-bold text-xs mb-4 tracking-wide", children: tank.size }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs mb-6 leading-relaxed min-h-[40px]", children: tank.usage }),
      /* @__PURE__ */ jsx("button", { onClick: onContact, className: `w-full py-3 rounded-xl font-bold text-sm transition-all ${tank.highlight ? "bg-gas text-white hover:bg-gas-dark shadow-lg shadow-gas/20" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`, children: "Jetzt anfragen" })
    ] })
  ] });
};
const FACTORS = {
  kwh: 1,
  lpg_kg: 13.98,
  lpg_m3_gas: 28.1,
  lpg_l_liquid: 7.105,
  nat_gas_m3: 10,
  oil_l: 9.7,
  pellets_kg: 4.9,
  wood_hard_rm: 2100,
  // Buche, Eiche, etc.
  wood_soft_rm: 1500
  // Fichte, Kiefer, etc.
};
const CalculatorInput = ({ label, value, unit, onChange, icon: Icon, active, onFocus, onBlur }) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
    /* @__PURE__ */ jsx("label", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block pl-1", children: label }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `
                    flex items-center bg-white p-3 rounded-xl border-2 transition-all duration-200
                    ${active ? "border-gas shadow-lg shadow-gas/10 scale-[1.02]" : "border-gray-100 hover:border-gray-200"}
                `,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              inputMode: "decimal",
              value,
              onChange: (e) => onChange(e.target.value),
              onFocus,
              onBlur,
              className: "w-full text-xl md:text-2xl font-bold text-gray-800 outline-none bg-transparent placeholder-gray-200 font-mono",
              placeholder: "0",
              "aria-label": `${label} in ${unit}`
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 ml-2 pl-2 border-l border-gray-100", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-medium text-sm whitespace-nowrap", children: unit }),
            Icon && /* @__PURE__ */ jsx(Icon, { size: 18, className: `${active ? "text-gas" : "text-gray-300"}` })
          ] })
        ]
      }
    )
  ] });
};
const EnergyCalculator = () => {
  const [energyKwh, setEnergyKwh] = useState(9600);
  const [activeField, setActiveField] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const formatNumber = (num) => {
    if (!num && num !== 0) return "";
    return num.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const parseNumber = (str) => {
    if (!str) return 0;
    const normalized = str.replace(/\./g, "").replace(",", ".");
    return parseFloat(normalized) || 0;
  };
  const handleFocus = (field, currentVal) => {
    setActiveField(field);
    setInputValue(formatNumber(currentVal));
  };
  const handleChange = (val) => {
    setInputValue(val);
    const num = parseNumber(val);
    const factor = FACTORS[activeField];
    if (!isNaN(num)) {
      setEnergyKwh(num * factor);
    }
  };
  const getValue = (field) => {
    if (activeField === field) {
      return inputValue;
    }
    const val = energyKwh / FACTORS[field];
    return formatNumber(val);
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden my-8 md:my-12 transition-all",
      id: "calculator",
      itemScope: true,
      itemType: "http://schema.org/SoftwareApplication",
      children: [
        /* @__PURE__ */ jsx("meta", { itemProp: "name", content: "Energie-Vergleichsrechner" }),
        /* @__PURE__ */ jsx("meta", { itemProp: "applicationCategory", content: "UtilityApplication" }),
        /* @__PURE__ */ jsx("meta", { itemProp: "operatingSystem", content: "Web Browser" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsExpanded(!isExpanded),
            className: "w-full text-left bg-gradient-to-r from-gas to-gas-dark p-6 md:p-8 text-white relative overflow-hidden group focus:outline-none md:cursor-default",
            "aria-expanded": isExpanded,
            "aria-controls": "calculator-content",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-8 opacity-10 transform group-hover:scale-110 transition-transform duration-700", children: /* @__PURE__ */ jsx(Calculator, { size: 120 }) }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex justify-between items-start md:items-center", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                    /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold", children: "Energie-Rechner" }),
                    /* @__PURE__ */ jsx("span", { className: "bg-white/20 text-xs px-2 py-0.5 rounded text-white/90 font-medium hidden md:inline-block", children: "Interaktiv" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-gas-light text-sm md:text-base max-w-lg pr-8", children: "Vergleichen Sie Heizwerte von Flüssiggas, Öl, Holz & mehr." })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "md:hidden mt-1 bg-white/10 p-2 rounded-full backdrop-blur-sm transition-transform duration-300", style: { transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }, children: /* @__PURE__ */ jsx(ChevronDown, { size: 24 }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `md:block ${isExpanded ? "block" : "hidden"} bg-gray-50/50`, id: "calculator-content", children: /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4 text-gas-dark", children: [
              /* @__PURE__ */ jsx(Zap, { size: 20, className: "text-yellow-500 fill-yellow-500" }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "Basis-Energiebedarf" })
            ] }),
            /* @__PURE__ */ jsx(
              CalculatorInput,
              {
                label: "Energiegehalt in kWh",
                value: getValue("kwh"),
                unit: "kWh",
                active: activeField === "kwh",
                onFocus: () => handleFocus("kwh", energyKwh),
                onChange: handleChange,
                onBlur: () => setActiveField(null)
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Info, { size: 12 }),
              "Geben Sie hier einen Wert ein, um alle anderen Energieträger zu berechnen."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-bold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-2", children: [
                /* @__PURE__ */ jsx("div", { className: "p-1.5 bg-blue-100 rounded-lg text-blue-600", children: /* @__PURE__ */ jsx(Flame, { size: 18 }) }),
                "Flüssiggas"
              ] }),
              /* @__PURE__ */ jsx(
                CalculatorInput,
                {
                  label: "Gewicht",
                  value: getValue("lpg_kg"),
                  unit: "kg",
                  active: activeField === "lpg_kg",
                  onFocus: () => handleFocus("lpg_kg", energyKwh / FACTORS.lpg_kg),
                  onChange: handleChange,
                  onBlur: () => setActiveField(null)
                }
              ),
              /* @__PURE__ */ jsx(
                CalculatorInput,
                {
                  label: "Volumen (gasförmig)",
                  value: getValue("lpg_m3_gas"),
                  unit: "m³",
                  active: activeField === "lpg_m3_gas",
                  onFocus: () => handleFocus("lpg_m3_gas", energyKwh / FACTORS.lpg_m3_gas),
                  onChange: handleChange,
                  onBlur: () => setActiveField(null)
                }
              ),
              /* @__PURE__ */ jsx(
                CalculatorInput,
                {
                  label: "Volumen (flüssig)",
                  value: getValue("lpg_l_liquid"),
                  unit: "l",
                  active: activeField === "lpg_l_liquid",
                  onFocus: () => handleFocus("lpg_l_liquid", energyKwh / FACTORS.lpg_l_liquid),
                  onChange: handleChange,
                  onBlur: () => setActiveField(null)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-bold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-2", children: [
                /* @__PURE__ */ jsx("div", { className: "p-1.5 bg-gray-200 rounded-lg text-gray-600", children: /* @__PURE__ */ jsx(Droplets, { size: 18 }) }),
                "Fossile Brennstoffe"
              ] }),
              /* @__PURE__ */ jsx(
                CalculatorInput,
                {
                  label: "Erdgas H",
                  value: getValue("nat_gas_m3"),
                  unit: "m³",
                  active: activeField === "nat_gas_m3",
                  onFocus: () => handleFocus("nat_gas_m3", energyKwh / FACTORS.nat_gas_m3),
                  onChange: handleChange,
                  onBlur: () => setActiveField(null)
                }
              ),
              /* @__PURE__ */ jsx(
                CalculatorInput,
                {
                  label: "Heizöl EL",
                  value: getValue("oil_l"),
                  unit: "l",
                  active: activeField === "oil_l",
                  onFocus: () => handleFocus("oil_l", energyKwh / FACTORS.oil_l),
                  onChange: handleChange,
                  onBlur: () => setActiveField(null)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-bold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-2", children: [
                /* @__PURE__ */ jsx("div", { className: "p-1.5 bg-green-100 rounded-lg text-green-600", children: /* @__PURE__ */ jsx(Leaf, { size: 18 }) }),
                "Biomasse & Holz"
              ] }),
              /* @__PURE__ */ jsx(
                CalculatorInput,
                {
                  label: "Holzpellets",
                  value: getValue("pellets_kg"),
                  unit: "kg",
                  active: activeField === "pellets_kg",
                  onFocus: () => handleFocus("pellets_kg", energyKwh / FACTORS.pellets_kg),
                  onChange: handleChange,
                  onBlur: () => setActiveField(null)
                }
              ),
              /* @__PURE__ */ jsx(
                CalculatorInput,
                {
                  label: "Hartholz (Buche/Eiche)",
                  value: getValue("wood_hard_rm"),
                  unit: "rm",
                  icon: Trees,
                  active: activeField === "wood_hard_rm",
                  onFocus: () => handleFocus("wood_hard_rm", energyKwh / FACTORS.wood_hard_rm),
                  onChange: handleChange,
                  onBlur: () => setActiveField(null)
                }
              ),
              /* @__PURE__ */ jsx(
                CalculatorInput,
                {
                  label: "Weichholz (Fichte/Kiefer)",
                  value: getValue("wood_soft_rm"),
                  unit: "rm",
                  icon: Trees,
                  active: activeField === "wood_soft_rm",
                  onFocus: () => handleFocus("wood_soft_rm", energyKwh / FACTORS.wood_soft_rm),
                  onChange: handleChange,
                  onBlur: () => setActiveField(null)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-blue-50/50 rounded-xl p-6 text-sm text-gray-500 border border-blue-100/50", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-bold mb-2 text-gas-dark flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Info, { size: 16 }),
              "Hinweise zur Berechnung:"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 list-disc list-inside", children: [
              /* @__PURE__ */ jsx("li", { children: "1 Raummeter (rm) Buchenholz ≈ 528 kg" }),
              /* @__PURE__ */ jsx("li", { children: "1 Raummeter (rm) Fichtenholz ≈ 355 kg" }),
              /* @__PURE__ */ jsx("li", { children: "Werte basieren auf durchschnittlichen Heizwerten (Hi)" }),
              /* @__PURE__ */ jsx("li", { children: "Dient der Orientierung, tatsächliche Werte variieren je nach Qualität" })
            ] })
          ] })
        ] }) })
      ]
    }
  );
};
const TankSection = ({ openWizard, setActiveSection, showTechnicalOverview = true }) => {
  const [filter, setFilter] = useState("oberirdisch");
  const tanks = tankDetails.map((t) => ({
    type: t.type,
    size: t.volume,
    capacity: t.capacity,
    name: t.name.split("(")[0].trim(),
    // Simplified name for card
    usage: t.features[0],
    // Use first feature as usage
    highlight: t.capacity === "2,1 t",
    length: t.dimensions.split("x")[0].trim(),
    diameter: t.dimensions.split("x")[1].replace("m", "").trim() + " m",
    weight: t.weight,
    slug: t.slug
  }));
  const visibleTanks = tanks.filter((t) => t.type === filter);
  return /* @__PURE__ */ jsxs("section", { className: "bg-white", id: "tanks", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative bg-gray-900 py-32 lg:py-48 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1565514020176-db7936a7d512?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", alt: "Flüssiggastank im Garten", className: "w-full h-full object-cover opacity-40 mix-blend-overlay" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 relative z-10 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center bg-white/10 backdrop-blur rounded-full px-6 py-2 border border-white/20 mb-8", children: [
          /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse" }),
          /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-sm", children: "Sofort verfügbar & Installation durch Fachpartner" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-extrabold text-white mb-6", children: "Ihr neuer Flüssiggastank" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-300 max-w-2xl mx-auto mb-8", children: "Kaufen oder Mieten – Sie haben die Wahl. Wir bieten Ihnen Tanks in allen gängigen Größen, oberirdisch und unterirdisch." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "py-24 max-w-7xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-gas font-bold tracking-widest uppercase text-sm mb-2", children: "Unser Sortiment" }),
          /* @__PURE__ */ jsx("h3", { className: "text-4xl font-extrabold text-text", children: "Tanks für jeden Bedarf" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 p-1 rounded-lg flex mt-4 md:mt-0", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setFilter("oberirdisch"), className: `px-6 py-2 rounded-md text-sm font-bold transition-all ${filter === "oberirdisch" ? "bg-white shadow-sm text-gas" : "text-gray-500"}`, children: "Oberirdisch" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setFilter("unterirdisch"), className: `px-6 py-2 rounded-md text-sm font-bold transition-all ${filter === "unterirdisch" ? "bg-white shadow-sm text-gas" : "text-gray-500"}`, children: "Unterirdisch" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible snap-x md:snap-none pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide", children: visibleTanks.map((tank, i) => /* @__PURE__ */ jsxs("div", { className: "relative group min-w-[85vw] md:min-w-0 snap-center first:pl-0 last:pr-0", children: [
        /* @__PURE__ */ jsx(
          TankCard,
          {
            tank,
            onContact: () => openWizard ? openWizard("tank") : null
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveSection ? setActiveSection(`tanks/${tank.slug}`) : null,
            className: "text-sm font-bold text-gray-400 hover:text-gas transition-colors border-b border-transparent hover:border-gas pb-0.5",
            children: "Details & Maße ansehen"
          }
        ) })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-20 grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        showTechnicalOverview && /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-100", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl mb-4", children: "Technische Übersicht" }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left", children: [
            /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-400 uppercase border-b border-gray-200", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "py-3", children: "Modell" }),
              /* @__PURE__ */ jsx("th", { className: "py-3", children: "Maße (L x H)" }),
              /* @__PURE__ */ jsx("th", { className: "py-3", children: "Gewicht" }),
              /* @__PURE__ */ jsx("th", { className: "py-3", children: "Leistung" })
            ] }) }),
            /* @__PURE__ */ jsxs("tbody", { className: "text-gray-600 divide-y divide-gray-100", children: [
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "py-3 font-bold", children: "1,2 t" }),
                /* @__PURE__ */ jsx("td", { className: "py-3", children: "2.500 x 1.250 mm" }),
                /* @__PURE__ */ jsx("td", { className: "py-3", children: "~ 550 kg" }),
                /* @__PURE__ */ jsx("td", { className: "py-3", children: "35 kW" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "py-3 font-bold", children: "2,1 t" }),
                /* @__PURE__ */ jsx("td", { className: "py-3", children: "4.300 x 1.250 mm" }),
                /* @__PURE__ */ jsx("td", { className: "py-3", children: "~ 980 kg" }),
                /* @__PURE__ */ jsx("td", { className: "py-3", children: "60 kW" })
              ] }),
              /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { className: "py-3 font-bold", children: "2,9 t" }),
                /* @__PURE__ */ jsx("td", { className: "py-3", children: "5.500 x 1.250 mm" }),
                /* @__PURE__ */ jsx("td", { className: "py-3", children: "~ 1.300 kg" }),
                /* @__PURE__ */ jsx("td", { className: "py-3", children: "90 kW" })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: showTechnicalOverview ? "" : "md:col-span-3", children: /* @__PURE__ */ jsx(EnergyCalculator, {}) })
      ] })
    ] })
  ] });
};
const TankDetail = ({ slug, onBack, openWizard }) => {
  const tank = tankDetails.find((t) => t.slug === slug);
  if (!tank) {
    return /* @__PURE__ */ jsxs("div", { className: "pt-32 pb-20 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Tank nicht gefunden." }),
      /* @__PURE__ */ jsx("button", { onClick: onBack, className: "mt-4 text-gas hover:underline", children: "Zurück zur Übersicht" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "pt-24 pb-20 bg-white", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 mb-8", children: /* @__PURE__ */ jsxs("button", { onClick: onBack, className: "flex items-center text-gray-500 hover:text-gas font-medium transition-colors", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { size: 20, className: "mr-2" }),
      " Zurück zur Übersicht"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 mb-16", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, className: "bg-gray-50 rounded-3xl p-8 flex items-center justify-center border border-gray-100 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-500 border border-gray-200", children: tank.type === "oberirdisch" ? "Oberirdisch" : "Unterirdisch" }),
          /* @__PURE__ */ jsx("div", { className: "w-full max-w-md", children: tank.type === "oberirdisch" ? /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 400 200", className: "w-full drop-shadow-xl text-gas", children: [
            /* @__PURE__ */ jsx("rect", { x: "50", y: "60", width: "300", height: "80", rx: "40", fill: "currentColor", opacity: "0.1" }),
            /* @__PURE__ */ jsx("rect", { x: "50", y: "60", width: "300", height: "80", rx: "40", stroke: "currentColor", strokeWidth: "2", fill: "none" }),
            /* @__PURE__ */ jsx("rect", { x: "80", y: "140", width: "20", height: "30", fill: "gray" }),
            /* @__PURE__ */ jsx("rect", { x: "300", y: "140", width: "20", height: "30", fill: "gray" }),
            /* @__PURE__ */ jsx("rect", { x: "190", y: "50", width: "20", height: "10", fill: "silver" }),
            /* @__PURE__ */ jsx("circle", { cx: "200", cy: "55", r: "15", fill: "silver", opacity: "0.5" })
          ] }) : /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 400 200", className: "w-full drop-shadow-xl text-green-600", children: [
            /* @__PURE__ */ jsx("path", { d: "M0 100 L400 100", stroke: "#86efac", strokeWidth: "4", strokeDasharray: "10 5" }),
            /* @__PURE__ */ jsx("rect", { x: "50", y: "110", width: "300", height: "80", rx: "40", fill: "currentColor", opacity: "0.1" }),
            /* @__PURE__ */ jsx("rect", { x: "50", y: "110", width: "300", height: "80", rx: "40", stroke: "currentColor", strokeWidth: "2", fill: "none" }),
            /* @__PURE__ */ jsx("rect", { x: "180", y: "80", width: "40", height: "30", fill: "silver" }),
            /* @__PURE__ */ jsx("rect", { x: "170", y: "75", width: "60", height: "5", fill: "#374151" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4", children: tank.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-lg", children: [
              /* @__PURE__ */ jsx(Ruler, { size: 18, className: "mr-2" }),
              " ",
              tank.dimensions
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-lg", children: [
              /* @__PURE__ */ jsx(Weight, { size: 18, className: "mr-2" }),
              " ",
              tank.weight
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gas font-bold bg-blue-50 px-3 py-1 rounded-lg", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { size: 18, className: "mr-2" }),
              " DIN 4681 / 4680"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-8 leading-relaxed", children: tank.description }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-10", children: tank.features.map((feature, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-green-100 text-green-600 rounded-full p-1 mr-3 mt-1", children: /* @__PURE__ */ jsx(Check, { size: 14, strokeWidth: 3 }) }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800", children: feature })
          ] }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => openWizard("tank"), className: "bg-gas text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gas-dark transition-all shadow-lg hover:shadow-xl transform active:scale-95 text-center", children: "Angebot anfordern" }),
            /* @__PURE__ */ jsxs("button", { onClick: () => window.print(), className: "bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center", children: [
              /* @__PURE__ */ jsx(Download, { size: 20, className: "mr-2" }),
              " Datenblatt drucken"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-6", children: "Technische Daten" }),
          /* @__PURE__ */ jsx("div", { className: "bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm", children: /* @__PURE__ */ jsx("table", { className: "w-full text-left border-collapse", children: /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: Object.entries(tank.technicalData).map(([key, value], i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 0 ? "bg-gray-50/50" : "bg-white", children: [
            /* @__PURE__ */ jsx("td", { className: "p-4 font-bold text-gray-500 capitalize w-1/3", children: key.replace(/([A-Z])/g, " $1").trim() }),
            /* @__PURE__ */ jsx("td", { className: "p-4 font-medium text-gray-900", children: value })
          ] }, key)) }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "Installation & Hinweise" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border-l-4 border-gas p-6 rounded-r-xl text-gray-700 leading-relaxed", children: [
              tank.installation,
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-bold text-gas-dark", children: "Wir unterstützen Sie gerne bei der Planung und vermitteln qualifizierte Partner anstehende Erd- und Anschlussarbeiten." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 text-white rounded-2xl p-8 sticky top-24", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold mb-4", children: "Warum kaufen?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6 text-sm", children: "Ein eigener Tank macht Sie unabhängig. Sie sparen bei jeder Füllung, da Sie den Anbieter frei wählen können." }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 mb-8 text-sm", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center text-gray-300", children: [
              /* @__PURE__ */ jsx(Check, { size: 16, className: "text-green-400 mr-2" }),
              " Freie Händlerwahl"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center text-gray-300", children: [
              /* @__PURE__ */ jsx(Check, { size: 16, className: "text-green-400 mr-2" }),
              " Keine Mietgebühren"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center text-gray-300", children: [
              /* @__PURE__ */ jsx(Check, { size: 16, className: "text-green-400 mr-2" }),
              " Amortisation oft nach 3-5 Jahren"
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => openWizard("tank"), className: "w-full bg-white text-gas font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors", children: "Jetzt Beratungstermin buchen" })
        ] }) })
      ] })
    ] })
  ] });
};
const CommercialSection = ({ setActiveSection }) => /* @__PURE__ */ jsx("section", { className: "py-24 bg-gray-50", id: "gewerbe", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
  /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-gas font-bold tracking-widest uppercase text-sm mb-2", children: "B2B Lösungen" }),
    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-extrabold", children: "Energie für Macher" })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: [
    { t: "Landwirtschaft", d: "Stallheizung & Trocknung", i: Tractor, desc: "Leistungsstarke Trocknungsanlagen und Stallheizungen. Auch mit BioLPG für nachhaltige Betriebe." },
    { t: "Industrie", d: "Prozesswärme & Hallen", i: Factory, desc: "Effiziente Dunkelstrahler für hohe Hallen und präzise Prozesswärme für Lackierkabinen." },
    { t: "Logistik", d: "Staplergas & Tankstellen", i: Truck, desc: "Treibgas für Gabelstapler. Sauberer als Diesel, stärker als Elektro. Innen und Außen." }
  ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group", children: [
    /* @__PURE__ */ jsx(item.i, { size: 40, className: "text-gray-300 group-hover:text-gas mb-6 transition-colors" }),
    /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl mb-2", children: item.t }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium mb-3", children: item.d }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 leading-relaxed", children: item.desc })
  ] }, i)) }),
  /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gas-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-6", children: "Warum Unternehmen auf uns setzen" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [
          { title: "Persönlicher Ansprechpartner", desc: "Kein Callcenter. Sie haben einen direkten Draht zu Ihrem Betreuer." },
          { title: "Flexible Logistik", desc: "Wir liefern dann, wenn es in Ihren Betriebsablauf passt. Auch Just-in-Time." },
          { title: "Transparente Konditionen", desc: "Klare Preisstrukturen ohne versteckte Zuschläge. Planungssicherheit für Ihr Budget." }
        ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 mt-2.5 rounded-full bg-gas flex-shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: item.desc })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-2xl p-8 text-center border border-gray-100", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl mb-2", children: "Individuelles Angebot" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-6", children: "Lassen Sie uns über Ihren Energiebedarf sprechen. Wir erstellen Ihnen ein maßgeschneidertes Konzept." }),
        /* @__PURE__ */ jsx("button", { onClick: () => setActiveSection("kontakt"), className: "w-full bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark transition-all shadow-lg hover:shadow-xl", children: "Jetzt anfragen" })
      ] })
    ] })
  ] })
] }) });
const InspectionSection = ({ openWizard }) => {
  return /* @__PURE__ */ jsxs("section", { id: "pruefungen", className: "bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative bg-gray-900 py-32 lg:py-48 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1621905251189-08b95d630445?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", alt: "Technische Prüfung Flüssiggastank", className: "w-full h-full object-cover opacity-30 mix-blend-overlay" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 relative z-10 text-center", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "text-green-400", size: 16 }),
          /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold uppercase tracking-widest", children: "Sicherheit zuerst" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-extrabold text-white mb-6", children: "Tankprüfungen & Service" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-300 max-w-2xl mx-auto mb-8", children: "Wir kümmern uns um die gesetzlich vorgeschriebenen Prüfungen (Innere & Äußere) für Ihren Flüssiggastank. Zuverlässig und zertifiziert." }),
        /* @__PURE__ */ jsx("button", { onClick: () => openWizard("service"), className: "bg-gas hover:bg-gas-dark text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-gas/20 transition-all transform hover:scale-105", children: "Prüfung anfragen" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-16 items-center mb-20", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Warum sind Prüfungen notwendig?" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6 leading-relaxed", children: "Flüssiggastanks unterliegen strengen Sicherheitsvorschriften. Um die Sicherheit für Mensch und Umwelt zu gewährleisten, schreibt der Gesetzgeber regelmäßige Prüfungen vor. Diese dienen nicht nur der Sicherheit, sondern werterhalten auch Ihre Anlage." }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1", children: /* @__PURE__ */ jsx(Check, { size: 16 }) }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium", children: "Äußere Prüfung (alle 2 Jahre)" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1", children: /* @__PURE__ */ jsx(Check, { size: 16 }) }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium", children: "Innere Prüfung (alle 10 Jahre)" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-green-100 p-1 rounded-full text-green-600 mr-3 mt-1", children: /* @__PURE__ */ jsx(Check, { size: 16 }) }),
              /* @__PURE__ */ jsx("span", { className: "text-gray-700 font-medium", children: "Rohrleitungsprüfung (alle 10 Jahre)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-2xl p-8 border border-gray-100", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Unser Service-Angebot" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6 text-sm", children: "gasmöller organisiert und führt die Prüfungen in Zusammenarbeit mit zugelassenen Überwachungsstellen (ZÜS) durch. Sie müssen sich um nichts kümmern." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-800", children: "Äußere Prüfung" }),
              /* @__PURE__ */ jsx("span", { className: "text-gas font-bold", children: "Auf Anfrage" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-800", children: "Innere Prüfung" }),
              /* @__PURE__ */ jsx("span", { className: "text-gas font-bold", children: "Auf Anfrage" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => openWizard("service"), className: "w-full mt-8 bg-white border-2 border-gas text-gas font-bold py-3 rounded-xl hover:bg-gas hover:text-white transition-colors", children: "Jetzt Termin vereinbaren" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 rounded-3xl p-8 md:p-12 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-gray-900 mb-4", children: "Sicherheit hat Vorfahrt" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-2xl mx-auto mb-8", children: "Verlassen Sie sich auf unsere Expertise. Wir prüfen Ihre Anlage gewissenhaft und dokumentieren alles ordnungsgemäß für Ihre Unterlagen." }),
        /* @__PURE__ */ jsx("button", { onClick: () => openWizard("service"), className: "bg-gas text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all", children: "Kontakt aufnehmen" })
      ] })
    ] })
  ] });
};
const DeliveryMap = () => {
  const cities = [
    { name: "Hamburg", x: 345, y: 235, align: "start" },
    { name: "Kiel", x: 360, y: 125, align: "start" },
    { name: "Schwerin", x: 480, y: 250, align: "start" },
    { name: "Lüneburg", x: 380, y: 285, align: "start" },
    { name: "Celle", x: 350, y: 355, align: "start" },
    { name: "Cuxhaven", x: 260, y: 175, align: "end" }
  ];
  const pathSH = `
        M 260 170
        L 270 175 L 290 180 L 310 190 L 330 200
        L 332 205 L 325 210 L 335 215
        L 345 212 L 355 210
        L 360 215 L 370 215 L 380 220
        L 390 225 L 400 230
        L 410 220 L 415 210 L 420 200
        L 425 190 L 430 180 L 440 170 L 450 160
        L 440 150 L 430 145 L 435 135
        L 430 125 L 420 120 L 410 125 L 400 120
        L 380 125 L 370 120 L 360 125 L 355 120
        L 350 110 L 340 115
        L 345 100 L 350 90 L 355 80 L 345 85 L 335 90 L 325 85
        L 330 75 L 340 70 L 345 65 L 340 60
        L 330 55 L 320 50 L 310 52 L 300 55 L 295 52
        L 280 50 L 260 48 L 240 45
        L 235 55 L 240 65 L 230 75 L 235 85
        L 220 90 L 225 100
        L 215 110 L 220 120
        L 210 130 L 225 140
        L 235 150 L 250 160 L 260 170
        Z
        M 190 20 L 195 25 L 192 35 L 195 45 L 190 55 L 192 65 L 195 70 L 200 65 L 205 55 L 202 45 L 205 35 L 200 25 L 195 20 L 190 20 Z
        M 210 75 L 205 80 L 210 85 L 215 82 L 212 75 Z
        M 460 110 L 450 115 L 455 125 L 465 120 L 470 115 L 460 110 Z
    `;
  const pathHH = `
        M 335 215
        L 345 212 L 355 210
        L 360 215 L 370 215 L 380 220
        L 375 225 L 370 230 L 365 235
        L 355 240
        L 345 235 L 340 230 L 335 225 L 335 215
        Z
    `;
  const pathMV = `
        M 410 220
        L 415 210 L 420 200 L 425 190 L 430 180 L 440 170 L 450 160
        L 470 160 L 490 155 L 510 150
        L 530 145 L 550 140
        L 560 130 L 580 120 L 600 125
        L 620 130 L 640 140
        L 660 150 L 680 160 L 700 170
        L 710 190 L 700 210 L 680 230 L 660 240
        L 640 250 L 620 260 L 600 270
        L 550 280 L 500 290
        L 480 290 L 460 280
        L 450 270 L 440 260
        L 435 250 L 430 240
        L 420 230
        Z
        M 580 100 L 590 90 L 600 85 L 610 90 L 620 100 L 610 110 L 600 110 L 590 105 L 580 100 Z
        M 630 100 L 640 95 L 650 100 L 645 110 L 635 110 L 630 100 Z
    `;
  const pathNI = `
        M 260 170
        L 270 175 L 290 180 L 310 190 L 330 200
        L 335 215 L 335 225 L 340 230 L 345 235 L 355 240
        L 365 235 L 370 230 L 375 225
        L 380 220 L 390 225 L 400 230
        L 410 235 L 420 240 L 430 245
        L 440 260 L 450 270 L 460 280 L 450 300
        L 440 320 L 430 340 L 420 360
        L 400 365 L 380 370
        L 360 365 L 340 360 L 320 355
        L 300 350 L 280 345
        L 260 340 L 240 320 L 230 300
        L 220 280 L 230 260
        L 240 240 L 250 220 L 255 200 L 260 170
        Z
    `;
  return /* @__PURE__ */ jsxs("div", { className: "py-20 bg-gray-900 text-white overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 bg-gray-800" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 lg:flex items-center relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2 pr-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 bg-white/10 backdrop-blur border border-white/20 px-3 py-1 rounded mb-6", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 14, className: "text-green-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest", children: "Liefergebiet" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-extrabold mb-6", children: "Zu Hause im Norden." }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 mb-8 leading-relaxed", children: "Von der Nordsee bis zur Ostsee, von Hamburg bis zur dänischen Grenze. Wir liefern Energie dorthin, wo Sie sie brauchen." }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: ["Schleswig-Holstein", "Hamburg", "Niedersachsen (Nord)", "Mecklenburg"].map((region, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 p-3 rounded bg-white/5 border border-white/10", children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 18, className: "text-gas-light" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: region })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:w-1/2 mt-12 lg:mt-0 relative flex items-center justify-center p-4 lg:p-0", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 800 500", className: "w-full h-auto max-w-md lg:max-w-full", children: [
        /* @__PURE__ */ jsxs("g", { stroke: "white", strokeWidth: "0.5", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { d: pathNI, fill: "#005b9f" }),
          /* @__PURE__ */ jsx("path", { d: pathMV, fill: "#4da6ff" }),
          /* @__PURE__ */ jsx("path", { d: pathSH, fill: "#8ecae6" }),
          /* @__PURE__ */ jsx("path", { d: pathHH, fill: "#003366" })
        ] }),
        cities.map((city, index) => /* @__PURE__ */ jsxs("g", { transform: `translate(${city.x}, ${city.y})`, children: [
          /* @__PURE__ */ jsx("circle", { cx: "0", cy: "0", r: "3", fill: "white" }),
          /* @__PURE__ */ jsx(
            "text",
            {
              x: city.align === "start" ? 8 : city.align === "end" ? -8 : 0,
              y: 4,
              fontFamily: "Arial",
              fontSize: "12",
              fill: "white",
              fontWeight: "bold",
              textAnchor: city.align,
              children: city.name
            }
          )
        ] }, index))
      ] }) })
    ] })
  ] });
};
const FAQ = () => {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "Wie lange dauert die Lieferung?", a: "In der Regel liefern wir innerhalb von 5-10 Werktagen. In dringenden Notfällen bieten wir einen 24h-Express-Service an." },
    { q: "Kann ich meinen Gastank kaufen?", a: "Ja! Wir sind spezialisiert auf den Verkauf von Eigentumstanks (oberirdisch und unterirdisch). Damit sparen Sie sich langfristig die teure Miete und sind frei in der Händlerwahl. Wir bieten Größen von 1,2 t bis 2,9 t an." },
    { q: "Was kostet Flüssiggas aktuell?", a: "Der Preis ändert sich täglich analog zu den Ölbörsen. Da wir unabhängig sind, können wir oft günstigere Konditionen anbieten als Großkonzerne. Nutzen Sie unseren Preisrechner oder rufen Sie uns an für ein tagesaktuelles Angebot." },
    { q: "Muss ich bei der Lieferung zu Hause sein?", a: "Nicht zwingend, sofern der Tank und der Füllanschluss für unseren Fahrer frei zugänglich sind. Wir informieren Sie vorab über den Liefertermin." },
    { q: "Liefern Sie auch im Notfall?", a: "Ja, wenn Ihre Heizung kalt bleibt, versuchen wir schnellstmöglich zu helfen. Rufen Sie uns direkt an unter 04551 89 70 89." },
    { q: "Was genau ist Flüssiggas?", a: "Flüssiggas (LPG) besteht aus Propan und Butan. Als Heizgas verwenden wir in Deutschland gemäß DIN 51622 fast ausschließlich reines Propan, da dieses auch bei tiefen Temperaturen im Winter zuverlässig verdampft." },
    { q: "Welche Prüfungen sind beim Gastank vorgeschrieben?", a: "Alle 2 Jahre muss eine äußere Prüfung durch eine befähigte Person erfolgen. Alle 10 Jahre ist eine innere Prüfung durch eine ZÜS (z.B. TÜV, DEKRA) notwendig. Wir unterstützen Sie gerne bei der Organisation." }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 py-24", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold text-center mb-12", children: "Häufig gestellte Fragen" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, i) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => setOpen(open === i ? -1 : i), className: "w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 text-left font-bold text-text transition-colors", children: [
        /* @__PURE__ */ jsx("span", { children: faq.q }),
        /* @__PURE__ */ jsx(ChevronDown, { size: 20, className: `transform transition-transform duration-300 ${open === i ? "rotate-180 text-gas" : "text-gray-400"}` })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: open === i && /* @__PURE__ */ jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, className: "bg-gray-50 border-t border-gray-100", children: /* @__PURE__ */ jsx("p", { className: "p-5 text-gray-600 leading-relaxed", children: faq.a }) }) })
    ] }, i)) })
  ] });
};
const validatePlz = (plz) => {
  const regex = /^(1[7-9]\d{3}|2[0-5]\d{3}|27\d{3}|29[2-6]\d{2})$/;
  return regex.test(plz);
};
const getPlzError = (plz) => {
  if (!plz || plz.length !== 5) {
    return "Bitte geben Sie eine gültige 5-stellige PLZ ein.";
  }
  if (!validatePlz(plz)) {
    return "Leider liefern wir noch nicht in dieses Gebiet.";
  }
  return "";
};
const ContactSection = () => {
  const [plz, setPlz] = useState("");
  const [plzError, setPlzError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const handlePlzChange = (e) => {
    const val = e.target.value;
    setPlz(val);
    if (val.length === 5) {
      setPlzError(getPlzError(val));
    } else {
      setPlzError("");
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "bg-gas-dark py-24 text-white relative overflow-hidden", id: "kontakt", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-gas opacity-50 transform -skew-x-12 translate-x-20" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 relative z-10 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold mb-6", children: "Noch Fragen?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gas-light mb-10 text-lg", children: "Unser Team ist für Sie da. Persönlich und kompetent." }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-left max-w-2xl mx-auto text-text transform hover:-translate-y-1 transition-transform duration-500", children: /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: (e) => {
        if (honeypot) {
          e.preventDefault();
          return;
        }
      }, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "b_field",
            style: { display: "none" },
            tabIndex: "-1",
            autoComplete: "off",
            value: honeypot,
            onChange: (e) => setHoneypot(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "Name" }),
            /* @__PURE__ */ jsx("input", { type: "text", name: "name", autoComplete: "name", required: true, className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "Telefon" }),
            /* @__PURE__ */ jsx("input", { type: "tel", name: "phone", autoComplete: "tel", className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "Postleitzahl" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                name: "plz",
                autoComplete: "postal-code",
                value: plz,
                onChange: handlePlzChange,
                maxLength: 5,
                className: `w-full px-4 py-3 bg-gray-50 border rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all ${plzError ? "border-red-300 bg-red-50 text-red-900" : "border-gray-200"}`
              }
            ),
            plzError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 font-bold", children: plzError })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "E-Mail" }),
            /* @__PURE__ */ jsx("input", { type: "email", name: "email", autoComplete: "email", required: true, className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "Betreff" }),
          /* @__PURE__ */ jsx("input", { type: "text", name: "subject", className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "Nachricht" }),
          /* @__PURE__ */ jsx("textarea", { name: "message", className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all h-32" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full bg-gas hover:bg-gas-dark text-white font-bold py-4 rounded-lg transition-all uppercase tracking-wide shadow-lg hover:shadow-xl transform active:scale-95", children: "Anfrage absenden" })
      ] }) })
    ] })
  ] });
};
const GasOrderSection = ({ onCheckAvailability }) => {
  const [liters, setLiters] = useState(3e3);
  const [plz, setPlz] = useState("");
  const [plzError, setPlzError] = useState("");
  const handleCheck = () => {
    const error = getPlzError(plz);
    if (error) {
      setPlzError(error);
      return;
    }
    setPlzError("");
    if (onCheckAvailability) {
      onCheckAvailability(plz, liters);
    }
  };
  return /* @__PURE__ */ jsxs("div", { id: "gas", className: "bg-white", children: [
    /* @__PURE__ */ jsxs("header", { className: "relative bg-gas-dark pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-900/30 z-10" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
            alt: "Hintergrund Gas Lieferung Norddeutschland",
            className: "w-full h-full object-cover absolute inset-0"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-white", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1.5 rounded-full bg-gas-light/20 border border-gas-light/30 text-gas-light font-bold text-sm mb-6", children: "Der regionale Versorger" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-6xl font-extrabold mb-6 leading-tight", children: [
            "Flüssiggas im Norden. ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white", children: "Fair & Zuverlässig." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg", children: "Wir beliefern Privathaushalte und Gewerbe in Schleswig-Holstein, Hamburg, Niedersachsen und Mecklenburg-Vorpommern. Beste Preise, ohne Vertragsbindung." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 text-sm font-bold text-gray-300", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-white/10 rounded-full text-gas-light", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 20 }) }),
              /* @__PURE__ */ jsx("span", { children: "TÜV geprüfte Qualität" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 bg-white/10 rounded-full text-gas-light", children: /* @__PURE__ */ jsx(MapPin, { size: 20 }) }),
              /* @__PURE__ */ jsx("span", { children: "Aus der Region" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gas-light to-blue-500" }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Liefergebiet prüfen" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm mb-8", children: "Erhalten Sie jetzt Ihr unverbindliches Angebot." }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-white font-medium mb-4", children: [
                    /* @__PURE__ */ jsx("label", { children: "Benötigte Menge" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-gas-light", children: [
                      liters.toLocaleString(),
                      " ",
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-white", children: "Liter" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "range",
                      min: "1000",
                      max: "6000",
                      step: "100",
                      value: liters,
                      onChange: (e) => setLiters(parseInt(e.target.value)),
                      className: "w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gas-light hover:accent-white transition-all"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-gray-400 mt-2 font-medium", children: [
                    /* @__PURE__ */ jsx("span", { children: "1.000 L" }),
                    /* @__PURE__ */ jsx("span", { children: "6.000 L" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-white font-medium mb-2", children: "Postleitzahl" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        name: "plz",
                        autoComplete: "postal-code",
                        maxLength: "5",
                        value: plz,
                        onChange: (e) => {
                          setPlz(e.target.value.replace(/[^0-9]/g, ""));
                          if (plzError) setPlzError("");
                        },
                        className: `w-full bg-white/5 border border-white/10 text-white text-xl font-bold p-4 pl-12 rounded-xl outline-none focus:bg-white/10 focus:border-gas-light transition-all placeholder:text-gray-300 ${plzError ? "border-red-400 focus:border-red-400" : ""}`,
                        placeholder: "PLZ eingeben"
                      }
                    ),
                    /* @__PURE__ */ jsx(MapPin, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 })
                  ] }),
                  plzError && /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -10 },
                      animate: { opacity: 1, y: 0 },
                      className: "text-red-300 text-sm mt-3 font-medium flex items-center gap-2 bg-red-500/10 p-2 rounded-lg border border-red-500/20",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold", children: "!" }),
                        plzError
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleCheck,
                    className: "w-full bg-gas hover:bg-white hover:text-gas text-white font-bold text-lg py-5 rounded-xl shadow-lg shadow-gas/20 transform transition-all active:scale-[0.98] flex items-center justify-center gap-3 group",
                    children: [
                      "Angebot anfordern",
                      /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "group-hover:translate-x-1 transition-transform" })
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "In 3 Schritten zum vollen Tank" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Unkompliziert, transparent und schnell." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "text-9xl font-bold text-gray-100 absolute -top-10 -left-4 z-0 group-hover:text-blue-50 transition-colors", children: "1" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gas mb-3", children: "Angebot anfordern" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Geben Sie Ihre PLZ und die gewünschte Menge in unseren Rechner ein. Sie erhalten umgehend ein unverbindliches Angebot." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "text-9xl font-bold text-gray-100 absolute -top-10 -left-4 z-0 group-hover:text-blue-50 transition-colors", children: "2" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gas mb-3", children: "Bestellung aufgeben" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Senden Sie die Anfrage ab. Wir bestätigen den Termin und den Preis. Keine versteckten Kosten, keine Vertragsbindung." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "text-9xl font-bold text-gray-100 absolute -top-10 -left-4 z-0 group-hover:text-blue-50 transition-colors", children: "3" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gas mb-3", children: "Lieferung erhalten" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Unsere Fahrer füllen Ihren Tank sicher und zuverlässig auf. Sie zahlen bequem per Rechnung nach der Lieferung." })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-white overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative rounded-2xl overflow-hidden shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-gas-dark/20 to-transparent pointer-events-none" }),
        /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1621905251189-08b95d630445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", alt: "Sicherheitsprüfung Flüssiggastank", className: "w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6", children: "DIN 51622" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6", children: "Geprüfte Qualität für Ihre Sicherheit" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-8 leading-relaxed", children: "Ihr Flüssiggas (Propan) unterliegt strengsten Qualitätskontrollen. Wir liefern ausschließlich Gas, das der DIN-Norm 51622 entspricht. Das garantiert Ihnen einen hohen Brennwert und eine saubere Verbrennung, die Ihre Heizungsanlage schont und die Umwelt entlastet." }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-1 mt-1 bg-green-100 rounded-full text-green-600 flex-shrink-0", children: /* @__PURE__ */ jsx(Check, { size: 16 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-gray-900 font-bold", children: "Hoher Heizwert" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Effizientes Heizen spart Kosten." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-1 mt-1 bg-green-100 rounded-full text-green-600 flex-shrink-0", children: /* @__PURE__ */ jsx(Check, { size: 16 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-gray-900 font-bold", children: "Saubere Verbrennung" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Weniger Rückstände, längere Lebensdauer Ihrer Anlage." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-1 mt-1 bg-green-100 rounded-full text-green-600 flex-shrink-0", children: /* @__PURE__ */ jsx(Check, { size: 16 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-gray-900 font-bold", children: "Frostsicher" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "Verdampft auch bei extremen Minustemperaturen zuverlässig." })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-24 bg-gray-50 relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6", children: "Warum wir anders sind" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 leading-relaxed", children: "Bei gasmöller gibt es keine Hotlines mit Warteschleifen und keine versteckten Gebühren. Wir sind Ihr direkter Draht zu günstiger Energie im Norden." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 lg:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6", children: /* @__PURE__ */ jsx(Truck, { size: 28 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Echte Regionalität" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Unsere Fahrer kennen die Straßen im Norden. Kurze Wege bedeuten für Sie: Schnellere Lieferung und weniger CO₂-Ausstoß." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6", children: /* @__PURE__ */ jsx(Coins, { size: 28 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Keine Preisbindung" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Sie zahlen immer den aktuellen Tagespreis. Keine langen Verträge, keine Abo-Fallen. Sie bestellen, wenn der Preis für Sie stimmt." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6", children: /* @__PURE__ */ jsx(Heart, { size: 28 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Persönlicher Service" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Bei uns sprechen Sie mit Menschen, nicht mit Robotern. Unser Team in Schleswig-Holstein kümmert sich persönlich um Ihr Anliegen." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-20 pt-10 border-t border-gray-200/60", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 32, className: "text-gray-400" }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-500 text-lg", children: "TÜV Nord" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Check, { size: 32, className: "text-gray-400" }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-500 text-lg", children: "DVFG Mitglied" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 32, className: "text-gray-400" }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-500 text-lg", children: "Standort Schleswig-Holstein" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(DeliveryMap, {})
  ] });
};
const SourceBadge = ({ text }) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-gas-dark border border-blue-200 mb-2", children: [
  /* @__PURE__ */ jsx(BookOpen, { size: 12, className: "mr-1" }),
  " ",
  text
] });
const SafetyChecklist = () => /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6", children: [
  /* @__PURE__ */ jsxs("h4", { className: "flex items-center text-red-700 font-bold text-lg mb-4", children: [
    /* @__PURE__ */ jsx(AlertTriangle, { size: 20, className: "mr-2" }),
    " Notfall-Checkliste"
  ] }),
  /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0", children: "1" }),
      /* @__PURE__ */ jsxs("span", { className: "text-red-900", children: [
        /* @__PURE__ */ jsx("strong", { children: "Ruhe bewahren." }),
        " Keine Panik. Gasaustritt riecht stark nach faulen Eiern."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0", children: "2" }),
      /* @__PURE__ */ jsxs("span", { className: "text-red-900", children: [
        /* @__PURE__ */ jsx("strong", { children: "Zündquellen vermeiden." }),
        " Kein Lichtschalter, kein Handy, keine Zigaretten."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0", children: "3" }),
      /* @__PURE__ */ jsxs("span", { className: "text-red-900", children: [
        /* @__PURE__ */ jsx("strong", { children: "Haupthahn schließen." }),
        " Wenn möglich, schließen Sie den Haupthahn am Tank oder Hauseingang."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0", children: "4" }),
      /* @__PURE__ */ jsxs("span", { className: "text-red-900", children: [
        /* @__PURE__ */ jsx("strong", { children: "Lüften." }),
        " Öffnen Sie Fenster und Türen weit."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0", children: "5" }),
      /* @__PURE__ */ jsxs("span", { className: "text-red-900", children: [
        /* @__PURE__ */ jsx("strong", { children: "Gebäude verlassen & 112 rufen." }),
        " Warnen Sie Mitbewohner."
      ] })
    ] })
  ] })
] });
const CONTENT = {
  knowledge: [
    {
      id: "tank-technik",
      title: "Tank & Technik",
      icon: Settings,
      articles: [
        {
          id: "miete-kauf",
          title: "Miete vs. Kauf: Der Vergleich",
          description: "Warum Sie als Eigentümer tausende Euro sparen können.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border-l-4 border-gas p-6 my-6 rounded-r-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gas-dark mb-2", children: "Das Wichtigste in Kürze:" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "text-gas mr-2 mt-1 flex-shrink-0" }),
                  " Miettanks binden Sie oft jahrelang an einen Lieferanten (hohe Gaspreise)."
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "text-gas mr-2 mt-1 flex-shrink-0" }),
                  ' Kauftanks machen Sie zum "Free Agent" auf dem freien Markt.'
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { size: 16, className: "text-gas mr-2 mt-1 flex-shrink-0" }),
                  " Die Amortisation eines Kaufs erfolgt oft schon nach 3-5 Jahren."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gas mb-4", children: "Das Problem mit der Miete" }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 leading-relaxed text-gray-600", children: 'Viele Anbieter locken mit günstigen Einmalzahlungen für die Aufstellung. Doch das "Kleingedruckte" hat es in sich: Sie dürfen das Gas nur bei diesem einen Anbieter bestellen. Da der Wettbewerb fehlt, liegen die Literpreise oft 15-25 Cent über dem freien Marktpreis. Hinzu kommen monatliche Zählermieten oder Wartungspauschalen.' }),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold text-gas mb-4", children: "Der Vorteil des Eigentums" }),
            /* @__PURE__ */ jsx("p", { className: "mb-4 leading-relaxed text-gray-600", children: "Ein eigener Tank gehört Ihnen (oder wird durch Einmalzahlung erworben). Sie können bei jeder Füllung den günstigsten Anbieter wählen – ähnlich wie bei Heizöl. Die Wartungspflichten (2- und 10-Jahres-Prüfung) organisieren wir für Sie kostengünstig und unbürokratisch." })
          ] })
        },
        {
          id: "tank-entsorgen",
          title: "Flüssiggastank entsorgen",
          description: "So werden Sie den alten Tank los.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(SourceBadge, { text: "Fachbetriebspflicht" }),
            /* @__PURE__ */ jsx("p", { children: "Denn der Tank wird nicht gereinigt und auch nicht zersägt, aber natürlich vorher geleert. gasmöller nimmt den Tank aber gerne mit." })
          ] })
        },
        {
          id: "aufstellung",
          title: "Installation & Vorschriften",
          description: "Abstände, Grenzen und TRF 2021.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { children: "Oberirdisch vs. Unterirdisch" }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Oberirdisch:" }),
              " Die günstige Standardlösung. Der Tank steht auf einer Betonplatte im Garten. Ideal, wenn Optik zweitrangig ist oder der Tank versteckt (hinter Hecken) stehen kann."
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Unterirdisch:" }),
              " Die elegante Lösung. Nur der Domdeckel ist sichtbar. Perfekt für kleine Grundstücke, da die Oberfläche begehbar bleibt (nicht befahrbar ohne Sondermaßnahmen)."
            ] }),
            /* @__PURE__ */ jsx("h4", { children: "Sicherheitsabstände (TRF 2021)" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Brandlasten:" }),
                " 3m Abstand zu Holzhütten, Stroh, etc."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Öffnungen:" }),
                " 3m Abstand zu Kellerfenstern, Lichtschächten, Gullys (da Gas schwerer als Luft ist)."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Grenzen:" }),
                " Mit einer Strahlungsschutzwand können Abstände oft auf 1m reduziert werden."
              ] })
            ] })
          ] })
        },
        {
          id: "groessen",
          title: "Tankgrößen & Maße",
          description: "Welcher Tank passt zu meinem Haus?",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Die Wahl der Tankgröße hängt von Ihrem Jahresverbrauch und dem Platzangebot ab." }),
            /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm border-collapse mb-8", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100 border-b border-gray-200", children: [
                /* @__PURE__ */ jsx("th", { className: "p-3 font-bold text-gas", children: "Bezeichnung" }),
                /* @__PURE__ */ jsx("th", { className: "p-3 font-bold text-gas", children: "Volumen (L)" }),
                /* @__PURE__ */ jsx("th", { className: "p-3 font-bold text-gas", children: "Maße (L x H) ca." }),
                /* @__PURE__ */ jsx("th", { className: "p-3 font-bold text-gas", children: "Eignung" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { children: [
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3 font-bold", children: "1,2 t" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "2.700" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "2,50 x 1,25 m" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Niedrigenergiehaus / Ferienhaus" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 bg-gray-50", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3 font-bold", children: "2,1 t" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "4.850" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "4,30 x 1,25 m" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Standard Einfamilienhaus" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100", children: [
                  /* @__PURE__ */ jsx("td", { className: "p-3 font-bold", children: "2,9 t" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "6.400" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "5,50 x 1,25 m" }),
                  /* @__PURE__ */ jsx("td", { className: "p-3", children: "Mehrfamilienhaus / Gewerbe" })
                ] })
              ] })
            ] })
          ] })
        },
        {
          id: "sicherheit",
          title: "Prüfung & Sicherheit",
          description: "Warum sind Prüfungen notwendig?",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Flüssiggastanks unterliegen strengen Sicherheitsvorschriften. Um die Sicherheit für Mensch und Umwelt zu gewährleisten, schreibt der Gesetzgeber regelmäßige Prüfungen vor. Diese dienen nicht nur der Sicherheit, sondern werterhalten auch Ihre Anlage." }),
            /* @__PURE__ */ jsx("h4", { children: "Prüfintervalle" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Äußere Prüfung (alle 2 Jahre):" }),
                ' Sichtprüfung auf Korrosion, Zugänglichkeit und Beschilderung. Durchführbar durch "befähigte Person" (z.B. unser Tankwagenfahrer oder Techniker).'
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Innere Prüfung (alle 10 Jahre):" }),
                " Umfassende Prüfung durch eine ZÜS (z.B. TÜV). Austausch des Sicherheitsventils und Druckprüfung."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Rohrleitungsprüfung (alle 10 Jahre):" }),
                " Dichtigkeits- und Festigkeitsprüfung der erdgedeckten oder oberirdischen Rohrleitungen."
              ] })
            ] })
          ] })
        },
        {
          id: "anlage",
          title: "Die Flüssiggasanlage",
          description: "Vom Tank bis zum Brenner: Wie es funktioniert.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Eine Flüssiggasanlage ist überraschend simpel und wartungsarm. Sie besteht im Wesentlichen aus drei Komponenten:" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 my-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 rounded-lg border border-blue-100 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-gas font-bold", children: "1" }),
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-gas", children: "Der Tank" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-1", children: "Lagert den Energievorrat (meist für 1 Jahr) sicher im Garten." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 rounded-lg border border-blue-100 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-gas font-bold", children: "2" }),
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-gas", children: "Die Leitung" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-1", children: "Vom Tank führt ein erdverlegtes Rohr ins Haus. Ein Regler reduziert den Druck auf 50mbar." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 rounded-lg border border-blue-100 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm text-gas font-bold", children: "3" }),
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-gas", children: "Die Heizung" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 mt-1", children: "Meist eine Gas-Brennwerttherme. Sie hängt platzsparend an der Wand." })
              ] })
            ] })
          ] })
        }
      ]
    },
    {
      id: "heizung",
      title: "Heizung & Modernisierung",
      icon: Home,
      articles: [
        { id: "hybrid", title: "Gas-Hybridheizung", description: "Die ideale Kombi aus Erneuerbaren und Bewährtem.", content: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Eine Hybridheizung kombiniert eine Gasbrennwerttherme mit erneuerbaren Energien, meist einer Wärmepumpe oder Solarthermie." }),
          /* @__PURE__ */ jsx("h4", { children: "So funktioniert es" }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Grundlast:" }),
              " Die Wärmepumpe übernimmt die Wärmeversorgung an milden Tagen (ca. 70-80% des Jahres)."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Spitzenlast:" }),
              " An eiskalten Tagen oder bei hohem Warmwasserbedarf springt automatisch das Gas ein."
            ] })
          ] }),
          /* @__PURE__ */ jsx("h4", { children: "Vorteile" }),
          /* @__PURE__ */ jsx("p", { children: "Sie erfüllen die 65%-Regel des GEG, sparen Investitionskosten im Vergleich zur Voll-Wärmepumpe (keine teure Dämmung nötig) und haben 100% Versorgungssicherheit." })
        ] }) },
        { id: "mfh", title: "Lösungen für Mehrfamilienhäuser", description: "Zentralheizung oder Etagenheizung mit Gas.", content: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { children: "Auch für Vermieter und WEGs ist Flüssiggas attraktiv. Mit einem zentralen unterirdischen Tank (oder einer Tankbatterie) können beliebig viele Wohneinheiten versorgt werden." }) }) },
        {
          id: "geg",
          title: "Heizungsgesetz (GEG) 2024",
          description: "Was gilt für Gasheizungen?",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Das Gebäudeenergiegesetz (GEG) verunsichert viele Hausbesitzer. Hier sind die Fakten für Flüssiggas:" }),
            /* @__PURE__ */ jsx("h4", { children: "Bestandsgebäude" }),
            /* @__PURE__ */ jsx("p", { children: "Funktionierende Gasheizungen dürfen weiter betrieben und repariert werden. Es gibt keine sofortige Austauschpflicht. Auch neue Gasheizungen dürfen eingebaut werden, solange keine kommunale Wärmeplanung vorliegt (mit Beratungspflicht)." }),
            /* @__PURE__ */ jsx("h4", { children: "Die 65% Erneuerbare-Energien-Regel" }),
            /* @__PURE__ */ jsx("p", { children: "Sollte die 65%-Pflicht greifen (z.B. in Neubaugebieten), ist Flüssiggas weiterhin eine Option:" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Hybridheizung:" }),
                " Gasbrennwert + kleine Wärmepumpe."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Bio-LPG:" }),
                " Nutzung von biogenem Flüssiggas (sofern verfügbar und anerkannt)."
              ] })
            ] })
          ] })
        },
        {
          id: "waermepumpe",
          title: "Alternative zur Wärmepumpe?",
          description: "Warum Gas im Altbau oft gewinnt.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Wärmepumpen sind effizient – aber oft nicht im ungedämmten Altbau. Wenn Vorlauftemperaturen über 55°C benötigt werden (alte Heizkörper), sinkt die Effizienz der Wärmepumpe drastisch und die Stromkosten explodieren." }),
            /* @__PURE__ */ jsx("h4", { children: "Vorteile Gas im Altbau" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Hohe Vorlauftemperaturen:" }),
                " Problemlos möglich, alte Heizkörper können bleiben."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Geringe Investition:" }),
                " Eine Gasheizung kostet oft nur 1/3 einer Wärmepumpe."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Platzsparend:" }),
                " Kein Außengerät, kein Lärm."
              ] })
            ] })
          ] })
        },
        {
          id: "oel-wechsel",
          title: "Wechsel von Öl auf Gas",
          description: "Sauberer, platzsparender, günstiger.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { children: "Öltank raus – Platz gewinnen" }),
            /* @__PURE__ */ jsx("p", { children: "Der alte Öltank im Keller nimmt wertvollen Platz weg und riecht oft unangenehm. Ein Flüssiggastank im Garten schafft im Keller Platz für einen Hobbyraum oder Wellnessbereich." }),
            /* @__PURE__ */ jsx("h4", { children: "Umwelt & Technik" }),
            /* @__PURE__ */ jsx("p", { children: "Gas verbrennt fast rückstandsfrei (kein Ruß) und hat geringere CO2-Emissionen als Öl. Moderne Gas-Brennwertthermen sind hocheffizient, leise und können stufenlos modulieren." })
          ] })
        },
        {
          id: "pellet-vergleich",
          title: "Pelletheizung vs. Flüssiggas",
          description: "Der Kosten- & Komfort-Check.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Pelletheizungen gelten als ökologisch, haben aber Nachteile im Vergleich zu Flüssiggas." }),
            /* @__PURE__ */ jsx("h4", { children: "Nachteile Pellets" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Wartung:" }),
                " Asche muss regelmäßig entleert werden. Mechanische Teile (Förderschnecke) sind störanfällig."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Feinstaub:" }),
                " Hohe Emissionen, oft sind Filter nötig."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Platz:" }),
                " Pelletlager benötigt viel trockenen Raum im Keller."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Kosten:" }),
                " Anschaffung oft doppelt so teuer wie Gasheizung."
              ] })
            ] }),
            /* @__PURE__ */ jsx("h4", { children: "Vorteil Gas" }),
            /* @__PURE__ */ jsx("p", { children: "Sauber, wartungsarm, leise und günstig in der Anschaffung. BioLPG macht es ebenso grün." })
          ] })
        },
        {
          id: "gaswaermepumpe",
          title: "Gas-Wärmepumpe",
          description: "Die unbekannte Effizienzmaschine.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "Jeder spricht von elektrischen Wärmepumpen. Doch es gibt auch ",
              /* @__PURE__ */ jsx("strong", { children: "thermische Gas-Wärmepumpen" }),
              " (Absorptionswärmepumpen)."
            ] }),
            /* @__PURE__ */ jsx("h4", { children: "Vorteile" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Effizienz:" }),
                " Nutzt Umweltwärme + Gaswärme. Wirkungsgrade von über 130% sind möglich."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Altbau-tauglich:" }),
                " Erreicht problemlos hohe Vorlauftemperaturen für klassische Heizkörper."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Leise:" }),
                " Keine lauten Kompressoren im Garten."
              ] })
            ] })
          ] })
        },
        {
          id: "energiesparen",
          title: "10 Tipps zum Heizkosten sparen",
          description: "Kleine Maßnahmen, große Wirkung.",
          content: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "1. Hydraulischer Abgleich:" }),
              " Lassen Sie Ihre Heizung vom Profi einstellen. Spart bis zu 15%."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "2. Stoßlüften:" }),
              " Fenster nicht auf Kipp! 5 Min. ganz auf."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "3. Dämmen:" }),
              " Heizungsrohre im Keller dämmen kostet wenig und bringt viel."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "4. Thermostate:" }),
              " Programmierbare Thermostate senken die Temperatur, wenn niemand da ist."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "5. Wartung:" }),
              " Eine gewartete Heizung verbraucht weniger Gas."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "6. Heizkörper freihalten:" }),
              " Verdecken Sie Heizkörper nicht mit Möbeln oder langen Vorhängen. Die Wärme staut sich sonst."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "7. Fenster abdichten:" }),
              " Prüfen Sie die Dichtungen. Zugluft ist ein teurer Wärmedieb."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "8. Raumtemperatur anpassen:" }),
              " 1 Grad weniger spart ca. 6% Energie. Im Schlafzimmer reichen oft 17-18 Grad."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "9. Türen schließen:" }),
              " Heizen Sie nur die Räume, die Sie nutzen, und halten Sie die Türen zu kühleren Räumen geschlossen."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("strong", { children: "10. Heizungspumpe tauschen:" }),
              " Alte Umwälzpumpen sind Stromfresser. Eine Hocheffizienzpumpe spart Strom und optimiert den Heizkreislauf."
            ] })
          ] }) })
        }
      ]
    },
    {
      id: "gewerbe",
      title: "Gewerbe & Industrie",
      icon: Factory,
      articles: [
        { id: "bhkw", title: "Strom & Wärme (BHKW)", description: "Doppelt sparen mit Kraft-Wärme-Kopplung.", content: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Ein Blockheizkraftwerk (BHKW) produziert gleichzeitig Strom und Wärme. Der Strom kann selbst genutzt oder eingespeist werden, die Abwärme heizt das Gebäude." }),
          /* @__PURE__ */ jsx("h4", { children: "Ideal für Gewerbe" }),
          /* @__PURE__ */ jsx("p", { children: "Mit Flüssiggas betrieben, laufen diese Anlagen extrem sauber und wartungsarm. Diese Lösung ist besonders wirtschaftlich für Betriebe mit ganzjährig hohem Wärmebedarf, wie z.B. Hotels, Schwimmbäder, Pflegeheime oder Bäckereien." })
        ] }) },
        {
          id: "lng-lpg",
          title: "Unterschied LNG vs. LPG",
          description: "Was ist was? Ein technischer Vergleich.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Oft verwechselt, aber grundverschieden:" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 my-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 rounded-lg", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-gas mb-2", children: "LPG (Liquefied Petroleum Gas)" }),
                /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "= Propan / Butan" }),
                  /* @__PURE__ */ jsx("li", { children: "Flüssig bei geringem Druck (~8 bar)" }),
                  /* @__PURE__ */ jsx("li", { children: "Einsatz: Heizung, Stapler, Auto (Autogas)" }),
                  /* @__PURE__ */ jsx("li", { children: "Lagerung: Stahltank im Garten" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [
                /* @__PURE__ */ jsx("h5", { className: "font-bold text-gray-700 mb-2", children: "LNG (Liquefied Natural Gas)" }),
                /* @__PURE__ */ jsxs("ul", { className: "text-sm space-y-1", children: [
                  /* @__PURE__ */ jsx("li", { children: "= Erdgas (Methan)" }),
                  /* @__PURE__ */ jsx("li", { children: "Flüssig durch Kälte (-162°C)" }),
                  /* @__PURE__ */ jsx("li", { children: "Einsatz: Schwerlastverkehr (LKW), Schiffe" }),
                  /* @__PURE__ */ jsx("li", { children: "Lagerung: Isoliertanks (Thermoskanne)" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Wir sind Spezialisten für ",
              /* @__PURE__ */ jsx("strong", { children: "LPG" }),
              " (Flüssiggas). Für LNG-Anfragen vermitteln wir Sie gerne an Partner."
            ] })
          ] })
        },
        {
          id: "hallenheizung",
          title: "Hallenheizung & Dunkelstrahler",
          description: "Effizienz für hohe Räume.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "Warmluftheizungen sind in hohen Hallen ineffizient, da die Wärme unter das Dach steigt. ",
              /* @__PURE__ */ jsx("strong", { children: "Dunkelstrahler" }),
              " mit Gas funktionieren wie die Sonne: Sie erwärmen nicht die Luft, sondern die Flächen und Personen, auf die sie treffen."
            ] }),
            /* @__PURE__ */ jsx("h4", { children: "Vorteile" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "Bis zu 40% Energieeinsparung gegenüber Konvektion." }),
              /* @__PURE__ */ jsx("li", { children: "Zonenweise Beheizung möglich (z.B. nur Arbeitsplätze)." }),
              /* @__PURE__ */ jsx("li", { children: "Keine Staubaufwirbelung (wichtig für Lackierereien)." })
            ] })
          ] })
        },
        {
          id: "prozess",
          title: "Prozesswärme & Lackieren",
          description: "Exakte Temperaturen für Profis.",
          content: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { children: "In Lackierkabinen, Brennöfen oder Trocknungsanlagen ist eine exakte Temperatursteuerung entscheidend. Flüssiggas bietet eine extrem saubere Verbrennung, sodass Abgase oft direkt im Prozess genutzt werden können (Direktbefeuerung), was den Wirkungsgrad auf nahezu 100% steigert." }) })
        },
        {
          id: "landwirtschaft",
          title: "Landwirtschaft & BioLPG",
          description: "Trocknung und Stallheizung.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Ob Getreidetrocknung nach der Ernte oder Ferkelaufzucht: Landwirte brauchen hohe Leistungen in kurzer Zeit, oft fernab vom Erdgasnetz." }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "BioLPG für Bio-Höfe:" }),
              " Mit biogenem Flüssiggas können landwirtschaftliche Betriebe ihren CO2-Fußabdruck drastisch senken und Nachhaltigkeitsziele erfüllen."
            ] })
          ] })
        },
        {
          id: "treibgas",
          title: "Treibgas (Staplergas)",
          description: "Mobile Energie für die Logistik.",
          content: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { children: "Gasstapler verbinden die Kraft von Dieselstaplern mit der Sauberkeit von Elektrostaplern. Sie sind im Innen- und Außenbereich einsetzbar. Wir liefern Treibgas in Flaschen oder zur Betankung am eigenen Betriebstank." }) })
        },
        {
          id: "camping",
          title: "Flaschengas & Camping",
          description: "Energie to go.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Für Camper, Dachdecker und den Grill im Garten: Wir füllen Ihre Eigentumsflaschen (Grau) direkt vor Ort oder tauschen sie aus." }),
            /* @__PURE__ */ jsx("h4", { children: "Größen" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "5 kg:" }),
                " Handlich, für den Grill."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "11 kg:" }),
                " Der Standard für Wohnwagen und Heizstrahler."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "33 kg:" }),
                " Für Gewerbe und Baustellen."
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-2", children: "Hinweis: Rote Pfandflaschen anderer Anbieter können wir leider nicht tauschen." })
          ] })
        }
      ]
    },
    {
      id: "service",
      title: "Service & Notfall",
      icon: Wrench,
      articles: [
        {
          id: "notfall",
          title: "Heizung funktioniert nicht?",
          description: "Erste Hilfe bei Störungen.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Bevor Sie den Techniker rufen, prüfen Sie bitte:" }),
            /* @__PURE__ */ jsxs("ul", { className: "mb-6", children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Füllstand:" }),
                " Ist noch Gas im Tank? (Anzeige am Tank, nicht im Haus)"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Strom:" }),
                " Hat die Heizung Strom? (Sicherung prüfen)"
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Störungscode:" }),
                " Zeigt das Display einen Fehlercode? (Handbuch prüfen, oft hilft ein Reset)"
              ] })
            ] }),
            /* @__PURE__ */ jsx(SafetyChecklist, {}),
            /* @__PURE__ */ jsxs("div", { className: "bg-gas-light p-4 rounded-lg text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gas mb-2", children: "24h Notdienst für Kunden:" }),
              /* @__PURE__ */ jsx("a", { href: "tel:04551897089", className: "text-2xl font-extrabold text-gas-dark block", children: "04551 89 70 89" })
            ] })
          ] })
        },
        {
          id: "nahwaerme",
          title: "Nahwärme vs. Einzeltank",
          description: "Warum wir Fans der Unabhängigkeit sind.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "In Neubaugebieten wird oft Nahwärme angeboten (ein zentrales Heizkraftwerk für alle). Das klingt bequem, hat aber Tücken:" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Monopol:" }),
                " Sie können den Anbieter nicht wechseln."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Anschlusszwang:" }),
                " Oft sind Sie vertraglich auf Jahrzehnte gebunden."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Preis:" }),
                " Die Grundgebühren sind oft sehr hoch."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Mit einem ",
              /* @__PURE__ */ jsx("strong", { children: "eigenen Flüssiggastank" }),
              " bleiben Sie unabhängig und können jederzeit den Anbieter wechseln."
            ] })
          ] })
        }
      ]
    },
    {
      id: "basis",
      title: "Basiswissen & Kosten",
      icon: BookOpen,
      articles: [
        {
          id: "was-ist",
          title: "Was ist Flüssiggas?",
          description: "Eigenschaften und Herkunft.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Flüssiggas (LPG = Liquefied Petroleum Gas) besteht hauptsächlich aus Propan und Butan. Es verflüssigt sich bereits unter geringem Druck (ca. 6-8 bar), wodurch große Energiemengen in kleinen Behältern transportiert werden können." }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Herkunft:" }),
              " Es entsteht als Begleitprodukt bei der Erdgasförderung (ca. 60%) und in Raffinerien (ca. 40%). Es ist also ohnehin vorhanden und muss nicht extra gefördert werden."
            ] })
          ] })
        },
        {
          id: "biolpg",
          title: "BioLPG erklärt",
          description: "Die grüne Zukunft.",
          content: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { children: "BioLPG ist chemisch identisch mit herkömmlichem Flüssiggas, wird aber aus organischen Reststoffen und pflanzlichen Ölen hergestellt. Es spart bis zu 80% CO2 ein und kann ohne technische Umrüstung in jeder bestehenden Flüssiggasanlage genutzt werden." }) })
        },
        {
          id: "preise",
          title: "Preisentwicklung & CO2-Steuer",
          description: "Wann kaufen?",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(SourceBadge, { text: "Stand: Nov 2025" }),
            /* @__PURE__ */ jsx("p", { children: "Flüssiggas wird an den internationalen Märkten gehandelt. Die Preise schwanken saisonal (im Sommer oft günstiger). Als Eigentümer eines Tanks können Sie den Kaufzeitpunkt frei wählen." }),
            /* @__PURE__ */ jsx("h4", { children: "CO2-Steuer" }),
            /* @__PURE__ */ jsx("p", { children: "Auch auf Flüssiggas fällt die CO2-Abgabe an. Da Flüssiggas jedoch weniger CO2 emittiert als Heizöl, ist die Belastung geringer. BioLPG kann perspektivisch von der CO2-Steuer befreit sein." })
          ] })
        },
        {
          id: "gaspreisbremse",
          title: "Gaspreisbremse & Politik",
          description: "Aktuelle Infos zur Entlastung.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(SourceBadge, { text: "Update: 2025" }),
            /* @__PURE__ */ jsx("p", { children: "Die Energiepreisbremsen sind ausgelaufen. Die Märkte haben sich jedoch stabilisiert." }),
            /* @__PURE__ */ jsx("p", { children: "Aktuell profitieren Gaskunden wieder von gesunkenen Börsenpreisen. Ein Vergleich lohnt sich immer. Da Flüssiggas nicht leitungsgebunden ist, reagiert der Markt schneller auf Preissenkungen als der Erdgasmarkt." })
          ] })
        },
        {
          id: "umrechnung",
          title: "Umrechnung: Liter, m³, kWh",
          description: "Verwirrung bei der Umrechnung?",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Flüssiggas wird in Litern geliefert. Die Abrechnung erfolgt aber oft in Kilowattstunden (kWh) oder Kubikmetern (m³). Hier die Faustformeln:" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 p-4 rounded-lg font-mono text-sm my-4 space-y-2", children: [
              /* @__PURE__ */ jsx("div", { children: "1 Liter flüssig ≈ 6,57 kWh" }),
              /* @__PURE__ */ jsx("div", { children: "1 m³ gasförmig ≈ 3,93 Liter flüssig" }),
              /* @__PURE__ */ jsx("div", { children: "1 m³ gasförmig ≈ 25,8 kWh" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs", children: "*Werte können je nach Druck und Temperatur leicht schwanken (Propangas)." })
          ] })
        },
        {
          id: "waermebedarf",
          title: "Wärmebedarf ermitteln",
          description: "Wie viel Gas brauche ich?",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Der Verbrauch hängt stark vom energetischen Zustand des Hauses ab." }),
            /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left border-collapse mt-4", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-300", children: [
                /* @__PURE__ */ jsx("th", { className: "py-2", children: "Baujahr / Standard" }),
                /* @__PURE__ */ jsx("th", { className: "py-2", children: "Verbrauch ca." })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-100", children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "py-2", children: "Neubau (KfW 55)" }),
                  /* @__PURE__ */ jsx("td", { className: "py-2", children: "4-6 Liter / m²" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "py-2", children: "Sanierter Altbau" }),
                  /* @__PURE__ */ jsx("td", { className: "py-2", children: "8-12 Liter / m²" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "py-2", children: "Unsanierter Altbau" }),
                  /* @__PURE__ */ jsx("td", { className: "py-2", children: "15-25 Liter / m²" })
                ] })
              ] })
            ] })
          ] })
        },
        {
          id: "autarkie",
          title: "Autarke Energieversorgung",
          description: "Unabhängig von Putin & Co.",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "In unsicheren Zeiten ist Unabhängigkeit Gold wert. Mit einem eigenen Flüssiggastank haben Sie Ihren Energievorrat für 1-2 Jahre direkt auf dem Grundstück." }),
            /* @__PURE__ */ jsx("h4", { children: "Krisensicher" }),
            /* @__PURE__ */ jsx("p", { children: "Flüssiggas kommt nicht durch Pipelines aus Russland, sondern per Schiff und Bahn aus der Nordsee (Norwegen/USA) und deutschen Raffinerien. Die Versorgung ist diversifiziert und sicher." })
          ] })
        }
      ]
    }
  ]
};
const RentVsBuyGraphic = () => /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-xl p-8 my-8 shadow-sm hover:shadow-md transition-shadow", children: [
  /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-text mb-8 text-center", children: "Kostenverlauf über 10 Jahre (Vergleich)" }),
  /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-end justify-center h-72 pb-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-end h-full w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mb-2 font-medium text-center", children: [
        "Hohe laufende Kosten",
        /* @__PURE__ */ jsx("br", {}),
        "(Gaspreisbindung & Miete)"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[120px] bg-red-50 border border-red-200 rounded-t-lg relative group h-[90%] transition-all duration-1000 ease-out", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 w-full bg-red-500/10 h-[10%] border-t border-red-200 flex items-center justify-center text-[10px] text-red-800 font-bold", children: "Start" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-4 w-full text-center font-bold text-red-800 text-lg", children: "~ 18.000€*" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 font-bold text-gray-700 flex items-center", children: [
        /* @__PURE__ */ jsx(Lock, { size: 16, className: "mr-2 text-red-500" }),
        " Miettank"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-12 font-bold text-gray-400 bg-gray-100 rounded-full p-3 text-xs shadow-inner", children: "VS" }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-end h-full w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[120px] bg-green-50 border border-green-200 rounded-t-lg relative group h-[60%] transition-all duration-1000 ease-out", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 w-full bg-green-500/10 h-[40%] border-t border-green-200 flex items-center justify-center text-[10px] text-green-900 font-bold", children: "Kauf" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-4 w-full text-center font-bold text-green-800 text-lg", children: "~ 12.500€*" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gas text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-xl whitespace-nowrap z-10 animate-bounce", children: "Sie sparen ~ 30%" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 font-bold text-gray-700 flex items-center", children: [
        /* @__PURE__ */ jsx(Unlock, { size: 16, className: "mr-2 text-green-600" }),
        " Kauftank"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-2 font-medium text-center", children: [
        "Günstigeres Gas",
        /* @__PURE__ */ jsx("br", {}),
        "(Freier Markt)"
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-8 text-center italic border-t border-gray-100 pt-4", children: "*Beispielhafte Gesamtkostenrechnung über 10 Jahre inkl. Wartung, Tankmiete/Kauf und Gasverbrauch (2.500L/Jahr)." })
] });
const KnowledgeCenter = ({ setActiveSection }) => {
  const [activeCategory, setActiveCategory] = useState(CONTENT.knowledge[0].id);
  const [activeArticle, setActiveArticle] = useState(CONTENT.knowledge[0].articles[0].id);
  const currentCategory = CONTENT.knowledge.find((c) => c.id === activeCategory);
  const currentArticle = currentCategory.articles.find((a) => a.id === activeArticle) || currentCategory.articles[0];
  const handleCategoryChange = (catId) => {
    const newCat = CONTENT.knowledge.find((c) => c.id === catId);
    setActiveCategory(catId);
    if (newCat && newCat.articles.length > 0) {
      setActiveArticle(newCat.articles[0].id);
    }
  };
  return /* @__PURE__ */ jsx("section", { className: "bg-gray-50 pt-32 pb-24 min-h-screen", id: "wissen", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-extrabold text-text mb-4", children: "Wissen & Ratgeber" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-500 max-w-2xl mx-auto", children: "Expertenwissen verständlich erklärt." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-4 mb-12", children: CONTENT.knowledge.map((cat) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => handleCategoryChange(cat.id),
        className: `flex items-center px-6 py-4 rounded-xl transition-all shadow-sm ${activeCategory === cat.id ? "bg-gas text-white shadow-lg ring-2 ring-gas ring-offset-2" : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gas"}`,
        children: [
          /* @__PURE__ */ jsx(cat.icon, { size: 20, className: "mr-3" }),
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: cat.title })
        ]
      },
      cat.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 lg:col-start-1", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ jsxs("h3", { className: "font-bold text-gray-700 flex items-center", children: [
          /* @__PURE__ */ jsx(BookOpen, { size: 18, className: "mr-2" }),
          " Artikelübersicht"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100", children: currentCategory.articles.map((article) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveArticle(article.id),
            className: `sidebar-link w-full text-left p-4 hover:bg-gray-50 transition-colors flex justify-between items-center group ${currentArticle.id === article.id ? "active" : "text-gray-600"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-semibold group-hover:text-gas transition-colors", children: article.title }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-1 line-clamp-1", children: article.description })
              ] }),
              /* @__PURE__ */ jsx(ChevronRight, { size: 16, className: `opacity-0 group-hover:opacity-100 transition-opacity ${currentArticle.id === article.id ? "text-gas opacity-100" : "text-gray-400"}` })
            ]
          },
          article.id
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-8", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          className: "bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 article-content min-h-[600px]",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center space-x-2 text-sm text-gas font-bold uppercase tracking-wider", children: [
              /* @__PURE__ */ jsx("span", { children: currentCategory.title }),
              /* @__PURE__ */ jsx(ChevronRight, { size: 14 }),
              /* @__PURE__ */ jsx("span", { children: "Ratgeber" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 mb-4", children: currentArticle.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-500 mb-8 pb-8 border-b border-gray-100", children: currentArticle.description }),
            /* @__PURE__ */ jsx("div", { children: currentArticle.content }),
            currentArticle.id === "miete-kauf" && /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(RentVsBuyGraphic, {}) })
          ]
        },
        currentArticle.id
      ) })
    ] })
  ] }) });
};
const TeamSection = () => /* @__PURE__ */ jsxs("div", { className: "py-24 bg-white", children: [
  /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 text-center mb-16", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-gas font-bold tracking-widest uppercase text-sm mb-4", children: "Unser Team" }),
    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-extrabold text-text", children: "Gesichter hinter der Energie" })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center", children: [
    { name: "Thomas Möller", role: "Geschäftsführung", img: "/images/team/thomas.jpg" },
    { name: "Hans Christian Möller", role: "Buchhaltung", img: "/images/team/hans.jpg" }
  ].map((member, i) => /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg bg-gray-200 w-full max-w-sm", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: member.img,
        alt: member.name,
        width: "300",
        height: "400",
        className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
        onError: (e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-gray-300 text-gray-500 hidden gap-2", children: /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-2xl font-bold", children: member.name.split(" ").map((n) => n[0]).join("") }) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-white font-bold text-lg", children: member.name }),
      /* @__PURE__ */ jsx("p", { className: "text-gas-light text-sm", children: member.role })
    ] })
  ] }, i)) })
] });
const AboutTimeline = () => /* @__PURE__ */ jsxs("div", { className: "py-16 bg-white", children: [
  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-12", children: "Unsere Geschichte" }),
  /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto px-4 border-l-2 border-gas/20 ml-4 md:ml-auto space-y-12", children: [
    { year: "2005", title: "Gründung", text: "Start als Familienunternehmen 'Gas-Service Möller' mit Fokus auf faire Beratung." },
    { year: "2012", title: "Expansion", text: "Erweiterung des Liefergebiets auf ganz Schleswig-Holstein und Hamburg." },
    { year: "2018", title: "Eigene Logistik", text: "Investition in eigene Tankwagen für maximale Unabhängigkeit." },
    { year: "2021", title: "e.K. Umfirmierung", text: "Wachstum zum eingetragenen Kaufmann. 5000+ zufriedene Kunden." },
    { year: "2025", title: "Zukunft", text: "Start der Bio-LPG Initiative für klimaneutrales Heizen." }
  ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "relative pl-8", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -left-[9px] top-0 bg-gas text-white font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full border-4 border-white shadow-sm" }),
    /* @__PURE__ */ jsx("span", { className: "text-gas font-bold text-xl block mb-1", children: item.year }),
    /* @__PURE__ */ jsx("h4", { className: "font-bold text-text text-lg", children: item.title }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mt-1", children: item.text })
  ] }, i)) })
] });
const AboutPage = () => /* @__PURE__ */ jsx("section", { className: "bg-white", id: "ueber-uns", children: /* @__PURE__ */ jsxs("div", { className: "py-24 max-w-7xl mx-auto px-4", children: [
  /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-gas font-bold tracking-widest uppercase text-sm mb-4", children: "Über Uns" }),
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold mb-6", children: "Ehrlich. Norddeutsch." }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-lg leading-relaxed text-gray-600 space-y-6", children: [
      /* @__PURE__ */ jsx("p", { children: "Moin und herzlich willkommen bei gasmöller! Seit unserer Gründung im Jahr 2005 sind wir der zuverlässige Partner für Flüssiggas im echten Norden. Was als kleiner Familienbetrieb begann, ist heute eine feste Größe in Schleswig-Holstein, Hamburg und dem nördlichen Niedersachsen." }),
      /* @__PURE__ */ jsx("p", { children: "Unter der Leitung von Thomas Möller setzen wir auf das, was hier zählt: Ein Wort ist ein Wort. Wir verstecken uns nicht hinter Callcentern oder anonymen Konzernstrukturen. Wenn Sie bei uns anrufen, sprechen Sie mit Menschen, die wissen, wovon sie reden – und die verstehen, dass Sie nicht irgendeine Nummer sind, sondern unser Nachbar." }),
      /* @__PURE__ */ jsx("p", { children: "Mit unserer eigenen Tankwagenflotte sind wir unabhängig und flexibel. Das bedeutet für Sie: Versorgungssicherheit auch im tiefsten Winter und faire Preise ohne versteckte Gebühren. Wir glauben daran, dass Energieversorgung Vertrauenssache ist. Egal ob Sie einen eigenen Tank kaufen oder Gas bestellen wollen – wir beraten Sie so, wie wir es uns selbst wünschen würden: ehrlich, direkt und kompetent." })
    ] })
  ] }),
  /* @__PURE__ */ jsx(TeamSection, {}),
  /* @__PURE__ */ jsx(AboutTimeline, {})
] }) });
const Footer = ({ setActiveSection, openLegal }) => /* @__PURE__ */ jsxs("footer", { className: "bg-gray-900 text-gray-400 py-20 border-t border-gray-800 text-sm", children: [
  /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "col-span-1", children: [
      /* @__PURE__ */ jsx("img", { src: "/logos/Icon-01.webp", alt: "gasmöller", width: "2222", height: "747", className: "h-10 w-auto filter brightness-0 invert opacity-80 mb-6" }),
      /* @__PURE__ */ jsx("p", { className: "leading-relaxed mb-4", children: "Ihr unabhängiger Partner für Energie im Norden. Seit 2005." }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer", children: "f" }),
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gas transition-colors cursor-pointer", children: "in" })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => openLegal("dev"), className: "mt-8 text-[10px] text-gray-700 hover:text-gas transition-colors flex items-center", children: [
        /* @__PURE__ */ jsx("code", { className: "mr-1", children: "</>" }),
        " Dev Status"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-white font-bold mb-4 uppercase text-xs tracking-wider", children: "Schnellzugriff" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => setActiveSection("gas"), className: "hover:text-white transition-colors", children: "Gas bestellen" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => setActiveSection("tanks"), className: "hover:text-white transition-colors", children: "Tanks kaufen" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => setActiveSection("rechner"), className: "hover:text-white transition-colors", children: "Spar-Rechner" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => setActiveSection("kontakt"), className: "hover:text-white transition-colors", children: "Kontakt" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-white font-bold mb-4 uppercase text-xs tracking-wider", children: "Rechtliches" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => openLegal("imprint"), className: "hover:text-white transition-colors text-left", children: "Impressum" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => openLegal("privacy"), className: "hover:text-white transition-colors text-left", children: "Datenschutz" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => openLegal("terms"), className: "hover:text-white transition-colors text-left", children: "AGB" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-white font-bold mb-4 uppercase text-xs tracking-wider", children: "Newsletter" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs", children: "Bleiben Sie über Gaspreise informiert." }),
      /* @__PURE__ */ jsxs("div", { className: "flex opacity-50 cursor-not-allowed", title: "Bald verfügbar", children: [
        /* @__PURE__ */ jsx("input", { disabled: true, type: "email", placeholder: "Bald verfügbar", className: "bg-gray-800 border-none rounded-l px-3 py-2 w-full text-white focus:ring-1 focus:ring-gas outline-none cursor-not-allowed" }),
        /* @__PURE__ */ jsx("button", { disabled: true, className: "bg-gas text-white px-3 py-2 rounded-r hover:bg-gas-dark cursor-not-allowed", children: /* @__PURE__ */ jsx(Send, { size: 16 }) })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600", children: "© 2025 gasmöller GmbH. Alle Rechte vorbehalten." })
] });
const ModernInput = ({ label, error, className = "", ...props }) => {
  const [focused, setFocused] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: `relative mb-4 ${className}`, children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        animate: focused ? { scale: 1.01 } : { scale: 1 },
        transition: { duration: 0.2 },
        className: `relative rounded-xl border-2 transition-colors ${error ? "border-red-300 bg-red-50/50" : focused ? "border-gas bg-white shadow-lg shadow-gas/10" : "border-gray-100 bg-white"}`,
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ...props,
              onFocus: (e) => {
                setFocused(true);
                props.onFocus && props.onFocus(e);
              },
              onBlur: (e) => {
                setFocused(false);
                props.onBlur && props.onBlur(e);
              },
              className: "w-full p-4 bg-transparent outline-none text-gray-800 font-medium placeholder-gray-400 rounded-xl font-sans"
            }
          ),
          label && /* @__PURE__ */ jsx("div", { className: "absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold text-gray-500 uppercase tracking-wider pointer-events-none", children: label })
        ]
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 ml-1 font-bold", children: error })
  ] });
};
const SelectionCard = ({ selected, onClick, title, description, icon: Icon, className = "" }) => {
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      type: "button",
      onClick,
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      className: `relative w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${className} ${selected ? "border-gas bg-gas text-white shadow-xl shadow-gas/20" : "border-gray-100 bg-white hover:border-gas/50 hover:shadow-lg"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
            Icon && /* @__PURE__ */ jsx(Icon, { size: 32, className: `mb-4 ${selected ? "text-white" : "text-gas group-hover:scale-110 transition-transform duration-300"}` }),
            /* @__PURE__ */ jsx("h3", { className: `text-xl font-bold mb-1 ${selected ? "text-white" : "text-gray-900"}`, children: title }),
            description && /* @__PURE__ */ jsx("p", { className: `text-sm ${selected ? "text-blue-100" : "text-gray-500"}`, children: description })
          ] }),
          selected && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              className: "bg-white/20 p-2 rounded-full absolute top-0 right-0",
              children: /* @__PURE__ */ jsx(Check, { size: 20, className: "text-white" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: `absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500 ${selected ? "bg-white/20 opacity-100" : "bg-gas/5 opacity-0 group-hover:opacity-100"}` })
      ]
    }
  );
};
const WEB3FORMS_ACCESS_KEY = "f22052ed-455f-4e4d-9f5a-94a6e340426f";
const WizardModal = ({ isOpen, onClose, initialType = "tank", initialData = null }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(initialType);
  const [plz, setPlz] = useState("");
  const [plzError, setPlzError] = useState("");
  const [installationType, setInstallationType] = useState("");
  const [details, setDetails] = useState({});
  const [contact, setContact] = useState({ name: "", street: "", city: "", email: "", phone: "", number: "", honeypot: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSuccess(false);
      setPlzError("");
      if (initialType) setType(initialType);
      setInstallationType("");
      setDetails({});
      setContact({ name: "", street: "", city: "", email: "", phone: "", number: "", honeypot: "" });
      if (initialData) {
        if (initialData.plz) setPlz(initialData.plz);
        if (initialData.liters) {
          setDetails((prev) => ({
            ...prev,
            amount: initialData.liters.toString(),
            fillUp: false
          }));
        }
        if (initialData.plz && initialType === "gas") {
          setStep(3);
        }
      }
    }
  }, [isOpen, initialType, initialData]);
  const handleNext = () => {
    if (step === 1) {
      const error = getPlzError(plz);
      if (error) {
        setPlzError(error);
        return;
      }
      setPlzError("");
      setStep(2);
    } else if (step === 2) {
      if (type === "tank") setStep(3);
      else setStep(3);
    } else if (step === 3) {
      if (type === "tank") {
        if (!installationType) return;
        setStep(4);
      } else {
        setStep(4);
      }
    } else if (step === 4) {
      if (type === "tank") setStep(5);
      else handleSubmitWrapper();
    } else if (step === 5) {
      if (type === "tank") setStep(6);
    }
  };
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleSubmitWrapper = (e) => {
    if (e) e.preventDefault();
    handleSubmit();
  };
  const handleSubmit = async () => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `Neue Anfrage: ${type.toUpperCase()} - ${plz}`);
    formData.append("from_name", "gasmöller Website");
    if (contact.honeypot) {
      return;
    }
    formData.append("Type", type);
    formData.append("PLZ", plz);
    if (type === "tank") formData.append("Installation", installationType);
    Object.keys(details).forEach((key) => {
      formData.append(key, details[key]);
    });
    formData.append("Name", contact.name);
    formData.append("Address", `${contact.street} ${contact.number}, ${plz} ${contact.city}`);
    formData.append("Email", contact.email);
    formData.append("Phone", contact.phone);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        setSuccess(true);
      } else {
        alert("Es gab einen Fehler. Bitte versuchen Sie es später.");
      }
    } catch (error) {
      alert("Netzwerkfehler.");
    } finally {
      setSubmitting(false);
    }
  };
  const totalSteps = type === "tank" ? 6 : 4;
  const progress = step / totalSteps * 100;
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      className: "bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center bg-white z-20", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900", children: "Anfrage stellen" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
              "Schritt ",
              step,
              " von ",
              totalSteps
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsx(X, { size: 24 }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-1 bg-gray-100 w-full", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "h-full bg-gas",
            initial: { width: 0 },
            animate: { width: `${progress}%` },
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1 relative", children: success ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 flex flex-col items-center justify-center h-full", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              className: "w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100",
              children: /* @__PURE__ */ jsx(Check, { size: 48, strokeWidth: 3 })
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold mb-4 text-gray-900", children: "Vielen Dank!" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-8 max-w-sm mx-auto", children: "Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden." }),
          /* @__PURE__ */ jsx("button", { onClick: onClose, className: "bg-gas text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all", children: "Schließen" })
        ] }) : /* @__PURE__ */ jsx("form", { onSubmit: handleSubmitWrapper, className: "h-full", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
          step === 1 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "flex flex-col h-full justify-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold mb-3 text-gray-900", children: "Wo wird geliefert?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Geben Sie Ihre Postleitzahl ein, um die Verfügbarkeit zu prüfen." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-xs mx-auto w-full", children: [
              /* @__PURE__ */ jsx(
                ModernInput,
                {
                  type: "text",
                  name: "plz",
                  autoComplete: "postal-code",
                  value: plz,
                  onChange: (e) => {
                    if (e.target.value.length <= 5 && /^\d*$/.test(e.target.value)) {
                      setPlz(e.target.value);
                    }
                  },
                  className: "text-center text-3xl font-bold tracking-[0.5em] !rounded-2xl",
                  placeholder: "PLZ",
                  maxLength: 5,
                  autoFocus: true,
                  error: plzError
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleNext,
                  disabled: plz.length < 5,
                  className: "w-full mt-6 bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-gas/20",
                  children: "Weiter"
                }
              )
            ] })
          ] }, "step1"),
          step === 2 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-8 text-gray-900", children: "Wie können wir helfen?" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8", children: [
              /* @__PURE__ */ jsx(
                SelectionCard,
                {
                  title: "Neuer Tank",
                  description: "Kauf oder Miete",
                  icon: Settings,
                  selected: type === "tank",
                  onClick: () => {
                    setType("tank");
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                SelectionCard,
                {
                  title: "Gas bestellen",
                  description: "Befüllung",
                  icon: Flame,
                  selected: type === "gas",
                  onClick: () => {
                    setType("gas");
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                SelectionCard,
                {
                  title: "Service",
                  description: "Wartung & Prüfung",
                  icon: Wrench,
                  selected: type === "service",
                  onClick: () => {
                    setType("service");
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNext, className: "w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all mb-4", children: "Weiter" }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "w-full text-gray-400 hover:text-gray-600 font-bold", children: "Zurück" })
          ] }, "step2"),
          step === 3 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: [
            type === "tank" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-8 text-gray-900", children: "Welche Tankart bevorzugen Sie?" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
                /* @__PURE__ */ jsx(
                  SelectionCard,
                  {
                    title: "Oberirdisch",
                    description: "Einfache Aufstellung im Garten (hellgrün)",
                    icon: ArrowUpFromLine,
                    selected: installationType === "oberirdisch",
                    onClick: () => setInstallationType("oberirdisch"),
                    className: "h-48"
                  }
                ),
                /* @__PURE__ */ jsx(
                  SelectionCard,
                  {
                    title: "Unterirdisch",
                    description: "Unsichtbar im Boden verbaut",
                    icon: ArrowDownToLine,
                    selected: installationType === "unterirdisch",
                    onClick: () => setInstallationType("unterirdisch"),
                    className: "h-48"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNext, disabled: !installationType, className: "w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-4", children: "Weiter" })
            ] }) : type === "gas" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-6 text-gray-900", children: "Bestelldetails" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-md mx-auto", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Eigentumsverhältnis" }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-4", children: ["Ja, Eigentum", "Nein, Mietvertrag"].map((opt) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setDetails({ ...details, ownership: opt }), className: `flex-1 py-3 rounded-xl border-2 font-bold transition-all ${details.ownership === opt ? "border-gas bg-gas-light/20 text-gas" : "border-gray-100 text-gray-500 hover:border-gas-light"}`, children: opt }, opt)) }),
                  details.ownership === "Nein, Mietvertrag" && /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-yellow-800 text-sm mt-4 flex items-start", children: [
                    /* @__PURE__ */ jsx(AlertTriangle, { className: "mr-3 flex-shrink-0", size: 20 }),
                    /* @__PURE__ */ jsxs("p", { children: [
                      /* @__PURE__ */ jsx("strong", { children: "Hinweis:" }),
                      " Wenn Sie den Tank gemietet haben, sind Sie meist vertraglich an Ihren Anbieter gebunden. Eine Befüllung durch uns ist dann rechtlich oft nicht möglich. Bitte prüfen Sie Ihren Vertrag."
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-2xl border border-gray-100", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-gray-700 mb-2 block", children: "Tankgröße (falls bekannt)" }),
                    /* @__PURE__ */ jsx(
                      ModernInput,
                      {
                        type: "text",
                        name: "tankSizeGas",
                        className: "mb-0 bg-white",
                        placeholder: "z.B. 1,2t oder 2700 Liter",
                        value: details.tankSizeGas || "",
                        onChange: (e) => setDetails({ ...details, tankSizeGas: e.target.value })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-gray-700", children: "Wunschmenge" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsx("input", { type: "checkbox", id: "fillUp", className: "w-4 h-4 accent-gas rounded", onChange: (e) => setDetails({ ...details, fillUp: e.target.checked }) }),
                      /* @__PURE__ */ jsx("label", { htmlFor: "fillUp", className: "text-sm text-gray-600 font-medium cursor-pointer", children: "Bitte vollmachen" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: `relative transition-opacity ${details.fillUp ? "opacity-50 pointer-events-none" : "opacity-100"}`, children: [
                    /* @__PURE__ */ jsx(
                      ModernInput,
                      {
                        type: "number",
                        name: "amount",
                        className: "mb-0",
                        placeholder: "z.B. 2000",
                        value: details.amount || "",
                        onChange: (e) => setDetails({ ...details, amount: e.target.value })
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "absolute right-6 top-4 text-gray-400 font-bold", children: "Liter" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNext, className: "w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all mt-4", children: "Weiter zu Kontakt" })
              ] })
            ] }) : (
              /* Service Details */
              /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-6 text-gray-900", children: "Service Anfrage" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700", children: "Art des Service" }),
                  /* @__PURE__ */ jsxs("select", { name: "serviceType", className: "w-full p-4 border-2 border-gray-100 rounded-xl outline-none bg-white mb-4 focus:border-gas transition-colors", onChange: (e) => setDetails({ ...details, serviceType: e.target.value }), children: [
                    /* @__PURE__ */ jsx("option", { children: "Bitte wählen..." }),
                    /* @__PURE__ */ jsx("option", { children: "Innere Prüfung (10 Jahre)" }),
                    /* @__PURE__ */ jsx("option", { children: "Äußere Prüfung (2 Jahre)" }),
                    /* @__PURE__ */ jsx("option", { children: "Rohrleitungsprüfung" }),
                    /* @__PURE__ */ jsx("option", { children: "Wartung" }),
                    /* @__PURE__ */ jsx("option", { children: "Sonstiges" })
                  ] }),
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700", children: "Nachricht" }),
                  /* @__PURE__ */ jsx("textarea", { name: "message", className: "w-full p-4 border-2 border-gray-100 rounded-xl h-32 outline-none focus:border-gas transition-colors resize-none", placeholder: "Beschreiben Sie Ihr Anliegen...", onChange: (e) => setDetails({ ...details, message: e.target.value }) }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNext, className: "w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all mt-4", children: "Weiter zu Kontakt" })
                ] })
              ] })
            ),
            type !== "tank" && /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "w-full text-gray-400 hover:text-gray-600 font-bold mt-4", children: "Zurück" }),
            type === "tank" && /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "w-full text-gray-400 hover:text-gray-600 font-bold mt-4", children: "Zurück" })
          ] }, "step3"),
          step === 4 && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: type === "tank" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-4 text-gray-900", children: "Zustand des Tanks" }),
            /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 mb-8 max-w-sm mx-auto", children: "Wählen Sie zwischen einem fabrikneuen oder einem professionell aufbereiteten Tank." }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
              /* @__PURE__ */ jsx(
                SelectionCard,
                {
                  title: "Neu",
                  description: "Fabrikneuer Tank",
                  icon: Sparkles,
                  selected: details.condition === "Neu",
                  onClick: () => setDetails({ ...details, condition: "Neu" }),
                  className: "h-48"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx(
                  SelectionCard,
                  {
                    title: "Gebraucht",
                    description: "Geprüft & Aufbereitet",
                    icon: RefreshCw,
                    selected: details.condition === "Gebraucht / Aufbereitet",
                    onClick: () => setDetails({ ...details, condition: "Gebraucht / Aufbereitet" }),
                    className: "h-48"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3", children: /* @__PURE__ */ jsx("div", { className: "bg-gas text-white rounded-full p-1 shadow-lg", children: /* @__PURE__ */ jsx(Info, { size: 16 }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-blue-800 leading-relaxed", children: [
                  /* @__PURE__ */ jsx("strong", { children: "Spar-Tipp:" }),
                  " Wir bereiten alte Tanks professionell auf (lackiert & geprüft). Eine nachhaltige und günstige Alternative!"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNext, disabled: !details.condition, className: "w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-4", children: "Weiter" }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "w-full text-gray-400 hover:text-gray-600 font-bold", children: "Zurück" })
          ] }) : (
            /* CONTACT FORM for Gas/Service */
            /* @__PURE__ */ jsx(
              ContactForm,
              {
                contact,
                setContact,
                plz,
                submitting,
                handleBack,
                stepName: "Kontakt"
              }
            )
          ) }, "step4"),
          step === 5 && type === "tank" && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-6 text-gray-900", children: "Projekt Details" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-8 max-w-md mx-auto", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-3 ml-1", children: "Art des Gebäudes" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: [
                  { id: "bestand", label: "Haus", sub: "(Bestand)", icon: Home },
                  { id: "neubau", label: "Neubau", sub: "", icon: Building2 },
                  { id: "gewerbe", label: "Gewerbe", sub: "", icon: Factory }
                ].map((b) => /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDetails({ ...details, building: b.label + (b.sub ? " " + b.sub : "") }),
                    className: `flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all h-24 ${details.building === b.label + (b.sub ? " " + b.sub : "") ? "border-gas bg-gas-light/20 text-gas" : "border-gray-100 hover:border-gas-light text-gray-600"}`,
                    children: [
                      /* @__PURE__ */ jsx(b.icon, { size: 24, className: "mb-2", strokeWidth: 1.5 }),
                      /* @__PURE__ */ jsx("span", { className: "font-bold text-xs", children: b.label }),
                      b.sub && /* @__PURE__ */ jsx("span", { className: "text-[10px] opacity-70", children: b.sub })
                    ]
                  },
                  b.id
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-3 ml-1", children: "Gewünschte Tankgröße" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: [{ l: "1,2 t", v: "1.2t", vol: "2.700 L" }, { l: "2,1 t", v: "2.1t", vol: "4.850 L" }, { l: "2,9 t", v: "2.9t", vol: "6.400 L" }].map((t) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setDetails({ ...details, tankSize: t.v }), className: `p-3 rounded-xl border-2 text-center transition-all ${details.tankSize === t.v ? "border-gas bg-gas text-white shadow-lg" : "border-gray-100 hover:border-gas-light"}`, children: [
                  /* @__PURE__ */ jsx("div", { className: "font-extrabold text-lg", children: t.l }),
                  /* @__PURE__ */ jsx("div", { className: `text-[10px] font-bold tracking-wider uppercase mt-1 ${details.tankSize === t.v ? "opacity-80" : "text-gray-400"}`, children: "Volumen" }),
                  /* @__PURE__ */ jsx("div", { className: `text-xs ${details.tankSize === t.v ? "opacity-100" : "text-gray-500"}`, children: t.vol })
                ] }, t.v)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-3 ml-1", children: "Interesse an" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2", children: ["Kauf (Eigentum)", "Miete", "Beratung gewünscht"].map((opt) => /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDetails({ ...details, interest: opt }),
                    className: `w-full text-left px-5 py-4 rounded-xl border-2 font-bold transition-all flex justify-between items-center ${details.interest === opt ? "border-gas bg-gas-light/20 text-gas" : "border-gray-100 text-gray-600 hover:border-gas-light"}`,
                    children: [
                      opt,
                      details.interest === opt && /* @__PURE__ */ jsx(Check, { size: 18 })
                    ]
                  },
                  opt
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
                /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNext, className: "w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark transition-all", children: "Weiter zu Kontakt" }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "w-full text-gray-400 hover:text-gray-600 font-bold mt-4", children: "Zurück" })
              ] })
            ] })
          ] }, "step5"),
          step === 6 && type === "tank" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: /* @__PURE__ */ jsx(
            ContactForm,
            {
              contact,
              setContact,
              plz,
              submitting,
              handleBack,
              stepName: "Kontakt"
            }
          ) }, "step6")
        ] }) }) })
      ]
    }
  ) });
};
const ContactForm = ({ contact, setContact, plz, submitting, handleBack, stepName }) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-6 text-gray-900", children: stepName }),
  /* @__PURE__ */ jsxs("div", { className: "space-y-2 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        name: "b_field",
        style: { display: "none" },
        tabIndex: "-1",
        autoComplete: "off",
        value: contact.honeypot || "",
        onChange: (e) => setContact({ ...contact, honeypot: e.target.value })
      }
    ),
    /* @__PURE__ */ jsx(
      ModernInput,
      {
        label: "Name",
        type: "text",
        name: "name",
        autoComplete: "name",
        required: true,
        placeholder: "Ihr vollständiger Name",
        value: contact.name,
        onChange: (e) => setContact({ ...contact, name: e.target.value })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(
        ModernInput,
        {
          label: "Straße",
          type: "text",
          name: "street",
          autoComplete: "address-line1",
          required: true,
          placeholder: "Musterstraße",
          value: contact.street,
          onChange: (e) => setContact({ ...contact, street: e.target.value })
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        ModernInput,
        {
          label: "Nr.",
          type: "text",
          name: "number",
          autoComplete: "address-line2",
          required: true,
          placeholder: "1a",
          value: contact.number,
          onChange: (e) => setContact({ ...contact, number: e.target.value })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        ModernInput,
        {
          label: "PLZ",
          type: "text",
          disabled: true,
          value: plz,
          className: "bg-gray-50 opacity-70"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx(
        ModernInput,
        {
          label: "Ort",
          type: "text",
          name: "city",
          autoComplete: "address-level2",
          required: true,
          placeholder: "Hamburg",
          value: contact.city,
          onChange: (e) => setContact({ ...contact, city: e.target.value })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      ModernInput,
      {
        label: "E-Mail",
        type: "email",
        name: "email",
        autoComplete: "email",
        required: true,
        placeholder: "ihre@email.de",
        value: contact.email,
        onChange: (e) => setContact({ ...contact, email: e.target.value })
      }
    ),
    /* @__PURE__ */ jsx(
      ModernInput,
      {
        label: "Telefon",
        type: "tel",
        name: "phone",
        autoComplete: "tel",
        placeholder: "Für Rückfragen",
        value: contact.phone,
        onChange: (e) => setContact({ ...contact, phone: e.target.value })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start text-xs text-gray-500 mt-2 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100", children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", required: true, className: "mt-1 mr-3 w-4 h-4 accent-gas" }),
      /* @__PURE__ */ jsx("span", { className: "leading-relaxed", children: "Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen dauerhaft gespeichert werden." })
    ] }),
    /* @__PURE__ */ jsx("button", { type: "submit", disabled: submitting, className: "w-full bg-gas text-white py-4 rounded-xl font-bold shadow-lg shadow-gas/20 hover:bg-gas-dark hover:shadow-xl transform active:scale-95 transition-all", children: submitting ? "Wird gesendet..." : "Kostenlos anfragen" }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "w-full text-gray-400 hover:text-gray-600 font-bold mt-4", children: "Zurück" })
  ] })
] });
const CookieBanner = () => {
  const [accepted, setAccepted] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem("gas_cookie");
    setAccepted(stored === "true");
  }, []);
  const accept = () => {
    setAccepted(true);
    localStorage.setItem("gas_cookie", "true");
  };
  if (accepted) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-[70] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 max-w-2xl", children: "Wir nutzen Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. Dazu zählen essentielle Cookies für die Funktion der Website sowie Analyse-Tools." }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsx("button", { onClick: accept, className: "bg-gas text-white px-6 py-2 rounded-lg font-bold hover:bg-gas-dark transition-all text-sm", children: "Alles akzeptieren" }),
      /* @__PURE__ */ jsx("button", { onClick: accept, className: "text-gray-500 hover:text-gray-800 text-sm font-bold", children: "Nur Essentielle" })
    ] })
  ] });
};
const SimpleModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[80vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx("button", { onClick: onClose, className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsx(X, { size: 24 }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: title }),
    /* @__PURE__ */ jsx("div", { className: "prose prose-sm text-gray-600 leading-relaxed", children: content })
  ] }) });
};
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsx("button", { onClick: scrollToTop, className: `scroll-to-top ${visible ? "visible" : ""}`, "aria-label": "Nach oben", children: /* @__PURE__ */ jsx(ChevronUp, { size: 24 }) });
};
const NotFound = ({ onGoHome }) => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center p-4 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-9xl font-bold text-gray-200 mb-4", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Seite nicht gefunden" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8 max-w-md", children: "Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben." }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: onGoHome,
        className: "bg-gas text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gas-dark transition-all flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsx(Home, { size: 20 }),
          "Zurück zur Startseite"
        ]
      }
    )
  ] });
};
const ImprintContent = () => /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-700", children: [
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "Angaben gemäß § 5 TMG" }),
  /* @__PURE__ */ jsxs("p", { children: [
    /* @__PURE__ */ jsx("strong", { children: "Gas-Service Möller e.K." }),
    /* @__PURE__ */ jsx("br", {}),
    "Neuenteichweg 7a",
    /* @__PURE__ */ jsx("br", {}),
    "23795 Schieren"
  ] }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "Vertreten durch" }),
  /* @__PURE__ */ jsx("p", { children: "Anja Möller" }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "Kontakt" }),
  /* @__PURE__ */ jsxs("p", { children: [
    "Telefon: 04551 89 70 89",
    /* @__PURE__ */ jsx("br", {}),
    "E-Mail: ",
    /* @__PURE__ */ jsx("a", { href: "mailto:kontakt@gasmoeller.de", className: "text-gas hover:underline", children: "kontakt@gasmoeller.de" })
  ] }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "Registereintrag" }),
  /* @__PURE__ */ jsxs("p", { children: [
    "Eintragung im Handelsregister.",
    /* @__PURE__ */ jsx("br", {}),
    "Registergericht: Amtsgericht Kiel",
    /* @__PURE__ */ jsx("br", {}),
    "Registernummer: HRA 11334 KI"
  ] }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "Umsatzsteuer-ID" }),
  /* @__PURE__ */ jsxs("p", { children: [
    "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:",
    /* @__PURE__ */ jsx("br", {}),
    "DE 224162155"
  ] }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "Streitschlichtung" }),
  /* @__PURE__ */ jsxs("p", { children: [
    "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:",
    /* @__PURE__ */ jsx("a", { href: "https://ec.europa.eu/consumers/odr", target: "_blank", rel: "noopener noreferrer", className: "text-gas hover:underline ml-1", children: "https://ec.europa.eu/consumers/odr" }),
    ".",
    /* @__PURE__ */ jsx("br", {}),
    "Unsere E-Mail-Adresse finden Sie oben im Impressum."
  ] }),
  /* @__PURE__ */ jsx("p", { children: "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen." })
] });
const PrivacyContent = () => /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-700", children: [
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "1. Datenschutz auf einen Blick" }),
  /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Allgemeine Hinweise" }) }),
  /* @__PURE__ */ jsx("p", { children: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können." }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "2. Allgemeine Hinweise und Pflichtinformationen" }),
  /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Datenschutz" }) }),
  /* @__PURE__ */ jsx("p", { children: "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung." }),
  /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Hinweis zur verantwortlichen Stelle" }) }),
  /* @__PURE__ */ jsxs("p", { children: [
    "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:",
    /* @__PURE__ */ jsx("br", {}),
    "Gas-Service Möller e.K.",
    /* @__PURE__ */ jsx("br", {}),
    "Neuenteichweg 7a",
    /* @__PURE__ */ jsx("br", {}),
    "23795 Schieren",
    /* @__PURE__ */ jsx("br", {}),
    "Telefon: 04551 89 70 89",
    /* @__PURE__ */ jsx("br", {}),
    "E-Mail: kontakt@gasmoeller.de"
  ] }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "3. Datenerfassung auf dieser Website" }),
  /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Kontaktformular / Anfrage-Assistent" }) }),
  /* @__PURE__ */ jsx("p", { children: "Wenn Sie uns per Kontaktformular oder über den Anfrage-Assistenten Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter." }),
  /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Cookies" }) }),
  /* @__PURE__ */ jsx("p", { children: "Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen." })
] });
const TermsContent = () => /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-700", children: [
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900", children: "1. Geltungsbereich" }),
  /* @__PURE__ */ jsx("p", { children: "Für alle Lieferungen von gasmöller an Verbraucher (§ 13 BGB) gelten diese Allgemeinen Geschäftsbedingungen (AGB). Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können." }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "2. Vertragspartner" }),
  /* @__PURE__ */ jsx("p", { children: "Der Kaufvertrag kommt zustande mit der Gas-Service Möller e.K., Inhaberin: Anja Möller, Neuenteichweg 7a, 23795 Schieren." }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "3. Vertragsabschluss" }),
  /* @__PURE__ */ jsx("p", { children: "Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Bestellbuttons geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab." }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "4. Preise und Versandkosten" }),
  /* @__PURE__ */ jsx("p", { children: "Die auf den Produktseiten genannten Preise enthalten die gesetzliche Mehrwertsteuer und sonstige Preisbestandteile." }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "5. Lieferung" }),
  /* @__PURE__ */ jsx("p", { children: "Die Lieferung erfolgt nur innerhalb unseres Liefergebietes in Norddeutschland. Über Lieferzeiten informieren wir Sie im Rahmen des Angebotsprozesses." }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "6. Eigentumsvorbehalt" }),
  /* @__PURE__ */ jsx("p", { children: "Bis zur vollständigen Bezahlung bleibt die Ware unser Eigentum." }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 mt-4", children: "7. Streitbeilegung" }),
  /* @__PURE__ */ jsx("p", { children: "Die EU-Kommission hat eine Internetplattform zur Online-Beilegung von Streitigkeiten geschaffen. Die Plattform dient als Anlaufstelle zur außergerichtlichen Beilegung von Streitigkeiten betreffend vertragliche Verpflichtungen, die aus Online-Kaufverträgen erwachsen. Nähere Informationen sind unter dem folgenden Link verfügbar: http://ec.europa.eu/consumers/odr." })
] });
const App = ({ path }) => {
  const getInitialSection = () => {
    if (path) {
      const p = path.replace(/^\//, "").toLowerCase();
      return p || "start";
    }
    if (typeof window !== "undefined") {
      const p = window.location.pathname.replace(/^\//, "").toLowerCase();
      return p || "start";
    }
    return "start";
  };
  const [activeSection, setActiveSection] = useState(getInitialSection());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardType, setWizardType] = useState("tank");
  const [wizardData, setWizardData] = useState(null);
  const [legalModal, setLegalModal] = useState({ open: false, title: "", content: "" });
  const openWizard = (type) => {
    setWizardType(type);
    setWizardData(null);
    setWizardOpen(true);
  };
  const openLegal = (type) => {
    let content;
    let title;
    if (type === "imprint") {
      title = "Impressum";
      content = /* @__PURE__ */ jsx(ImprintContent, {});
    } else if (type === "privacy") {
      title = "Datenschutz";
      content = /* @__PURE__ */ jsx(PrivacyContent, {});
    } else if (type === "terms") {
      title = "AGB";
      content = /* @__PURE__ */ jsx(TermsContent, {});
    } else if (type === "dev") {
      title = "Developer Report (v1.3)";
      content = /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 p-4 rounded-lg mb-4 text-sm font-mono", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Latest Changes:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4 space-y-1 mt-2", children: [
            /* @__PURE__ */ jsx("li", { children: "Migrated to Vite + React." }),
            /* @__PURE__ */ jsx("li", { children: "Removed all external CDN dependencies for GDPR compliance." }),
            /* @__PURE__ */ jsx("li", { children: "Modularized components." }),
            /* @__PURE__ */ jsx("li", { children: "Local fonts implemented." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg mb-2 text-gas", children: "Migration to Next.js" }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm", children: "To achieve perfect SEO and performance (Core Web Vitals), we recommend migrating this single-file prototype to a full Next.js application." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "1. Setup:" }),
            " ",
            /* @__PURE__ */ jsx("code", { children: "npx create-next-app@latest gasmoeller" })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2. Structure:" }),
            " Move components to ",
            /* @__PURE__ */ jsx("code", { children: "src/components/" }),
            ". Use ",
            /* @__PURE__ */ jsx("code", { children: "app/page.js" }),
            " for the main layout."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3. SEO:" }),
            " Use Next.js Metadata API for dynamic title/description tags per page."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4. Images:" }),
            " Replace ",
            /* @__PURE__ */ jsx("code", { children: "img" }),
            " tags with ",
            /* @__PURE__ */ jsx("code", { children: "next/image" }),
            " for automatic optimization."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5. Forms:" }),
            " Move form submission logic to Server Actions for security."
          ] })
        ] })
      ] });
    }
    setLegalModal({ open: true, title, content });
  };
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.replace(/^\//, "").toLowerCase();
      setActiveSection(p || "start");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  const changeSection = (section) => {
    setActiveSection(section);
    if (typeof window !== "undefined") {
      const url = section === "start" ? "/" : `/${section}`;
      window.history.pushState({}, "", url);
      window.scrollTo(0, 0);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const seoInfo = getSeoForPath(activeSection);
    document.title = seoInfo.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = seoInfo.description;
  }, [activeSection]);
  const handleGasCheckAvailability = (plz, liters) => {
    setWizardData({ plz, liters });
    setWizardType("gas");
    setWizardOpen(true);
  };
  const renderSection = () => {
    if (activeSection.startsWith("tanks/")) {
      const slug = activeSection.split("/")[1];
      return /* @__PURE__ */ jsx(TankDetail, { slug, onBack: () => changeSection("tanks"), openWizard });
    }
    const validSections = ["start", "tanks", "gas", "rechner", "gewerbe", "wissen", "ueber-uns", "kontakt", "pruefungen"];
    if (!validSections.includes(activeSection)) {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "pt-20" }),
        /* @__PURE__ */ jsx(NotFound, { onGoHome: () => changeSection("start") }),
        /* @__PURE__ */ jsx(ContactSection, {})
      ] });
    }
    switch (activeSection) {
      case "start":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Hero, { openWizard, setActiveSection: changeSection }),
          /* @__PURE__ */ jsx(TrustBar, {}),
          /* @__PURE__ */ jsxs("div", { className: "my-16 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-block p-2 rounded-2xl bg-gradient-to-r from-gas-light to-white border border-gas/10 shadow-2xl animate-pulse hover:animate-none transition-all", children: /* @__PURE__ */ jsxs("button", { onClick: () => openWizard("tank"), className: "bg-gas text-white px-10 py-5 rounded-xl font-extrabold text-2xl shadow-lg hover:bg-gas-dark transition-all flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Settings, { size: 28 }),
              " Zum Anfrage-Assistenten ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 28 })
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-400 text-sm font-medium", children: "Kostenlos & Unverbindlich" })
          ] }),
          /* @__PURE__ */ jsx(TankSection, { openWizard, setActiveSection: changeSection, showTechnicalOverview: false }),
          /* @__PURE__ */ jsx(CommercialSection, { setActiveSection: changeSection }),
          /* @__PURE__ */ jsx(DeliveryMap, {}),
          /* @__PURE__ */ jsx(FAQ, {}),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "tanks":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-20" }),
          /* @__PURE__ */ jsx(TankSection, { openWizard, setActiveSection: changeSection }),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "gas":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-20" }),
          /* @__PURE__ */ jsx(GasOrderSection, { onCheckAvailability: handleGasCheckAvailability }),
          /* @__PURE__ */ jsx(FAQ, {}),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "pruefungen":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-20" }),
          /* @__PURE__ */ jsx(InspectionSection, { openWizard }),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "rechner":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-32 max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsx(EnergyCalculator, {}) }),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "gewerbe":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-20" }),
          /* @__PURE__ */ jsx(CommercialSection, { setActiveSection: changeSection }),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "wissen":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-20" }),
          /* @__PURE__ */ jsx(KnowledgeCenter, { setActiveSection: changeSection }),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "ueber-uns":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-20" }),
          /* @__PURE__ */ jsx(AboutPage, { setActiveSection: changeSection }),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "kontakt":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-32" }),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      default:
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-20" }),
          /* @__PURE__ */ jsx(NotFound, { onGoHome: () => changeSection("start") }),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white", children: [
    /* @__PURE__ */ jsx(Navigation, { activeSection, setActiveSection: changeSection, mobileMenuOpen, setMobileMenuOpen, openWizard }),
    /* @__PURE__ */ jsx("main", { className: "flex-grow", children: renderSection() }),
    /* @__PURE__ */ jsx(Footer, { setActiveSection: changeSection, openLegal }),
    /* @__PURE__ */ jsx(WizardModal, { isOpen: wizardOpen, onClose: () => setWizardOpen(false), initialType: wizardType, initialData: wizardData }),
    /* @__PURE__ */ jsx(CookieBanner, {}),
    /* @__PURE__ */ jsx(SimpleModal, { isOpen: legalModal.open, onClose: () => setLegalModal({ ...legalModal, open: false }), title: legalModal.title, content: legalModal.content }),
    /* @__PURE__ */ jsx(ScrollToTop, {})
  ] });
};
function render(url) {
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, { path: url }) })
  );
  return { html };
}
export {
  render
};
