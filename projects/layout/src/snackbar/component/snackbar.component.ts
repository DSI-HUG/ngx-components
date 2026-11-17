import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, ElementRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { timer } from 'rxjs';

import { resizeSignal } from '../../common/resize-signal';
import { Snackbar } from '../snackbar.service';

@Component({
    selector: 'ngx-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrl: './snackbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatIconModule,
        MatButtonModule
    ],
    /* eslint-disable @typescript-eslint/naming-convention */
    host: {
        'role': 'region',
        'aria-live': 'polite',
        '[class.error]': 'snackbar().severity === \'error\'',
        '[class.warning]': 'snackbar().severity === \'warning\'',
        '[class.success]': 'snackbar().severity === \'success\'',
        '[class.timed]': '!!duration()',
        '[style.animation-duration.ms]': 'duration()',
        '[class.around-icon]': '!!duration() && animationType() === \'around-icon\'',
        '[class.horizontal]': '!!duration() && animationType() === \'horizontal\''
    },
    /* eslint-disable @typescript-eslint/naming-convention */
    standalone: true
})
export class NgxSnackbarComponent {
    public readonly snackbar = input.required<Snackbar>();
    public readonly animationType = input<string>();
    public readonly expired = output<string>();
    public readonly size = resizeSignal(() => this.elementRef);

    protected readonly icon = computed(() => {
        const severity = this.snackbar().severity;
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
        const snackbar = this.snackbar();
        if (snackbar.severity !== 'info' && snackbar.severity !== 'success') {
            return undefined;
        }

        return snackbar.duration;
    });

    private readonly destroyRef = inject(DestroyRef);
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    public constructor() {
        effect(onCleanup => {

            const snackbar = this.snackbar();

            if (snackbar.severity !== 'info' && snackbar.severity !== 'success') {
                return;
            }

            const subscription = timer(snackbar.duration).pipe(
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => this.expired.emit(snackbar.uuid));

            onCleanup(() => subscription.unsubscribe());
        });

    }

    protected expire(): void {
        this.expired.emit(this.snackbar().uuid);
    }
}
