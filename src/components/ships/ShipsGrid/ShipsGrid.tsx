import { type CSSProperties, type ReactNode, type RefObject } from 'react';
import styles from './ShipsGrid.module.scss';

interface ShipsGridProps {
  children: ReactNode;
  ref: RefObject<HTMLDivElement | null>;
  columns: number;
}

export function ShipsGrid({ children, ref, columns }: ShipsGridProps) {
  return (
    <div
      ref={ref}
      className={styles.root}
      style={{ '--columns': columns } as CSSProperties}
    >
      {children}
    </div>
  );
}
