import { ValidatorFn, AbstractControl } from '@angular/forms';

export class Isbn13Factory {
    static inputIsbn13(): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null;
            }

            const isValid = /^978[0-9]{10}/.test(control.value);
            return isValid ? null : { inputLength: true };
        };
    }
}
