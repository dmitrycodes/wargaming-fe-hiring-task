import type { ShipTier } from '../../../domain/types';

const tierMap: Record<ShipTier, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  11: '★',
};

interface ShipTierInfoProps {
  tier: ShipTier;
}

export function ShipTierInfo({ tier }: ShipTierInfoProps) {
  const label = `Tier ${tier}`;

  return (
    <div aria-label={label} title={label}>
      {tierMap[tier]}
    </div>
  );
}
