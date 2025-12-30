import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Hero from '../Hero';

describe('Hero Component', () => {
    it('renders title and subtitle', () => {
        render(<Hero title="Test Title" subtitle="Test Subtitle" />);
        expect(screen.getByText('Test Title')).toBeDefined();
        expect(screen.getByText('Test Subtitle')).toBeDefined();
    });

    it('renders badge text when provided', () => {
        render(<Hero badgeText="Test Badge" />);
        expect(screen.getByText('Test Badge')).toBeDefined();
    });

    it('renders children content in the second column', () => {
        render(
            <Hero title="Test Title">
                <div data-testid="custom-child">Custom Content</div>
            </Hero>
        );
        expect(screen.getByTestId('custom-child')).toBeDefined();
        expect(screen.getByText('Custom Content')).toBeDefined();
    });
});
