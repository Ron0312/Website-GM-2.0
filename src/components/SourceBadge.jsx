import React from 'react';
import { BookOpen } from 'lucide-react';

const SourceBadge = ({ text }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-gas-dark border border-blue-200 mb-2">
        <BookOpen size={12} className="mr-1"/> {text}
    </span>
);

export default SourceBadge;
