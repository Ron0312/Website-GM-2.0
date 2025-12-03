import React, { useState } from 'react';
import WizardModal from './WizardModal';
import DeliveryMap from './DeliveryMap';

const GasOrderSection = () => {
    const [wizardOpen, setWizardOpen] = useState(false);
    return (
        <div id="gas">
            <div className="bg-gas-dark text-white py-24 text-center">
                <h1 className="text-4xl font-bold mb-6">Gas bestellen</h1>
                <p className="text-xl text-gas-light max-w-2xl mx-auto mb-10">Aktueller Tagespreis. Ohne Vertragsbindung.</p>
                <button onClick={() => setWizardOpen(true)} className="bg-white text-gas font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:bg-gas-light transition-all transform hover:scale-105">Jetzt Preis anfragen</button>
                <WizardModal isOpen={wizardOpen} onClose={() => setWizardOpen(false)} initialType="gas" />
            </div>
            <DeliveryMap />
        </div>
    );
};

export default GasOrderSection;
