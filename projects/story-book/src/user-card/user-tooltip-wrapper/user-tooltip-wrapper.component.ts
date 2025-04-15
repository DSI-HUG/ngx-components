import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { NgxTooltipDirective } from '@hug/ngx-tooltip';
import { NgxUserCard } from '@hug/ngx-user-card';
import { NgxUserTooltipService } from '@hug/ngx-user-tooltip';
import { Observable } from 'rxjs';

@Component({
    selector: 'user-tooltip-wrapper[user]',
    templateUrl: './user-tooltip-wrapper.component.html',
    styleUrls: [
        './user-tooltip-wrapper.component.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatChip,
        NgxTooltipDirective,
        FormsModule
    ]
})
export class UserTooltipWrapperComponent {
    @Input()
    public user: NgxUserCard | null = null;

    private readonly ngxUserTooltipService = inject(NgxUserTooltipService);

    protected userTooltip$(user: NgxUserCard): (element: HTMLElement) => Observable<void> {
        return (element: HTMLElement): Observable<void> => this.ngxUserTooltipService.open$(element, user);
    }
}
