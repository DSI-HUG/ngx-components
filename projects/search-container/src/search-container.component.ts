import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, DestroyRef, Directive, ElementRef, EventEmitter, inject, Input, NgZone, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxMediaService } from '@hug/ngx-core';
import { BehaviorSubject, distinctUntilChanged, first, Observable, shareReplay, switchMap, tap } from 'rxjs';

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
export class NgxSearchContainerComponent implements AfterContentInit {

    @Output()
    public readonly cleared = new EventEmitter<void>();

    @Input()
    public clearTooltip = 'Effacer la recherche';

    @Input()
    public openSearchTooltip = 'Ouvrir la recherche';

    @Input()
    public closeSearchTooltip = 'Quitter la recherche';

    @ContentChild('mobileSearch')
    public mobileSearch: TemplateRef<unknown> | undefined;

    protected readonly activeSearch$ = new BehaviorSubject(false);

    protected searchInputValue$: Observable<string> | undefined;


    @ContentChild(NgxSearchInputDirective)
    public set searchInput(searchInput: NgxSearchInputDirective) {
        if (!searchInput) {
            throw new Error('You need to add the attribute ngx-search-input to the NgxSearchContainerComponent');
        }
        if (!searchInput.ngControl) {
            throw new Error('You need to add the attribute ngModel to the NgxSearchContainerComponent');
        }
        this._searchInput = searchInput;
    }


    @Input()
    public set right(value: TemplateRef<unknown> | null) {
        this._right = value;
    }

    public get right(): TemplateRef<unknown> | null {
        return this._right;
    }

    protected mediaService = inject(NgxMediaService);
    private zone = inject(NgZone);
    private destroyRef = inject(DestroyRef);

    private _searchInput: NgxSearchInputDirective | undefined;

    private _right: TemplateRef<unknown> | null = null;


    public constructor() {

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
            takeUntilDestroyed(this.destroyRef)
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
