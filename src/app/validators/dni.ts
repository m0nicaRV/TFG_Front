import { AbstractControl, ValidatorFn } from '@angular/forms';


export function dniValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (typeof value !== 'string' || value.length !== 9) {
      return { invalidDni: { message: 'El DNI debe tener 9 caracteres.' } };
    }

    const numero = value.substring(0, 8);
    const letra = value.substring(8).toUpperCase();

    if (!/^\d{8}$/.test(numero)) {
      return { invalidDni: { message: 'Los primeros 8 caracteres deben ser números.' } };
    }

    if (!/^[A-Z]$/.test(letra)) {
       return { invalidDni: { message: 'El último carácter debe ser una letra.' } };
    }

    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const numeroDni = parseInt(numero, 10);
    const letraEsperada = letras[numeroDni % 23];

    if (letraEsperada === letra) {
      return null;
    } else {
      return { invalidDni: { message: 'La letra del DNI no es correcta.' } };
    }
  };
}