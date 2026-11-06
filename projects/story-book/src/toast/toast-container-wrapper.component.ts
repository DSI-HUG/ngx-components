import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ErrorToast, InfoToast, SuccessToast, ToastAction, ToastService, ToastSeverity, WarnToast } from '../../../layout/src/toast/toast.service';
import { NgxToastContainerComponent } from '../../../layout/src/toast/toast-container.component';

@Component({
    selector: 'storybook-toast-container-wrapper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgxToastContainerComponent,
        MatButtonModule
    ],
    providers: [
        ToastService
    ],
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    templateUrl: './toast-container-wrapper.component.html',
    styleUrl: './toast-container-wrapper.component.scss'
})
export class StorybookToastContainerWrapperComponent {
    private readonly toastService = inject(ToastService);

    protected addToast(severity: ToastSeverity): void {
        switch (severity) {
            case 'info':
                this.toastService.add(new InfoToast(
                    'Message sent',
                    '',
                    new ToastAction(
                        'Revert',
                        () => {
                            alert('Revert has been clicked');
                        }
                    ),
                    3000
                ));
                break;
            case 'success':
                this.toastService.add(new SuccessToast(
                    'Message sent',
                    '',
                    new ToastAction(
                        'Revert',
                        () => {
                            alert('Revert has been clicked');
                        }
                    ),
                    3000
                ));
                break;
            case 'warning':
                this.toastService.add(new WarnToast(
                    'Message sent',
                    'A toast added from Storybook. with some more text just to see what happens when I do that',
                    new ToastAction(
                        'Revert',
                        () => {
                            alert('Revert has been clicked');
                        }
                    )
                ));
                break;
            case 'error':
                this.toastService.add(new ErrorToast(
                    'Message sent',
                    '',
                    new ToastAction(
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
