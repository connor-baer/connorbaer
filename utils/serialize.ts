// Adapted from https://nozzlegear.com/blog/modify-the-property-types-on-an-object-with-conditional-typing
type Serialized<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};

export function serialize<T extends Record<string, unknown>>(
  object: T,
): Serialized<T> {
  return JSON.parse(JSON.stringify(object)) as Serialized<T>;
}
