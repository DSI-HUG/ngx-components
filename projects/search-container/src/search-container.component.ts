import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, DestroyRef, Directive, ElementRef, inject, input, OnInit, output, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxMediaService } from '@hug/ngx-core';
import { distinctUntilChanged, map, shareReplay } from 'rxjs';

import { NgxSearchContainerIntl } from './providers';

@Directive({
    selector: '[ngx-search-input]',
    standalone: true
})
export class NgxSearchInputDirective {
    public ngControl = inject(NgControl);

    protected elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    public constructor() {
        this.focus();
    }

    public focus(): void {
        this.elementRef.nativeElement.focus();
    }
}

@Component({
    selector: 'ngx-search-container',
    templateUrl: './search-container.component.html',
    styleUrls: ['./search-container.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        NgTemplateOutlet,
        MatIcon,
        MatTooltip
    ]
})
export class NgxSearchContainerComponent implements OnInit {

    public readonly right = input<TemplateRef<unknown>>();

    public readonly cleared = output<void>();

    protected readonly mobileSearch = viewChild<TemplateRef<unknown>>('mobileSearch');
    protected readonly searchInput = contentChild(NgxSearchInputDirective);

    protected readonly intl = inject(NgxSearchContainerIntl, { optional: true });

    protected readonly activeSearch = signal<boolean>(false);

    protected readonly searchInputValue = signal<string | undefined>(undefined);

    protected readonly mediaService = inject(NgxMediaService);
    private readonly destroyRef = inject(DestroyRef);

    public ngOnInit(): void {
        const searchInput = this.searchInput();
        if (!searchInput) {
            throw new Error(this.intl?.addAttSearchInput ?? 'You need to add the attribute ngx-search-input to the NgxSearchContainerComponent');
        }
        if (!searchInput.ngControl) {
            throw new Error(this.intl?.addAttNgmodel ?? 'You need to add the attribute ngModel to the NgxSearchContainerComponent');
        }
        searchInput.ngControl.valueChanges?.pipe(
            map(v => v as string | undefined),
            distinctUntilChanged(),
            shareReplay({ bufferSize: 1, refCount: false }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(v => this.searchInputValue.set(v));
    }

    public reset(): void {
        const searchInput = this.searchInput();
        searchInput?.ngControl?.reset();
        searchInput?.focus();
        this.cleared.emit();
    }
}
