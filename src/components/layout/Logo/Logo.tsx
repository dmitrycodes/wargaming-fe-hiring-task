import styles from './Logo.module.scss';

export function Logo() {
  return (
    <div className={styles.root}>
      <a href="/" className={styles.link}>
        SHIP PORT
      </a>
    </div>
  );
}
