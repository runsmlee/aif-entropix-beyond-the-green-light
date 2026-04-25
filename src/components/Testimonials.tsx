import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScenarioData {
  title: string;
  description: string;
  detectionTime: string;
  traditionalTime: string;
  pattern: 'rise' | 'oscillation' | 'anomaly';
}

const SCENARIOS: ScenarioData[] = [
  {
    title: 'Memory leak masking',
    description:
      'Gradual entropy rise in heap allocation metrics revealed a slow memory leak 4 hours before OOM crash.',
    detectionTime: '4 hours before failure',
    traditionalTime: 'At crash — no warning',
    pattern: 'rise',
  },
  {
    title: 'Flapping service',
    description:
      'High-frequency entropy oscillations in a microservice detected degraded behavior in 8 minutes, not hours.',
    detectionTime: '8 minutes',
    traditionalTime: '3+ hours',
    pattern: 'oscillation',
  },
  {
    title: 'Silent data corruption',
    description:
      'Entropy anomaly in database write patterns flagged corruption risk before any data loss occurred.',
    detectionTime: 'Before data loss',
    traditionalTime: 'After user reports',
    pattern: 'anomaly',
  },
];

function PatternIcon({ pattern }: { pattern: ScenarioData['pattern'] }) {
  if (pattern === 'rise') {
    return (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="2" y="22" width="6" height="8" rx="1" fill="#0EA5E9" opacity="0.4" />
        <rect x="10" y="16" width="6" height="14" rx="1" fill="#0EA5E9" opacity="0.6" />
        <rect x="18" y="10" width="6" height="20" rx="1" fill="#F59E0B" opacity="0.8" />
        <rect x="26" y="4" width="4" height="26" rx="1" fill="#EF4444" opacity="0.9" />
      </svg>
    );
  }
  if (pattern === 'oscillation') {
    return (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M2 16 C6 8, 10 24, 14 16 C18 8, 22 24, 26 16 C28 12, 30 20, 30 16"
          stroke="#0EA5E9"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }
  // anomaly
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M2 18 L8 18 L12 10 L16 24 L20 16 L24 18 L30 18"
        stroke="#0EA5E9"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="24" r="3" fill="#EF4444" opacity="0.8" />
    </svg>
  );
}

function ScenarioCard({ scenario }: { scenario: ScenarioData }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group bg-neutral-50 rounded-xl p-6 border border-neutral-200 transition-all duration-300 ease-out hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
          <PatternIcon pattern={scenario.pattern} />
        </div>
        <h3 className="text-base font-semibold text-neutral-900">{scenario.title}</h3>
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed mb-5">
        {scenario.description}
      </p>
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
            Entropix detection
          </div>
          <div className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            {scenario.detectionTime}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
            Traditional monitoring
          </div>
          <div className="text-sm font-semibold text-red-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />
            {scenario.traditionalTime}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 bg-gradient-to-b from-white to-neutral-50/50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              id="testimonials-heading"
              className="text-3xl sm:text-4xl font-bold text-neutral-900"
            >
              What entropy monitoring catches
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Real failure patterns that threshold-based alerts miss — until it&apos;s too late.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SCENARIOS.map((scenario) => (
            <ScenarioCard key={scenario.title} scenario={scenario} />
          ))}
        </div>
      </div>
    </section>
  );
}
