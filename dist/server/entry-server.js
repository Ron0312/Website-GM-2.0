import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { TrendingUp, Clock, ArrowRight, X, Menu, ShieldCheck, BadgeCheck, Star, Calculator, Droplet, Tractor, Factory, Truck, MapPin, CheckCircle, ChevronDown, Check, Coins, Heart, BookOpen, AlertTriangle, Settings, Home, Wrench, Lock, Unlock, ChevronRight, Flame, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
const seoData = {
  "start": {
    title: "gasmöller - Ihr Partner für Flüssiggas im Norden",
    description: "Unabhängig. Fair. Norddeutsch. Flüssiggastanks kaufen statt mieten. Ihr Experte seit 2005. Jetzt Angebot anfordern!"
  },
  "tanks": {
    title: "Flüssiggastank kaufen | Oberirdisch & Unterirdisch | gasmöller",
    description: "Kaufen Sie Ihren Flüssiggastank statt zu mieten. 1,2t, 2,1t und 2,9t Tanks verfügbar. Unabhängigkeit von großen Versorgern."
  },
  "gas": {
    title: "Flüssiggas bestellen | Aktuelle Preise & Lieferung | gasmöller",
    description: "Flüssiggas günstig bestellen. Lieferung in Schleswig-Holstein, Hamburg & Niedersachsen. Fairer Preis, schnelle Lieferung."
  },
  "wissen": {
    title: "Wissen & Ratgeber | Alles über Flüssiggas | gasmöller",
    description: "Ratgeber zu Flüssiggas, Tanksicherheit, Prüfintervalle und Energiespartipps. Informieren Sie sich hier."
  },
  "gewerbe": {
    title: "Gewerbegas & Prozesswärme | gasmöller",
    description: "Individuelle Flüssiggas-Lösungen für Gewerbe, Landwirtschaft und Industrie. Prozesswärme, Hallenheizung und mehr."
  },
  "ueber-uns": {
    title: "Über gasmöller | Ihr unabhängiger Energieversorger",
    description: "Lernen Sie gasmöller kennen. Seit 2005 Ihr zuverlässiger Partner für Flüssiggas im Norden. Unser Team und unsere Werte."
  },
  "kontakt": {
    title: "Kontakt | gasmöller Kundenservice",
    description: "Kontaktieren Sie uns. Telefonisch unter 04551 89 70 89 oder per E-Mail. Wir beraten Sie gerne kostenlos."
  },
  "rechner": {
    title: "Spar-Rechner | Flüssiggas Kostenvergleich | gasmöller",
    description: "Vergleichen Sie Ihre aktuellen Flüssiggaskosten. Sehen Sie, wie viel Sie mit einem eigenen Tank sparen können."
  }
};
const getSeoForPath = (path) => {
  let section = "start";
  if (path === "/" || path === "") section = "start";
  else {
    const p = path.replace(/^\//, "").toLowerCase();
    if (seoData[p]) section = p;
  }
  return seoData[section] || seoData["start"];
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
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { id: "start", label: "Startseite" },
    { id: "tanks", label: "Tanks & Kauf" },
    { id: "gas", label: "Gas bestellen" },
    { id: "wissen", label: "Wissen" },
    { id: "gewerbe", label: "Gewerbe" },
    { id: "ueber-uns", label: "Über Uns" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "fixed top-0 left-0 w-full z-50", children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsx("nav", { className: `transition-all duration-300 border-b border-white/10 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-white py-4"}`, children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center cursor-pointer", onClick: () => setActiveSection("start"), children: /* @__PURE__ */ jsx("img", { src: "/logo.png", alt: "gasmöller", className: `transition-all duration-300 ${isScrolled ? "h-10" : "h-12"}`, onError: (e) => {
        e.target.onerror = null;
        e.target.src = "https://gasmoeller.de/wp-content/uploads/2021/08/Logo-01.png";
      } }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden xl:flex space-x-1 bg-gray-50/50 p-1 rounded-full border border-gray-100", children: navLinks.map((link) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveSection(link.id), className: `${activeSection === link.id ? "bg-white text-gas shadow-sm font-bold" : "text-gray-500 hover:text-gas hover:bg-gray-100"} px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200`, children: link.label }, link.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs("a", { href: "tel:04551897089", className: "flex flex-col items-end text-right mr-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase font-bold text-gray-400 tracking-wider", children: "Kostenlose Beratung" }),
          /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-gas leading-none", children: "04551 89 70 89" })
        ] }),
        /* @__PURE__ */ jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: () => openWizard ? openWizard("tank") : setActiveSection("kontakt"), className: "bg-gas hover:bg-gas-dark text-white px-6 py-3 rounded-full shadow-lg shadow-gas/20 font-bold text-sm uppercase tracking-wider transition-all flex items-center", children: [
          "Anfrage ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "ml-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "xl:hidden flex items-center", children: /* @__PURE__ */ jsx("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "text-text hover:text-gas p-2", children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 28 }) : /* @__PURE__ */ jsx(Menu, { size: 28 }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "xl:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl overflow-hidden z-40", children: /* @__PURE__ */ jsxs("div", { className: "px-6 pt-6 pb-12 space-y-2", children: [
      navLinks.map((link) => /* @__PURE__ */ jsx("button", { onClick: () => {
        setActiveSection(link.id);
        setMobileMenuOpen(false);
      }, className: "block w-full text-left px-4 py-4 text-lg font-bold text-text hover:bg-gas-light hover:text-gas rounded-lg transition-colors", children: link.label }, link.id)),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        openWizard ? openWizard("tank") : setActiveSection("kontakt");
        setMobileMenuOpen(false);
      }, className: "block w-full text-left px-4 py-4 text-lg font-bold text-white bg-gas rounded-lg mt-4", children: "Kontakt aufnehmen" })
    ] }) }) })
  ] });
};
const Hero = ({ setActiveSection, openWizard }) => /* @__PURE__ */ jsxs("header", { className: "relative bg-white pt-48 pb-24 lg:pt-64 lg:pb-48 overflow-hidden", children: [
  /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-900/10 z-10" }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gray-300" }),
    /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80", alt: "Landschaft Norddeutschland", className: "w-full h-full object-cover absolute inset-0" })
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
const TrustBar = () => /* @__PURE__ */ jsxs("div", { className: "bg-white py-12 border-b border-gray-100 relative z-30 -mt-8 mx-4 md:mx-auto max-w-6xl rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-around", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-0", children: [
    /* @__PURE__ */ jsx(ShieldCheck, { size: 40, className: "text-gas" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "font-bold text-lg text-gray-800", children: "TÜV Geprüft" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Sicherheit & Qualität" })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "h-10 w-px bg-gray-200 hidden md:block" }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity mb-4 md:mb-0", children: [
    /* @__PURE__ */ jsx(BadgeCheck, { size: 40, className: "text-gas" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "font-bold text-lg text-gray-800", children: "DIN 51622" }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Reinste Propan-Qualität" })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "h-10 w-px bg-gray-200 hidden md:block" }),
  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 opacity-80 hover:opacity-100 transition-opacity", children: [
    /* @__PURE__ */ jsx(Star, { size: 40, className: "text-gas" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "font-bold text-lg text-gray-800", children: "4.9 / 5.0" }),
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
const TankAdvisorPro = () => {
  const [sqm, setSqm] = useState(150);
  const [standard, setStandard] = useState("bestand");
  const [hotWater, setHotWater] = useState(false);
  const calculateNeed = () => {
    let factor = 130;
    if (standard === "saniert") factor = 85;
    if (standard === "neubau") factor = 45;
    let kwh = sqm * factor;
    if (hotWater) kwh *= 1.15;
    const liters = Math.round(kwh / 6.57);
    return liters;
  };
  const annualNeed = calculateNeed();
  let recommendation = "1,2 t";
  let tankCost = 2200;
  let installCost = 350;
  if (annualNeed > 3e3) {
    recommendation = "2,1 t";
    tankCost = 2800;
    installCost = 450;
  }
  if (annualNeed > 5e3) {
    recommendation = "2,9 t";
    tankCost = 3600;
    installCost = 550;
  }
  const formatMoney = (n) => n.toLocaleString("de-DE") + " €";
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl border border-gray-200 shadow-lg relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 bg-gas text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider", children: "Beta 2.0" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl text-gas-dark", children: "Profi-Kalkulator" }),
      /* @__PURE__ */ jsx(Calculator, { size: 24, className: "text-gas-light" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Gebäudestandard" }),
        /* @__PURE__ */ jsx("div", { className: "flex bg-gray-100 p-1 rounded-lg", children: [{ id: "bestand", l: "Altbau" }, { id: "saniert", l: "Saniert" }, { id: "neubau", l: "Neubau" }].map((s) => /* @__PURE__ */ jsx("button", { onClick: () => setStandard(s.id), className: `flex-1 py-2 text-xs font-bold rounded-md transition-all ${standard === s.id ? "bg-white shadow text-gas" : "text-gray-500 hover:text-gray-700"}`, children: s.l }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-2 flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "Wohnfläche" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gas font-mono", children: [
            sqm,
            " m²"
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "range", min: "50", max: "500", step: "10", value: sqm, onChange: (e) => setSqm(Number(e.target.value)), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gas" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 bg-blue-50 p-3 rounded-lg", children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", id: "hotWater", className: "w-5 h-5 accent-gas", checked: hotWater, onChange: (e) => setHotWater(e.target.checked) }),
        /* @__PURE__ */ jsx("label", { htmlFor: "hotWater", className: "text-sm text-gray-700 font-medium cursor-pointer flex-1", children: "Warmwasser über Gas?" }),
        /* @__PURE__ */ jsx(Droplet, { size: 16, className: "text-blue-400" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-5 border border-gray-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-bold uppercase", children: "Empfehlung" }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-extrabold text-gas", children: recommendation })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { children: "Tank (neu/geprüft)" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "~ ",
              formatMoney(tankCost)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { children: "Installation & Prüfung" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "~ ",
              formatMoney(installCost)
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-px bg-gray-200 w-full my-1" }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-gas-dark text-lg", children: [
            /* @__PURE__ */ jsx("span", { children: "Gesamt ca." }),
            /* @__PURE__ */ jsx("span", { children: formatMoney(tankCost + installCost) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 mt-3 text-center leading-tight", children: [
          "*Unverbindliche Schätzung inkl. MwSt. Zzgl. Gasfüllung (",
          annualNeed,
          " L Bedarf/Jahr)."
        ] })
      ] })
    ] })
  ] });
};
const TankSection = ({ openWizard }) => {
  const [filter, setFilter] = useState("ober");
  const tanks = [
    { type: "ober", size: "2.700 Liter (1,2 t)", capacity: "1,2 t", name: "Klein", usage: "Ideal für Ferienhäuser.", length: "2,50 m", diameter: "1,25 m", weight: "550 kg" },
    { type: "ober", size: "4.850 Liter (2,1 t)", capacity: "2,1 t", name: "Standard", usage: "Klassiker für Einfamilienhäuser.", highlight: true, length: "4,30 m", diameter: "1,25 m", weight: "980 kg" },
    { type: "ober", size: "6.400 Liter (2,9 t)", capacity: "2,9 t", name: "Maxi", usage: "Für Mehrfamilienhäuser.", length: "5,50 m", diameter: "1,25 m", weight: "1.300 kg" },
    { type: "unter", size: "2.700 Liter (1,2 t)", capacity: "1,2 t", name: "Klein (Tief)", usage: "Unsichtbar im Garten.", length: "2,50 m", diameter: "1,25 m", weight: "600 kg" },
    { type: "unter", size: "4.850 Liter (2,1 t)", capacity: "2,1 t", name: "Standard (Tief)", usage: "Platzsparend unterirdisch.", highlight: true, length: "4,30 m", diameter: "1,25 m", weight: "1.100 kg" },
    { type: "unter", size: "6.400 Liter (2,9 t)", capacity: "2,9 t", name: "Maxi (Tief)", usage: "Maximale Kapazität.", length: "5,50 m", diameter: "1,25 m", weight: "1.500 kg" }
  ];
  const visibleTanks = tanks.filter((t) => t.type === filter);
  return /* @__PURE__ */ jsx("section", { className: "py-24 bg-white", id: "tanks", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-end mb-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-gas font-bold tracking-widest uppercase text-sm mb-2", children: "Unser Sortiment" }),
        /* @__PURE__ */ jsx("h3", { className: "text-4xl font-extrabold text-text", children: "Tanks für jeden Bedarf" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 p-1 rounded-lg flex mt-4 md:mt-0", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setFilter("ober"), className: `px-6 py-2 rounded-md text-sm font-bold transition-all ${filter === "ober" ? "bg-white shadow-sm text-gas" : "text-gray-500"}`, children: "Oberirdisch" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setFilter("unter"), className: `px-6 py-2 rounded-md text-sm font-bold transition-all ${filter === "unter" ? "bg-white shadow-sm text-gas" : "text-gray-500"}`, children: "Unterirdisch" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: visibleTanks.map((tank, i) => /* @__PURE__ */ jsx(TankCard, { tank, onContact: () => openWizard ? openWizard("tank") : null }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-20 grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 bg-gray-50 rounded-2xl p-8 border border-gray-100", children: [
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
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TankAdvisorPro, {}) })
    ] })
  ] }) });
};
const CommercialSection = ({ setActiveSection }) => /* @__PURE__ */ jsx("section", { className: "py-24 bg-gray-50", id: "gewerbe", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
  /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-gas font-bold tracking-widest uppercase text-sm mb-2", children: "B2B Lösungen" }),
    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-extrabold", children: "Energie für Macher" })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
    { t: "Landwirtschaft", d: "Stallheizung & Trocknung", i: Tractor, desc: "Leistungsstarke Trocknungsanlagen und Stallheizungen. Auch mit BioLPG für nachhaltige Betriebe." },
    { t: "Industrie", d: "Prozesswärme & Hallen", i: Factory, desc: "Effiziente Dunkelstrahler für hohe Hallen und präzise Prozesswärme für Lackierkabinen." },
    { t: "Logistik", d: "Staplergas & Tankstellen", i: Truck, desc: "Treibgas für Gabelstapler. Sauberer als Diesel, stärker als Elektro. Innen und Außen." }
  ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group", children: [
    /* @__PURE__ */ jsx(item.i, { size: 40, className: "text-gray-300 group-hover:text-gas mb-6 transition-colors" }),
    /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl mb-2", children: item.t }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium mb-3", children: item.d }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 leading-relaxed", children: item.desc })
  ] }, i)) })
] }) });
const DeliveryMap = () => /* @__PURE__ */ jsxs("div", { className: "py-20 bg-gray-900 text-white overflow-hidden relative", children: [
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
    /* @__PURE__ */ jsx("div", { className: "lg:w-1/2 mt-12 lg:mt-0 relative h-[400px] flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 400 300", className: "w-full h-full drop-shadow-2xl", children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M 120 20 L 160 30 L 180 10 L 220 20 L 250 10 L 300 30 L 320 80 L 280 150 L 200 180 L 150 170 L 100 190 L 50 150 L 30 100 L 80 50 Z",
          fill: "#005b9f",
          opacity: "0.3",
          stroke: "white",
          strokeWidth: "1"
        }
      ),
      /* @__PURE__ */ jsxs("g", { transform: "translate(180, 80)", children: [
        /* @__PURE__ */ jsx("circle", { cx: "0", cy: "0", r: "4", fill: "#4ade80", children: /* @__PURE__ */ jsx("animate", { attributeName: "r", values: "4;6;4", dur: "2s", repeatCount: "indefinite" }) }),
        /* @__PURE__ */ jsx("text", { x: "10", y: "4", fontSize: "10", fill: "white", fontWeight: "bold", children: "Kiel" })
      ] }),
      /* @__PURE__ */ jsxs("g", { transform: "translate(180, 140)", children: [
        /* @__PURE__ */ jsx("circle", { cx: "0", cy: "0", r: "4", fill: "#4ade80", children: /* @__PURE__ */ jsx("animate", { attributeName: "r", values: "4;6;4", dur: "2s", repeatCount: "indefinite" }) }),
        /* @__PURE__ */ jsx("text", { x: "10", y: "4", fontSize: "10", fill: "white", fontWeight: "bold", children: "Hamburg" })
      ] }),
      /* @__PURE__ */ jsxs("g", { transform: "translate(140, 40)", children: [
        /* @__PURE__ */ jsx("circle", { cx: "0", cy: "0", r: "4", fill: "#4ade80", children: /* @__PURE__ */ jsx("animate", { attributeName: "r", values: "4;6;4", dur: "2s", repeatCount: "indefinite" }) }),
        /* @__PURE__ */ jsx("text", { x: "10", y: "4", fontSize: "10", fill: "white", fontWeight: "bold", children: "Flensburg" })
      ] }),
      /* @__PURE__ */ jsxs("g", { transform: "translate(250, 100)", children: [
        /* @__PURE__ */ jsx("circle", { cx: "0", cy: "0", r: "4", fill: "#4ade80", children: /* @__PURE__ */ jsx("animate", { attributeName: "r", values: "4;6;4", dur: "2s", repeatCount: "indefinite" }) }),
        /* @__PURE__ */ jsx("text", { x: "10", y: "4", fontSize: "10", fill: "white", fontWeight: "bold", children: "Rostock" })
      ] })
    ] }) })
  ] })
] });
const FAQ = () => {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "Wie lange dauert die Lieferung?", a: "In der Regel liefern wir innerhalb von 5-10 Werktagen. In dringenden Notfällen bieten wir einen 24h-Express-Service an." },
    { q: "Kann ich meinen Gastank kaufen?", a: "Ja! Wir sind spezialisiert auf den Verkauf von Eigentumstanks (oberirdisch und unterirdisch). Damit sparen Sie sich langfristig die teure Miete und sind frei in der Händlerwahl. Wir bieten Größen von 1,2 t bis 2,9 t an." },
    { q: "Was kostet Flüssiggas aktuell?", a: "Der Preis ändert sich täglich analog zu den Ölbörsen. Da wir unabhängig sind, können wir oft günstigere Konditionen anbieten als Großkonzerne. Nutzen Sie unseren Preisrechner oder rufen Sie uns an für ein tagesaktuelles Angebot." },
    { q: "Muss ich bei der Lieferung zu Hause sein?", a: "Nicht zwingend, sofern der Tank und der Füllanschluss für unseren Fahrer frei zugänglich sind. Wir informieren Sie vorab über den Liefertermin." },
    { q: "Liefern Sie auch Notgas?", a: "Ja, wenn Ihre Heizung kalt bleibt, versuchen wir schnellstmöglich zu helfen. Rufen Sie uns direkt an unter 04551 89 70 89." },
    { q: "Was ist der Unterschied zwischen Propan und Flüssiggas?", a: "Flüssiggas (LPG) besteht hauptsächlich aus Propan und Butan. Für Heizzwecke wird in Deutschland fast ausschließlich reines Propan (DIN 51622) verwendet, da es auch bei tiefen Temperaturen verdampft." },
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
const ContactSection = () => /* @__PURE__ */ jsxs("section", { className: "bg-gas-dark py-24 text-white relative overflow-hidden", id: "kontakt", children: [
  /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-1/2 h-full bg-gas opacity-50 transform -skew-x-12 translate-x-20" }),
  /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 relative z-10 text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold mb-6", children: "Noch Fragen?" }),
    /* @__PURE__ */ jsx("p", { className: "text-gas-light mb-10 text-lg", children: "Unser Team ist für Sie da. Persönlich und kompetent." }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-left max-w-2xl mx-auto text-text transform hover:-translate-y-1 transition-transform duration-500", children: /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "Name" }),
          /* @__PURE__ */ jsx("input", { type: "text", className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "Telefon" }),
          /* @__PURE__ */ jsx("input", { type: "tel", className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "E-Mail" }),
        /* @__PURE__ */ jsx("input", { type: "email", className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "Betreff" }),
        /* @__PURE__ */ jsx("input", { type: "text", className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase mb-1", children: "Nachricht" }),
        /* @__PURE__ */ jsx("textarea", { className: "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gas focus:ring-2 focus:ring-gas/20 transition-all h-32" })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "w-full bg-gas hover:bg-gas-dark text-white font-bold py-4 rounded-lg transition-all uppercase tracking-wide shadow-lg hover:shadow-xl transform active:scale-95", children: "Anfrage absenden" })
    ] }) })
  ] })
] });
const GasOrderSection = ({ onCheckAvailability }) => {
  const [liters, setLiters] = useState(3e3);
  const [plz, setPlz] = useState("");
  const [plzError, setPlzError] = useState("");
  const handleCheck = () => {
    if (!plz || plz.length !== 5) {
      setPlzError("Bitte geben Sie eine gültige 5-stellige PLZ ein.");
      return;
    }
    const regex = /^(1[7-9]\d{3}|2[0-5]\d{3}|27\d{3}|29[2-6]\d{2})$/;
    if (!regex.test(plz)) {
      setPlzError("Wir liefern leider noch nicht in dieses Gebiet.");
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
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gray-900/40 to-gray-900/10 z-10" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://images.unsplash.com/photo-1565514020176-db8b746d84f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
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
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm mb-8", children: "Prüfen Sie jetzt unverbindlich unsere Tagespreise." }),
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
                      "Jetzt Preis anfragen",
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
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gas mb-3", children: "Preis prüfen" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed", children: "Geben Sie Ihre PLZ und die gewünschte Menge in unseren Rechner ein. Sie sehen sofort den aktuellen Tagespreis." })
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
const SavingsCalculator = () => {
  const [consumption, setConsumption] = useState(3e3);
  const totalSavings = consumption * 0.15 * 10 + 250 * 10 - 2800;
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden my-24 relative", id: "rechner", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gas to-green-400" }),
    /* @__PURE__ */ jsxs("div", { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold mb-2", children: "Ersparnis-Rechner" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-10", children: "Vergleich Eigentum vs. Miete (10 Jahre)" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-bold text-sm mb-4", children: [
          /* @__PURE__ */ jsx("span", { children: "Jahresverbrauch" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gas", children: [
            consumption,
            " Liter"
          ] })
        ] }),
        /* @__PURE__ */ jsx("input", { type: "range", min: "1000", max: "6000", step: "100", value: consumption, onChange: (e) => setConsumption(parseInt(e.target.value)), className: "w-full" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-block bg-gray-50 px-10 py-6 rounded-2xl border border-gray-100", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-400 uppercase font-bold tracking-wider mb-2", children: "Ihr Potenzial" }),
        /* @__PURE__ */ jsx("div", { className: "text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gas to-green-500", children: /* @__PURE__ */ jsx(CountUp, { end: totalSavings, duration: 1, separator: ".", suffix: " €" }) })
      ] })
    ] })
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
            /* @__PURE__ */ jsx("p", { children: "Sie möchten Ihren alten Flüssiggastank entsorgen? Das ist Aufgabe für Profis. Da oft noch Restgas im Tank ist, darf dieser nicht einfach zersägt werden." }),
            /* @__PURE__ */ jsx("h4", { children: "Ablauf der Entsorgung" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Absaugen:" }),
                " Das Restgas muss fachgerecht abgesaugt und abgefackelt werden."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Spülen:" }),
                " Der Tank wird mit Stickstoff gespült, um gasfrei zu sein."
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Demontage:" }),
                " Erst dann kann der Tank zerlegt und abtransportiert werden."
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Wir übernehmen die komplette Entsorgung für Sie – sicher und zertifiziert." })
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
          description: "Ist ein Gastank gefährlich?",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Flüssiggastanks gehören zu den sichersten Energiespeichern überhaupt. Sie bestehen aus hochwertigem Feinkornbaustahl und sind mit Sicherheitsventilen ausgestattet." }),
            /* @__PURE__ */ jsx("h4", { children: "Prüfintervalle" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Alle 2 Jahre (Äußere Prüfung):" }),
                ' Sichtprüfung auf Korrosion, Zugänglichkeit und Beschilderung. Durchführbar durch "befähigte Person" (z.B. unser Tankwagenfahrer oder Techniker).'
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Alle 10 Jahre (Innere Prüfung):" }),
                " Umfassende Prüfung durch eine ZÜS (z.B. TÜV). Austausch des Sicherheitsventils und Druckprüfung."
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
        { id: "mfh", title: "Lösungen für Mehrfamilienhäuser", description: "Zentralheizung oder Etagenheizung mit Gas.", content: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "Auch für Vermieter und WEGs ist Flüssiggas attraktiv. Mit einem zentralen unterirdischen Tank (oder einer Tankbatterie) können beliebig viele Wohneinheiten versorgt werden." }),
          /* @__PURE__ */ jsx("h4", { children: "Abrechnung leicht gemacht" }),
          /* @__PURE__ */ jsx("p", { children: "Wir bieten spezielle Zähler-Lösungen an, sodass jede Wohnung exakt nach Verbrauch abgerechnet werden kann. Wir kümmern uns um die Ablesung und Wartung der Zähler. Das steigert den Wohnwert und senkt die Nebenkosten für Ihre Mieter." })
        ] }) },
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
          description: "Verwirrung am Zähler?",
          content: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { children: "Flüssiggas wird in Litern geliefert, der Zähler misst Kubikmeter (m³) und die Abrechnung erfolgt oft in Kilowattstunden (kWh). Hier die Faustformeln:" }),
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
  /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8", children: [
    { name: "Thomas Möller", role: "Geschäftsführung", img: "/images/team/thomas.jpg" },
    // Placeholders
    { name: "Sabine Koch", role: "Kundenservice", img: "/images/team/sabine.jpg" },
    { name: "Michael Hansen", role: "Logistikleitung", img: "/images/team/michael.jpg" },
    { name: "Thomas Weber", role: "Technischer Leiter", img: "/images/team/weber.jpg" }
  ].map((member, i) => /* @__PURE__ */ jsxs("div", { className: "group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg bg-gray-200", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: member.img,
        alt: member.name,
        className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
        onError: (e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-500 hidden", children: "Image Placeholder" }),
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
const WEB3FORMS_ACCESS_KEY = "f22052ed-455f-4e4d-9f5a-94a6e340426f";
const WizardModal = ({ isOpen, onClose, initialType = "tank", initialData = null }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(initialType);
  const [plz, setPlz] = useState("");
  const [plzError, setPlzError] = useState("");
  const [details, setDetails] = useState({});
  const [contact, setContact] = useState({ name: "", street: "", city: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSuccess(false);
      setPlzError("");
      if (initialType) setType(initialType);
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
  const validatePlz = (val) => {
    const regex = /^(1[7-9]\d{3}|2[0-5]\d{3}|27\d{3}|29[2-6]\d{2})$/;
    return regex.test(val);
  };
  const handleNext = () => {
    if (step === 1) {
      if (!validatePlz(plz)) {
        setPlzError("Leider liefern wir aktuell nur in unserem Liefergebiet (Norddeutschland).");
        return;
      }
      setPlzError("");
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", `Neue Anfrage: ${type.toUpperCase()} - ${plz}`);
    formData.append("from_name", "gasmöller Website");
    formData.append("botcheck", "");
    formData.append("Type", type);
    formData.append("PLZ", plz);
    formData.append("Details", JSON.stringify(details));
    formData.append("Name", contact.name);
    formData.append("Address", `${contact.street}, ${plz} ${contact.city}`);
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
        console.error("Error", result);
        alert("Es gab einen Fehler beim Senden. Bitte versuchen Sie es später noch einmal.");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Es gab einen Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.");
    } finally {
      setSubmitting(false);
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("button", { onClick: onClose, className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10", children: /* @__PURE__ */ jsx(X, { size: 24 }) }),
    /* @__PURE__ */ jsx("div", { className: "h-1 bg-gray-100 w-full", children: /* @__PURE__ */ jsx(motion.div, { className: "h-full bg-gas", initial: { width: 0 }, animate: { width: `${step / 4 * 100}%` } }) }),
    /* @__PURE__ */ jsx("div", { className: "p-8 md:p-12 overflow-y-auto max-h-[80vh]", children: success ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Check, { size: 48 }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4", children: "Vielen Dank!" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-8", children: "Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen." }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "bg-gas text-white px-8 py-3 rounded-lg font-bold", children: "Schließen" })
    ] }) : /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
      step === 1 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-2", children: "Wo benötigen Sie Energie?" }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500 mb-8", children: "Prüfung der Verfügbarkeit." }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-xs mx-auto", children: [
          /* @__PURE__ */ jsx("input", { type: "text", value: plz, onChange: (e) => setPlz(e.target.value), className: `w-full text-center text-2xl font-bold tracking-widest p-4 border-2 rounded-xl outline-none transition-all ${plzError ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-gas"}`, placeholder: "PLZ", maxLength: 5, autoFocus: true }),
          plzError && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-2 text-center font-bold", children: plzError }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNext, disabled: plz.length < 5, className: "w-full mt-6 bg-gas text-white py-4 rounded-xl font-bold hover:bg-gas-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all", children: "Weiter" })
        ] })
      ] }, "step1"),
      step === 2 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-8", children: "Was können wir für Sie tun?" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          { id: "tank", icon: Settings, label: "Neuer Tank", desc: "Kauf/Miete" },
          { id: "gas", icon: Flame, label: "Gas bestellen", desc: "Füllung" },
          { id: "service", icon: Wrench, label: "Service", desc: "Wartung" }
        ].map((opt) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => {
          setType(opt.id);
          handleNext();
        }, className: `p-6 rounded-xl border-2 transition-all text-center group ${type === opt.id ? "border-gas bg-gas-light/30" : "border-gray-100 hover:border-gas"}`, children: [
          /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${type === opt.id ? "bg-gas text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gas group-hover:text-white transition-colors"}`, children: /* @__PURE__ */ jsx(opt.icon, { size: 24 }) }),
          /* @__PURE__ */ jsx("h4", { className: "font-bold", children: opt.label }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: opt.desc })
        ] }, opt.id)) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "w-full text-gray-400 hover:text-gray-600 text-sm font-bold mt-8", children: "Zurück" })
      ] }, "step2"),
      step === 3 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-6", children: "Details" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-md mx-auto", children: [
          type === "tank" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700", children: "Art des Gebäudes" }),
            /* @__PURE__ */ jsxs("select", { className: "w-full p-4 border border-gray-200 rounded-lg outline-none bg-white", onChange: (e) => setDetails({ ...details, building: e.target.value }), children: [
              /* @__PURE__ */ jsx("option", { children: "Einfamilienhaus (Bestand)" }),
              /* @__PURE__ */ jsx("option", { children: "Neubau" }),
              /* @__PURE__ */ jsx("option", { children: "Gewerbe" })
            ] }),
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mt-4 mb-2", children: "Gewünschte Tankgröße" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [{ l: "1,2 t", v: "1.2t" }, { l: "2,1 t", v: "2.1t" }, { l: "2,9 t", v: "2.9t" }].map((t) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setDetails({ ...details, tankSize: t.v }), className: `p-3 rounded-xl border-2 text-center transition-all ${details.tankSize === t.v ? "border-gas bg-gas text-white shadow-lg" : "border-gray-100 hover:border-gas-light"}`, children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold tracking-wider opacity-70 mb-1", children: "Volumen" }),
              /* @__PURE__ */ jsx("div", { className: "font-extrabold text-lg", children: t.l })
            ] }, t.v)) }),
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mt-2", children: "Interesse an" }),
            /* @__PURE__ */ jsxs("select", { className: "w-full p-4 border border-gray-200 rounded-lg outline-none bg-white", onChange: (e) => setDetails({ ...details, interest: e.target.value }), children: [
              /* @__PURE__ */ jsx("option", { children: "Bitte wählen..." }),
              /* @__PURE__ */ jsx("option", { children: "Kauf (Eigentum)" }),
              /* @__PURE__ */ jsx("option", { children: "Miete" }),
              /* @__PURE__ */ jsx("option", { children: "Beratung gewünscht" })
            ] })
          ] }),
          type === "gas" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Tank im Eigentum?" }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-4 mb-6", children: ["Ja, Eigentum", "Nein, Mietvertrag"].map((opt) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setDetails({ ...details, ownership: opt }), className: `flex-1 py-3 rounded-xl border-2 font-bold transition-all ${details.ownership === opt ? "border-gas bg-gas-light/20 text-gas" : "border-gray-200 text-gray-500"}`, children: opt }, opt)) }),
            details.ownership === "Nein, Mietvertrag" && /* @__PURE__ */ jsxs("div", { className: "bg-orange-50 text-orange-600 p-3 rounded-lg text-sm mb-6 flex items-start", children: [
              /* @__PURE__ */ jsx(AlertTriangle, { size: 16, className: "mr-2 mt-0.5 flex-shrink-0" }),
              " Hinweis: Bei Miettanks dürfen wir oft nicht befüllen (Fremdbefüllungsverbot). Bitte prüfen Sie Ihren Vertrag."
            ] }),
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2", children: "Welchen Tank haben Sie?" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: [{ l: "1,2 t", v: "1.2t" }, { l: "2,1 t", v: "2.1t" }, { l: "2,9 t", v: "2.9t" }, { l: "Andere", v: "other" }].map((t) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setDetails({ ...details, tankSize: t.v }), className: `p-3 rounded-xl border-2 text-center transition-all ${details.tankSize === t.v ? "border-gas bg-gas text-white shadow-lg" : "border-gray-100 hover:border-gas-light"}`, children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs uppercase font-bold tracking-wider opacity-70 mb-1", children: "Volumen" }),
              /* @__PURE__ */ jsx("div", { className: "font-extrabold text-lg", children: t.l })
            ] }, t.v)) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 rounded-xl border border-gray-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "text-sm font-bold text-gray-700", children: "Wunschmenge" }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", id: "fillUp", className: "w-4 h-4 accent-gas", onChange: (e) => setDetails({ ...details, fillUp: e.target.checked }) }),
                  /* @__PURE__ */ jsx("label", { htmlFor: "fillUp", className: "text-sm text-gray-600 font-medium cursor-pointer", children: "Bitte vollmachen" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `relative transition-opacity ${details.fillUp ? "opacity-50 pointer-events-none" : "opacity-100"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "number", className: "w-full p-4 pr-20 border border-gray-200 rounded-lg font-mono text-right text-lg", placeholder: "z.B. 2000", value: details.amount || "", onChange: (e) => setDetails({ ...details, amount: e.target.value }) }),
                /* @__PURE__ */ jsx("span", { className: "absolute right-6 top-4 text-gray-400 font-bold", children: "Liter" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 uppercase mb-1", children: "Füllstand ca." }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("input", { type: "number", className: "w-full p-3 border border-gray-200 rounded-lg text-center", placeholder: "20", onChange: (e) => setDetails({ ...details, level: e.target.value }) }),
                    /* @__PURE__ */ jsx("span", { className: "absolute right-4 top-3 text-gray-400 text-sm", children: "%" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 uppercase mb-1", children: "Priorität" }),
                  /* @__PURE__ */ jsxs("select", { className: "w-full p-3 border border-gray-200 rounded-lg bg-white outline-none", onChange: (e) => setDetails({ ...details, delivery: e.target.value }), children: [
                    /* @__PURE__ */ jsx("option", { value: "normal", children: "Normal (Tour)" }),
                    /* @__PURE__ */ jsx("option", { value: "express", children: "Express (Notfall)" })
                  ] })
                ] })
              ] })
            ] })
          ] }),
          type === "service" && /* @__PURE__ */ jsx("textarea", { className: "w-full p-4 border border-gray-200 rounded-lg h-32", placeholder: "Beschreiben Sie Ihr Anliegen...", onChange: (e) => setDetails({ ...details, message: e.target.value }) }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleNext, className: "w-full bg-gas text-white py-4 rounded-lg font-bold hover:bg-gas-dark mt-4", children: "Weiter" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "w-full text-gray-400 hover:text-gray-600 text-sm font-bold mt-4", children: "Zurück" })
        ] })
      ] }, "step3"),
      step === 4 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center mb-6", children: "Kontakt" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-md mx-auto", children: [
          /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "Ihr Name", className: "w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas", value: contact.name, onChange: (e) => setContact({ ...contact, name: e.target.value }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "Straße", className: "w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas", value: contact.street, onChange: (e) => setContact({ ...contact, street: e.target.value }) }) }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "Nr.", className: "w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas", value: contact.number, onChange: (e) => setContact({ ...contact, number: e.target.value }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("input", { type: "text", disabled: true, value: plz, className: "w-full p-4 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 font-bold" }) }),
            /* @__PURE__ */ jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsx("input", { type: "text", required: true, placeholder: "Ort", className: "w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas", value: contact.city, onChange: (e) => setContact({ ...contact, city: e.target.value }) }) })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "email", required: true, placeholder: "E-Mail Adresse", className: "w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas", value: contact.email, onChange: (e) => setContact({ ...contact, email: e.target.value }) }),
          /* @__PURE__ */ jsx("input", { type: "tel", placeholder: "Telefonnummer", className: "w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-gas", value: contact.phone, onChange: (e) => setContact({ ...contact, phone: e.target.value }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start text-xs text-gray-500 mt-4", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", required: true, className: "mt-1 mr-2" }),
            /* @__PURE__ */ jsx("span", { children: "Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu." })
          ] }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: submitting, className: "w-full bg-gas text-white py-4 rounded-lg font-bold hover:bg-gas-dark mt-6 shadow-xl transform active:scale-95 transition-all", children: submitting ? "Sende..." : "Anfrage absenden" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleBack, className: "w-full text-gray-400 hover:text-gray-600 text-sm font-bold mt-4", children: "Zurück" })
        ] })
      ] }, "step4")
    ] }) }) })
  ] }) });
};
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
      content = /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "gasmöller GmbH" }),
          /* @__PURE__ */ jsx("br", {}),
          "Musterstraße 1",
          /* @__PURE__ */ jsx("br", {}),
          "12345 Musterstadt"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Vertreten durch:",
          /* @__PURE__ */ jsx("br", {}),
          "Thomas Möller"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Kontakt:",
          /* @__PURE__ */ jsx("br", {}),
          "Telefon: 04551 89 70 89",
          /* @__PURE__ */ jsx("br", {}),
          "E-Mail: info@gasmoeller.de"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Registereintrag:",
          /* @__PURE__ */ jsx("br", {}),
          "Eintragung im Handelsregister.",
          /* @__PURE__ */ jsx("br", {}),
          "Registergericht: Amtsgericht Kiel",
          /* @__PURE__ */ jsx("br", {}),
          "Registernummer: HRB 12345"
        ] })
      ] });
    } else if (type === "privacy") {
      title = "Datenschutz";
      content = /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: "Datenschutzerklärung" }) }),
        /* @__PURE__ */ jsx("p", { children: "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung." }),
        /* @__PURE__ */ jsx("p", { children: "Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis." })
      ] });
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
    const validSections = ["start", "tanks", "gas", "rechner", "gewerbe", "wissen", "ueber-uns", "kontakt"];
    const sectionToRender = validSections.includes(activeSection) ? activeSection : "start";
    switch (sectionToRender) {
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
          /* @__PURE__ */ jsx(TankSection, { openWizard }),
          /* @__PURE__ */ jsx(CommercialSection, { setActiveSection: changeSection }),
          /* @__PURE__ */ jsx(DeliveryMap, {}),
          /* @__PURE__ */ jsx(FAQ, {}),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "tanks":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-20" }),
          /* @__PURE__ */ jsx(TankSection, { openWizard }),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "gas":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-20" }),
          /* @__PURE__ */ jsx(GasOrderSection, { onCheckAvailability: handleGasCheckAvailability }),
          /* @__PURE__ */ jsx(FAQ, {}),
          /* @__PURE__ */ jsx(ContactSection, {})
        ] });
      case "rechner":
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "pt-32 max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsx(SavingsCalculator, {}) }),
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
        return /* @__PURE__ */ jsx(Hero, { openWizard, setActiveSection: changeSection });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white", children: [
    /* @__PURE__ */ jsx(Navigation, { activeSection, setActiveSection: changeSection, mobileMenuOpen, setMobileMenuOpen, openWizard }),
    /* @__PURE__ */ jsx("main", { className: "flex-grow", children: renderSection() }),
    /* @__PURE__ */ jsxs("footer", { className: "bg-gray-900 text-gray-400 py-20 border-t border-gray-800 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1", children: [
          /* @__PURE__ */ jsx("div", { className: "h-8 mb-6 text-white font-bold text-xl", children: "gasmöller" }),
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
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => changeSection("gas"), className: "hover:text-white transition-colors", children: "Gas bestellen" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => changeSection("tanks"), className: "hover:text-white transition-colors", children: "Tanks kaufen" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => changeSection("rechner"), className: "hover:text-white transition-colors", children: "Spar-Rechner" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => changeSection("kontakt"), className: "hover:text-white transition-colors", children: "Kontakt" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-bold mb-4 uppercase text-xs tracking-wider", children: "Rechtliches" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => openLegal("imprint"), className: "hover:text-white transition-colors", children: "Impressum" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { onClick: () => openLegal("privacy"), className: "hover:text-white transition-colors", children: "Datenschutz" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "AGB" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "text-white font-bold mb-4 uppercase text-xs tracking-wider", children: "Newsletter" }),
          /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs", children: "Bleiben Sie über Gaspreise informiert." }),
          /* @__PURE__ */ jsx("div", { className: "flex bg-gray-800 rounded p-1", children: /* @__PURE__ */ jsx("span", { className: "text-gray-500 px-2", children: "Newsletter feature coming soon" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600", children: "© 2025 gasmöller GmbH. Alle Rechte vorbehalten." })
    ] }),
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
