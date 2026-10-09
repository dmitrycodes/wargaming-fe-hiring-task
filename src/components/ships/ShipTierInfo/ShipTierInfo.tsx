import { formatTier } from '../../../domain/shipTier';
import type { ShipTier } from '../../../domain/types';

interface ShipTierInfoProps {
  tier: ShipTier;
}

export function ShipTierInfo({ tier }: ShipTierInfoProps) {
  const label = `Tier ${tier}`;

  return (
    <div aria-label={label} title={label}>
      {formatTier(tier)}
    </div>
  );
}
