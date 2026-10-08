import { fetchApi, type FetchApiOptions } from './client';
import { ApiError } from './errors';
import { isPlainObject, isStringRecord } from './guards';

export interface RawNation {
  name: string;
  localization: {
    mark: Record<string, string>;
  };
  icons: {
    default: string;
  };
}

function isNation(value: unknown): value is RawNation {
  return (
    isPlainObject(value) &&
    typeof value.name === 'string' &&
    isPlainObject(value.localization) &&
    isStringRecord(value.localization.mark) &&
    isPlainObject(value.icons) &&
    typeof value.icons.default === 'string'
  );
}

function isNationList(value: unknown): value is RawNation[] {
  return Array.isArray(value) && value.every(isNation);
}

const NATIONS_API_URL = '/api/encyclopedia/en/nations/';

export async function fetchNations(
  options?: FetchApiOptions,
): Promise<RawNation[]> {
  const res = await fetchApi(NATIONS_API_URL, options);
  if (!isNationList(res.data)) {
    throw new ApiError('parse', 'Unexpected data shape in nations.');
  }

  return res.data;
}
