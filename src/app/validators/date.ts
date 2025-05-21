import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(startDate : string , endDate: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const startDateValue = new Date(control.get(startDate)?.value);
        const endDateValue = new Date(control.get(endDate)?.value);

       if (!startDateValue || !endDateValue) {
            return {invalidDate: 'Por favor, introduce dos fecha válida'};
        }

        if (startDateValue >= endDateValue) {
            return { dateInvalid: 'La fecha de inicio debe ser anterior a la fecha de fin' };
        }
        return null;
    }
}
