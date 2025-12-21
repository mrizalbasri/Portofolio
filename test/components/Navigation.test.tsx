import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navigation from '@/components/Navigation';

// Mock Framer Motion useScroll
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useScroll: () => ({
      scrollY: {
        on: vi.fn(),
      },
    }),
  };
});

describe('Navigation Component', () => {
  it('renders all navigation links', () => {
    render(<Navigation />);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('opens and closes mobile menu', () => {
    // Set window width to mobile
    global.innerWidth = 500;
    render(<Navigation />);
    
    // Find the mobile menu button (it's the one with md:hidden)
    const menuButtons = screen.getAllByLabelText(/Open Menu/i);
    const mobileMenuButton = menuButtons.find(btn => btn.className.includes('md:hidden'));
    
    if (!mobileMenuButton) throw new Error('Mobile menu button not found');
    
    fireEvent.click(mobileMenuButton);
    
    // Check if side panel items are visible
    // Multiple instances of 'Home' will exist (desktop links + side panel link)
    expect(screen.getAllByText('Home').length).toBeGreaterThan(2);
    
    // Side panel has its own close button
    const closeButtons = screen.getAllByLabelText(/Close Menu/i);
    const sidePanelCloseButton = closeButtons.find(btn => btn.className.includes('absolute top-6 right-6'));
    
    if (!sidePanelCloseButton) throw new Error('Side panel close button not found');
    
    fireEvent.click(sidePanelCloseButton);
    
    // Side panel should be removed, button should say Open Menu again
    expect(screen.getAllByLabelText(/Open Menu/i).length).toBeGreaterThan(0);
  });
});
