import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'is-valid-lifetime', async: false })
export class IsValidLifetime implements ValidatorConstraintInterface {
  validate(lifetime: any) {
    if (typeof lifetime === 'number') {
      return true;
    } else if (typeof lifetime === 'string') {
      return !isNaN(parseInt(lifetime));
    } else return false;
  }

  defaultMessage() {
    return 'lifetime must be a number or a numeric string.';
  }
}
