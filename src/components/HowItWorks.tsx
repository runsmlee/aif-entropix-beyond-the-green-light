import { useScrollAnimation } from '../hooks/useScrollAnimation';

const STEPS = [
  {
    step: 1,
    title: 'Connect Your Systems',
    description:
      'Plug in your existing monitoring tools, logs, and data streams. Entropix integrates with your stack in minutes, not days.',
  },
  {
    step: 2,
    title: 'Entropy Analysis Begins',
    description:
      'Our engine immediately starts measuring entropy across your signals — not just whether things pass, but how disorderly they are.',
  },
  {
    step: 3,
    title: 'Surface Hidden Patterns',
    description:
      'Within hours, Entropix reveals degradation patterns and entropy hotspots that traditional monitoring completely misses.',
  },
  {
    step: 4,
    title: 'Act with Confidence',
    description:
      'Get predictive alerts and root cause analysis. Fix problems before they become incidents, not after.',
  },
] as const;

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`relative text-center transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative z-10 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg shadow-primary/25 ring-4 ring-white">
        {step.step}
        {index === 0 && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-success rounded-full border-2 border-white" aria-hidden="true" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
        {step.title}
      </h3>
      <p className="text-sm text-neutral-600 leading-relaxed max-w-xs mx-auto">
        {step.description}
      </p>
    </div>
  );
}

export function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white" aria-labelledby="how-it-works-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900">
            From green lights to genuine insight
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Four steps to transform how your team understands system health.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, index) => (
              <StepCard key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
