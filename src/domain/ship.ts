import {
  shipClassKeys,
  shipTiers,
  type Ship,
  type ShipCategory,
  type ShipClassKey,
  type ShipTier,
} from './types';
import { getLocalizedText } from './locale';

export function deriveShipCategory(tags: string[]): ShipCategory {
  if (tags.includes('uiPremium')) {
    return 'premium';
  }

  if (tags.includes('uiSpecial')) {
    return 'special';
  }

  return 'tech-tree';
}

const shipClassTags: Record<ShipClassKey, string> = {
  battleship: 'Battleship',
  cruiser: 'Cruiser',
  destroyer: 'Destroyer',
  'air-carrier': 'AirCarrier',
  submarine: 'Submarine',
};

export function deriveShipClassKey(tags: string[]): ShipClassKey | undefined {
  return shipClassKeys.find((shipClass) =>
    tags.includes(shipClassTags[shipClass]),
  );
}

export function deriveShipTier(level: number): ShipTier | undefined {
  return shipTiers.find((shipTier) => shipTier === level);
}

export function isShipHidden(tags: string[]): boolean {
  return tags.some((tag) => tag.startsWith('catalogueHidden'));
}

export function getShipFullName(
  ship: Ship,
  locale: string,
): string | undefined {
  return getLocalizedText(ship.fullNames, locale);
}

export function getShipShortName(
  ship: Ship,
  locale: string,
): string | undefined {
  return getLocalizedText(ship.shortNames, locale);
}
