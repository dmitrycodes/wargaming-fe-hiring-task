import type { ShipClass, ShipClassKey } from '../../../domain/types';
import styles from './ShipClassInfo.module.scss';

const shipClassKeyLabels: Record<ShipClassKey, string> = {
  Submarine: 'Submarine',
  Destroyer: 'Destroyer',
  Cruiser: 'Cruiser',
  Battleship: 'Battleship',
  AirCarrier: 'Air Carrier',
};

interface ShipClassInfoProps {
  shipClassKey: ShipClassKey;
  shipClass: ShipClass | undefined;
}
export function ShipClassInfo({ shipClassKey, shipClass }: ShipClassInfoProps) {
  const label = shipClassKeyLabels[shipClassKey];
  return (
    <div aria-label={label}>
      {shipClass ? (
        <img
          src={shipClass.imageUrl}
          className={styles.image}
          title={label}
          aria-hidden
        />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}
