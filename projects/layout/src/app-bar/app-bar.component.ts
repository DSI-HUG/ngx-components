import { ChangeDetectionStrategy, Component, inject, input, output, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { NgxLayoutIntl } from '../providers';

type AppBarMode = 'standard' | 'condensed';

@Component({
    selector: 'ngx-app-bar',
    templateUrl: './app-bar.component.html',
    styleUrl: './app-bar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIcon, MatIconButton, MatTooltip],
    host: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '[class.condensed]': 'mode()==="condensed"'
    }
})
export class NgxAppBarComponent {
    public mode = input<AppBarMode>('standard');
    public title = input.required<string>();
    public subtitle = input<string>();
    public helpUrl = input<string | URL>();
    public withBackButton = input<boolean>(false);

    public readonly goBack = output();

    protected readonly intl = inject(NgxLayoutIntl, { optional: true });

    private helpPopup: Window | undefined;

    protected openHelp(): void {
        const params = [
            `height=${screen.height}`,
            `width=${screen.width}`,
            'fullscreen=yes'
        ].join(',');

        if (this.helpPopup) {
            this.helpPopup.close();
        }

        this.helpPopup = window.open(this.helpUrl(), 'help_popup', params) ?? undefined;
        this.helpPopup?.moveTo(0, 0);
    }

    protected triggerGoBack(): void {
        this.goBack.emit();
    }
}
