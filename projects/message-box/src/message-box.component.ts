import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, input, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { NgxMessageBoxAction, NgxMessageBoxType } from './message-box.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'ngx-message-box',
    styleUrls: ['./message-box.component.scss'],
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
        MatButton,
        MatCardSubtitle
    ]
})
export class NgxMessageBoxComponent {

    /** Event Emmited when the close action is called */
    public readonly close = output<void>();

    public readonly type = input<NgxMessageBoxType>();
    public readonly title = input<string>();
    public readonly subtitle = input<string>();
    public readonly icon = input<string>();
    public readonly actions = input<readonly NgxMessageBoxAction[]>();

    public readonly horizontal = input(false, { transform: booleanAttribute });
    public readonly showCloseIcon = input(false, { transform: booleanAttribute });

    public readonly actionsTemplate = contentChild<TemplateRef<unknown>>('actionsTemplate');

    public readonly computedIcon = computed(() => {
        const icon = this.icon();
        if (icon === undefined && this.type()) {
            return this.getIconFromType(this.type()!);
        }
        return icon;
    });

    public readonly computedActions = computed(() => {
        const actions = this.actions();
        if (actions) {
            return actions.map(action => {
                if (!action.icon && action.type) {
                    return { ...action, icon: this.getIconFromType(action.type) };
                }
                return action;
            });
        }
        return actions;
    });

    public onClose(): void {
        this.close.emit();
    }

    private getIconFromType(type: 'info' | 'primary' | 'success' | 'warn' | 'danger'): string {
        switch (type) {
            case 'info':
            case 'primary':
                type = 'primary';
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
