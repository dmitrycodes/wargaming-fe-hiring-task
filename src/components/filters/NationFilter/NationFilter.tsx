import { Filter } from '../Filter';
import { type Nation } from '../../../domain/types';
import { FallbackImage } from '../../ui';
import { getNationFullName } from '../../../domain/nation';
import { useMemo } from 'react';

const IMAGE_SIZE = 26;

interface NationFilterProps {
  selected: string[];
  onChange: (nations: string[]) => void;
  nations: Nation[] | undefined;
  nationKeys: string[] | undefined;
}

export function NationFilter({
  selected,
  onChange,
  nations,
  nationKeys = [],
}: NationFilterProps) {
  const options = useMemo(() => {
    return nations ? nations.map((nation) => nation.key) : nationKeys;
  }, [nations, nationKeys]);

  return (
    <Filter
      label="Nation"
      options={options}
      formatOption={(nationKey) => {
        const nation = nations?.find((item) => item.key === nationKey);
        const label = nation ? getNationFullName(nation, 'en') : nationKey;

        return (
          <FallbackImage
            src={nation?.iconUrl}
            title={label}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            fallback={<span>{label}</span>}
            alt={label}
          />
        );
      }}
      formatOptionLabel={(nationKey) => {
        const nation = nations?.find((item) => item.key === nationKey);
        const fullName = nation ? getNationFullName(nation, 'en') : undefined;

        return fullName ?? nationKey;
      }}
      selected={selected}
      onChange={onChange}
    />
  );
}
