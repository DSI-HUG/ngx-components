import { ChangeDetectionStrategy, Component, computed, inject, input, viewChildren } from '@angular/core';
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
        '[style.padding-block-end.px]': 'offset()',
        '[style.--ngx-toast-count]': 'toasts().length',
        '[style.--ngx-toast-total-height.px]': 'layout().totalHeight',
        '[style.--ngx-toast-buffer-height.px]': 'layout().bufferHeight'
    }
    /* eslint-disable @typescript-eslint/naming-convention */
})
export class NgxToastContainerComponent {
    public readonly offset = input<number>(0);

    protected readonly toasts = computed(() => this.toastService.toasts());

    protected readonly layout = computed(() => {
        const heights = this.components().map(component => component.size()?.borderBoxSize[0]?.blockSize ?? 0);
        const offsets = heights.map(() => 0);
        const totalHeight = heights.reduceRight((total, height, index) => {
            offsets[index] = total;
            return total + height;
        }, 0);
        return {
            offsets,
            totalHeight,
            bufferHeight: Math.max(0, ...heights)
        };
    });

    private readonly toastService = inject(ToastService);
    private readonly components = viewChildren(NgxToastComponent);


    protected remove(uuid: string): void {
        this.toastService.remove(uuid);
    }

    protected removeAll(): void {
        this.toastService.reset();
    }
}
