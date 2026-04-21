import { useState, useCallback, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'What does "entropy-aware" monitoring actually mean?',
    answer:
      'Traditional monitoring checks if metrics are within thresholds — green or red. Entropy-aware monitoring measures the disorder and unpredictability in your system signals. High entropy often precedes failures, even when everything looks "green." Entropix quantifies this hidden chaos.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Most teams are sending data within 15 minutes. We provide native integrations for Prometheus, Datadog, Grafana, CloudWatch, and custom endpoints. No agents to install — just point your existing data streams at our API.',
  },
  {
    question: 'Will this replace my current monitoring tools?',
    answer:
      'No. Entropix complements your existing stack. It ingests data from your current tools and adds an entropy layer on top. Think of it as the intelligence layer that makes your existing dashboards actually meaningful.',
  },
  {
    question: 'How is this different from anomaly detection?',
    answer:
      'Anomaly detection flags individual metrics that deviate from baselines. Entropix analyzes the relationships between signals — the entropy of the system as a whole. A single metric behaving normally in a degrading system is a pattern anomaly detection misses.',
  },
  {
    question: 'What happens after the 14-day trial?',
    answer:
      'You can choose a plan that fits your team size, or export your data and walk away. No lock-in, no surprise charges. We believe the product speaks for itself.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II certified. Your metric data is never shared, sold, or used to train models for other customers.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleItem = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let targetIndex = -1;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        targetIndex = (index + 1) % FAQ_DATA.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        targetIndex = (index - 1 + FAQ_DATA.length) % FAQ_DATA.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIndex = FAQ_DATA.length - 1;
      }

      if (targetIndex >= 0) {
        buttonRefs.current[targetIndex]?.focus();
      }
    },
    []
  );

  return (
    <section id="faq" className="py-20 sm:py-28 bg-neutral-50 relative" aria-labelledby="faq-heading">
      {/* Subtle top border decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headingRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Common questions, clear answers
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Everything you need to know before moving beyond the green light.
          </p>
        </div>

        <div className="space-y-4" role="list">
          {FAQ_DATA.map((item, index) => (
            <FAQAccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              buttonRef={(el) => { buttonRefs.current[index] = el; }}
              id={`faq-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
  id: string;
}

function FAQAccordionItem({ item, isOpen, onToggle, onKeyDown, buttonRef, id }: FAQAccordionItemProps) {
  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isOpen
          ? 'border-primary/30 bg-white shadow-sm'
          : 'border-neutral-200 bg-white hover:border-neutral-300'
      }`}
      role="listitem"
    >
      <h3>
        <button
          ref={buttonRef}
          type="button"
          className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
          onClick={onToggle}
          onKeyDown={onKeyDown}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
        >
          <span className="text-sm sm:text-base font-semibold text-neutral-900">
            {item.question}
          </span>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-primary/10' : 'bg-neutral-100'}`}>
            <svg
              className={`w-3.5 h-3.5 transition-all duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-neutral-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={isOpen ? 'block' : 'hidden'}
      >
        <p className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}
