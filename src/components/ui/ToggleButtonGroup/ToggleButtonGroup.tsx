import clsx from 'clsx';
import {
  ToggleButtonGroup as AriaToggleButtonGroup,
  type ToggleButtonGroupProps as AriaToggleButtonGroupProps,
} from 'react-aria-components';
import styles from './ToggleButtonGroup.module.scss';

export interface ToggleButtonGroupProps extends AriaToggleButtonGroupProps {
  className?: string;
}

export function ToggleButtonGroup({
  className,
  ...props
}: ToggleButtonGroupProps) {
  return (
    <AriaToggleButtonGroup
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}
