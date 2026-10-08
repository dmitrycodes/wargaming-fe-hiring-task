import { type NormalizedCatalog } from '../../domain/types';
import { getSourceData, type RawCatalog } from '../catalog';
import { normalizeShipClasses } from './shipClass';
import { normalizeNations } from './nation';
import { normalizeShips } from './ship';

export function normalize(catalog: RawCatalog): NormalizedCatalog {
  const mediaPath = getSourceData(catalog.mediaPath, undefined);

  const nations = normalizeNations(
    getSourceData(catalog.nations, []),
    mediaPath,
  );

  const shipClasses = normalizeShipClasses(
    getSourceData(catalog.vehicleTypes, {}),
    mediaPath,
  );

  const { ships, skipped } = normalizeShips(
    catalog.vehicles,
    nations,
    shipClasses,
    mediaPath,
  );

  return {
    ships,
    nations,
    shipClasses,
    skipped,
  };
}
