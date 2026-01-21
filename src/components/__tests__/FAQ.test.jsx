import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import FAQ from '../FAQ';

// Manual Mock for Lucide Icons
// The real lucide-react might cause issues in some test envs if not transformed,
// but usually it works. If not, we can mock it.
// The Navigation test mocks it, so we might as well to be safe and fast.
import * as LucideReact from 'lucide-react';
import { vi } from 'vitest';

vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    ChevronDown: (props) => <div data-testid="chevron-down" {...props} />,
  };
});

describe('FAQ Component', () => {
    it('renders default FAQs when no items provided', () => {
        render(<FAQ />);
        expect(screen.getByText('Häufig gestellte Fragen')).toBeDefined();
        // Check for the Gasflaschen question we added
        expect(screen.getByText('Bieten Sie auch Gasflaschen (Flaschengas) an?')).toBeDefined();
    });

    it('renders custom FAQs provided via items prop', () => {
        const customItems = [
            { question: 'Custom Q?', answer: 'Custom A.' }
        ];
        render(<FAQ items={customItems} />);
        expect(screen.getByText('Custom Q?')).toBeDefined();
        expect(screen.queryByText('Wie lange dauert die Lieferung?')).toBeNull();
    });

    it('opens answer on click', () => {
        render(<FAQ />);
        const question = screen.getByText('Bieten Sie auch Gasflaschen (Flaschengas) an?');
        fireEvent.click(question);
        // The answer should appear.
        // Note: Framer Motion might make this tricky if it animates opacity/height.
        // But usually the element is inserted into DOM.
        expect(screen.getByText(/Unser Kerngeschäft ist die Belieferung/)).toBeDefined();
    });

    it('DOES NOT inject schema script tag', () => {
        const { container } = render(<FAQ />);
        const script = container.querySelector('script[type="application/ld+json"]');
        expect(script).toBeNull();
    });
});
