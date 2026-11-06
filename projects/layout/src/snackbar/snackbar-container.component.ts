import { ChangeDetectionStrategy, Component, computed, inject, input, viewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgxSnackbarComponent } from './component/snackbar.component';
import { SnackbarService } from './snackbar.service';


@Component({
    selector: 'ngx-snackbar-container',
    templateUrl: './snackbar-container.component.html',
    styleUrl: './snackbar-container.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatButtonModule,
        NgxSnackbarComponent
    ],
    /* eslint-disable @typescript-eslint/naming-convention */
    host: {
        'role': 'region',
        'aria-live': 'polite',
        '[style.padding-block-end.px]': 'offset()',
        '[style.--ngx-snackbar-count]': 'snackbars().length',
        '[style.--ngx-snackbar-total-height.px]': 'layout().totalHeight',
        '[style.--ngx-snackbar-buffer-height.px]': 'layout().bufferHeight'
    }
    /* eslint-disable @typescript-eslint/naming-convention */
})
export class NgxSnackbarContainerComponent {
    public readonly offset = input<number>(0);

    protected readonly snackbars = computed(() => this.snackbarService.snackbars());

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

    private readonly snackbarService = inject(SnackbarService);
    private readonly components = viewChildren(NgxSnackbarComponent);


    protected remove(uuid: string): void {
        this.snackbarService.remove(uuid);
    }

    protected removeAll(): void {
        this.snackbarService.reset();
    }
}
