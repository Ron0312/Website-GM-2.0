import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, List } from 'lucide-react';
import { CONTENT } from '../data/content';
import RentVsBuyGraphic from './RentVsBuyGraphic';

const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// Helper Component for Contextual CTA
const ArticleCTA = ({ categoryId, setActiveSection }) => {
    let ctaContent = null;

    if (categoryId === 'gas-bestellung') {
        ctaContent = (
            <div className="bg-gas-light/20 p-6 rounded-xl border border-gas/20 mt-12 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div>
                    <h4 className="font-bold text-gas-dark text-lg mb-2">Aktuellen Tagespreis prüfen?</h4>
                    <p className="text-gray-600 text-sm">Sparen Sie bei Ihrer nächsten Flüssiggas-Lieferung. Unverbindlich & kostenlos.</p>
                </div>
                <button
                    onClick={() => { if(setActiveSection) { setActiveSection('fluessiggas-bestellen'); window.scrollTo(0,0); } }}
                    className="whitespace-nowrap bg-gas text-white font-bold py-3 px-6 rounded-lg hover:bg-gas-dark transition-colors shadow-md hover:shadow-lg"
                >
                    Tagespreis berechnen
                </button>
            </div>
        );
    } else if (categoryId === 'tank-technik') {
        ctaContent = (
            <div className="bg-gas-light/20 p-6 rounded-xl border border-gas/20 mt-12 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div>
                    <h4 className="font-bold text-gas-dark text-lg mb-2">Interesse am eigenen Tank?</h4>
                    <p className="text-gray-600 text-sm">Machen Sie sich unabhängig von Mietverträgen. Jetzt Angebot für Kauftank anfordern.</p>
                </div>
                 <button
                    onClick={() => { if(setActiveSection) { setActiveSection('fluessiggastank-kaufen'); window.scrollTo(0,0); } }}
                    className="whitespace-nowrap bg-gas text-white font-bold py-3 px-6 rounded-lg hover:bg-gas-dark transition-colors shadow-md hover:shadow-lg"
                >
                    Tank-Angebot anfordern
                </button>
            </div>
        );
    } else {
        // Default generic CTA
        ctaContent = (
             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-12 flex flex-col md:flex-row items-center gap-6 justify-between">
                <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Noch Fragen offen?</h4>
                    <p className="text-gray-600 text-sm">Unser Team berät Sie gerne persönlich zu allen Themen rund um Flüssiggas.</p>
                </div>
                 <button
                    onClick={() => { if(setActiveSection) { setActiveSection('kontakt'); window.scrollTo(0,0); } }}
                    className="whitespace-nowrap bg-white text-gas font-bold border-2 border-gas py-3 px-6 rounded-lg hover:bg-gas hover:text-white transition-colors"
                >
                    Kontakt aufnehmen
                </button>
            </div>
        );
    }

    return ctaContent;
};

