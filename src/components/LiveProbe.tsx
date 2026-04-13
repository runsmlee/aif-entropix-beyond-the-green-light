import { useState, useRef, useCallback, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ProbePoint {
  label: string;
  category: string;
  delay: number;
}

const PROBE_POINTS: ProbePoint[] = [
  { label: 'CPU Entropy', category: 'cpu', delay: 0 },
  { label: 'I/O Entropy', category: 'io', delay: 375 },
  { label: 'Request Variance', category: 'network', delay: 750 },
  { label: 'Memory Pressure', category: 'memory', delay: 1125 },
  { label: 'Latency Distribution', category: 'network', delay: 1500 },
  { label: 'Error Rate Entropy', category: 'errors', delay: 1875 },
  { label: 'Queue Depth Variance', category: 'io', delay: 2250 },
  { label: 'Connection Pool Entropy', category: 'network', delay: 2625 },
];

type ProbeStatus = 'idle' | 'measuring' | 'complete';

interface ProbeResult {
  status: ProbeStatus;
  progress: number;
  value: number;
  severity: 'low' | 'moderate' | 'high';
}

function getDeterministicScore(label: string, url: string): { value: number; severity: 'low' | 'moderate' | 'high' } {
  // Deterministic scoring based on label + url hash (no Math.random)
  let hash = 0;
  const input = label + url;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }
  // Map hash to score range 0.05-0.45 (mostly green with a few amber)
  const normalized = (Math.abs(hash) % 100) / 100;
  const value = 0.05 + normalized * 0.40;

  let severity: 'low' | 'moderate' | 'high';
  if (value < 0.25) severity = 'low';
  else if (value < 0.38) severity = 'moderate';
  else severity = 'high';

  return { value, severity };
}

function computeHealthScore(results: Map<string, number>): number {
  if (results.size === 0) return 0;
  let total = 0;
  results.forEach((v) => { total += v; });
  const avgEntropy = total / results.size;
  // Lower entropy = higher health score
  const health = 100 - avgEntropy * 100;
  // Clamp to 85-95 range for demo
  return Math.max(85, Math.min(95, Math.round(health)));
}

