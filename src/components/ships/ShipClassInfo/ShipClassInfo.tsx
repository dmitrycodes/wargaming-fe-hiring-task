import { formatShipClassLabel } from '../../../domain/shipClass';
import type { ShipClass, ShipClassKey } from '../../../domain/types';
import styles from './ShipClassInfo.module.scss';

interface ShipClassInfoProps {
  shipClassKey: ShipClassKey;
  shipClass: ShipClass | undefined;
}
export function ShipClassInfo({ shipClassKey, shipClass }: ShipClassInfoProps) {
  const label = formatShipClassLabel(shipClassKey);
  return (
    <div aria-label={label}>
      {shipClass?.imageUrl ? (
        <img
          src={shipClass.imageUrl}
          className={styles.image}
          title={label}
          alt=""
        />
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}
