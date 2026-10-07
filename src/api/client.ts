import { ApiError, toApiError } from './errors';

interface OkApiResponse {
  status: 'ok';
  data: unknown;
}

interface ErrorApiResponse {
  status: 'error';
  error: string;
}

export type ApiResponse = OkApiResponse | ErrorApiResponse;

function isApiResponse(res: unknown): res is ApiResponse {
  if (res && typeof res === 'object' && 'status' in res) {
    return (
      (res.status === 'ok' && 'data' in res) ||
      (res.status === 'error' && 'error' in res)
    );
  }

  return false;
}

export interface FetchApiOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
}

const DEFAULT_TIMEOUT_MS = 5000;

async function fetchOrThrow(url: string, signal: AbortSignal) {
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) {
      const message =
        res.statusText === '' ? res.status.toString() : res.statusText;
      throw new ApiError('http', message, { status: res.status });
    }

    return res;
  } catch (err) {
    throw toApiError(err, 'network');
  }
}

export async function fetchApi(
  url: string,
  options?: FetchApiOptions,
): Promise<OkApiResponse> {
  const { signal, timeoutMs = DEFAULT_TIMEOUT_MS } = options ?? {};

  const timeoutSignal = AbortSignal.timeout(timeoutMs);

  const requestSignal = signal
    ? AbortSignal.any([timeoutSignal, signal])
    : timeoutSignal;

  try {
    const res = await fetchOrThrow(url, requestSignal);
    const body: unknown = await res.json();

    if (!isApiResponse(body)) {
      throw new ApiError('parse', 'Parse error');
    }

    if (body.status !== 'ok') {
      throw new ApiError('api', body.error);
    }

    return body;
  } catch (err) {
    throw toApiError(err, 'parse');
  }
}
