interface ShipNationFallbackProps {
  nationKey: string;
}

export function ShipNationFallback({ nationKey }: ShipNationFallbackProps) {
  return <span aria-label={`Nation: ${nationKey}`}>{nationKey}</span>;
}
