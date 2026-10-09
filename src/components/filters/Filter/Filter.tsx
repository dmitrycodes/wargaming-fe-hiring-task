import type { ReactNode } from 'react';
import styles from './Filter.module.scss';

interface FilterProps {
  label: string;
  labelId: string;
  children: ReactNode;
}

export function Filter({ label, labelId, children }: FilterProps) {
  return (
    <div className={styles.root}>
      <p id={labelId} className={styles.label}>
        {label}
      </p>
      {children}
    </div>
  );
}
