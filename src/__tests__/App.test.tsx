import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
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

  it('renders navigation links', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
    expect(nav.querySelector('a[href="#features"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="#how-it-works"]')).toBeInTheDocument();
    expect(nav.querySelector('a[href="#metrics"]')).toBeInTheDocument();
  });
});
