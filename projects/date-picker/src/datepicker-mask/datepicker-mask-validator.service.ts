import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, Validator } from '@angular/forms';
import { isValid } from 'date-fns';

@Injectable()
export class NgxDatepickerMaskValidatorService implements Validator {
    public validate({ value }: FormControl<Date>): ValidationErrors | null {
        if (isValid(value)) {
            return null;
        }

        return {
            invalidDate: {}
        };
    }
}
