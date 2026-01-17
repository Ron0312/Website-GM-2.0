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
    Flame: () => <div data-testid="flame-icon" />,
    BookOpen: () => <div data-testid="book-open-icon" />,
    Trash2: () => <div data-testid="trash-icon" />,
    ArrowUpFromLine: () => <div data-testid="arrow-up-icon" />,
    ArrowDownToLine: () => <div data-testid="arrow-down-icon" />,
    Divide: () => <div data-testid="divide-icon" />,
    Calculator: () => <div data-testid="calculator-icon" />
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
        // Renamed label check
        expect(screen.getByText('Flüssiggastanks')).toBeDefined();
        expect(screen.getByText('Flüssiggas bestellen')).toBeDefined();
        expect(screen.getByText('Gewerbe')).toBeDefined();
        expect(screen.getByText('Service')).toBeDefined();
        expect(screen.getByText('Über Uns')).toBeDefined();
    });

    it('contains "Halboberirdisch" (Category) in the menu', () => {
        render(
            <Navigation
                activeSection="start"
                setActiveSection={() => {}}
                mobileMenuOpen={false}
                setMobileMenuOpen={() => {}}
                openWizard={() => {}}
            />
        );

        expect(screen.getByText('Halboberirdisch')).toBeDefined();
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

        const header = container.querySelector('header');
        expect(header.className).toContain('bg-transparent');

        rerender(
            <Navigation
                activeSection="kontakt"
                setActiveSection={() => {}}
                mobileMenuOpen={false}
                setMobileMenuOpen={() => {}}
                openWizard={() => {}}
            />
        );

        expect(header.className).toContain('glass-nav');
    });
});
