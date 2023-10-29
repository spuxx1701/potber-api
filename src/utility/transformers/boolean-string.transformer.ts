import { Transform } from 'class-transformer';

/**
 * Implicit conversion does not properly convert boolean strings, so we need to
 * handle those manually.
 */
export function TransformBooleanString(key: string) {
  return Transform(({ obj }) => {
    if (typeof obj[key] === 'boolean') return obj[key];
    else if (typeof obj[key] === 'undefined') return false;
    else if (typeof obj[key] === 'string')
      return obj[key].toLowerCase() === 'true';
  });
}
