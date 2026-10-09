import { useMemo } from 'react';
import { useCatalog } from '../../../hooks/useCatalog';
import { Page } from '../../layout/Page';
import { normalize } from '../../../api/normalize';
import { ShipsCatalog } from '../ShipsCatalog';
import { ErrorState } from '../ErrorState';
import { Filters } from '../../filters/Filters';
import { TierFilter } from '../../filters/TierFilter';
import { useFilters } from '../../../hooks/useFilters';
import { applyFilters } from '../../../domain/filters';
import { ClassFilter } from '../../filters/ClassFilter';

export function ShipsPage() {
  const { data, status } = useCatalog();
  const { filters, setFilter } = useFilters();

  const normalizedData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return normalize(data);
  }, [data]);

  const ships = useMemo(() => {
    if (!normalizedData) {
      return undefined;
    }

    return applyFilters(normalizedData.ships, filters);
  }, [normalizedData, filters]);

  const isLoading = status === 'pending';
  const isError = status === 'error';

  return (
    <Page>
      <Filters>
        <TierFilter
          selected={filters.tiers}
          onChange={(selectedTiers) => {
            setFilter('tiers', selectedTiers);
          }}
        />
        <ClassFilter
          selected={filters.classes}
          onChange={(selectedClasses) => {
            setFilter('classes', selectedClasses);
          }}
          shipClasses={normalizedData?.shipClasses}
        />
      </Filters>

      <ShipsCatalog isLoading={isLoading} ships={ships} />
      {isError && <ErrorState />}
    </Page>
  );
}
