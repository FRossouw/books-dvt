import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Isbn10Factori } from '../validators/isbn10-factori';

@Directive({
  selector: '[appIsbn10Directive]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: Isbn10DirectiveDirective,
    multi: true
  }]
})
export class Isbn10DirectiveDirective implements Validator {

  validateIsbn10: ValidatorFn;
  constructor() {
    this.validateIsbn10 = Isbn10Factori.inputIsbn10();
  }

  validate(control: import('@angular/forms').AbstractControl): import('@angular/forms').ValidationErrors {
    return (this.validateIsbn10(control));
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
