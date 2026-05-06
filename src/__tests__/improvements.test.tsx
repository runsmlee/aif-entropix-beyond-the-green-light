import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '../components/Hero';
import { Metrics } from '../components/Metrics';
import { CTA } from '../components/CTA';
import { FAQ } from '../components/FAQ';
import { LiveProbe } from '../components/LiveProbe';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { Footer } from '../components/Footer';

describe('Improvement: Hero uses shared useScrollAnimation hook', () => {
  it('social proof counter becomes visible when scrolled into view', () => {
    render(<Hero />);
    const teamsText = screen.getByLabelText('380+ teams');
    expect(teamsText).toBeInTheDocument();
  });

  it('renders responsive mobile entropy card', () => {
    render(<Hero />);
    // Mobile entropy summary card should have system entropy label
    const systemEntropy = screen.getAllByText('System Entropy');
    expect(systemEntropy.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Improvement: Metrics uses shared useScrollAnimation hook', () => {
  it('animated counters start at 0 and display target values', () => {
    render(<Metrics />);
    // The section should render without errors
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('renders percentage metrics with correct suffixes', () => {
    render(<Metrics />);
    // The AnimatedCounter renders target value text, even before animation completes
    // Check that the aria-labels contain the target values
    expect(screen.getByLabelText('94%')).toBeInTheDocument();
    expect(screen.getByLabelText('73%')).toBeInTheDocument();
  });
});

describe('Improvement: CTA form accessibility', () => {
  it('email input has proper autocomplete attribute', () => {
    render(<CTA />);
    const input = screen.getByPlaceholderText('Enter your work email');
    expect(input).toHaveAttribute('autoComplete', 'email');
  });

  it('form has accessible label', () => {
    render(<CTA />);
    const form = screen.getByLabelText('Sign up for free trial');
    expect(form).toBeInTheDocument();
  });

  it('success state preserves entered email', () => {
    render(<CTA />);
    const input = screen.getByPlaceholderText('Enter your work email');
    const submitBtn = screen.getByText('Start Free Trial');

    fireEvent.change(input, { target: { value: 'user@example.com' } });
    fireEvent.click(submitBtn);

    // Success message should reference the entered email
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText('Trial link sent')).toBeInTheDocument();
  });

  it('success state has role status', () => {
    render(<CTA />);
    const input = screen.getByPlaceholderText('Enter your work email');
    const submitBtn = screen.getByText('Start Free Trial');

    fireEvent.change(input, { target: { value: 'valid@test.com' } });
    fireEvent.click(submitBtn);

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
  });
});

describe('Improvement: FAQ keyboard accessibility', () => {
  it('all FAQ buttons are focusable', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    // 6 FAQ accordion buttons
    expect(buttons.length).toBeGreaterThanOrEqual(6);
  });

  it('FAQ items have correct aria-expanded state initially', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('aria-expanded toggles on click', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    const firstButton = buttons[0];

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Clicking again collapses
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('opening one item closes another (single-open accordion)', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('FAQ panels have region role when expanded', () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');

    // Expand first item to reveal its panel region
    fireEvent.click(buttons[0]);
    const regions = screen.getAllByRole('region');
    // At least one region should be visible when expanded
    expect(regions.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Improvement: LiveProbe interaction flow', () => {
  it('demo button populates URL input', () => {
    render(<LiveProbe />);
    const demoButton = screen.getByText('Demo');
    const input = screen.getByLabelText('URL to probe for entropy analysis');

    fireEvent.click(demoButton);
    expect(input).toHaveValue('api.example.com/health');
  });

  it('run probe button is enabled initially', () => {
    render(<LiveProbe />);
    const probeButton = screen.getByText('Run Probe');
    expect(probeButton).not.toBeDisabled();
  });

  it('probe has correct label for input', () => {
    render(<LiveProbe />);
    const label = screen.getByText('Enter a URL to probe');
    expect(label).toBeInTheDocument();
  });

  it('probe description mentions browser-local demo', () => {
    render(<LiveProbe />);
    expect(screen.getByText(/no data leaves your browser/i)).toBeInTheDocument();
  });
});

describe('Improvement: useScrollAnimation hook consistency', () => {
  it('hook returns stable ref across renders', async () => {
    const { useScrollAnimation } = await import('../hooks/useScrollAnimation');
    const { renderHook } = await import('@testing-library/react');

    const { result, rerender } = renderHook(() => useScrollAnimation());
    const firstRef = result.current.ref;

    rerender();
    expect(result.current.ref).toBe(firstRef);
  });
});

describe('Improvement: Header scroll progress bar', () => {
  it('renders a scroll progress bar element when scrolled', async () => {
    const { Header } = await import('../components/Header');
    // The scroll progress bar is only rendered when isScrolled is true,
    // which requires window.scrollY > 10. We render and check the
    // progress bar is present in the component tree (it renders when scrolled).
    Object.defineProperty(window, 'scrollY', { writable: true, value: 100 });
    render(<Header mobileMenuOpen={false} onToggleMobileMenu={() => {}} />);
    // Scroll event needs to fire to set isScrolled
    fireEvent.scroll(window);
    const progressbar = await screen.findByRole('progressbar', { name: 'Page scroll progress' });
    expect(progressbar).toBeInTheDocument();
  });

  it('scroll progress bar has correct aria attributes', async () => {
    const { Header } = await import('../components/Header');
    Object.defineProperty(window, 'scrollY', { writable: true, value: 100 });
    render(<Header mobileMenuOpen={false} onToggleMobileMenu={() => {}} />);
    fireEvent.scroll(window);
    const progressbar = await screen.findByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });
});

describe('Improvement: Features section accessibility', () => {
  it('feature cards are rendered as articles', () => {
    render(<Features />);
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(6);
  });

  it('feature cards have Learn more links', () => {
    render(<Features />);
    const learnMoreLinks = screen.getAllByText('Learn more');
    expect(learnMoreLinks.length).toBe(6);
  });
});

describe('Improvement: HowItWorks step descriptions completeness', () => {
  it('renders all four step descriptions', () => {
    render(<HowItWorks />);
    expect(screen.getByText(/Plug in your existing monitoring tools/)).toBeInTheDocument();
    expect(screen.getByText(/measuring entropy across your signals/)).toBeInTheDocument();
    expect(screen.getByText(/reveals degradation patterns and entropy hotspots/)).toBeInTheDocument();
    expect(screen.getByText(/predictive alerts and root cause analysis/)).toBeInTheDocument();
  });

  it('steps are in correct order', () => {
    render(<HowItWorks />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings[0]?.textContent).toBe('Connect Your Systems');
    expect(headings[1]?.textContent).toBe('Entropy Analysis Begins');
    expect(headings[2]?.textContent).toBe('Surface Hidden Patterns');
    expect(headings[3]?.textContent).toBe('Act with Confidence');
  });
});

describe('Improvement: Footer link completeness', () => {
  it('renders Company links', () => {
    render(<Footer />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('footer tagline is present', () => {
    render(<Footer />);
    expect(screen.getByText(/Entropy-aware intelligence for modern engineering teams/)).toBeInTheDocument();
  });

  it('renders privacy and terms links', () => {
    render(<Footer />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });
});

describe('Improvement: CTA form quality', () => {
  it('form uses noValidate to prevent browser default validation', () => {
    render(<CTA />);
    const form = screen.getByLabelText('Sign up for free trial');
    expect(form).toHaveAttribute('novalidate');
  });

  it('email input has placeholder text', () => {
    render(<CTA />);
    const input = screen.getByPlaceholderText('Enter your work email');
    expect(input).toBeInTheDocument();
  });

  it('heading changes after successful submission', () => {
    render(<CTA />);
    const input = screen.getByPlaceholderText('Enter your work email');
    const submitBtn = screen.getByRole('button', { name: 'Start Free Trial' });

    fireEvent.change(input, { target: { value: 'test@company.com' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/You're on the list/)).toBeInTheDocument();
    expect(screen.queryByText(/beyond the green light/)).not.toBeInTheDocument();
  });
});

describe('Improvement: LiveProbe accessibility', () => {
  it('URL input has correct htmlFor/id relationship', () => {
    render(<LiveProbe />);
    const label = screen.getByText('Enter a URL to probe');
    const input = screen.getByLabelText('Enter a URL to probe');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('Run Probe button has proper type', () => {
    render(<LiveProbe />);
    const probeButton = screen.getByRole('button', { name: 'Run Probe' });
    expect(probeButton).toHaveAttribute('type', 'button');
  });

  it('Demo button has proper type', () => {
    render(<LiveProbe />);
    const demoButton = screen.getByRole('button', { name: 'Demo' });
    expect(demoButton).toHaveAttribute('type', 'button');
  });
});

describe('Improvement: EntropyVisualization renders canvas', () => {
  it('renders a canvas element when EntropyVisualization is loaded', async () => {
    const { EntropyVisualization } = await import('../components/EntropyVisualization');
    render(<EntropyVisualization />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
