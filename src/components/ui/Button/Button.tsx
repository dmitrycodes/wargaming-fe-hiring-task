import clsx from 'clsx';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import styles from './Button.module.scss';

export interface ButtonProps extends AriaButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      className={clsx(styles.root, className)}
      {...props}
      data-variant={variant}
    />
  );
}
