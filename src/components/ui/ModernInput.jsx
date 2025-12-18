import React, { useState, useId, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';

const ModernInput = forwardRef(({ label, error, className = '', multiline = false, id: providedId, autoComplete, name, ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const generatedId = useId();
  const inputId = providedId || generatedId;
  const errorId = `${inputId}-error`;

  // Determine state
  const hasError = !!error;
  const isValid = !hasError && props.value && props.value.toString().length > 0 && !props.disabled;

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={`relative mb-4 group ${className}`}>
      <motion.div
        animate={hasError ? { x: [-10, 10, -5, 5, 0] } : focused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: hasError ? 0.4 : 0.2 }}
        className={`relative rounded-xl border-2 transition-colors flex items-start ${
          hasError
            ? 'border-red-300 bg-red-50/50'
            : isValid && !focused
            ? 'border-green-300 bg-green-50/10'
            : focused
            ? 'border-gas bg-white shadow-lg shadow-gas/10 ring-2 ring-gas/20'
            : 'border-gray-100 bg-white group-hover:border-gas/30'
        }`}
      >
        <InputComponent
          {...props}
          ref={ref}
          id={inputId}
          name={name}
          inputMode={props.inputMode}
          pattern={props.pattern}
          autoComplete={autoComplete || (name === 'b_field' ? 'off' : 'on')}
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
          className={`w-full p-4 bg-transparent outline-none text-gray-800 font-medium placeholder-gray-400 rounded-xl font-sans tabular-nums ${multiline ? 'resize-none h-32' : ''}`}
        />
        {label && (
             <label htmlFor={inputId} className={`absolute -top-2.5 left-4 px-2 text-xs font-bold uppercase tracking-wider cursor-text transition-colors ${focused ? 'text-gas bg-white' : 'text-gray-500 bg-white'}`}>
                 {label}
             </label>
        )}

        {/* Validation Icons with Micro-Interactions */}
        {!multiline && (
            <div className="pr-4 py-4 flex items-center pointer-events-none h-full absolute right-0 top-0">
                <AnimatePresence mode="popLayout">
                    {hasError && (
                        <motion.div
                            key="error-icon"
                            initial={{ scale: 0, rotate: -45, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            <X size={20} className="text-red-500" />
                        </motion.div>
                    )}
                    {isValid && !focused && (
                        <motion.div
                             key="success-icon"
                             initial={{ scale: 0, rotate: 45, opacity: 0 }}
                             animate={{ scale: 1.2, rotate: 0, opacity: 1 }}
                             whileHover={{ scale: 1.3 }}
                             exit={{ scale: 0, opacity: 0 }}
                             transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            <Check size={20} className="text-green-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )}
      </motion.div>
      <AnimatePresence>
        {typeof error === 'string' && error.length > 0 && (
            <motion.div
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                id={errorId}
                className="flex items-center text-red-500 text-xs mt-1 ml-1 font-bold"
            >
                <AlertCircle size={12} className="mr-1 flex-shrink-0" />
                <span>{error}</span>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

ModernInput.displayName = 'ModernInput';

export default ModernInput;
