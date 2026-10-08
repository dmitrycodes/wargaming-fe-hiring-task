import type { ReactNode } from 'react';
import styles from './ShipCard.module.scss';

interface ShipCardProps {
  children: ReactNode;
}

export function ShipCard({ children }: ShipCardProps) {
  return <div className={styles.root}>{children}</div>;
}
