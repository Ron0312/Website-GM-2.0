import React, { useState } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import reviewsData from '../data/reviews.json';

const ReviewsWidget = () => {
    // We want to show 4 reviews at a time on desktop, 1 on mobile
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 4;
    const totalReviews = reviewsData.length;

    const nextSlide = () => {
        setStartIndex(prev => (prev + visibleCount) % totalReviews);
    };

    const prevSlide = () => {
        setStartIndex(prev => (prev - visibleCount + totalReviews) % totalReviews);
    };

    // Get current slice. Wrap around if needed is tricky with simple slice,
    // so let's just use modulo logic for "Infinite" feeling or just stop at end?
    // Let's do a simple pagination window
    const currentReviews = [];
    for (let i = 0; i < visibleCount; i++) {
        currentReviews.push(reviewsData[(startIndex + i) % totalReviews]);
    }

    return (
        <div className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="currentColor" />)}
                            </div>
                            <span className="font-bold text-xl text-gray-900">5.0/5</span>
                        </div>
                        <p className="text-gray-500 text-sm">Basierend auf 25 Google Bewertungen</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <button onClick={prevSlide} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600" aria-label="Vorherige Bewertungen">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextSlide} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600" aria-label="Nächste Bewertungen">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <a
                            href="https://www.google.com/search?q=gas-service+m%C3%BCller"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm shadow-sm"
                        >
                            <span className="w-5 h-5 flex items-center justify-center bg-blue-500 text-white rounded-full font-serif text-xs">G</span>
                            Auf Google bewerten
                        </a>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentReviews.map((review, index) => (
                        <div key={`${startIndex}-${index}`} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-gas to-gas-dark text-white font-bold rounded-full flex items-center justify-center text-xs shadow-sm">
                                        {review.author.charAt(0)}
                                    </div>
                                    <span className="font-bold text-sm text-gray-900 truncate max-w-[120px]" title={review.author}>{review.author}</span>
                                </div>
                                <span className="text-xs text-gray-500 whitespace-nowrap">{review.date}</span>
                            </div>

                            <div className="flex text-yellow-400 mb-3">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>

                            <div className="flex-grow relative">
                                <Quote size={16} className="absolute -top-1 -left-1 text-gray-300 opacity-50" />
                                <p className="text-gray-600 text-sm leading-relaxed pl-4 line-clamp-6 italic">
                                    {review.text}
                                </p>
                            </div>

                            {review.response && (
                                <div className="mt-4 pt-4 border-t border-gray-200/50">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Antwort vom Inhaber</p>
                                    <p className="text-xs text-gray-500 italic truncate">"{review.response}"</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Dots */}
                <div className="flex justify-center gap-2 mt-6 lg:hidden">
                    {[...Array(Math.ceil(totalReviews / 1))].map((_, i) => (
                         // Too many dots if we map all. Just show current index indicator roughly?
                         // Better: Simplified mobile view handling.
                         null
                    ))}
                    <span className="text-xs text-gray-500">Zeige {startIndex + 1} - {startIndex + 4} von {totalReviews}</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewsWidget;
