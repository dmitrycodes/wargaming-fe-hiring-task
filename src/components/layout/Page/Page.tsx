import type { ReactNode } from 'react';
import { Container } from '../Container';

interface PageProps {
  children: ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div>
      <Container>{children}</Container>
    </div>
  );
}
