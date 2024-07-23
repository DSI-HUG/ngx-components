import { ChangeDetectionStrategy, Component, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipComponentInterface } from '@hug/ngx-tooltip';
import { UserCard } from '@hug/ngx-user-card';

@Component({
    selector: 'ngx-user-tooltip',
    templateUrl: './user-tooltip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTooltipComponent implements TooltipComponentInterface {
    public constructor(
        public elementRef: ElementRef<HTMLElement>,
        @Inject(MAT_DIALOG_DATA) protected user: UserCard
    ) { }
}
