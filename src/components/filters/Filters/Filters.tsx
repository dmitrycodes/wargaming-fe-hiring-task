import type { ReactNode } from 'react';
import styles from './Filters.module.scss';

interface FiltersProps {
  children: ReactNode;
}

export function Filters({ children }: FiltersProps) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
