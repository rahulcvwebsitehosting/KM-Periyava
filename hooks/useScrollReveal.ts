import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('sr-visible');
          if (options.once !== false) observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -50px 0px'
      }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);
  
  return ref;
};
