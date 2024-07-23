import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, EventEmitter, inject, Input, NgZone, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgxDestroy, NgxMediaService } from '@hug/ngx-core';
import { BehaviorSubject, distinctUntilChanged, first, Observable, shareReplay, switchMap, takeUntil, tap } from 'rxjs';

@Directive({
    selector: '[ngx-search-input]'
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxSearchContainerComponent extends NgxDestroy implements AfterContentInit {

    @Output()
    public readonly cleared = new EventEmitter<void>();

    @Input()
    public clearTooltip = 'Effacer la recherche';

    @ContentChild('mobileSearch')
    public mobileSearch: TemplateRef<unknown> | undefined;

    protected readonly activeSearch$ = new BehaviorSubject(false);

    protected searchInputValue$: Observable<string> | null | undefined;

    private _searchInput: NgxSearchInputDirective | undefined;

    @ContentChild(NgxSearchInputDirective)
    public set searchInput(searchInput: NgxSearchInputDirective) {
        if (!searchInput) {
            throw new Error('You need to add the attribute searchInput to the SearchContainerComponent');
        }
        if (!searchInput.ngControl) {
            throw new Error('You need to add the attribute ngModel to the SearchContainerComponent');
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
        );
    }

    public reset(): void {
        this._searchInput?.ngControl?.reset();
        this.cleared.emit();
    }
}
