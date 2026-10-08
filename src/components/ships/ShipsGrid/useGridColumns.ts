import { useLayoutEffect, useRef, useState } from 'react';
import { getColumnCount } from './gridMath';

function readPropertyPxValue(styles: CSSStyleDeclaration, property: string) {
  const rawValue = styles.getPropertyValue(property);
  const value = parseFloat(rawValue);
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid CSS token ${property}: "${rawValue}"`);
  }

  return value;
}

export function useGridColumns() {
  const [columns, setColumns] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const containerStyles = window.getComputedStyle(currentRef);
    const cardMinWidth = readPropertyPxValue(
      containerStyles,
      '--card-min-width',
    );
    const cardGap = readPropertyPxValue(containerStyles, '--card-gap');

    const observer = new ResizeObserver((entries) => {
      if (entries.length === 0) return;

      const { width } = entries[0].contentRect;
      const columns = getColumnCount(width, cardMinWidth, cardGap);

      setColumns(columns);
    });

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, columns };
}
