import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 5000 }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const bgColors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        info: 'bg-blue-50 border-blue-200'
    };

    const textColors = {
        success: 'text-green-800',
        error: 'text-red-800',
        info: 'text-blue-800'
    };

    const Icons = {
        success: CheckCircle,
        error: AlertCircle,
        info: Info
    };

    const Icon = Icons[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-4 right-4 z-[100] flex items-start p-4 rounded-xl border shadow-xl max-w-sm w-full ${bgColors[type]}`}
            role="alert"
        >
            <Icon className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${textColors[type]}`} />
            <div className={`flex-1 text-sm font-medium ${textColors[type]}`}>
                {message}
            </div>
            <button onClick={onClose} className={`ml-3 text-gray-400 hover:text-gray-600`}>
                <X size={16} />
            </button>
        </motion.div>
    );
};

export default Toast;
