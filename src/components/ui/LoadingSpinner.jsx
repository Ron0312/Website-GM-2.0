import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 24, className = '', color = 'text-gas' }) => {
    return (
        <Loader2 size={size} className={`animate-spin ${color} ${className}`} />
    );
};

export default LoadingSpinner;
