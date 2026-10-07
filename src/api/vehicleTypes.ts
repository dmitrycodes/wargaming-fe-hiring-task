import { fetchApi, type FetchApiOptions } from './client';
import { ApiError } from './errors';
import { isPlainObject, isStringRecord } from './guards';

export interface RawVehicleType {
  sort_order: number;
  localization: {
    mark: Record<string, string>;
  };
  icons: {
    default: string;
  };
}

function isVehicleType(value: unknown): value is RawVehicleType {
  return (
    isPlainObject(value) &&
    typeof value.sort_order === 'number' &&
    isPlainObject(value.localization) &&
    isStringRecord(value.localization.mark) &&
    isPlainObject(value.icons) &&
    typeof value.icons.default === 'string'
  );
}

function isVehicleTypeMap(
  value: unknown,
): value is Record<string, RawVehicleType> {
  return isPlainObject(value) && Object.values(value).every(isVehicleType);
}

const VEHICLE_TYPES_API_URL = '/api/encyclopedia/en/vehicle_types_common/';

export async function fetchVehicleTypes(
  options?: FetchApiOptions,
): Promise<Record<string, RawVehicleType>> {
  const res = await fetchApi(VEHICLE_TYPES_API_URL, options);
  if (!isVehicleTypeMap(res.data)) {
    throw new ApiError('parse', 'Unexpected data shape in vehicle types.');
  }

  return res.data;
}
