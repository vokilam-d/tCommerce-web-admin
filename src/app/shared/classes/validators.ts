import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  private static invalidSlugRegex = /[^a-z0-9\-_]/;

  static passwordConfirm(passwordControl: AbstractControl): ValidatorFn {
    return (passwordConfirmControl: AbstractControl): ValidationErrors | null => {
      if (passwordConfirmControl.value !== passwordControl.value) {
        return { mismatch: true };
      }

      return null;
    }
  }

  static slug(control: AbstractControl): ValidationErrors | null {
    control.markAsTouched();

    const value = control.value as string;
    if (value.match(CustomValidators.invalidSlugRegex)) {
      return { invalid: true };
    }

    return null;
  }
}
