import { VisuallyHidden } from '../../ui/VisuallyHidden';
import { ShipsGrid, useGridColumns } from '../ShipsGrid';
import { SkeletonCard } from '../SkeletonCard';

const ROWS = 2;

export function LoadingState() {
  const { ref, columns } = useGridColumns();

  const skeletonItems = Array.from(
    { length: columns * ROWS },
    (_, index) => index,
  );

  return (
    <div>
      <VisuallyHidden>Loading ships</VisuallyHidden>
      <div aria-busy aria-hidden>
        <ShipsGrid ref={ref} columns={columns}>
          {skeletonItems.map((item) => (
            <SkeletonCard key={item} />
          ))}
        </ShipsGrid>
      </div>
    </div>
  );
}
