import { Component, ElementRef, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import type { NgxTooltipComponentInterface } from '@hug/ngx-tooltip/m2';
import { type NgxUserCard, NgxUserCardComponent } from '@hug/ngx-user-card/m2';

@Component({
    selector: 'ngx-user-tooltip',
    templateUrl: './user-tooltip.component.html',
    standalone: true,
    imports: [
        NgxUserCardComponent
    ]
})
export class NgxUserTooltipComponent implements NgxTooltipComponentInterface {
    public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    protected user = inject<NgxUserCard>(MAT_DIALOG_DATA);
}
