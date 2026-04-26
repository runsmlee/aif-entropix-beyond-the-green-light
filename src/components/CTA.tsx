import { useState, useCallback, useMemo } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  const isValidEmail = useMemo(() => EMAIL_REGEX.test(email.trim()), [email]);

  const validateEmail = useCallback((value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (!EMAIL_REGEX.test(trimmed)) {
      return 'Please enter a valid email address';
    }
    return '';
  }, []);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      // Clear error when user starts typing again
      if (emailError) {
        setEmailError(validateEmail(value));
      }
    },
    [emailError, validateEmail]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = email.trim();

      if (!trimmed) {
        setEmailError('Please enter your email address');
        return;
      }

      if (!isValidEmail) {
        setEmailError('Please enter a valid email address');
        return;
      }

      setEmailError('');
      setSubmitted(true);
    },
    [email, isValidEmail]
  );

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
                  noValidate
                >
                  <div className="flex-1">
                    <label htmlFor="email-input" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={() => {
                        if (email.trim()) {
                          setEmailError(validateEmail(email));
                        }
                      }}
                      placeholder="Enter your work email"
                      required
                      autoComplete="email"
                      aria-invalid={emailError ? 'true' : undefined}
                      aria-describedby={emailError ? 'email-error' : undefined}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${
                        emailError
                          ? 'border-red-400 ring-1 ring-red-400/50'
                          : 'border-white/20'
                      }`}
                    />
                    {emailError && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-400 text-left" role="alert">
                        {emailError}
                      </p>
                    )}
                  </div>
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
