import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxTooltipComponentInterface } from '@hug/ngx-tooltip';

export interface NgxTooltipModel {
    card?: {
        title?: string;
        description?: string;
    }
    text?: string;
}

@Component({
    selector: 'tooltip-element-demo',
    templateUrl: './tooltip-element-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipElementDemoComponent implements NgxTooltipComponentInterface {
    public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    protected data = inject<NgxTooltipModel>(MAT_DIALOG_DATA);
}
