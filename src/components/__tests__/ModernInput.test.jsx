import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModernInput from '../ui/ModernInput';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
    Check: () => <div data-testid="check-icon" />,
    X: () => <div data-testid="x-icon" />,
    AlertCircle: () => <div data-testid="alert-icon" />
}));

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, onClick }) => <div className={className} onClick={onClick}>{children}</div>
    },
    AnimatePresence: ({ children }) => <>{children}</>
}));

describe('ModernInput', () => {
    it('clears input when clicking the error X icon', () => {
        const handleChange = vi.fn();
        const { container } = render(
            <ModernInput
                name="test-input"
                label="Test Input"
                value="Invalid Value"
                error="Invalid format"
                onChange={handleChange}
            />
        );

        // Check if error message is displayed
        expect(screen.getByText('Invalid format')).toBeDefined();

        // Check if X icon is present
        const xIcon = screen.getByTestId('x-icon');
        expect(xIcon).toBeDefined();

        // Find the wrapper that has the click handler (motion.div around X)
        // It's the parent of the icon.
        const errorContainer = xIcon.closest('div');
        fireEvent.click(errorContainer);

        // Check if onChange was called with empty value
        expect(handleChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    name: 'test-input',
                    value: ''
                })
            })
        );
    });

    it('does not show X icon when there is no error', () => {
        render(
            <ModernInput
                name="test-input"
                label="Test Input"
                value="Valid Value"
                error="" // No error
                onChange={() => {}}
            />
        );

        const xIcon = screen.queryByTestId('x-icon');
        expect(xIcon).toBeNull();
    });
});
