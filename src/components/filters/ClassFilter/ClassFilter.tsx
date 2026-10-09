import { Filter } from '../Filter';
import {
  shipClassKeys,
  type ShipClass,
  type ShipClassKey,
} from '../../../domain/types';
import { formatShipClassLabel } from '../../../domain/shipClass';
import { FallbackImage } from '../../ui';

const IMAGE_SIZE = 26;

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
  return (
    <Filter
      label="Type"
      options={shipClassKeys}
      formatOption={(classKey) => {
        const shipClass = shipClasses?.find((item) => item.key === classKey);
        const label = formatShipClassLabel(classKey);

        return (
          <FallbackImage
            src={shipClass?.imageUrl}
            title={label}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            fallback={<span>{label}</span>}
            alt={label}
          />
        );
      }}
      formatOptionLabel={formatShipClassLabel}
      selected={selected}
      onChange={onChange}
    />
  );
}
