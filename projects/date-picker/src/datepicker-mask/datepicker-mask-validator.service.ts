import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, Validator } from '@angular/forms';
import { isValid } from 'date-fns';

@Injectable()
export class NgxDatepickerMaskValidatorService implements Validator {
    private invalid = false;

    public validate({ value }: FormControl<Date>): ValidationErrors | null {
        return this.isInvalid(value) ? {
            invalidDate: { }
        } : null;
    }

    public markAsValid(): void {
        this.invalid = false;
    }

    public markAsInvalid(): void {
        this.invalid = true;
    }

    private isInvalid(value: Date): boolean {
        return this.invalid || value && !isValid(value);
    }
}
