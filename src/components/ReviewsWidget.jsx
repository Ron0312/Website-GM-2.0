import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const REVIEWS = [
    {
        id: 1,
        name: "Michael Weber",
        date: "Vor 2 Wochen",
        text: "Habe hier meinen Gastank gekauft. Beratung war top, Lieferung pünktlich. Endlich unabhängig vom alten Versorger!",
        rating: 5
    },
    {
        id: 2,
        name: "Sabine K.",
        date: "Vor 1 Monat",
        text: "Sehr freundlicher Kundenservice. Frau Müller hat sich persönlich um mein Anliegen gekümmert. Preis absolut fair.",
        rating: 5
    },
    {
        id: 3,
        name: "Hannes D.",
        date: "Vor 3 Monaten",
        text: "Schnelle Lieferung auch im Winter. Der Fahrer war sehr kompetent und hilfsbereit. Bestelle nur noch hier.",
        rating: 5
    },
    {
        id: 4,
        name: "Familie Jansen",
        date: "Vor 4 Monaten",
        text: "Transparente Preise, keine versteckten Kosten. Der Umstieg von Öl auf Flüssiggas lief reibungslos.",
        rating: 5
    }
];

const ReviewsWidget = () => {
    return (
        <div className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="currentColor" />)}
                            </div>
                            <span className="font-bold text-xl text-gray-900">4.9/5</span>
                        </div>
                        <p className="text-gray-500 text-sm">Basierend auf Google Bewertungen</p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REVIEWS.map(review => (
                        <div key={review.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gas-light/20 text-gas font-bold rounded-full flex items-center justify-center text-xs">
                                        {review.name.charAt(0)}
                                    </div>
                                    <span className="font-bold text-sm text-gray-900">{review.name}</span>
                                </div>
                                <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex text-yellow-400 mb-3">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">"{review.text}"</p>
                            <div className="mt-4 flex items-center gap-1 text-xs text-green-600 font-medium">
                                <CheckCircle size={12} /> Verifizierter Kunde
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewsWidget;
