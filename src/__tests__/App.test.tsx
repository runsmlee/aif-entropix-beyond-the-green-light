import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../App';

describe('App', () => {
  it('renders the main heading', async () => {
    render(<App />);
    const heading = await screen.findByRole('heading', { level: 1 }, { timeout: 5000 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Beyond the');
    expect(heading.textContent).toContain('Green Light');
  });

  it('renders the skip to content link', () => {
    render(<App />);
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
  });

  it('renders the main content area', () => {
    render(<App />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('renders navigation links', async () => {
    render(<App />);
    const nav = await screen.findByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
    expect(nav.querySelector('a[href="#features"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="#how-it-works"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="#metrics"]')).toBeInTheDocument();
  });

  it('renders the footer with copyright', async () => {
    render(<App />);
    const year = new Date().getFullYear();
    const footers = await screen.findAllByText(
      (_, element) => element?.textContent === `© ${year} Entropix. All rights reserved.`,
      undefined,
      { timeout: 3000 }
    );
    expect(footers.length).toBeGreaterThan(0);
  });

  it('renders all major sections after loading', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
    const main = screen.getByRole('main');
    expect(main.querySelector('#features')).toBeInTheDocument();
    expect(main.querySelector('#how-it-works')).toBeInTheDocument();
    expect(main.querySelector('#metrics')).toBeInTheDocument();
    expect(main.querySelector('#testimonials')).toBeInTheDocument();
    expect(main.querySelector('#faq')).toBeInTheDocument();
  });
});
