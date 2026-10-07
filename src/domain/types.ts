export const shipClasses = [
  'battleship',
  'cruiser',
  'destroyer',
  'air-carrier',
  'submarine',
] as const;
export type ShipClass = (typeof shipClasses)[number];

export const shipCategories = ['tech-tree', 'premium', 'special'] as const;
export type ShipCategory = (typeof shipCategories)[number];

export const shipTiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type ShipTier = (typeof shipTiers)[number];

export interface Ship {
  id: string;
  name: string;
  class: ShipClass;
  category: ShipCategory;
  nationKey: string;
  nation: Nation | undefined;
  tier: ShipTier;
  fullNames: Record<string, string>;
  shortNames: Record<string, string>;
  imageUrl: string | undefined;
}

export interface Nation {
  name: string;
  fullNames: Record<string, string>;
  imageUrl: string | undefined;
}

export interface ShipClassInfo {
  name: string;
  sortOrder: number;
  fullNames: Record<string, string>;
  imageUrl: string | undefined;
}

export type Skipped = Pick<Ship, 'id' | 'name'> & {
  reason: 'no-class' | 'invalid-tier';
};

export interface NormalizedCatalog {
  ships: Ship[];
  nations: Nation[];
  shipClasses: ShipClassInfo[];
  skipped: Skipped[];
}
