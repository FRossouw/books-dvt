import { ValidatorFn, AbstractControl } from '@angular/forms';

export class Isbn10Factory {
    static inputIsbn10(): ValidatorFn {
        return (control : AbstractControl) => {
            if (!control.value) {
                return null;
            }

            const isValid = /^[0-1][0-9]{9}/.test(control.value);
            return isValid ? null : { inputLength: true};
        }
    }
}
