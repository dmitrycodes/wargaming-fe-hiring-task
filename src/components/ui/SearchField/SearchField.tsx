import clsx from 'clsx';
import {
  SearchField as AriaSearchField,
  Label as AriaLabel,
  Input as AriaInput,
  Button as AriaButton,
  type SearchFieldProps as AriaSearchFieldProps,
} from 'react-aria-components';
import styles from './SearchField.module.scss';
import { VisuallyHidden } from '../VisuallyHidden';

export interface SearchFieldProps extends AriaSearchFieldProps {
  className?: string;
  label: string;
  placeholder?: string;
  isLabelHidden?: boolean;
}

export function SearchField({
  className,
  label,
  placeholder,
  isLabelHidden,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField className={clsx(styles.root, className)} {...props}>
      {isLabelHidden ? (
        <VisuallyHidden>
          <AriaLabel>{label}</AriaLabel>
        </VisuallyHidden>
      ) : (
        <AriaLabel className={styles.label}>{label}</AriaLabel>
      )}

      <AriaInput className={styles.input} placeholder={placeholder} />
      <AriaButton className={styles.clear}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </AriaButton>
    </AriaSearchField>
  );
}
