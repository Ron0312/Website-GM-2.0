import os

replace_all_files = [
    'src/components/CommercialSection.jsx',
    'src/components/ContactSection.jsx',
    'src/components/DeliveryAreaOverview.jsx',
    'src/components/DeliveryMap.jsx',
    'src/components/FAQ.jsx',
    'src/components/KnowledgeCenter.jsx',
    'src/components/KnowledgeTeaser.jsx',
    'src/components/LocalLandingPage.jsx',
    'src/components/Navigation.jsx',
    'src/components/RentVsBuyGraphic.jsx',
    'src/components/ReviewsWidget.jsx',
    'src/components/SimpleModal.jsx',
    'src/components/TankDetail.jsx',
    'src/components/TankSizeAdvisor.jsx',
    'src/components/UnitConverter.jsx',
    'src/components/WizardModal.jsx',
    'src/data/content.jsx',
    'src/components/calculator/PriceChart.jsx',
    'src/components/ui/Toast.jsx'
]

def replace_in_file(filepath, old, new):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (not found)")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content.replace(old, new)

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes in {filepath}")

# 1. Bulk replacements
for filepath in replace_all_files:
    replace_in_file(filepath, 'text-gray-400', 'text-gray-500')

# 2. EnergyCalculator.jsx (Selective)
ec_path = 'src/components/EnergyCalculator.jsx'
if os.path.exists(ec_path):
    with open(ec_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Header uses text-gray-400 on dark bg - KEEP IT.
    # We replace others.

    # Input label suffix (right-6 ...)
    content = content.replace('text-gray-400 font-bold">{factors[sourceType].label}', 'text-gray-500 font-bold">{factors[sourceType].label}')

    # Euro sign
    content = content.replace('text-gray-400 text-xs">€', 'text-gray-500 text-xs">€')

    # Savings text
    content = content.replace('text-3xl text-gray-400">Keine Ersparnis', 'text-3xl text-gray-500">Keine Ersparnis')
    content = content.replace('text-3xl text-gray-400 mb-1">Keine Ersparnis', 'text-3xl text-gray-500 mb-1">Keine Ersparnis')

    # CO2 savings
    content = content.replace('text-gray-400\'}`}>{co2Savings', 'text-gray-500\'}`}>{co2Savings')

    # Reset button
    content = content.replace('text-gray-400 text-xs font-bold hover:text-gas', 'text-gray-500 text-xs font-bold hover:text-gas')

    # Tooltip Icon (text-gray-400 is fine for icon, but maybe 500 is better visible?)
    # Leaving it 400 as per plan (only text matters most) or changing to 500 for consistency.
    # Let's change it to 500 for better visibility.
    content = content.replace('Info size={14} className="text-gray-400', 'Info size={14} className="text-gray-500')

    with open(ec_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {ec_path}")

# 3. GasOrderSection.jsx (Selective)
gos_path = 'src/components/GasOrderSection.jsx'
if os.path.exists(gos_path):
    with open(gos_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Trust Bar icons at bottom (on white/gray-50 bg)
    content = content.replace('ShieldCheck size={32} className="text-gray-400"', 'ShieldCheck size={32} className="text-gray-500"')
    content = content.replace('Check size={32} className="text-gray-400"', 'Check size={32} className="text-gray-500"')
    content = content.replace('MapPin size={32} className="text-gray-400"', 'MapPin size={32} className="text-gray-500"')

    # Input MapPin (inside white/5 input) - KEEP 400 or make 300.
    # Leave as is.

    # Calculator range labels (0% - 85%) - text-gray-400 on dark. KEEP.

    with open(gos_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {gos_path}")
