import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Isbn10Factory } from '../validators/isbn10-factory';

@Directive({
  selector: '[appIsbn10Directive]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: Isbn10DirectiveDirective,
    multi: true
  }]
})
export class Isbn10DirectiveDirective implements Validator {

  validateIsn10: ValidatorFn;
  constructor() {
    this.validateIsn10 = Isbn10Factory.inputIsbn10();
  }

  validate(control: AbstractControl): ValidationErrors {
    return (this.validateIsn10(control));
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }

}
