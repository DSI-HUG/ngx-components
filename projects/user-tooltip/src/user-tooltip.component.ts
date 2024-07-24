import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxTooltipComponentInterface } from '@hug/ngx-tooltip';
import { NgxUserCard } from '@hug/ngx-user-card';

@Component({
    selector: 'ngx-user-tooltip',
    templateUrl: './user-tooltip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxUserTooltipComponent implements NgxTooltipComponentInterface {
    public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    protected user = inject<NgxUserCard>(MAT_DIALOG_DATA);
}