// Component to automate internal linking in text
const LinkInjector = ({ children, setActiveSection }) => {
    const handleLinkClick = (path, e) => {
        e.preventDefault();
        if (setActiveSection) {
            setActiveSection(path);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const processNode = (node) => {
        if (typeof node === 'string') {
            const keywords = [
                { pattern: /1,2\s*t(?:onnen)?\s*(?:Tank)?/gi, text: '1,2 t Flüssiggastank', link: 'fluessiggastank-kaufen/fluessiggastank-2700l-oberirdisch-1-2t' },
                { pattern: /2,1\s*t(?:onnen)?\s*(?:Tank)?/gi, text: '2,1 t Flüssiggastank', link: 'fluessiggastank-kaufen/fluessiggastank-4850l-oberirdisch-2-1t' },
                { pattern: /2,9\s*t(?:onnen)?\s*(?:Tank)?/gi, text: '2,9 t Flüssiggastank', link: 'fluessiggastank-kaufen/fluessiggastank-6400l-oberirdisch-2-9t' },
                { pattern: /Flüssiggas bestellen/gi, text: 'Flüssiggas bestellen', link: 'fluessiggas-bestellen' },
                { pattern: /Gas bestellen/gi, text: 'Flüssiggas bestellen', link: 'fluessiggas-bestellen' },
                { pattern: /Gastank kaufen/gi, text: 'Flüssiggastank kaufen', link: 'tanks' },
                { pattern: /Kontakt aufnehmen/gi, text: 'Kontakt aufnehmen', link: 'kontakt' },
                { pattern: /Äußere Prüfung/g, text: 'Äußere Prüfung', link: 'pruefungen' },
                { pattern: /Innere Prüfung/g, text: 'Innere Prüfung', link: 'pruefungen' }
            ];

            let parts = [node];

            keywords.forEach(({ pattern, text, link }) => {
                const newParts = [];
                parts.forEach(part => {
                    if (typeof part !== 'string') {
                        newParts.push(part);
                        return;
                    }
                    const split = part.split(pattern);
                    if (split.length > 1) {
                         split.forEach((s, i) => {
                             newParts.push(s);
                             if (i < split.length - 1) {
                                 newParts.push(
                                     <a key={`${link}-${i}`} href={`/${link}`} onClick={(e) => handleLinkClick(link, e)} className="text-gas font-bold underline hover:text-gas-dark decoration-gas/30 hover:decoration-gas">
                                         {text}
                                     </a>
                                 );
                             }
                         });
                    } else {
                        newParts.push(part);
                    }
                });
                parts = newParts;
            });

            return parts;
        }

        if (React.isValidElement(node)) {
            if (node.type === 'a') {
                return node;
            }
            return React.cloneElement(node, {
                ...node.props,
                children: React.Children.map(node.props.children, child => processNode(child))
            });
        }

        return node;
    };

    return <>{React.Children.map(children, child => processNode(child))}</>;
};

// Dynamic Table of Contents Component
const TableOfContents = ({ contentRef, activeArticleId }) => {
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        if (!contentRef.current) return;

        // Wait a tick for rendering to settle
        const timer = setTimeout(() => {
            const elements = contentRef.current.querySelectorAll('h4');
            const items = Array.from(elements).map((el, index) => {
                const id = `heading-${index}`;
                el.id = id;
                return { id, text: el.textContent };
            });
            setHeadings(items);
        }, 100);

        return () => clearTimeout(timer);
    }, [contentRef, activeArticleId]); // Re-run when article changes

    const scrollToHeading = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Header height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (headings.length === 0) return null;

    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <List size={18} /> Inhaltsverzeichnis
            </h3>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <button
                            onClick={() => scrollToHeading(heading.id)}
                            className="text-left text-sm text-gray-600 hover:text-gas hover:underline transition-colors"
                        >
                            {heading.text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const KnowledgeCenter = ({ setActiveSection, slug }) => {
    const contentRef = useRef(null);

    const findArticleBySlug = (slug) => {
        if (!slug) return null;
        for (const cat of CONTENT.knowledge) {
            for (const art of cat.articles) {
                if (art.id === slug) return { cat, art };
            }
        }
        return null;
    };

    const initialData = slug ? findArticleBySlug(slug) : null;
    const [activeCategory, setActiveCategory] = useState(initialData ? initialData.cat.id : CONTENT.knowledge[0].id);
    const [activeArticle, setActiveArticle] = useState(initialData ? initialData.art.id : CONTENT.knowledge[0].articles[0].id);

    useEffect(() => {
        if (slug) {
            const data = findArticleBySlug(slug);
            if (data) {
                setActiveCategory(data.cat.id);
                setActiveArticle(data.art.id);
            }
        }
    }, [slug]);

    const currentCategory = CONTENT.knowledge.find(c => c.id === activeCategory);
    const currentArticle = currentCategory.articles.find(a => a.id === activeArticle) || currentCategory.articles[0];

    const handleCategoryChange = (catId) => {
        const newCat = CONTENT.knowledge.find(c => c.id === catId);
        setActiveCategory(catId);
        if (newCat && newCat.articles.length > 0) {
            handleArticleChange(newCat.articles[0].id);
        }
    };

    const handleArticleChange = (articleId) => {
        setActiveArticle(articleId);
        if (setActiveSection) {
            setActiveSection(`wissen/${articleId}`);
        }
    };

    // Calculate dynamic "Last Updated" date - For demo purposes we map it relative to current date
    // In a real app this would come from the content metadata
    const currentDate = new Date();
    const lastUpdated = `${currentDate.getDate()}. ${currentDate.toLocaleString('de-DE', { month: 'long' })} ${currentDate.getFullYear()}`;

    return (
        <section className="bg-gray-50 pt-32 pb-24 min-h-screen" id="wissen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-extrabold text-text mb-4">Wissen & Ratgeber</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">Expertenwissen verständlich erklärt.</p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {CONTENT.knowledge.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`flex items-center px-6 py-4 rounded-xl transition-all shadow-sm ${activeCategory === cat.id ? 'bg-gas text-white shadow-lg ring-2 ring-gas ring-offset-2' : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gas'}`}
                        >
                            <cat.icon size={20} className="mr-3"/>
                            <span className="font-bold">{cat.title}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar: Articles List */}
                    <div className="lg:col-span-4 lg:col-start-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                            <div className="p-4 bg-gray-50 border-b border-gray-200">
                                <h2 className="font-bold text-gray-700 flex items-center"><BookOpen size={18} className="mr-2"/> Artikelübersicht</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {currentCategory.articles.map((article) => (
                                    <button
                                        key={article.id}
                                        onClick={() => handleArticleChange(article.id)}
                                        className={`sidebar-link w-full text-left p-4 hover:bg-gray-50 transition-colors flex justify-between items-center group ${currentArticle.id === article.id ? 'active' : 'text-gray-600'}`}
                                    >
                                        <div>
                                            <div className="font-semibold group-hover:text-gas transition-colors">{article.title}</div>
                                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">{article.description}</div>
                                        </div>
                                        <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${currentArticle.id === article.id ? 'text-gas opacity-100' : 'text-gray-500'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <motion.article
                            key={currentArticle.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 article-content min-h-[600px]"
                        >
                            <header className="flex justify-between items-start mb-6">
                                <div className="flex items-center space-x-2 text-sm text-gas font-bold uppercase tracking-wider">
                                    <span>{currentCategory.title}</span>
                                    <ChevronRight size={14}/>
                                    <span>Ratgeber</span>
                                </div>
                                <time dateTime={currentDate.toISOString()} className="text-xs text-gray-500">
                                    Aktualisiert: {lastUpdated}
                                </time>
                            </header>

                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{currentArticle.title}</h1>
                            <p className="lead text-xl text-gray-500 mb-8 pb-8 border-b border-gray-100">{currentArticle.description}</p>

                            {/* Sticky Table of Contents Injection */}
                            <div ref={contentRef}>
                                <TableOfContents contentRef={contentRef} activeArticleId={currentArticle.id} />
                                <LinkInjector setActiveSection={setActiveSection}>
                                    {currentArticle.content}
                                </LinkInjector>
                            </div>

                            {currentArticle.id === 'miete-kauf' && <div className="mt-12"><RentVsBuyGraphic /></div>}

                            {/* Contextual Smart CTA */}
                            <ArticleCTA categoryId={currentCategory.id} setActiveSection={setActiveSection} />

                            {/* Author Box for E-E-A-T */}
                            <div className="mt-16 pt-8 border-t border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                     {/* Placeholder for author image - in real app would use actual image */}
                                     <img src="/images/team/thomas-moeller-lkw.webp" alt="Thomas Möller" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex'}} />
                                     <div className="w-full h-full bg-gas text-white hidden items-center justify-center font-bold">TM</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase">Geprüft von</div>
                                    <div className="font-bold text-gray-900">Thomas Möller</div>
                                    <div className="text-sm text-gray-500">Geschäftsführung & Sachkundiger</div>
                                </div>
                            </div>

                        </motion.article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeCenter;
