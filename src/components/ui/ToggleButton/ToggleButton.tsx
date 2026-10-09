import clsx from 'clsx';
import {
  ToggleButton as AriaToggleButton,
  type ToggleButtonProps as AriaToggleButtonProps,
} from 'react-aria-components';
import styles from './ToggleButton.module.scss';

export interface ToggleButtonProps extends AriaToggleButtonProps {
  className?: string;
}

export function ToggleButton({ className, ...props }: ToggleButtonProps) {
  return (
    <AriaToggleButton className={clsx(styles.root, className)} {...props} />
  );
}
