import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';

import { NgxMessageBoxAction, NgxMessageBoxType } from './message-box.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'ngx-message-box',
    styleUrls: ['./message-box.component.scss'],
    templateUrl: './message-box.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ]
})
export class NgxMessageBoxComponent implements OnInit {
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() public readonly close = new EventEmitter();

    @Input() public type?: NgxMessageBoxType;
    @Input() public title?: string;
    @Input() public icon?: string;
    @Input() public actions?: readonly NgxMessageBoxAction[];

    /** Event Emmited when the close action is called */
    @ContentChild('actionsTemplate') public actionsTemplate?: TemplateRef<unknown>;

    private _horizontal?: boolean;

    @Input()
    public set horizontal(value: BooleanInput) {
        this._horizontal = coerceBooleanProperty(value);
    }

    public get horizontal(): BooleanInput {
        return this._horizontal;
    }

    private _showCloseIcon = false;

    @Input()
    public set showCloseIcon(value: BooleanInput) {
        this._showCloseIcon = coerceBooleanProperty(value);
    }

    public get showCloseIcon(): BooleanInput {
        return this._showCloseIcon;
    }

    public ngOnInit(): void {
        if (this.icon === undefined && this.type) {
            this.icon = this.getIconFromType(this.type);
        }

        if (this.actions) {
            this.actions.forEach(action => {
                if (!action.icon && action.type) {
                    action.icon = this.getIconFromType(action.type);
                }
            });
        }
    }

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
