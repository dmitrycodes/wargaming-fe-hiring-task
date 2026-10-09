import type { ReactNode } from 'react';
import styles from './Summary.module.scss';

interface SummaryProps {
  total: number | undefined;
  count: number | undefined;
  children?: ReactNode;
}

export function Summary({ total, count, children }: SummaryProps) {
  const isTextVisible = total !== undefined && count !== undefined;

  return (
    <div className={styles.root}>
      <div role="status">
        {isTextVisible && (
          <span className={styles.text}>
            {total !== count ? (
              <span>
                <span className={styles.highlighted}>{count}</span> of {total}{' '}
                ships
              </span>
            ) : (
              <span>{total} ships</span>
            )}
          </span>
        )}
      </div>

      <div className={styles.nav}>{children}</div>
    </div>
  );
}
