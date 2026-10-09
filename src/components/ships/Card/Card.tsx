import type { ReactNode } from 'react';
import styles from './Card.module.scss';
import clsx from 'clsx';
import type { ShipCategory } from '../../../domain/types';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  category?: ShipCategory;
  children: ReactNode;
}

export function Card({ children, category, ...props }: CardProps) {
  return (
    <div
      className={clsx(styles.root, {
        [styles.techTree]: category === 'tech-tree',
        [styles.special]: category === 'special',
        [styles.premium]: category === 'premium',
      })}
      {...props}
    >
      {children}
    </div>
  );
}
