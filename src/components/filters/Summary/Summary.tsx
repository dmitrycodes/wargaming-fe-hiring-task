import styles from './Summary.module.scss';

interface SummaryProps {
  total: number | undefined;
  count: number | undefined;
}

export function Summary({ total, count }: SummaryProps) {
  const isTextVisible = total !== undefined && count !== undefined;

  return (
    <div className={styles.root} role="status">
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
  );
}
