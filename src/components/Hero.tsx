export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            Next-Generation Intelligence
          </div>

          <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
            Beyond the{' '}
            <span className="text-primary">Green Light</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl">
            Stop trusting surface-level metrics. Entropix reveals the hidden chaos
            in your systems through entropy-aware intelligence that goes deeper than
            pass/fail indicators.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#cta"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Start Free Trial
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-neutral-500">
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
        </div>
      </div>
    </section>
  );
}
