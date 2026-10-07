export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isStringRecord(
  value: unknown,
): value is Record<string, string> {
  return (
    isPlainObject(value) &&
    Object.values(value).every((item) => {
      return typeof item === 'string';
    })
  );
}
