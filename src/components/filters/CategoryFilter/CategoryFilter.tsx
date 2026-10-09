import { Filter } from '../Filter';
import { shipCategories, type ShipCategory } from '../../../domain/types';
import { ShipCategoryInfo } from '../../ships/ShipCategoryInfo';
import { formatShipCategory } from '../../../domain/shipCategory';

interface CategoryFilterProps {
  selected: ShipCategory[];
  onChange: (categories: ShipCategory[]) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <Filter
      label="Special"
      options={shipCategories}
      formatOption={(category) => {
        return <ShipCategoryInfo category={category} />;
      }}
      formatOptionLabel={formatShipCategory}
      selected={selected}
      onChange={onChange}
    />
  );
}
