import type { ShipCategory } from './types';

const shipCategoryLabels: Record<ShipCategory, string> = {
  'tech-tree': 'Tech tree',
  premium: 'Premium',
  special: 'Special',
};

export function formatShipCategory(category: ShipCategory) {
  return shipCategoryLabels[category];
}
