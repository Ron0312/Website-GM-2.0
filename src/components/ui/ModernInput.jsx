import React, { useState, useId, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';

const ModernInput = forwardRef(({
    label,
    error,
    className = '', // Wrapper class
    inputClassName = '', // Input specific class
    multiline = false,
    id: providedId,
    autoComplete,
    name,
    type = 'text',
    placeholder,
    ...props
}, ref) => {
    const [focused, setFocused] = useState(false);
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const errorId = `${inputId}-error`;

    const hasError = !!error;
    const isValid = !hasError && props.value && props.value.toString().length > 0 && !props.disabled;

    const InputComponent = multiline ? 'textarea' : 'input';

    // If label is present, we use a space as placeholder to enable the CSS-only floating label logic (peer-shown).
    // If no label, we use the provided placeholder.
    const effectivePlaceholder = label ? ' ' : placeholder;
    const isFloating = !!label;

    return (
        <div className={`relative mb-5 group ${className}`}>
             <div className="relative">
                <InputComponent
                    {...props}
                    ref={ref}
                    id={inputId}
                    name={name}
                    type={type}
                    placeholder={effectivePlaceholder}
                    autoComplete={autoComplete || (name === 'b_field' ? 'off' : 'on')}
                    aria-invalid={hasError}
                    aria-errormessage={hasError ? errorId : undefined}
                    onFocus={(e) => {
                        setFocused(true);
                        props.onFocus && props.onFocus(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        props.onBlur && props.onBlur(e);
                    }}
                    className={`
                        peer w-full rounded-xl border-2 outline-none transition-all font-medium
                        disabled:opacity-50 disabled:cursor-not-allowed
                        placeholder:text-gray-400
                        ${multiline ? 'h-32 resize-none py-6 px-4' : 'h-14 px-4'}
                        ${isFloating && !multiline ? 'pt-6 pb-2' : ''}
                        ${!isFloating && !multiline ? 'py-3' : ''}
                        ${hasError
                            ? 'border-red-300 bg-red-50/50 text-red-900 focus:border-red-500 placeholder:text-red-300'
                            : isValid && !focused
                            ? 'border-green-300 bg-green-50/10 text-gray-900'
                            : focused
                            ? 'border-gas bg-white shadow-lg shadow-gas/10 ring-4 ring-gas/10'
                            : 'border-gray-200 bg-gray-50/50 text-gray-900 hover:border-gas/30 hover:bg-white'}
                        ${inputClassName}
                    `}
                />

                {/* Floating Label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className={`
                            absolute left-4 transition-all duration-200 pointer-events-none truncate max-w-[calc(100%-3rem)] origin-top-left
                            ${multiline ? 'top-4' : 'top-1/2 -translate-y-1/2'}
                            ${hasError ? 'text-red-400' : focused ? 'text-gas' : 'text-gray-500'}
                            peer-focus:-translate-y-0 peer-focus:top-2 peer-focus:scale-75 peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-wider
                            peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider
                        `}
                    >
                        {label}
                    </label>
                )}

                {/* Validation Icons */}
                {!multiline && (
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                        <AnimatePresence mode="popLayout">
                            {hasError && (
                                <motion.div
                                    key="error"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                >
                                    <X size={20} className="text-red-500" />
                                </motion.div>
                            )}
                            {isValid && !focused && (
                                <motion.div
                                     key="success"
                                     initial={{ scale: 0, opacity: 0 }}
                                     animate={{ scale: 1, opacity: 1 }}
                                     exit={{ scale: 0, opacity: 0 }}
                                >
                                    <Check size={20} className="text-green-500" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                     </div>
                )}
            </div>

            {/* Error Text */}
            <AnimatePresence>
                {typeof error === 'string' && error.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        id={errorId}
                        className="flex items-start text-red-500 text-xs mt-1.5 ml-1 font-bold"
                    >
                        <AlertCircle size={12} className="mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

ModernInput.displayName = 'ModernInput';
export default ModernInput;
