
import os
import re

# Configuration
replacements = {
    # Brand Names
    r'Gas-Service Möller e\.K\.': 'Christherm',
    r'Gas-Service Möller': 'Flüssiggas on Net',
    r'GasMöller': 'Flüssiggas on Net',
    r'Gas-Service-Möller': 'Flüssiggas-on-Net',
    r'gasmöller': 'fluessiggas-onnet',

    # Domains & Emails
    r'gasmoeller\.de': 'fluessiggas-onnet.de',
    r'kontakt@gasmoeller\.de': 'support@fluessiggas-onnet.de',
    r'info@gasmoeller\.de': 'support@fluessiggas-onnet.de',

    # Names
    r'Anja Müller': 'Kai-Uwe Christen',
    r'Anja Möller': 'Kai-Uwe Christen',

    # Address & Phone
    r'Neuenteichweg 7a': 'Am Markt 9',
    r'23795 Schieren': '18119 Rostock',
    r'04551 89 70 89': '0381 36779809',
    r'\+49 176 416 84 326': '+49 381 36779809',

    # Legal
    r'HRA 11334 KI': 'USt-IdNr. DE220160403',
    r'Amtsgericht Kiel': 'Gewerbeamt Hansestadt Rostock',

    # Regions
    r'Schleswig-Holstein': 'Mecklenburg-Vorpommern', # Context dependent, but safe for address

    # Images (Code References)
    r'logo-gasmoeller\.png': 'logo.png',

    # Meta
    r'Anja Müller': 'Kai-Uwe Christen'
}

# Colors for Tailwind (Regex to match specific lines)
color_replacements = {
    r"DEFAULT: '#005b9f'": "DEFAULT: '#0284c7'", # Sky 600
    r"dark: '#004a82'": "dark: '#0369a1'",       # Sky 700
    r"light: '#e6f0fa'": "light: '#e0f2fe'",     # Sky 100
    r"accent: '#003d6b'": "accent: '#0c4a6e'",   # Sky 900
    r"vibrant: '#0077cc'": "vibrant: '#0ea5e9'"  # Sky 500
}

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # General Replacements
        for pattern, replacement in replacements.items():
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

        # Tailwind Specifics (only for tailwind.config.js)
        if 'tailwind.config.js' in filepath:
            for pattern, replacement in color_replacements.items():
                content = re.sub(pattern, replacement, content)

        if content != original_content:
            print(f"Updating {filepath}...")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

    except Exception as e:
        print(f"Skipping {filepath}: {e}")

def main():
    # Walk through src and public/html files (if any)
    for root, dirs, files in os.walk('.'):
        if '.git' in root or 'node_modules' in root:
            continue

        for file in files:
            if file.endswith(('.js', '.jsx', '.css', '.html', '.md', '.json')):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
