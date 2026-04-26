import { lazy, Suspense, useState, useEffect, useRef } from 'react';

const EntropyVisualization = lazy(() =>
  import('./EntropyVisualization').then((m) => ({
    default: m.EntropyVisualization,
  }))
);

function SocialProofCounter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const targetCount = 380;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const startTime = performance.now();

    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(targetCount * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [isVisible]);

  return (
    <div ref={ref} className="mt-10 pt-8 border-t border-neutral-200/60">
      <div className="flex items-center justify-start gap-6 text-sm text-neutral-500">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2" aria-hidden="true">
            {['bg-primary', 'bg-sky-500', 'bg-amber-500', 'bg-emerald-500'].map((color, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${color} ring-2 ring-white flex items-center justify-center text-white text-[10px] font-bold`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="text-neutral-700 font-semibold" aria-label={`${targetCount}+ teams`}>
            {count}+ teams
          </span>
        </div>
        <span className="text-neutral-300" aria-hidden="true">|</span>
        <span>Joined this month</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 ring-1 ring-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              Next-Generation Intelligence
            </div>

            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
              Beyond the{' '}
              <span className="text-primary relative">
                Green Light
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/30" viewBox="0 0 200 8" fill="none" aria-hidden="true">
                  <path d="M1 5.5C47 2 87 1 131 3.5C154 4.5 175 5.5 199 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed">
              Stop trusting surface-level metrics. Entropix reveals the hidden chaos
              in your systems through entropy-aware intelligence that goes deeper than
              pass/fail indicators.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#cta"
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              >
                Start Free Trial
                <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <svg className="mr-2 w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                See How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                14-day trial
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </div>
            </div>

            {/* Social proof */}
            <SocialProofCounter />
          </div>

          {/* Animated entropy visualization — desktop */}
          <div className="hidden lg:flex justify-center">
            <div className="relative pt-8 pb-12">
              <Suspense fallback={<div className="w-[200px] h-[200px] rounded-xl bg-neutral-100 animate-pulse" aria-hidden="true" />}>
                <EntropyVisualization />
              </Suspense>
              {/* Floating label */}
              <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md border border-neutral-200">
                <div className="text-xs font-medium text-neutral-900">Entropy Heat Map</div>
                <div className="text-xs text-neutral-500">Live simulation</div>
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm border border-neutral-200">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
                <span className="text-xs text-neutral-600 font-medium">Analyzing 3 signals</span>
              </div>
            </div>
          </div>

          {/* Mobile entropy summary card */}
          <div className="flex lg:hidden justify-center mt-4" aria-hidden="true">
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 w-full max-w-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-neutral-900">System Entropy</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-success font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{ label: 'CPU', value: 0.12, color: 'bg-emerald-400' }, { label: 'I/O', value: 0.28, color: 'bg-amber-400' }, { label: 'Net', value: 0.08, color: 'bg-emerald-400' }].map((signal) => (
                  <div key={signal.label} className="text-center">
                    <div className="text-[10px] text-neutral-500 mb-1">{signal.label}</div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${signal.color}`} style={{ width: `${Math.min(signal.value * 100 * 2, 100)}%` }} />
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{signal.value.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
