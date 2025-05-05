import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (form: AbstractControl): { [key: string]: any } | null => {
    if (!(form instanceof FormGroup)) {
      console.error('passwordMatchValidator must be applied to a FormGroup.');
      return null;
    }

    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('password_confirmation');

    if (!passwordControl || !confirmPasswordControl || !passwordControl.value || !confirmPasswordControl.value) {
         if (confirmPasswordControl && confirmPasswordControl.hasError('mismatch')) {
            confirmPasswordControl.setErrors(null);
         }
        return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ mismatch: true });
       return null;
    } else {
      if (confirmPasswordControl.hasError('mismatch')) {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    }
  };
}