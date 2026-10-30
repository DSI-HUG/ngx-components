import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgxToastComponent } from './component/toast.component';
import { ToastService } from './toast.service';


@Component({
    selector: 'ngx-toast-container',
    templateUrl: './toast-container.component.html',
    styleUrl: './toast-container.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatButtonModule,
        NgxToastComponent
    ],
    /* eslint-disable @typescript-eslint/naming-convention */
    host: {
        'role': 'region',
        'aria-live': 'polite',
        '[style.padding-block-end.px]': 'offset()'
    }
    /* eslint-disable @typescript-eslint/naming-convention */
})
export class NgxToastContainerComponent {
    public readonly offset = input<number>(0);

    private readonly toastService = inject(ToastService);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    protected readonly toasts = computed(() => this.toastService.toasts());

    protected remove(uuid: string): void {
        this.toastService.remove(uuid);
    }
}
