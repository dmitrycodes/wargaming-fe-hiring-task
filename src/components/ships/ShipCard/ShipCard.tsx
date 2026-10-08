import { getShipFullName } from '../../../domain/ship';
import type { Ship } from '../../../domain/types';
import { Card } from '../Card';
import { ShipClassInfo } from '../ShipClassInfo';
import { ShipNation } from '../ShipNation';
import { ShipNationFallback } from '../ShipNationFallback';
import { ShipTierInfo } from '../ShipTierInfo';
import styles from './ShipCard.module.scss';

interface ShipProps {
  ship: Ship;
}

export function ShipCard({ ship }: ShipProps) {
  return (
    <Card>
      {ship.nation && <ShipNation nation={ship.nation} />}
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.meta}>
            <ShipTierInfo tier={ship.tier} />
            <ShipClassInfo
              shipClassKey={ship.classKey}
              shipClass={ship.class}
            />
            {!ship.nation && <ShipNationFallback nationKey={ship.nationKey} />}
          </div>

          <img
            className={styles.contour}
            src={ship.imageUrl}
            loading="lazy"
            decoding="async"
            alt=""
          />

          <div className={styles.name}>{getShipFullName(ship, 'en')}</div>
        </div>
      </div>
    </Card>
  );
}
