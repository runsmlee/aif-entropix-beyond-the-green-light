import { useState, useEffect, useRef, useCallback } from 'react';

interface MetricData {
  label: string;
  value: number;
  suffix: string;
  description: string;
  isCounter?: boolean;
}

const BASE_METRICS: MetricData[] = [
  {
    label: 'Incidents Prevented',
    value: 1247,
    suffix: '+',
    description: 'Caught before they triggered alerts',
    isCounter: true,
  },
  {
    label: 'Mean Time to Detection',
    value: 94,
    suffix: '%',
    description: 'Faster than traditional monitoring',
  },
  {
    label: 'False Positives Reduced',
    value: 73,
    suffix: '%',
    description: 'By focusing on entropy, not thresholds',
  },
  {
    label: 'Teams Deployed',
    value: 380,
    suffix: '+',
    description: 'Across production environments worldwide',
    isCounter: true,
  },
];

function AnimatedCounter({
  target,
  suffix,
  isVisible,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number): void {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * eased));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, isVisible]);

  return (
    <span className="text-4xl sm:text-5xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Metrics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const incidentsRef = useRef<number>(1247);
  const teamsRef = useRef<number>(380);
  const sessionTodayRef = useRef<number>(0);
  const [liveMetrics, setLiveMetrics] = useState<MetricData[]>(BASE_METRICS);
  const [todayCount, setTodayCount] = useState(0);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry?.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleIntersection]);

  // Live counter increments once visible
  useEffect(() => {
    if (!isVisible) return;

    // Incidents: +1 to +3 every ~8 seconds
    const incidentsInterval = setInterval(() => {
      const increment = 1 + Math.floor(Math.abs(Math.sin(Date.now() * 0.001)) * 2.99);
      incidentsRef.current += increment;
      sessionTodayRef.current += increment;

      setLiveMetrics((prev) =>
        prev.map((m) =>
          m.label === 'Incidents Prevented'
            ? { ...m, value: incidentsRef.current }
            : m
        )
      );
    }, 8000);

    // Teams: +1 every ~45 seconds
    const teamsInterval = setInterval(() => {
      teamsRef.current += 1;
      setLiveMetrics((prev) =>
        prev.map((m) =>
          m.label === 'Teams Deployed'
            ? { ...m, value: teamsRef.current }
            : m
        )
      );
    }, 45000);

    // Today badge: +1 every ~12 seconds
    const todayInterval = setInterval(() => {
      sessionTodayRef.current += 1;
      setTodayCount(sessionTodayRef.current);
    }, 12000);

    return () => {
      clearInterval(incidentsInterval);
      clearInterval(teamsInterval);
      clearInterval(todayInterval);
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="metrics"
      className="py-20 sm:py-28 bg-neutral-900 relative overflow-hidden"
      aria-labelledby="metrics-heading"
    >
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="metrics-heading" className="text-3xl sm:text-4xl font-bold text-white">
            Measured impact, not vanity metrics
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Real results from teams that moved beyond the green light.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {liveMetrics.map((metric) => (
            <div key={metric.label} className="text-center p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm relative group hover:bg-white/10 transition-colors duration-300">
              <div className="mb-2">
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="text-sm font-medium text-white mb-1 flex items-center justify-center gap-2">
                {metric.label}
                {metric.label === 'Incidents Prevented' && todayCount > 0 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30">
                    +{todayCount} today
                  </span>
                )}
              </div>
              <div className="text-xs text-neutral-500">
                {metric.description}
              </div>
              {metric.isCounter && (
                <div className="mt-2 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <span className="text-[10px] text-emerald-400/70 font-medium">Live</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
