import { formatTier } from '../../../domain/shipTier';
import type { ShipTier } from '../../../domain/types';

interface ShipTierInfoProps {
  tier: ShipTier;
  className?: string;
}

export function ShipTierInfo({ tier, className }: ShipTierInfoProps) {
  const label = `Tier ${tier}`;

  return (
    <span className={className} title={label} aria-label={label}>
      {formatTier(tier)}
    </span>
  );
}
