import { getNationFullName } from '../../../domain/nation';
import type { Nation } from '../../../domain/types';
import styles from './ShipNation.module.scss';

interface ShipNationProps {
  nation: Nation;
}

export function ShipNation({ nation }: ShipNationProps) {
  const label = `Nation: ${getNationFullName(nation, 'en')}`;

  return (
    <div className={styles.root}>
      <div className={styles.flag}>
        <img src={nation?.imageUrl} alt={label} />
      </div>
    </div>
  );
}
