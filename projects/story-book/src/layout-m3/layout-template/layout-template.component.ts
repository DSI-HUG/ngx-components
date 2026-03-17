import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, model, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatChipsModule, MatChipTrailingIcon } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NgxFilterDirective, NgxFiltersGroupComponent, NgxFilterToggleDirective } from '@hug/ngx-layout/filters-group';

@Component({
    selector: 'ngx-layout-template',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatButtonToggle,
        MatButtonToggleGroup,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NgxFiltersGroupComponent,
        MatFormFieldModule,
        MatDatepickerModule,
        MatListModule,
        NgxFilterDirective,
        NgxFilterToggleDirective,
        MatChipTrailingIcon
    ],
    templateUrl: './layout-template.component.html'
})

export class NgxLayoutTemplateComponent {

    protected toggleFilter = model<boolean>(false);

    protected selectedPeriod = signal<'3_DAYS' | '3_MONTHS' | 'LAST_YEAR' | 'OTHER' | undefined>(undefined);
    protected selectedStartDate = signal<Date | undefined>(undefined);
    protected selectedEndDate = signal<Date | undefined>(undefined);
    protected selectedDateRangeLabel = computed(() => {
        switch (this.selectedPeriod()) {
            case '3_DAYS':
                return '3 jours';
            case '3_MONTHS':
                return '3 mois';
            case 'LAST_YEAR':
                return 'Dernière année';
            case 'OTHER': {
                const startDate = this.selectedStartDate();
                const endDate = this.selectedEndDate();
                if (!startDate && !endDate) {
                    return '';
                }

                if (!startDate) {
                    return `jusqu'au ${endDate!.toLocaleDateString('fr-CH')}`;
                }

                if (!endDate) {
                    return `dès le: ${startDate.toLocaleDateString('fr-CH')}`;
                }

                return `du ${startDate.toLocaleDateString('fr-CH')} au ${endDate.toLocaleDateString('fr-CH')}`;
            }
            default:
                return '';
        }
    });

    protected orderOrigin = signal<'HOSP' | 'HOME' | undefined>(undefined);
    protected orderOriginSelectedLabel = computed(() => {
        switch (this.orderOrigin()) {
            case 'HOSP':
                return 'Hôpital';
            case 'HOME':
                return 'Domicile';
            default:
                return '';
        }
    });

    protected orderTypes = model<string[]>([]);
    protected orderTypesSelectedLabel = computed(() => this.orderTypes().join(', '));

    protected buttonResetClicked(): void {
        this.selectedPeriod.set(undefined);
        this.selectedStartDate.set(undefined);
        this.selectedEndDate.set(undefined);
        this.toggleFilter.set(false);
        this.orderOrigin.set(undefined);
        this.orderTypes.set([]);
        console.log('reset clicked');
    }

}
