export function getColumnCount(
  containerWidth: number,
  minCardWidth: number,
  gap: number,
) {
  return Math.max(1, Math.floor((containerWidth + gap) / (minCardWidth + gap)));
}
