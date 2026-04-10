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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white" aria-labelledby="how-it-works-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900">
            From green lights to genuine insight
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Four steps to transform how your team understands system health.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-0.5 bg-neutral-200" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
