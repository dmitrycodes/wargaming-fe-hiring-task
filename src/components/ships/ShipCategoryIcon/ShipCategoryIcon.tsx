import clsx from 'clsx';
import type { ShipCategory } from '../../../domain/types';
import styles from './ShipCategoryIcon.module.scss';

interface ShipCategoryIconProps {
  category: ShipCategory;
}

export function ShipCategoryIcon({ category }: ShipCategoryIconProps) {
  return (
    <span
      className={clsx(styles.root, {
        [styles.techTree]: category === 'tech-tree',
        [styles.special]: category === 'special',
        [styles.premium]: category === 'premium',
      })}
    />
  );
}
