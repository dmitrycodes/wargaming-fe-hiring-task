import { getMediaUrl } from '../../domain/media';
import {
  deriveShipCategory,
  deriveShipClassKey,
  deriveShipTier,
  isShipHidden,
} from '../../domain/ship';
import type { Nation, Ship, Skipped } from '../../domain/types';
import type { RawVehicle } from '../vehicles';

export function normalizeShips(
  vehicles: Record<string, RawVehicle>,
  nations: Nation[],
  mediaPath: string | undefined,
): {
  ships: Ship[];
  skipped: Skipped[];
} {
  const ships: Ship[] = [];
  const skipped: Skipped[] = [];
  const nationsByKey = new Map(nations.map((nation) => [nation.key, nation]));
  for (const [id, vehicle] of Object.entries(vehicles)) {
    if (isShipHidden(vehicle.tags)) {
      continue;
    }

    const shipClassKey = deriveShipClassKey(vehicle.tags);
    if (!shipClassKey) {
      skipped.push({
        id,
        key: vehicle.name,
        reason: 'no-class',
      });
      continue;
    }

    const shipTier = deriveShipTier(vehicle.level);
    if (!shipTier) {
      skipped.push({
        id,
        key: vehicle.name,
        reason: 'invalid-tier',
      });
      continue;
    }

    const nation = nationsByKey.get(vehicle.nation);

    ships.push({
      id,
      key: vehicle.name,
      classKey: shipClassKey,
      category: deriveShipCategory(vehicle.tags),
      nationKey: vehicle.nation,
      nation: nation,
      tier: shipTier,
      fullNames: vehicle.localization.mark,
      shortNames: vehicle.localization.shortmark,
      imageUrl: getMediaUrl(vehicle.icons.contour, mediaPath),
    });
  }

  return {
    ships,
    skipped,
  };
}
