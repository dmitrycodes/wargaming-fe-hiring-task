import { toApiError, type ApiError } from './errors';
import { fetchMediaPath } from './mediaPath';
import { fetchNations, type RawNation } from './nations';
import { fetchVehicles, type RawVehicle } from './vehicles';
import { fetchVehicleTypes, type RawVehicleType } from './vehicleTypes';

interface OkSourceResult<T> {
  status: 'ok';
  data: T;
}

interface ErrorSourceResult {
  status: 'error';
  error: ApiError;
}

type SourceResult<T> = OkSourceResult<T> | ErrorSourceResult;

export interface RawCatalog {
  vehicles: Record<string, RawVehicle>;
  vehicleTypes: SourceResult<Record<string, RawVehicleType>>;
  nations: SourceResult<RawNation[]>;
  mediaPath: SourceResult<string>;
}

function toSourceResult<T>(
  fetchResult: PromiseSettledResult<T>,
): SourceResult<T> {
  if (fetchResult.status === 'fulfilled') {
    return {
      status: 'ok',
      data: fetchResult.value,
    };
  }

  return {
    status: 'error',
    error: toApiError(fetchResult.reason, 'unknown'),
  };
}

export async function fetchCatalog(options?: {
  signal?: AbortSignal;
}): Promise<RawCatalog> {
  const [vehiclesResult, vehicleTypesResult, nationsResult, mediaPathResult] =
    await Promise.allSettled([
      fetchVehicles(options),
      fetchVehicleTypes(options),
      fetchNations(options),
      fetchMediaPath(options),
    ]);

  if (options?.signal?.aborted) {
    throw toApiError(options.signal.reason, 'aborted');
  }

  if (vehiclesResult.status !== 'fulfilled') {
    throw toApiError(vehiclesResult.reason, 'unknown');
  }

  return {
    vehicles: vehiclesResult.value,
    vehicleTypes: toSourceResult(vehicleTypesResult),
    nations: toSourceResult(nationsResult),
    mediaPath: toSourceResult(mediaPathResult),
  };
}
