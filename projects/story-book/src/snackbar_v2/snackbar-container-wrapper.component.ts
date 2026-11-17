import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ErrorSnackbar, InfoSnackbar, SnackbarAction, SnackbarService, SnackbarSeverity, SuccessSnackbar, WarnSnackbar } from '../../../layout/src/snackbar/snackbar.service';
import { NgxSnackbarContainerComponent } from '../../../layout/src/snackbar/snackbar-container.component';

@Component({
    selector: 'storybook-snackbar-container-wrapper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgxSnackbarContainerComponent,
        MatButtonModule
    ],
    providers: [
        SnackbarService
    ],
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    templateUrl: './snackbar-container-wrapper.component.html',
    styleUrl: './snackbar-container-wrapper.component.scss'
})
export class StorybookSnackbarContainerWrapperComponent {
    private readonly snackbarService = inject(SnackbarService);

    protected addSnackbar(severity: SnackbarSeverity): void {
        switch (severity) {
            case 'info':
                this.snackbarService.add(new InfoSnackbar(
                    'Message sent',
                    '',
                    new SnackbarAction(
                        'Revert',
                        () => {
                            alert('Revert has been clicked');
                        }
                    ),
                    3000
                ));
                break;
            case 'success':
                this.snackbarService.add(new SuccessSnackbar(
                    'Message sent',
                    '',
                    new SnackbarAction(
                        'Revert',
                        () => {
                            alert('Revert has been clicked');
                        }
                    ),
                    3000
                ));
                break;
            case 'warning':
                this.snackbarService.add(new WarnSnackbar(
                    'Message sent',
                    'A snackbar added from Storybook. with some more text just to see what happens when I do that',
                    new SnackbarAction(
                        'Revert',
                        () => {
                            alert('Revert has been clicked');
                        }
                    )
                ));
                break;
            case 'error':
                this.snackbarService.add(new ErrorSnackbar(
                    'Message sent',
                    '',
                    new SnackbarAction(
                        'Open ticket',
                        () => {
                            alert('Open ticket has been clicked');
                        }
                    )
                ));
                break;
            default:
                throw new Error('Unknown severity');
        }
    }
}
