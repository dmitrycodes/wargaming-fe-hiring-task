import { type CSSProperties, type ReactNode, type RefObject } from 'react';
import styles from './ShipsGrid.module.scss';
import clsx from 'clsx';

interface ShipsGridProps {
  children: ReactNode;
  ref: RefObject<HTMLDivElement | null>;
  columns: number;
  height: number | undefined;
}

export function ShipsGrid({ children, ref, columns, height }: ShipsGridProps) {
  return (
    <div
      ref={ref}
      className={styles.root}
      style={{ height, '--columns': columns } as CSSProperties}
    >
      {children}
    </div>
  );
}

interface ShipsGridRowProps {
  children: ReactNode;
  offset?: number;
  position: 'static' | 'absolute';
}

export function ShipsGridRow({
  children,
  offset,
  position,
}: ShipsGridRowProps) {
  return (
    <div
      className={clsx(styles.row, {
        [styles.rowAbsolute]: position === 'absolute',
      })}
      style={
        offset
          ? {
              transform: `translateY(${offset.toString()}px)`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
