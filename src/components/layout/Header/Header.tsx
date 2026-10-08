import { Container } from '../Container';
import { Logo } from '../Logo';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.root}>
      <Container>
        <div className={styles.content}>
          <Logo />
        </div>
      </Container>
    </header>
  );
}
