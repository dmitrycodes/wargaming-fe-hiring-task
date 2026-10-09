import { Filter } from '../Filter';
import { shipTiers, type ShipTier } from '../../../domain/types';
import { ShipTierInfo } from '../../ships/ShipTierInfo';
import styles from './TierFilter.module.scss';

interface TierFilterProps {
  selected: ShipTier[];
  onChange: (tiers: ShipTier[]) => void;
}

export function TierFilter({ selected, onChange }: TierFilterProps) {
  return (
    <Filter
      label="Tier"
      options={shipTiers}
      formatOption={(tier) => (
        <ShipTierInfo className={styles.tier} tier={tier} />
      )}
      formatOptionLabel={(tier) => `Tier ${tier}`}
      selected={selected}
      onChange={onChange}
    />
  );
}
