import { useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';

interface FallbackImageProps extends ComponentPropsWithoutRef<'img'> {
  src?: string;
  fallback: ReactNode;
  width: number;
  height: number;
}

export function FallbackImage({
  src,
  fallback,
  width,
  height,
  alt,
  onError,
  ...props
}: FallbackImageProps) {
  const [failedSrc, setFailedSrc] = useState('');

  return src && src !== failedSrc ? (
    <img
      src={src}
      {...props}
      width={width}
      height={height}
      alt={alt ?? ''}
      onError={(event) => {
        setFailedSrc(src);
        if (onError) {
          onError(event);
        }
      }}
    />
  ) : (
    fallback
  );
}
