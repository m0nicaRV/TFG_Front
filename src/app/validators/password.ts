import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';


export function PassValidator(
  passwordKey: string = 'password', 
  confirmPasswordKey: string = 'password_confirmation'
): ValidatorFn {
 
    return (formGroup: AbstractControl): { [key: string]: any } | null => {

    if (!(formGroup instanceof FormGroup)) {
      console.warn('El validador passwordMatchValidator está diseñado para usarse con un FormGroup. ' +
         'La validación de coincidencia de contraseñas no se aplicará.'); 
      return null;
     }
    const passwordControl = formGroup.get(passwordKey); 
    const confirmPasswordControl = formGroup.get(confirmPasswordKey);
    if (passwordControl && confirmPasswordControl && passwordControl.value && confirmPasswordControl.value) { 
      if (passwordControl.value !== confirmPasswordControl.value) { 
        return { 
          contrasenasNoCoinciden: { message: 'Las contraseñas introducidas no coinciden.', }, 
        }; 
      } 
    }
    return null;
  };
}