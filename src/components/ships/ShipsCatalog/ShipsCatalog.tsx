import { useWindowVirtualizer } from '@tanstack/react-virtual';
import type { Ship } from '../../../domain/types';
import { VisuallyHidden } from '../../ui/VisuallyHidden';
import { ShipCard } from '../ShipCard';
import { ShipCardSkeleton } from '../ShipCardSkeleton';
import {
  ShipsGrid,
  ShipsGridRow,
  useGridMetrics,
  useScrollMargin,
} from '../ShipsGrid';

const LOADING_ROWS = 3;

interface ShipsCatalogProps {
  isLoading: boolean;
  ships: Ship[] | undefined;
}

export function ShipsCatalog({ isLoading, ships }: ShipsCatalogProps) {
  const { ref, columns, rowHeight } = useGridMetrics();
  const { scrollMargin } = useScrollMargin(ref);

  const rowsCount =
    ships && columns !== 0 ? Math.ceil(ships.length / columns) : 0;

  console.log('scrollMargin', scrollMargin);
  const virtualizer = useWindowVirtualizer({
    count: rowsCount,
    estimateSize: () => rowHeight,
    overscan: 3,
    scrollMargin,
  });
  console.log(
    'virtualizer',
    virtualizer.getVirtualItems().length,
    virtualizer.getTotalSize(),
  );

  const skeletonItems = Array.from({ length: columns }, (_, index) => index);
  const skeletonRows = Array.from(
    { length: LOADING_ROWS },
    (_, index) => index,
  );

  return (
    <div>
      {isLoading && <VisuallyHidden>Loading ships</VisuallyHidden>}

      <div aria-busy={isLoading}>
        <ShipsGrid
          ref={ref}
          columns={columns}
          height={isLoading ? undefined : virtualizer.getTotalSize()}
        >
          {isLoading &&
            skeletonRows.map((row) => (
              <ShipsGridRow key={row} position="static">
                {skeletonItems.map((item) => (
                  <ShipCardSkeleton key={item} />
                ))}
              </ShipsGridRow>
            ))}

          {!isLoading &&
            ships &&
            virtualizer.getVirtualItems().map((virtualRow) => {
              const rowShips = ships.slice(
                virtualRow.index * columns,
                (virtualRow.index + 1) * columns,
              );

              return (
                <ShipsGridRow
                  key={virtualRow.key}
                  offset={virtualRow.start - scrollMargin}
                  position="absolute"
                >
                  {rowShips.map((ship) => (
                    <ShipCard key={ship.id} ship={ship} />
                  ))}
                </ShipsGridRow>
              );
            })}
        </ShipsGrid>
      </div>
    </div>
  );
}
