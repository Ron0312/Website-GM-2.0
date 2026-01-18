import React from 'react';
import { X } from 'lucide-react';

const SimpleModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-600" aria-label="Schließen"><X size={24}/></button>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <div className="prose prose-sm text-gray-600 leading-relaxed">{content}</div>
            </div>
        </div>
    );
};

export default SimpleModal;
