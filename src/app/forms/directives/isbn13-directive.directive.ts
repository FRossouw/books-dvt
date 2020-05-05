import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Isbn13Factory } from '../validators/isbn13-factory';

@Directive({
  selector: '[appIsbn13Directive]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: Isbn13DirectiveDirective,
    multi: true
  }]
})
export class Isbn13DirectiveDirective implements Validator {

  validateIsn13: ValidatorFn;
  constructor() {
    this.validateIsn13 = Isbn13Factory.inputIsbn13();
  }

  validate(control: AbstractControl): ValidationErrors {
    return (this.validateIsn13(control));
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }

}
