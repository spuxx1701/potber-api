import { Transform } from 'class-transformer';

export function TransformBooleanString() {
  return Transform(({ value }) => {
    return value === 'true';
  });
}
