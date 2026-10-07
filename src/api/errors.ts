export type ApiErrorKind =
  'api' | 'network' | 'timeout' | 'http' | 'parse' | 'aborted' | 'unknown';

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number | undefined;

  constructor(
    kind: ApiErrorKind,
    message: string,
    options?: ErrorOptions & {
      status?: number;
    },
  ) {
    super(message, options);

    this.kind = kind;
    this.name = 'ApiError';
    this.status = options?.status;
  }
}

export function toApiError(err: unknown, fallbackErrorKind: ApiErrorKind) {
  if (err instanceof ApiError) {
    return err;
  }

  if (!(err instanceof Error)) {
    return new ApiError('unknown', 'Unknown error', { cause: err });
  }

  if (err.name === 'TimeoutError') {
    return new ApiError('timeout', err.message, { cause: err });
  } else if (err.name === 'AbortError') {
    return new ApiError('aborted', err.message, { cause: err });
  }

  return new ApiError(fallbackErrorKind, err.message, { cause: err });
}
