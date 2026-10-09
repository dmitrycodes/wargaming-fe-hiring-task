import { Filter } from '../Filter';
import { ToggleButton, ToggleButtonGroup } from '../../ui';
import { formatTier } from '../../../domain/shipTier';
import { shipTiers, type ShipTier } from '../../../domain/types';
import styles from './TierFilter.module.scss';
import { useId } from 'react';
import { isOneOf } from '../../../domain/filters';

interface TierFilterProps {
  selected: ShipTier[];
  onChange: (tiers: ShipTier[]) => void;
}

export function TierFilter({ selected, onChange }: TierFilterProps) {
  const handleChange = (keys: Set<string | number>) => {
    const selectedTiers = Array.from(keys).filter((key) =>
      isOneOf(shipTiers, key),
    );

    onChange(selectedTiers);
  };

  const labelId = useId();

  return (
    <Filter label="Tier" labelId={labelId}>
      <ToggleButtonGroup
        className={styles.buttonGroup}
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={handleChange}
        aria-labelledby={labelId}
      >
        {shipTiers.map((tier) => (
          <ToggleButton
            key={tier}
            id={tier}
            className={styles.button}
            aria-label={`Tier ${tier}`}
          >
            {formatTier(tier)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Filter>
  );
}
