import {
  deriveShipCategory,
  deriveShipClass,
  deriveShipTier,
  isShipHidden,
} from '../domain/ship';
import type {
  Nation,
  NormalizedCatalog,
  Ship,
  ShipClassInfo,
  Skipped,
} from '../domain/types';
import { getMediaUrl } from '../domain/media';
import type { RawCatalog } from './catalog';

export function normalize(catalog: RawCatalog): NormalizedCatalog {
  const mediaPath =
    catalog.mediaPath.status === 'ok' ? catalog.mediaPath.data : undefined;

  const nations: Nation[] = [];
  if (catalog.nations.status === 'ok') {
    for (const nation of catalog.nations.data) {
      nations.push({
        imageUrl: getMediaUrl(nation.icons.small, mediaPath),
        name: nation.name,
        fullNames: nation.localization.mark,
      });
    }
  }
  const nationsByName = new Map(nations.map((nation) => [nation.name, nation]));

  const shipClasses: ShipClassInfo[] = [];
  if (catalog.vehicleTypes.status === 'ok') {
    for (const [name, vehicleType] of Object.entries(
      catalog.vehicleTypes.data,
    )) {
      shipClasses.push({
        name,
        sortOrder: vehicleType.sort_order,
        fullNames: vehicleType.localization.mark,
        imageUrl: getMediaUrl(vehicleType.icons.default, mediaPath),
      });
    }
  }

  const ships: Ship[] = [];
  const skipped: Skipped[] = [];
  for (const [id, vehicle] of Object.entries(catalog.vehicles)) {
    if (isShipHidden(vehicle.tags)) {
      continue;
    }

    const shipClass = deriveShipClass(vehicle.tags);
    if (!shipClass) {
      skipped.push({
        id,
        name: vehicle.name,
        reason: 'no-class',
      });
      continue;
    }

    const shipTier = deriveShipTier(vehicle.level);
    if (!shipTier) {
      skipped.push({
        id,
        name: vehicle.name,
        reason: 'invalid-tier',
      });
      continue;
    }

    const nation = nationsByName.get(vehicle.nation);

    ships.push({
      id,
      name: vehicle.name,
      class: shipClass,
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
    nations,
    shipClasses,
    skipped,
  };
}
