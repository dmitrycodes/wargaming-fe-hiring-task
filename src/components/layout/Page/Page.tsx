import type { ReactNode } from 'react';
import { Container } from '../Container';
import styles from './Page.module.scss';

interface PageProps {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div className={styles.root}>
      <Container>{children}</Container>
    </div>
  );
}
