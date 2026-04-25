import { useState, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';

const Hero = lazy(() =>
  import('./components/Hero').then((m) => ({ default: m.Hero }))
);

const ScrollToTop = lazy(() =>
  import('./components/ScrollToTop').then((m) => ({ default: m.ScrollToTop }))
);

const Features = lazy(() =>
  import('./components/Features').then((m) => ({ default: m.Features }))
);
const HowItWorks = lazy(() =>
  import('./components/HowItWorks').then((m) => ({ default: m.HowItWorks }))
);
const LiveProbe = lazy(() =>
  import('./components/LiveProbe').then((m) => ({ default: m.LiveProbe }))
);
const Metrics = lazy(() =>
  import('./components/Metrics').then((m) => ({ default: m.Metrics }))
);
const Testimonials = lazy(() =>
  import('./components/Testimonials').then((m) => ({
    default: m.Testimonials,
  }))
);
const FAQ = lazy(() =>
  import('./components/FAQ').then((m) => ({ default: m.FAQ }))
);
const CTA = lazy(() =>
  import('./components/CTA').then((m) => ({ default: m.CTA }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);

function SectionSkeleton() {
  return (
    <div className="animate-pulse py-20 sm:py-28" aria-hidden="true">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-neutral-200 rounded-lg max-w-md mx-auto mb-4" />
        <div className="h-5 bg-neutral-200 rounded-lg max-w-lg mx-auto mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 bg-neutral-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionErrorFallback() {
  return (
    <div className="py-12 text-center" role="alert">
      <svg className="w-10 h-10 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p className="text-neutral-500 text-sm">This section failed to load. Please refresh the page.</p>
    </div>
  );
}

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to main content
      </a>
      <Header
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev: boolean) => !prev)}
      />
      <main id="main-content">
        <ErrorBoundary fallback={<SectionErrorFallback />}>
          <Suspense fallback={<SectionSkeleton />}>
            <Hero />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<SectionErrorFallback />}>
          <Suspense fallback={<SectionSkeleton />}>
            <Features />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<SectionErrorFallback />}>
          <Suspense fallback={<SectionSkeleton />}>
            <HowItWorks />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<SectionErrorFallback />}>
          <Suspense fallback={<SectionSkeleton />}>
            <LiveProbe />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<SectionErrorFallback />}>
          <Suspense fallback={<SectionSkeleton />}>
            <Metrics />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<SectionErrorFallback />}>
          <Suspense fallback={<SectionSkeleton />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<SectionErrorFallback />}>
          <Suspense fallback={<SectionSkeleton />}>
            <FAQ />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary fallback={<SectionErrorFallback />}>
          <Suspense fallback={<SectionSkeleton />}>
            <CTA />
          </Suspense>
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Suspense fallback={<div className="h-32" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
