import type { ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export function Card({ children, ...props }: CardProps) {
  return (
    <div className={styles.root} {...props}>
      {children}
    </div>
  );
}
