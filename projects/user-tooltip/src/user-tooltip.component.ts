import { ChangeDetectionStrategy, Component, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxTooltipComponentInterface } from '@hug/ngx-tooltip';
import { NgxUserCard } from '@hug/ngx-user-card';

@Component({
    selector: 'ngx-user-tooltip',
    templateUrl: './user-tooltip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxUserTooltipComponent implements NgxTooltipComponentInterface {
    public constructor(
        public elementRef: ElementRef<HTMLElement>,
        @Inject(MAT_DIALOG_DATA) protected user: NgxUserCard
    ) { }
}
