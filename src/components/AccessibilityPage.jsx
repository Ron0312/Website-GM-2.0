import React from 'react';
import { AccessibilityStatementContent } from './Legal';

const AccessibilityPage = () => {
    return (
        <div className="pt-20 min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Erklärung zur Barrierefreiheit</h1>
                <AccessibilityStatementContent />
            </div>
        </div>
    );
};

export default AccessibilityPage;
