import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CONTENT } from '../data/content';

const KnowledgeTeaser = ({ setActiveSection }) => {

    // Find the specific articles we want to feature from the CONTENT data
    // We look for them by ID in the 'gas-bestellung' category (or others)
    const findArticle = (id) => {
        for (const section of CONTENT.knowledge) {
            const article = section.articles.find(a => a.id === id);
            if (article) return article;
        }
        return null;
    };

    const featuredIds = [
        { id: 'preis-guide', category: 'Gasbestellung', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
        { id: 'qualitaets-check', category: 'Qualität', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-100' },
        { id: 'liefer-ablauf', category: 'Ablauf', icon: Truck, color: 'text-orange-600', bg: 'bg-orange-100' }
    ];

    const articles = featuredIds.map(feat => {
        const data = findArticle(feat.id);
        return {
            ...feat,
            title: data ? data.title : feat.id,
            description: data ? data.description : '',
        };
    }).filter(a => a.title); // filter out if not found

    const handleReadMore = (articleId) => {
        if (setActiveSection) {
            setActiveSection(`wissen/${articleId}`);
        }
    };

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gas-light/30 text-gas font-bold text-sm mb-4">
                        <BookOpen size={16} />
                        <span>Ratgeber & Wissen</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">Wissen für Tankbesitzer</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Transparenz ist uns wichtig. Hier finden Sie Antworten auf die häufigsten Fragen rund um Flüssiggas, Preise und Technik.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <motion.a
                            key={article.id}
                            href={`/wissen/${article.id}`}
                            onClick={(e) => { e.preventDefault(); handleReadMore(article.id); }}
                            whileHover={{ y: -5 }}
                            className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all cursor-pointer group block"
                        >
                            <div className={`w-14 h-14 ${article.bg} rounded-2xl flex items-center justify-center ${article.color} mb-6 group-hover:scale-110 transition-transform`}>
                                <article.icon size={28} />
                            </div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{article.category}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gas transition-colors">{article.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {article.description}
                            </p>
                            <div className="flex items-center text-gas font-bold group-hover:gap-2 transition-all">
                                Artikel lesen <ArrowRight size={18} className="ml-2" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="/wissen"
                        onClick={(e) => { e.preventDefault(); setActiveSection('wissen'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-gas transition-colors"
                    >
                        Alle Ratgeber-Artikel ansehen <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeTeaser;
