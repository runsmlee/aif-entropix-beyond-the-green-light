# Entropix — Test Specification

## Overview

This document describes the test requirements for the Entropix landing page MVP. Tests verify rendering, accessibility, interaction, and animation behavior across all components.

## Test Files

### 1. App.test.tsx
| Test | Description |
|---|---|
| renders the main heading | App renders an H1 with "Beyond the" text |
| renders skip to content link | Skip link exists for keyboard navigation |
| has main landmark | `<main id="main-content">` is present |
| renders nav links | All navigation links are rendered |
| renders footer copyright | Footer contains dynamic year copyright |
| renders all section IDs | All required section IDs exist (#features, #how-it-works, etc.) |

### 2. Header.test.tsx
| Test | Description |
|---|---|
| renders brand name | "Entropix" text is visible |
| brand links to home | Brand link has href="/" |
| renders navigation items | All 5 nav items are present |
| renders CTA button | "Get Started" button exists |
| has correct aria attributes | aria-label, aria-expanded, aria-controls present |
| has mobile menu toggle | Toggle button renders with correct aria |
| closes mobile menu on Escape | Escape key closes mobile menu |
| has scroll progress bar | Progress bar renders when scrolled |

### 3. Hero.test.tsx
| Test | Description |
|---|---|
| renders the hero heading | H1 contains "Beyond the" |
| renders CTA buttons | "Start Free Trial" and "See How It Works" buttons |
| renders trust signals | "No credit card required", "14-day trial", "Cancel anytime" |
| renders social proof counter | "Joined this month" text visible |
| renders heat map labels | "Entropy Heat Map" and "Live simulation" on desktop |
| renders badge text | "Next-Generation Intelligence" badge |
| renders analyzing indicator | "Analyzing 3 signals" status |

### 4. Features.test.tsx
| Test | Description |
|---|---|
| renders section heading | "Intelligence that sees what dashboards can't" |
| renders all 6 feature cards | All feature titles visible |
| renders descriptions | All feature descriptions present |

### 5. HowItWorks.test.tsx
| Test | Description |
|---|---|
| renders heading | "From green lights to genuine insight" |
| renders 4 step titles | All step titles visible |
| renders descriptions | All step descriptions visible |
| renders step numbers | Step numbers 1-4 visible |
| has section id | #how-it-works attribute present |

### 6. LiveProbe.test.tsx
| Test | Description |
|---|---|
| renders heading | "Try entropy analysis" |
| renders URL input | Input field present with correct aria-label |
| renders buttons | "Demo" and "Run Probe" buttons present |
| renders disclaimer | Demo simulation disclaimer visible |
| renders description | Section description about browser-local demo |
| has aria-live region | Screen reader announcements present |
| has correct label | "Enter a URL to probe" label |

### 7. Metrics.test.tsx
| Test | Description |
|---|---|
| renders heading | "Measured impact, not vanity metrics" |
| renders all labels | All 4 metric labels visible |
| renders descriptions | All metric descriptions visible |
| renders live indicators | "Live" badges on counter metrics |
| has section id | #metrics attribute present |

### 8. Testimonials.test.tsx
| Test | Description |
|---|---|
| renders heading | "What entropy monitoring catches" |
| renders scenario titles | 3 scenario cards visible |
| renders detection times | Entropix detection times visible |
| renders traditional times | Traditional monitoring times visible |
| renders descriptions | All scenario descriptions visible |
| has section id | #testimonials attribute present |

### 9. FAQ.test.tsx
| Test | Description |
|---|---|
| renders heading | "Common questions, clear answers" |
| renders all questions | All 6 FAQ questions visible |
| expands/collapses items | Clicking toggles answer visibility |
| single-open behavior | Opening one closes another |
| arrow key navigation | ArrowDown/ArrowUp cycle through items |
| Home/End keys | Home jumps to first, End to last |

### 10. CTA.test.tsx
| Test | Description |
|---|---|
| renders heading | "Ready to look beyond the green light?" |
| renders email input | Input with correct attributes |
| renders submit button | "Start Free Trial" button |
| renders trust message | "Free 14-day trial" text |
| has section id | #cta attribute present |
| shows success state | Checkmark and confirmation after submit |
| rejects empty email | Error on empty submit |
| rejects invalid email | Error on invalid format |
| rejects whitespace-only | Error on whitespace-only input |
| validates on blur | Error appears on blur with invalid input |
| clears error on correction | Error disappears when typing valid email |
| has aria-invalid | aria-invalid attribute on error |

### 11. Footer.test.tsx
| Test | Description |
|---|---|
| renders brand | "Entropix" brand text |
| renders link groups | Product, Resources, Company groups |
| renders Product links | Features, How It Works, Pricing, Changelog |
| renders Resource links | Documentation, API Reference, Blog, Community |
| renders social icons | Twitter, GitHub, LinkedIn SVG icons |
| renders copyright | Dynamic year copyright text |
| has contentinfo role | role="contentinfo" on footer |

### 12. ErrorBoundary.test.tsx
| Test | Description |
|---|---|
| renders children normally | Children render when no error |
| renders default fallback | Fallback message on error |
| renders custom fallback | Custom fallback when provided |

### 13. ScrollToTop.test.tsx
| Test | Description |
|---|---|
| renders button | Button element present |
| hidden at top | Not visible when page at top |
| scrolls to top on click | Click triggers scroll to top |

### 14. useScrollAnimation.test.tsx
| Test | Description |
|---|---|
| returns ref/isVisible/prefersReduced | Hook returns correct shape |
| starts with false | Initial isVisible is false |
| respects reduced motion | prefersReduced tracks media query |
| accepts options | Custom threshold/rootMargin/triggerOnce |

### 15. useActiveSection.test.tsx
| Test | Description |
|---|---|
| returns null when no section | Returns null without intersecting elements |
