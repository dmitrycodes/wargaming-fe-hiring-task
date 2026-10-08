// Order here reflects the sort_order value from the API
export const shipClassKeys = [
  'Submarine',
  'Destroyer',
  'Cruiser',
  'Battleship',
  'AirCarrier',
] as const;
export type ShipClassKey = (typeof shipClassKeys)[number];

export const shipCategories = ['tech-tree', 'premium', 'special'] as const;
export type ShipCategory = (typeof shipCategories)[number];

export const shipTiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type ShipTier = (typeof shipTiers)[number];

export interface Ship {
  id: string;
  key: string;
  classKey: ShipClassKey;
  category: ShipCategory;
  nationKey: string;
  nation: Nation | undefined;
  tier: ShipTier;
  fullNames: Record<string, string>;
  shortNames: Record<string, string>;
  imageUrl: string | undefined;
}

export interface Nation {
  key: string;
  fullNames: Record<string, string>;
  imageUrl: string | undefined;
}

export interface ShipClass {
  key: ShipClassKey;
  sortOrder: number;
  fullNames: Record<string, string>;
  imageUrl: string | undefined;
}

export type Skipped = Pick<Ship, 'id' | 'key'> & {
  reason: 'no-class' | 'invalid-tier';
};

export interface NormalizedCatalog {
  ships: Ship[];
  nations: Nation[];
  shipClasses: ShipClass[];
  skipped: Skipped[];
}
