import { useEffect, useState } from 'react';

const SECTIONS = ['features', 'how-it-works', 'metrics', 'testimonials', 'faq'] as const;
type SectionId = (typeof SECTIONS)[number];

export function useActiveSection(): SectionId | null {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (SECTIONS.includes(id)) {
              setActiveSection(id);
            }
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    for (const id of SECTIONS) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
