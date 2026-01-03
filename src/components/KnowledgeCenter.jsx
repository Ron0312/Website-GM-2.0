import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';
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
            // Regex for keywords - defined here for simplicity, could be moved to config
            // We use simple replacements for common terms
            // Note: This is a basic implementation. Complex HTML/React tree traversal is tricky.
            // We only replace exact matches or simple variations.

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

            // Use split/map to replace
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
            // Prevent nested anchors: if the current node is an anchor, do not process its children for links
            if (node.type === 'a') {
                return node;
            }
            // Recursively process children
            return React.cloneElement(node, {
                ...node.props,
                children: React.Children.map(node.props.children, child => processNode(child))
            });
        }

        return node;
    };

    return <>{React.Children.map(children, child => processNode(child))}</>;
};

const KnowledgeCenter = ({ setActiveSection, slug }) => {
    // Find initial state based on slug if provided
    const findArticleBySlug = (slug) => {
        if (!slug) return null;
        for (const cat of CONTENT.knowledge) {
            for (const art of cat.articles) {
                // Assuming Article ID is the slug, or we map it.
                // In the current data content, ID is like 'miete-kauf', which is slug-friendly.
                if (art.id === slug) return { cat, art };
            }
        }
        return null;
    };

    const initialData = slug ? findArticleBySlug(slug) : null;
    const [activeCategory, setActiveCategory] = useState(initialData ? initialData.cat.id : CONTENT.knowledge[0].id);
    const [activeArticle, setActiveArticle] = useState(initialData ? initialData.art.id : CONTENT.knowledge[0].articles[0].id);

    // Sync state if slug prop changes externally (e.g. browser back button)
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
    // Safety check: ensure activeArticle belongs to currentCategory, else default to first
    const currentArticle = currentCategory.articles.find(a => a.id === activeArticle) || currentCategory.articles[0];

    // Handler to update both category and article atomically
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
                                            <div className="text-xs text-gray-400 mt-1 line-clamp-1">{article.description}</div>
                                        </div>
                                        <ChevronRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity ${currentArticle.id === article.id ? 'text-gas opacity-100' : 'text-gray-400'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <motion.div
                            key={currentArticle.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 article-content min-h-[600px]"
                        >
                            <div className="mb-6 flex items-center space-x-2 text-sm text-gas font-bold uppercase tracking-wider">
                                <span>{currentCategory.title}</span>
                                <ChevronRight size={14}/>
                                <span>Ratgeber</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{currentArticle.title}</h2>
                            <p className="text-xl text-gray-500 mb-8 pb-8 border-b border-gray-100">{currentArticle.description}</p>

                            <LinkInjector setActiveSection={setActiveSection}>
                                {currentArticle.content}
                            </LinkInjector>

                            {currentArticle.id === 'miete-kauf' && <div className="mt-12"><RentVsBuyGraphic /></div>}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeCenter;
