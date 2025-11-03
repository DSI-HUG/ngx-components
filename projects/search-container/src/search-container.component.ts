import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, EventEmitter, inject, Input, NgZone, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxDestroy, NgxMediaService } from '@hug/ngx-core';
import { BehaviorSubject, distinctUntilChanged, first, Observable, shareReplay, switchMap, takeUntil, tap } from 'rxjs';

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
    standalone: true,
    imports: [
        AsyncPipe,
        NgIf,
        NgTemplateOutlet,
        MatIconModule,
        MatTooltipModule
    ]
})
export class NgxSearchContainerComponent extends NgxDestroy implements AfterContentInit {

    @Output()
    public readonly cleared = new EventEmitter<void>();

    @ContentChild('mobileSearch')
    public mobileSearch: TemplateRef<unknown> | undefined;

    protected readonly intl = inject(NgxSearchContainerIntl);

    protected readonly activeSearch$ = new BehaviorSubject(false);

    protected searchInputValue$: Observable<string> | undefined;

    private _searchInput: NgxSearchInputDirective | undefined;

    @ContentChild(NgxSearchInputDirective)
    public set searchInput(searchInput: NgxSearchInputDirective) {
        if (!searchInput) {
            throw new Error(this.intl.addAttSearchInput);
        }
        if (!searchInput.ngControl) {
            throw new Error(this.intl.addAttNgmodel);
        }
        this._searchInput = searchInput;
    }

    private _right: TemplateRef<unknown> | null = null;

    @Input()
    public set right(value: TemplateRef<unknown> | null) {
        this._right = value;
    }

    public get right(): TemplateRef<unknown> | null {
        return this._right;
    }

    public constructor(
        protected mediaService: NgxMediaService,
        private zone: NgZone
    ) {
        super();

        this.activeSearch$.pipe(
            switchMap(activeSearch => this.zone.onStable.pipe(
                first(),
                tap(() => {
                    if (!activeSearch) {
                        this.reset();
                    }
                    this._searchInput?.focus();
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();
    }

    public ngAfterContentInit(): void {
        this.searchInputValue$ = this._searchInput?.ngControl?.valueChanges?.pipe(
            distinctUntilChanged(),
            shareReplay({ bufferSize: 1, refCount: false })
        ) ?? undefined;
    }

    public reset(): void {
        this._searchInput?.ngControl?.reset();
        this.cleared.emit();
    }
}
