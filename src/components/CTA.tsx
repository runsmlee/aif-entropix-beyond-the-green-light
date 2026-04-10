export function CTA() {
  return (
    <section id="cta" className="py-20 sm:py-28 bg-white" aria-labelledby="cta-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-neutral-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" aria-hidden="true" />
          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 text-center">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto"
            >
              Ready to look beyond the green light?
            </h2>
            <p className="mt-4 text-lg text-neutral-300 max-w-xl mx-auto">
              Join hundreds of engineering teams who trust entropy-aware intelligence
              over surface-level status indicators.
            </p>

            <form
              className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              aria-label="Sign up for free trial"
            >
              <label htmlFor="email-input" className="sr-only">
                Email address
              </label>
              <input
                id="email-input"
                type="email"
                placeholder="Enter your work email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-900 whitespace-nowrap"
              >
                Start Free Trial
              </button>
            </form>

            <p className="mt-4 text-xs text-neutral-500">
              Free 14-day trial. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
