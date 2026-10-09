import { Filter } from '../Filter';
import { shipTiers, type ShipTier } from '../../../domain/types';
import { formatTier } from '../../../domain/shipTier';

interface TierFilterProps {
  selected: ShipTier[];
  onChange: (tiers: ShipTier[]) => void;
}

export function TierFilter({ selected, onChange }: TierFilterProps) {
  return (
    <Filter
      label="Tier"
      options={shipTiers}
      formatOption={formatTier}
      formatOptionLabel={(tier) => `Tier ${tier}`}
      selected={selected}
      onChange={onChange}
    />
  );
}
