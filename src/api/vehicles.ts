import { fetchApi, type FetchApiOptions } from './client';
import { ApiError } from './errors';
import { isPlainObject, isStringArray, isStringRecord } from './guards';

export interface RawVehicle {
  name: string;
  level: number;
  nation: string;
  tags: string[];
  localization: {
    mark: Record<string, string>;
    shortmark: Record<string, string>;
  };
  icons: {
    contour: string;
  };
}

function isVehicle(value: unknown): value is RawVehicle {
  return (
    isPlainObject(value) &&
    typeof value.name === 'string' &&
    typeof value.level === 'number' &&
    typeof value.nation === 'string' &&
    isStringArray(value.tags) &&
    isPlainObject(value.localization) &&
    isStringRecord(value.localization.mark) &&
    isStringRecord(value.localization.shortmark) &&
    isPlainObject(value.icons) &&
    typeof value.icons.contour === 'string'
  );
}

function isVehicleMap(value: unknown): value is Record<string, RawVehicle> {
  return isPlainObject(value) && Object.values(value).every(isVehicle);
}

const VEHICLES_API_URL = '/api/encyclopedia/en/vehicles/';
const VEHICLES_TIMEOUT_MS = 60000;

export async function fetchVehicles(
  options?: FetchApiOptions,
): Promise<Record<string, RawVehicle>> {
  const res = await fetchApi(VEHICLES_API_URL, {
    timeoutMs: VEHICLES_TIMEOUT_MS,
    ...options,
  });
  if (!isVehicleMap(res.data)) {
    throw new ApiError('parse', 'Unexpected data shape in vehicles.');
  }

  return res.data;
}
