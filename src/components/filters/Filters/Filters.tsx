import type { ReactNode } from 'react';
import styles from './Filters.module.scss';
import { Button } from '../../ui';

function FiltersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
    </svg>
  );
}

interface FiltersProps {
  children: ReactNode;
  reset: () => void;
  hasActiveFilters: boolean;
}

export function Filters({ children, reset, hasActiveFilters }: FiltersProps) {
  return (
    <div className={styles.root}>
      <div className={styles.nav}>
        <h2 className={styles.title}>
          <FiltersIcon />
          Filters
        </h2>
        <Button onClick={reset} isDisabled={!hasActiveFilters}>
          Reset all
        </Button>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
