import { Filter } from '../Filter';
import {
  shipClassKeys,
  type ShipClass,
  type ShipClassKey,
} from '../../../domain/types';
import { formatShipClassLabel } from '../../../domain/shipClass';
import { useMemo } from 'react';
import styles from './ClassFilter.module.scss';

interface ClassFilterProps {
  selected: ShipClassKey[];
  onChange: (classes: ShipClassKey[]) => void;
  shipClasses: ShipClass[] | undefined;
}

export function ClassFilter({
  selected,
  onChange,
  shipClasses,
}: ClassFilterProps) {
  const shipClassesByKey = useMemo(() => {
    if (!shipClasses) {
      return undefined;
    }

    return new Map(shipClasses.map((shipClass) => [shipClass.key, shipClass]));
  }, [shipClasses]);

  return (
    <Filter
      label="Type"
      options={shipClassKeys}
      formatOption={(classKey) => {
        const shipClass = shipClassesByKey?.get(classKey);
        const label = formatShipClassLabel(classKey);

        return shipClass?.imageUrl ? (
          <img
            src={shipClass.imageUrl}
            className={styles.image}
            title={label}
            alt=""
          />
        ) : (
          <span>{label}</span>
        );
      }}
      formatOptionLabel={formatShipClassLabel}
      selected={selected}
      onChange={onChange}
    />
  );
}
