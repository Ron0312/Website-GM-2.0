import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';

const ModernInput = ({ label, error, className = '', multiline = false, id: providedId, ...props }) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const generatedId = useId();
  const inputId = providedId || generatedId;
  const errorId = `${inputId}-error`;

  // Determine state
  const hasError = !!error;
  const isValid = !hasError && props.value && props.value.length > 0 && !props.disabled;

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={`relative mb-4 ${className}`}>
      <motion.div
        animate={focused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`relative rounded-xl border-2 transition-colors flex items-start ${
          hasError
            ? 'border-red-300 bg-red-50/50'
            : isValid && !focused
            ? 'border-green-300 bg-green-50/10'
            : focused
            ? 'border-gas bg-white shadow-lg shadow-gas/10'
            : 'border-gray-100 bg-white'
        }`}
      >
        <InputComponent
          {...props}
          id={inputId}
          inputMode={props.inputMode}
          pattern={props.pattern}
          autoComplete={props.autoComplete}
          aria-invalid={hasError}
          aria-errormessage={hasError ? errorId : undefined}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus && props.onFocus(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            setTouched(true);
            props.onBlur && props.onBlur(e);
          }}
          className={`w-full p-4 bg-transparent outline-none text-gray-800 font-medium placeholder-gray-400 rounded-xl font-sans ${multiline ? 'resize-none h-32' : ''}`}
        />
        {label && (
             <label htmlFor={inputId} className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold text-gray-500 uppercase tracking-wider pointer-events-none">
                 {label}
             </label>
        )}

        {/* Validation Icons with Micro-Interactions */}
        {!multiline && (
            <div className="pr-4 py-4 flex items-center pointer-events-none h-full absolute right-0 top-0">
                <AnimatePresence>
                    {hasError && (
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                        >
                            <X size={20} className="text-red-500" />
                        </motion.div>
                    )}
                    {isValid && !focused && (
                        <motion.div
                             initial={{ scale: 0, rotate: 45 }}
                             animate={{ scale: 1, rotate: 0 }}
                             exit={{ scale: 0 }}
                        >
                            <Check size={20} className="text-green-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )}
        {multiline && (
             <div className="absolute right-4 top-4 pointer-events-none">
                <AnimatePresence>
                    {hasError && (
                         <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                         >
                            <X size={20} className="text-red-500" />
                        </motion.div>
                    )}
                    {isValid && !focused && (
                        <motion.div
                             initial={{ scale: 0 }}
                             animate={{ scale: 1 }}
                             exit={{ scale: 0 }}
                        >
                            <Check size={20} className="text-green-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )}

      </motion.div>
      {typeof error === 'string' && error.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            id={errorId}
            className="flex items-center text-red-500 text-xs mt-1 ml-1 font-bold"
          >
              <AlertCircle size={12} className="mr-1" />
              {error}
          </motion.div>
      )}
    </div>
  );
};

export default ModernInput;
