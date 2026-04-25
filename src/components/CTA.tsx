import { useState, useCallback } from 'react';

export function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }, [email]);

  return (
    <section id="cta" className="py-20 sm:py-28 bg-white" aria-labelledby="cta-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-neutral-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" aria-hidden="true" />
          {/* Decorative dots */}
          <div className="absolute top-6 right-6 w-24 h-24 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '8px 8px' }} aria-hidden="true" />
          <div className="absolute bottom-6 left-6 w-16 h-16 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '8px 8px' }} aria-hidden="true" />
          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 text-center">
            {submitted ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-scale-in" aria-hidden="true">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2
                  id="cta-heading"
                  className="text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto"
                >
                  You&apos;re on the list!
                </h2>
                <p className="mt-4 text-lg text-neutral-300 max-w-xl mx-auto">
                  Check your inbox at <span className="text-white font-medium">{email}</span> for your
                  trial activation link. Welcome to entropy-aware intelligence.
                </p>
                <div
                  role="status"
                  className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span className="text-sm text-emerald-400 font-medium">Trial link sent</span>
                </div>
              </>
            ) : (
              <>
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
                  onSubmit={handleSubmit}
                  aria-label="Sign up for free trial"
                >
                  <label htmlFor="email-input" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    autoComplete="email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
