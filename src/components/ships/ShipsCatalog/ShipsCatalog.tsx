import type { Ship } from '../../../domain/types';
import { VisuallyHidden } from '../../ui/VisuallyHidden';
import { ShipCard } from '../ShipCard';
import { ShipCardSkeleton } from '../ShipCardSkeleton';
import { ShipsGrid, useGridColumns } from '../ShipsGrid';

const LOADING_ROWS = 3;

interface ShipsCatalogProps {
  isLoading: boolean;
  ships: Ship[] | undefined;
}

export function ShipsCatalog({ isLoading, ships }: ShipsCatalogProps) {
  const { ref, columns } = useGridColumns();

  const skeletonItems = Array.from(
    { length: columns * LOADING_ROWS },
    (_, index) => index,
  );

  return (
    <div>
      {isLoading && <VisuallyHidden>Loading ships</VisuallyHidden>}

      <div aria-busy={isLoading}>
        <ShipsGrid ref={ref} columns={columns}>
          {isLoading &&
            skeletonItems.map((item) => <ShipCardSkeleton key={item} />)}
          {!isLoading &&
            ships &&
            ships.map((ship) => <ShipCard key={ship.id} ship={ship} />)}
        </ShipsGrid>
      </div>
    </div>
  );
}
