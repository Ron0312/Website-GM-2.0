import React, { useState, useEffect, useRef, Suspense } from 'react';

const LazyLoadSection = ({ children, threshold = 0.1, minHeight = "200px" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px', // Load 200px before it comes into view
                threshold
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return (
        <div ref={ref} style={{ minHeight }}>
            {isVisible ? (
                <Suspense fallback={<div className="w-full h-full bg-gray-50 animate-pulse rounded-3xl" style={{ minHeight }} />}>
                    {children}
                </Suspense>
            ) : (
                <div className="w-full h-full bg-gray-50/50 rounded-3xl" style={{ minHeight }} />
            )}
        </div>
    );
};

export default LazyLoadSection;
