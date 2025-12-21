import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Contact from '@/components/Contact';

// Mock fetch for API call
global.fetch = vi.fn();

describe('Contact Component', () => {
  it('renders correctly', () => {
    render(<Contact />);
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/^Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Message/i), { target: { value: 'Hello!' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello!',
      }),
    }));
  });

  it('shows error message on failure', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('API Error'));

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/^Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Message/i), { target: { value: 'Hello!' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Failed to send message/i)).toBeInTheDocument();
    });
  });
});
