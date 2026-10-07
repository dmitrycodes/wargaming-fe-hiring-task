import { fetchApi, type FetchApiOptions } from './client';
import { ApiError } from './errors';

const MEDIA_PATH_API_URL = '/api/encyclopedia/en/media_path/';

export function parseMediaPath(data: string): string {
  try {
    const url = new URL(data);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new ApiError('parse', `Invalid media path URL protocol: ${data}`);
    }

    url.search = '';
    url.hash = '';
    if (!url.pathname.endsWith('/')) {
      url.pathname = `${url.pathname}/`;
    }

    return url.toString();
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError('parse', `Invalid media path URL: ${data}`, {
      cause: err,
    });
  }
}

export async function fetchMediaPath(
  options?: FetchApiOptions,
): Promise<string> {
  const res = await fetchApi(MEDIA_PATH_API_URL, options);
  if (typeof res.data !== 'string') {
    throw new ApiError('parse', 'Unexpected data shape in media path.');
  }

  return parseMediaPath(res.data);
}
