import { useLayoutEffect, useState, type RefObject } from 'react';

function calculateScrollMargin(container: HTMLDivElement) {
  const containerTop = Math.round(container.getBoundingClientRect().top);

  return containerTop + window.scrollY;
}

export function useScrollMargin(ref: RefObject<HTMLDivElement | null>) {
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new ResizeObserver(() => {
      const containerScrollMargin = calculateScrollMargin(currentRef);
      setScrollMargin(containerScrollMargin);
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { scrollMargin };
}
