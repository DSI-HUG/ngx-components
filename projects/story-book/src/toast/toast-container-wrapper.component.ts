import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ErrorToast, InfoToast, ToastService, ToastSeverity, WarnToast } from '../../../layout/src/toast/toast.service';
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
                this.toastService.add(new InfoToast('Example toast', 'A toast added from Storybook.', undefined, 3000));
                break;
            case 'warning':
                this.toastService.add(new WarnToast('Example toast', 'A toast added from Storybook. with some more text just to see what happens when I do that'));
                break;
            case 'error':
                this.toastService.add(new ErrorToast('Example toast', 'A toast added from Storybook.'));
                break;
            default:
                throw new Error('Unknown severity');
        }
    }
}
