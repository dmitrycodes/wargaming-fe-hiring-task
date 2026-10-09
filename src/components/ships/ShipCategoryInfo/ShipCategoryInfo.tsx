import { formatShipCategory } from '../../../domain/shipCategory';
import type { ShipCategory } from '../../../domain/types';
import { ShipCategoryIcon } from '../ShipCategoryIcon';
import styles from './ShipCategoryInfo.module.scss';

interface ShipCategoryInfoProps {
  category: ShipCategory;
}

export function ShipCategoryInfo({ category }: ShipCategoryInfoProps) {
  return (
    <span className={styles.root}>
      <ShipCategoryIcon category={category} />
      <span className={styles.label}>{formatShipCategory(category)}</span>
    </span>
  );
}
