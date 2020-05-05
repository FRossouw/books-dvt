import { ValidatorFn, AbstractControl } from '@angular/forms';

export class InputLengthFactory {
    static inputLength(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            const isValid = /[a-zA-Z0-9!@#$&()-`.+,/\"\'\ ]{0,255}/.test(control.value);
            return isValid ? null : { inputLength: true };
        };
    }
}
