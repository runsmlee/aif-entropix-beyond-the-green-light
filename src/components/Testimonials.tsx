import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote:
      'We had "green across the board" for three weeks before a cascading failure took down payments. Entropix would have caught the entropy drift in our queue depths days earlier.',
    author: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'StreamPay',
  },
  {
    quote:
      'Our on-call team went from 2 AM pages every other night to maybe one a week. The predictive alerts are genuinely different from anything we tried before.',
    author: 'Marcus Rivera',
    role: 'SRE Lead',
    company: 'DataForge',
  },
  {
    quote:
      'The entropy heat map alone justified the investment. We could finally see why our "healthy" microservices were quietly degrading user experience.',
    author: 'Aisha Patel',
    role: 'Principal Engineer',
    company: 'Nextera Systems',
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 bg-white"
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
              Trusted by teams who got burned by green lights
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Engineers who moved beyond surface-level monitoring share what changed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  const { ref, isVisible } = useScrollAnimation<HTMLQuoteElement>();

  return (
    <blockquote
      ref={ref}
      className={`bg-neutral-50 rounded-xl p-6 border border-neutral-200 transition-all duration-700 ease-out hover:border-primary/20 hover:shadow-md ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-warning"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold"
          aria-hidden="true"
        >
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <cite className="text-sm font-semibold text-neutral-900 not-italic">
            {testimonial.author}
          </cite>
          <div className="text-xs text-neutral-500">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </footer>
    </blockquote>
  );
}