function SeverityBadge({ severity }: { severity: ProbeResult['severity'] }) {
  const config = {
    low: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Low' },
    moderate: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Moderate' },
    high: { bg: 'bg-red-100', text: 'text-red-700', label: 'High' },
  };
  const c = config[severity];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

export function LiveProbe() {
  const { ref, isVisible } = useScrollAnimation();
  const [url, setUrl] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [probeResults, setProbeResults] = useState<Map<string, ProbeResult>>(new Map());
  const [healthScore, setHealthScore] = useState<number | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const mountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
      intervalsRef.current.forEach((i) => clearInterval(i));
      intervalsRef.current = [];
    };
  }, []);

  const handleDemo = useCallback(() => {
    setUrl('api.example.com/health');
  }, []);

  const handleProbe = useCallback(() => {
    const targetUrl = url.trim() || 'api.example.com/health';
    setUrl(targetUrl);
    setIsRunning(true);
    setIsComplete(false);
    setHealthScore(null);

    // Clear previous timers and intervals
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    intervalsRef.current.forEach((i) => clearInterval(i));
    intervalsRef.current = [];

    const initialResults = new Map<string, ProbeResult>();
    const completedValues = new Map<string, number>();

    PROBE_POINTS.forEach((point) => {
      initialResults.set(point.label, { status: 'idle', progress: 0, value: 0, severity: 'low' });
    });
    setProbeResults(initialResults);

    // Start each probe with staggered delays
    PROBE_POINTS.forEach((point) => {
      // Start measuring
      const startTimer = setTimeout(() => {
        if (!mountedRef.current) return;

        setProbeResults((prev) => {
          const next = new Map(prev);
          next.set(point.label, { status: 'measuring', progress: 0, value: 0, severity: 'low' });
          return next;
        });

        // Animate progress over 3 seconds
        const progressInterval = setInterval(() => {
          if (!mountedRef.current) return;
          setProbeResults((prev) => {
            const current = prev.get(point.label);
            if (!current || current.status !== 'measuring') return prev;
            const next = new Map(prev);
            const newProgress = Math.min(current.progress + 3.33, 100);
            next.set(point.label, { ...current, progress: newProgress });
            return next;
          });
        }, 100);
        intervalsRef.current.push(progressInterval);

        // Complete after 3 seconds
        const completeTimer = setTimeout(() => {
          clearInterval(progressInterval);
          if (!mountedRef.current) return;

          const { value, severity } = getDeterministicScore(point.label, targetUrl);
          completedValues.set(point.label, value);

          setProbeResults((prev) => {
            const next = new Map(prev);
            next.set(point.label, { status: 'complete', progress: 100, value, severity });
            return next;
          });

          // Check if all done
          if (completedValues.size === PROBE_POINTS.length) {
            const score = computeHealthScore(completedValues);
            setHealthScore(score);
            setIsRunning(false);
            setIsComplete(true);
          }
        }, 3000);

        timersRef.current.push(completeTimer);
      }, point.delay);

      timersRef.current.push(startTimer);
    });
  }, [url]);

  return (
    <section
      className="py-20 sm:py-28 bg-white"
      aria-labelledby="live-probe-heading"
    >
      {/* Screen reader announcement for probe status */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isRunning && 'Entropy probe is running...'}
        {isComplete && healthScore !== null && `Probe complete. System health score: ${healthScore} out of 100.`}
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2
              id="live-probe-heading"
              className="text-3xl sm:text-4xl font-bold text-neutral-900"
            >
              Try entropy analysis
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              See how entropy probing works on any endpoint. This is a demo simulation — no data leaves your browser.
            </p>
          </div>

          {/* Input area */}
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 mb-8">
            <label htmlFor="probe-url" className="block text-sm font-medium text-neutral-700 mb-2">
              Enter a URL to probe
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="probe-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="api.example.com/health"
                disabled={isRunning}
                className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:bg-neutral-100"
                aria-label="URL to probe for entropy analysis"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDemo}
                  disabled={isRunning}
                  className="px-4 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Demo
                </button>
                <button
                  type="button"
                  onClick={handleProbe}
                  disabled={isRunning}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {isRunning ? 'Probing...' : 'Run Probe'}
                </button>
              </div>
            </div>
          </div>

          {/* Results grid */}
          {(probeResults.size > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {PROBE_POINTS.map((point) => {
                const result = probeResults.get(point.label);
                if (!result) return null;
                return (
                  <div
                    key={point.label}
                    className="bg-white rounded-lg border border-neutral-200 p-4 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-900">{point.label}</span>
                      {result.status === 'complete' && <SeverityBadge severity={result.severity} />}
                      {result.status === 'measuring' && (
                        <span className="text-[11px] text-primary font-medium animate-pulse">Measuring...</span>
                      )}
                      {result.status === 'idle' && (
                        <span className="text-[11px] text-neutral-400">Waiting</span>
                      )}
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-200 ease-out ${
                          result.status === 'complete'
                            ? result.severity === 'low'
                              ? 'bg-emerald-500'
                              : result.severity === 'moderate'
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            : result.status === 'measuring'
                              ? 'bg-primary'
                              : 'bg-neutral-200'
                        }`}
                        style={{ width: `${result.progress}%` }}
                        role="progressbar"
                        aria-valuenow={result.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${point.label} progress`}
                      />
                    </div>
                    {result.status === 'complete' && (
                      <div className="mt-2 text-xs text-neutral-500">
                        Entropy score: {result.value.toFixed(3)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Health Score */}
          {isComplete && healthScore !== null && (
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6 text-center">
              <div className="text-xs uppercase tracking-wider text-primary/70 font-medium mb-2">
                System Health Score
              </div>
              <div className="text-5xl font-bold text-primary mb-2">{healthScore}</div>
              <div className="text-sm text-neutral-600">
                Based on 8 entropy probe measurements
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-xs text-neutral-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Demo Simulation — scores are illustrative
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
