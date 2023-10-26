import { Transform } from 'class-transformer';

/**
 * Use this decorator to remove all leading and trailing whitespace characters from the value.
 */
export function Trim() {
  return Transform(({ value }: { value: string }) => {
    return value.trim();
  });
}
