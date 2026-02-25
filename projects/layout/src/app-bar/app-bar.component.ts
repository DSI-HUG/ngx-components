import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

type AppBarMode = 'standard' | 'condensed';

@Component({
    selector: 'ngx-app-bar',
    templateUrl: './app-bar.component.html',
    styleUrl: './app-bar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIconModule, MatButtonModule, MatTooltipModule],
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
    public withBackIcon = input<boolean>(false);

    public readonly goBack = output();

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
