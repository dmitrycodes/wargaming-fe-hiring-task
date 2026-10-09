import type { ShipClassKey } from './types';

const shipClassKeyLabels: Record<ShipClassKey, string> = {
  Submarine: 'Submarine',
  Destroyer: 'Destroyer',
  Cruiser: 'Cruiser',
  Battleship: 'Battleship',
  AirCarrier: 'Air Carrier',
};

export function formatShipClassLabel(classKey: ShipClassKey) {
  return shipClassKeyLabels[classKey];
}
