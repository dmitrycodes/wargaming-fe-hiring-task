import { useId, type ReactNode } from 'react';
import { ToggleButton, ToggleButtonGroup } from '../../ui';
import { isOneOf } from '../../../domain/filters';
import styles from './Filter.module.scss';

interface FilterProps<T> {
  label: string;
  options: readonly T[];
  formatOption: (option: T) => ReactNode;
  formatOptionLabel: (option: T) => string;
  selected: T[];
  onChange: (values: T[]) => void;
}

export function Filter<T extends string | number>({
  label,
  options,
  formatOption,
  formatOptionLabel,
  selected,
  onChange,
}: FilterProps<T>) {
  const handleChange = (keys: Set<string | number>) => {
    const selectedOptions = Array.from(keys).filter((key) =>
      isOneOf(options, key),
    );

    onChange(selectedOptions);
  };

  const labelId = useId();

  return (
    <div className={styles.root}>
      <p id={labelId} className={styles.label}>
        {label}
      </p>

      <ToggleButtonGroup
        className={styles.buttonGroup}
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={handleChange}
        aria-labelledby={labelId}
      >
        {options.map((option) => (
          <ToggleButton
            key={option}
            id={option}
            className={styles.button}
            aria-label={formatOptionLabel(option)}
          >
            {formatOption(option)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
