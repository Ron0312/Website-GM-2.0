import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ModernInput = ({ label, error, className = '', ...props }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative mb-4 ${className}`}>
      <motion.div
        animate={focused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`relative rounded-xl border-2 transition-colors ${
          error
            ? 'border-red-300 bg-red-50/50'
            : focused
            ? 'border-gas bg-white shadow-lg shadow-gas/10'
            : 'border-gray-100 bg-white'
        }`}
      >
        <input
          {...props}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur && props.onBlur(e);
          }}
        className="w-full p-4 bg-transparent outline-none text-gray-800 font-medium placeholder-gray-400 rounded-xl font-sans"
        />
        {label && (
             <div className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold text-gray-500 uppercase tracking-wider pointer-events-none">
                 {label}
             </div>
        )}
      </motion.div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{error}</p>}
    </div>
  );
};

export default ModernInput;
