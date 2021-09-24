import * as postalCodes from 'postal-codes-js';
import { AbstractControl } from '@angular/forms';

export function ValidateZipCode(control: AbstractControl): any {
  const country = control.parent?.value.country;
  const zipCode = control.value;
  const isZipCodeValid = postalCodes.validate(country, zipCode);

  if (isZipCodeValid !== true) {
    return { invalidZipCode: true };
  }

  return null;
}
