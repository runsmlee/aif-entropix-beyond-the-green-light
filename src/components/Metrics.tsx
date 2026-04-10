import { useState, useEffect, useRef, useCallback } from 'react';

interface MetricData {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

const METRICS: MetricData[] = [
  {
    label: 'Incidents Prevented',
    value: 1247,
    suffix: '+',
    description: 'Caught before they triggered alerts',
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

  return (
    <section
      ref={sectionRef}
      id="metrics"
      className="py-20 sm:py-28 bg-neutral-900"
      aria-labelledby="metrics-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="metrics-heading" className="text-3xl sm:text-4xl font-bold text-white">
            Measured impact, not vanity metrics
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Real results from teams that moved beyond the green light.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="mb-2">
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="text-sm font-medium text-white mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-neutral-500">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
