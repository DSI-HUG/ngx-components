import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, input, linkedSignal, OnInit, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { NgxMessageBoxAction, NgxMessageBoxType } from './message-box.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'ngx-message-box',
    styleUrl: './message-box.component.scss',
    templateUrl: './message-box.component.html',
    imports: [
        NgTemplateOutlet,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatCardActions,
        MatIcon,
        MatIconButton,
        MatButton
    ]
})
export class NgxMessageBoxComponent implements OnInit {
    public readonly close = output();

    public readonly type = input<NgxMessageBoxType>();
    public readonly title = input<string>();
    public readonly icon = input<string>('');
    public readonly actions = input<readonly NgxMessageBoxAction[]>([]);
    public readonly horizontal = input<boolean>(false);
    public readonly showCloseIcon = input<boolean>(false);

    /** Event Emitted when the close action is called */
    public readonly actionsTemplate = contentChild<TemplateRef<unknown>>('actionsTemplate');

    protected readonly iconValue = linkedSignal<string>(() => this.icon());

    public ngOnInit(): void {
        const type = this.type();
        if (!this.iconValue() && type) {
            this.iconValue.set(this.getIconFromType(type));
        }

        this.actions()
            .filter(action => !action.icon && action.type)
            .forEach(action => {
                action.icon = this.getIconFromType(action.type!);
            });
    }

    private getIconFromType(type: NgxMessageBoxType): string {
        switch (type) {
            case 'info':
            case 'primary':
                type = 'primary'; // side-effect
                return 'info';
            case 'success':
                return 'done';
            case 'warn':
                return 'warning';
            case 'danger':
                return 'error';
            default:
                return '';
        }
    }
}
