import { formatShipClassLabel } from '../../../domain/shipClass';
import type { ShipClass, ShipClassKey } from '../../../domain/types';
import { FallbackImage } from '../../ui';

const IMAGE_SIZE = 26;

interface ShipClassInfoProps {
  shipClassKey: ShipClassKey;
  shipClass: ShipClass | undefined;
}
export function ShipClassInfo({ shipClassKey, shipClass }: ShipClassInfoProps) {
  const label = formatShipClassLabel(shipClassKey);
  return (
    <div>
      <FallbackImage
        src={shipClass?.imageUrl}
        title={label}
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        fallback={<span>{label}</span>}
        alt={label}
      />
    </div>
  );
}
