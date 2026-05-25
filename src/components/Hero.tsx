import { useState, useCallback, lazy, Suspense } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const EntropyVisualization = lazy(() =>
  import('./EntropyVisualization').then((m) => ({
    default: m.EntropyVisualization,
  }))
);

interface DemoSignal {
  label: string;
  value: number;
  color: string;
}

const DEMO_SIGNALS: DemoSignal[] = [
  { label: 'CPU', value: 0.12, color: 'bg-emerald-400' },
  { label: 'I/O', value: 0.28, color: 'bg-amber-400' },
  { label: 'Net', value: 0.08, color: 'bg-emerald-400' },
  { label: 'Mem', value: 0.35, color: 'bg-amber-400' },
];

function computeDeterministicSignals(url: string): DemoSignal[] {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash + url.charCodeAt(i)) | 0;
  }
  return DEMO_SIGNALS.map((signal, idx) => {
    const seed = Math.abs(hash + idx * 17) % 100;
    const value = 0.05 + (seed / 100) * 0.40;
    const color = value < 0.25 ? 'bg-emerald-400' : value < 0.35 ? 'bg-amber-400' : 'bg-red-400';
    return { ...signal, value, color };
  });
}

function InlineDemoProbe() {
  const [probing, setProbing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [signals, setSignals] = useState<DemoSignal[] | null>(null);
  const [revealScore, setRevealScore] = useState(false);
  const { ref } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const handleTryDemo = useCallback(() => {
    if (probing) return;
    setProbing(true);
    setProgress(0);
    setRevealScore(false);
    setSignals(null);

    const computed = computeDeterministicSignals('demo.api/status');
    const duration = 2000;
    const startTime = performance.now();

    function animateProgress(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(Math.round(pct * 100));

      if (pct < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        setSignals(computed);
        setProbing(false);
        setTimeout(() => setRevealScore(true), 400);
      }
    }

    requestAnimationFrame(animateProgress);

    if (typeof window !== 'undefined' && window.aif?.track) {
      window.aif.track('hero_demo_probe', { source: 'hero_inline' });
    }
  }, [probing]);

  const avgEntropy = signals
    ? signals.reduce((sum, s) => sum + s.value, 0) / signals.length
    : 0;

  return (
    <div ref={ref} className="mt-10 pt-8 border-t border-neutral-200/60">
      <div
        className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 w-full max-w-sm"
        role="region"
        aria-label="Quick entropy demo"
      >
        {!probing && !signals && (
          <button
            type="button"
            onClick={handleTryDemo}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Run a Quick Demo Probe
          </button>
        )}

        {probing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="font-medium text-neutral-700">Probing demo endpoint…</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Demo probe progress"
              />
            </div>
          </div>
        )}

        {signals && !probing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-neutral-900">Probe Results</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Complete
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {signals.map((signal) => (
                <div key={signal.label} className="text-center">
                  <div className="text-[10px] text-neutral-500 mb-1">{signal.label}</div>
                  <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${signal.color}`}
                      style={{ width: `${Math.min(signal.value * 100 * 2, 100)}%` }}
                      role="progressbar"
                      aria-valuenow={Math.round(signal.value * 100)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${signal.label} entropy: ${Math.round(signal.value * 100)}%`}
                    />
                  </div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{signal.value.toFixed(2)}</div>
                </div>
              ))}
            </div>
            {revealScore && (
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                <span className="text-xs text-neutral-500">Avg entropy</span>
                <span className="text-sm font-semibold text-amber-600">{avgEntropy.toFixed(2)}</span>
              </div>
            )}
            <a
              href="#live-probe"
              className="block w-full text-center text-xs text-primary font-medium hover:underline"
            >
              Try a full probe with your own URL &rarr;
            </a>
          </div>
        )}
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
              Uncertainty-Aware Monitoring
            </div>

            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
              Why Green Dashboards Miss{' '}
              <span className="text-primary relative hero-heading-highlight">
                Real Incidents
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/30" viewBox="0 0 200 8" fill="none" aria-hidden="true">
                  <path d="M1 5.5C47 2 87 1 131 3.5C154 4.5 175 5.5 199 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed">
              Your dashboards show green. Then an incident hits. The{' '}
              <span className="font-semibold text-neutral-900">uncertainty hiding inside pass/fail metrics</span>{' '}
              is what green lights miss. Entropix measures it — so you catch
              degradation before it becomes an incident.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#live-probe"
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              >
                Try the Demo
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

            {/* Inline interactive demo probe — replaces social proof counter */}
            <InlineDemoProbe />
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
                <div className="text-xs text-primary font-medium">Click to probe</div>
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm border border-neutral-200">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
                <span className="text-xs text-neutral-600 font-medium">Analyzing 3 signals</span>
              </div>
            </div>
          </div>

          {/* Mobile entropy summary card */}
          <div className="flex lg:hidden justify-center mt-4">
            <div
              className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 w-full max-w-sm"
              role="region"
              aria-label="System entropy summary"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-neutral-900">System Entropy</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-success font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{ label: 'CPU', value: 0.12, color: 'bg-emerald-400' }, { label: 'I/O', value: 0.28, color: 'bg-amber-400' }, { label: 'Net', value: 0.08, color: 'bg-emerald-400' }].map((signal) => (
                  <div key={signal.label} className="text-center">
                    <div className="text-[10px] text-neutral-500 mb-1">{signal.label}</div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${signal.color}`}
                        style={{ width: `${Math.min(signal.value * 100 * 2, 100)}%` }}
                        role="progressbar"
                        aria-valuenow={Math.round(signal.value * 100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${signal.label} entropy: ${Math.round(signal.value * 100)}%`}
                      />
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
