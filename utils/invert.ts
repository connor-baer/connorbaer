export function invert<
  K extends string | number | symbol,
  V extends string | number | symbol
>(obj: Record<K, V>): Record<V, K> {
  return Object.entries<V>(obj).reduce((acc, entry) => {
    const key = entry[0] as K;
    const value = entry[1];
    acc[value] = key;
    return acc;
  }, {} as Record<V, K>);
}
