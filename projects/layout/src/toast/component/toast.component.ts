import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { timer } from 'rxjs';

import { Toast } from '../toast.service';

@Component({
    selector: 'ngx-toast',
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    /* eslint-disable @typescript-eslint/naming-convention */
    host: {
        'role': 'region',
        'aria-live': 'polite',
        '[class.error]': 'toast().severity === \'error\'',
        '[class.warning]': 'toast().severity === \'warning\'',
        '[class.success]': 'toast().severity === \'success\'',
        '[class.timed]': '!!duration()',
        '[style.animation-duration.ms]': 'duration()',
        '[class.around-icon]': '!!duration() && animationType() === \'around-icon\'',
        '[class.horizontal]': '!!duration() && animationType() === \'horizontal\''
    },
    /* eslint-disable @typescript-eslint/naming-convention */
    standalone: true
})
export class NgxToastComponent {
    public readonly toast = input.required<Toast>();
    public readonly animationType = input<string>();
    public readonly expired = output<string>();

    protected readonly icon = computed(() => {
        const severity = this.toast().severity;
        switch (severity) {
            case 'error':
                return 'release_alert';
            case 'warning':
                return 'warning';
            default:
                return 'info';
        }
    });

    protected readonly duration = computed(() => {
        const toast = this.toast();
        if (toast.severity !== 'info' && toast.severity !== 'success') {
            return undefined;
        }

        return toast.duration;
    });

    private readonly destroyRef = inject(DestroyRef);

    public constructor() {
        effect(onCleanup => {

            const toast = this.toast();

            if (toast.severity !== 'info' && toast.severity !== 'success') {
                return;
            }

            const subscription = timer(toast.duration).pipe(
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => this.expired.emit(toast.uuid));

            onCleanup(() => subscription.unsubscribe());
        });

    }

    protected expire(): void {
        this.expired.emit(this.toast().uuid);
    }
}
