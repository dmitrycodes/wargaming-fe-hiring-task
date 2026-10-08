import { getMediaUrl } from '../../domain/media';
import { shipClassKeys, type ShipClass } from '../../domain/types';
import type { RawVehicleType } from '../vehicleTypes';

export function normalizeShipClasses(
  rawVehicleTypes: Record<string, RawVehicleType>,
  mediaPath: string | undefined,
): ShipClass[] {
  const shipClasses: ShipClass[] = [];
  const rawTypesByKey = new Map(Object.entries(rawVehicleTypes));
  const missingVehicleTypeKeys = [];
  for (const classKey of shipClassKeys) {
    const vehicleType = rawTypesByKey.get(classKey);
    if (!vehicleType) {
      missingVehicleTypeKeys.push(classKey);
    }
    shipClasses.push({
      key: classKey,
      sortOrder: vehicleType?.sort_order ?? 0, // 0 fallback will be updated later
      fullNames: vehicleType ? vehicleType.localization.mark : {},
      imageUrl: vehicleType
        ? getMediaUrl(vehicleType.icons.default, mediaPath)
        : undefined,
    });
  }

  // Populate sortOrder for missing vehicle types
  const largestSortOrder = Math.max(
    ...shipClasses.map((shipClass) => shipClass.sortOrder),
  );
  let shipClassesWithMissingSortOrder = 0;
  for (const shipClass of shipClasses) {
    if (missingVehicleTypeKeys.includes(shipClass.key)) {
      shipClassesWithMissingSortOrder += 1;
      shipClass.sortOrder = largestSortOrder + shipClassesWithMissingSortOrder;
    }
  }

  return shipClasses.sort((a, b) => a.sortOrder - b.sortOrder);
}
