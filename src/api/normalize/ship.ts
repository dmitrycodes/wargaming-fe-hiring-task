import { getMediaUrl } from '../../domain/media';
import {
  deriveShipCategory,
  deriveShipClassKey,
  deriveShipSearchString,
  deriveShipTier,
  isShipHidden,
} from '../../domain/ship';
import type { Nation, Ship, ShipClass, Skipped } from '../../domain/types';
import type { RawVehicle } from '../vehicles';

export function normalizeShips(
  vehicles: Record<string, RawVehicle>,
  nations: Nation[],
  shipClasses: ShipClass[],
  mediaPath: string | undefined,
): {
  ships: Ship[];
  skipped: Skipped[];
} {
  const ships: Ship[] = [];
  const skipped: Skipped[] = [];
  const nationsByKey = new Map(nations.map((nation) => [nation.key, nation]));
  const shipClassesByKey = new Map(
    shipClasses.map((shipClass) => [shipClass.key, shipClass]),
  );
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
    const shipClass = shipClassesByKey.get(shipClassKey);

    ships.push({
      id,
      key: vehicle.name,
      classKey: shipClassKey,
      class: shipClass,
      category: deriveShipCategory(vehicle.tags),
      nationKey: vehicle.nation,
      nation: nation,
      tier: shipTier,
      fullNames: vehicle.localization.mark,
      shortNames: vehicle.localization.shortmark,
      imageUrl: getMediaUrl(vehicle.icons.contour, mediaPath),
      searchString: deriveShipSearchString(
        vehicle.localization.shortmark,
        vehicle.localization.mark,
      ),
    });
  }

  return {
    ships,
    skipped,
  };
}
