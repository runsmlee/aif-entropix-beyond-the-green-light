# Entropix — Beyond the Green Light

## Product Overview

**Entropix** is a SaaS landing page for an entropy-aware system monitoring product. It goes beyond simple pass/fail ("green light") metrics to detect hidden chaos and disorder in infrastructure signals using entropy analysis.

## Target Audience

Engineering teams and DevOps professionals responsible for system reliability, monitoring, and incident response.

## Value Proposition

Traditional monitoring checks if metrics are within thresholds — green or red. Entropix measures the disorder and unpredictability in system signals, surfacing hidden degradation patterns that threshold-based alerts miss entirely.

## Key Features (Landing Page Sections)

1. **Hero** — Primary value proposition with animated entropy visualization, social proof counter (380+ teams), trust signals
2. **Features** — Six core capabilities: Entropy Detection, Pattern Recognition, Predictive Alerts, Root Cause Analysis, System Visualization, Team Collaboration
3. **How It Works** — Four-step process: Connect → Analyze → Surface Patterns → Act
4. **Live Probe** — Interactive demo simulation with 8 probe points, deterministic scoring, health score gauge
5. **Metrics** — Animated statistics: incidents prevented, mean time to detection, false positives reduced, teams deployed
6. **Testimonials** — Three failure scenario cards comparing Entropix detection vs traditional monitoring
7. **FAQ** — Six accordion questions with full keyboard navigation (arrow keys, Home/End)
8. **CTA** — Email signup form with validation, success state, trust messaging
9. **Footer** — Product/Resources/Company links, social media, copyright

## Technical Architecture

- **React 19** with TypeScript (strict mode)
- **Vite 6** with code splitting (React lazy + Suspense for all sections)
- **Tailwind CSS v4** (theme-based configuration)
- **Vitest** + React Testing Library (85 tests across 15 test files)
- **Accessibility**: WCAG 2.1 AA — skip link, ARIA attributes, keyboard navigation, focus trapping, reduced-motion support

## Design Tokens

| Token | Value |
|---|---|
| Primary Color | #EF4444 (red) |
| Primary Dark | #DC2626 |
| Primary Light | #F87171 |
| Typography | System font stack |
| Spacing | 4px base grid |
| Tone | Professional |

## Performance Budget

- Initial JS bundle: <200KB (main entry ~193KB, React vendor ~12KB separate chunk)
- CSS: ~47KB (Tailwind utility classes)
- All sections lazy-loaded except Header
- Error boundaries + Suspense fallbacks for resilience
