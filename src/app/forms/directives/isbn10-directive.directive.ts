import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
//import { Isbn10Factory } from '../validators/isbn10-factory';

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
    //this.validateIsbn10 = Isbn10Factory.inputIsbn10();
  }

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    throw new Error("Method not implemented.");
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }

}
