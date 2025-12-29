import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../Navigation';

// Mock dependencies
vi.mock('lucide-react', () => ({
    Menu: () => <div data-testid="menu-icon" />,
    X: () => <div data-testid="x-icon" />,
    Phone: () => <div data-testid="phone-icon" />,
    User: () => <div data-testid="user-icon" />,
    Wrench: () => <div data-testid="wrench-icon" />,
    FileText: () => <div data-testid="file-text-icon" />,
    ChevronDown: () => <div data-testid="chevron-down-icon" />,
    ChevronRight: () => <div data-testid="chevron-right-icon" />,
    Settings: () => <div data-testid="settings-icon" />,
}));

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, onClick }) => <div className={className} onClick={onClick}>{children}</div>
    },
    AnimatePresence: ({ children }) => <>{children}</>
}));

describe('Navigation', () => {
    it('renders navigation items correctly', () => {
        render(
            <Navigation
                activeSection="start"
                setActiveSection={() => {}}
                mobileMenuOpen={false}
                setMobileMenuOpen={() => {}}
                openWizard={() => {}}
            />
        );

        expect(screen.getByText('Startseite')).toBeDefined();
        expect(screen.getByText('Tanks & Kauf')).toBeDefined();
        expect(screen.getByText('Flüssiggas bestellen')).toBeDefined();
        expect(screen.getByText('Gewerbe')).toBeDefined();
        expect(screen.getByText('Service')).toBeDefined();
        expect(screen.getByText('Über Uns')).toBeDefined();
    });

    it('contains "Halboberirdische Tanks" in the menu', () => {
        render(
            <Navigation
                activeSection="start"
                setActiveSection={() => {}}
                mobileMenuOpen={false}
                setMobileMenuOpen={() => {}}
                openWizard={() => {}}
            />
        );

        // Since dropdown is hidden or conditional, we check if the label exists in the document structure
        // Note: The structure in Navigation.jsx has the text "Halboberirdische Tanks" in the JSX.
        // It might be hidden via CSS, but queryByText should find it if it's rendered in DOM.
        // However, looking at Navigation.jsx code, the desktop dropdown is rendered but hidden with CSS.
        // The mobile menu renders items conditionally.
        // Let's check for desktop presence.

        expect(screen.getByText('Halboberirdische Tanks')).toBeDefined();
    });

    it('applies solid styling on non-start pages', () => {
        const { container, rerender } = render(
            <Navigation
                activeSection="start"
                setActiveSection={() => {}}
                mobileMenuOpen={false}
                setMobileMenuOpen={() => {}}
                openWizard={() => {}}
            />
        );

        // On start page, not scrolled: bg-transparent
        // Note: glass-nav class is applied when effectiveScrolled is true.
        // effectiveScrolled = scrolled || activeSection !== 'start'
        // initial scrolled is false.

        const header = container.querySelector('header');
        expect(header.className).toContain('bg-transparent');

        rerender(
            <Navigation
                activeSection="tanks"
                setActiveSection={() => {}}
                mobileMenuOpen={false}
                setMobileMenuOpen={() => {}}
                openWizard={() => {}}
            />
        );

        // On other page: glass-nav (solid/scrolled style)
        expect(header.className).toContain('glass-nav');
    });
});
