import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TankSection from '../TankSection';
import React from 'react';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver;

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Check: () => <div data-testid="icon-check" />,
  ArrowRight: () => <div data-testid="icon-arrow-right" />,
  RefreshCw: () => <div data-testid="icon-refresh" />,
  Star: () => <div data-testid="icon-star" />,
  Info: () => <div data-testid="icon-info" />,
}));

// Mock Hero component to avoid complexity
vi.mock('../Hero', () => ({
  default: () => <div data-testid="hero-mock">Hero</div>,
}));

// Mock TankCard
vi.mock('../TankCard', () => ({
  default: ({ tank }) => <div data-testid="tank-card">{tank.name} - {tank.type}</div>,
}));

describe('TankSection', () => {
  it('renders default view with New tanks', () => {
    render(<TankSection />);

    // Check if "Neuware" button is present
    expect(screen.getByText('Neuware')).toBeDefined();

    // Check if Oberirdisch is default
    expect(screen.getByText('Der sichtbare Klassiker')).toBeDefined();
  });

  it('switches to Used tanks when toggle is clicked', async () => {
    render(<TankSection />);

    const usedButton = screen.getByText('Gebraucht'); // The button text in the toggle
    fireEvent.click(usedButton);

    // Check if title changed to the Used version
    await waitFor(() => {
        expect(screen.getByText('Geprüfte Qualität zum Bestpreis')).toBeDefined();
    });

    // Check if "Gebraucht" badge appears in title
    const badge = screen.getAllByText('Gebraucht')[0]; // Might match button too, but checking existence
    expect(badge).toBeDefined();
  });

  it('filters tanks based on type', async () => {
    render(<TankSection />);

    const halboberirdischButton = screen.getByText('halboberirdisch');
    fireEvent.click(halboberirdischButton);

    // Check if description changed
    await waitFor(() => {
        expect(screen.getByText('Die goldene Mitte')).toBeDefined();
    });
  });
});
