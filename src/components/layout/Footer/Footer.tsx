import { Container } from '../Container';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.root}>
      <Container>
        <p className={styles.note}>Wargaming frontend hiring task, Oct 2026.</p>
      </Container>
    </footer>
  );
}
