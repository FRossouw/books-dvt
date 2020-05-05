import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { InputLengthFactory } from '../validators/input-length-factory';

@Directive({
  selector: '[appInputLengthDirective]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: InputLengthDirectiveDirective,
    multi: true
  }]
})
export class InputLengthDirectiveDirective implements Validator {

  validateInput: ValidatorFn;
  constructor() {
    this.validateInput = InputLengthFactory.inputLength();
  }

  validate(control: AbstractControl): ValidationErrors {
    return (this.validateInput(control));
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
