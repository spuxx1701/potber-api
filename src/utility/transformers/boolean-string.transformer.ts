import { Transform } from 'class-transformer';

/**
 * Implicit conversion does not properly convert boolean strings, so we need to
 * handle those manually.
 */
export function TransformBooleanString(key: string) {
  return Transform(({ obj }) => {
    return obj[key].toLowerCase() === 'true';
  });
}
