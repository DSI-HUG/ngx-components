import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkConnectedOverlay, CdkOverlayOrigin, OverlayContainer, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, inject, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgxMediaService } from '@hug/ngx-core';
import { BehaviorSubject, combineLatestWith, distinctUntilChanged, EMPTY, map, mergeWith, Observable, of, ReplaySubject, shareReplay, startWith, Subject, switchMap, take } from 'rxjs';

import { defaultConnectionPositionPair, OverlayConnectionPositionPair } from './connection-position-pair';

export interface ShowParams {
    event?: MouseEvent;
    offsetX?: number;
    offsetY?: number;
    context?: unknown;
}

interface OverlayInfos {
    offsetX: number;
    offsetY: number;
    origin: CdkOverlayOrigin;
    width: string;
    context: unknown;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'ngx-overlay',
    styleUrls: ['./overlay.component.scss'],
    templateUrl: './overlay.component.html',
    standalone: true,
    imports: [
        CommonModule,
        OverlayModule
    ]
})
export class OverlayComponent implements OnChanges {
    @Input() public ownerElement!: HTMLElement;

    @Input() public width!: string;

    @Input() public widthForMobile = '100%';

    @Input() public overlayBackdropClass = 'cdk-overlay-transparent-backdrop';

    @Input() public overlayContainerClass?: string;

    @Input() public isMobile?: BooleanInput;

    @ContentChild('content') protected contentTemplate?: TemplateRef<unknown>;

    /** Overlay pane containing the options. */
    @ViewChild(CdkConnectedOverlay) protected set overlay(value: CdkConnectedOverlay | undefined) {
        if (!value) {
            return;
        }

        this.overlayRef$.next(value.overlayRef);
    }

    public readonly isVisible$: Observable<boolean>;

    protected overlayInfos$: Observable<OverlayInfos | undefined>;
    protected overlayRef$ = new ReplaySubject<OverlayRef>(1);

    protected elementRef = inject(ElementRef );
    protected overlayContainer = inject(OverlayContainer);
    protected mediaService = inject(NgxMediaService);

    private show$ = new ReplaySubject<ShowParams>(1);
    private hide$ = new Subject<void>();

    /** Renvoie une valeur qui indique si le dialog est affiché. */
    private isMobileExt$ = new BehaviorSubject<boolean | undefined>(undefined);

    private _hasBackdrop = true;
    private ownerElement$ = new BehaviorSubject<HTMLElement | undefined>(undefined);

    @Input() public set hasBackdrop(value: BooleanInput) {
        this._hasBackdrop = coerceBooleanProperty(value);
    }

    public get hasBackdrop(): BooleanInput {
        return this._hasBackdrop;
    }

    private _positions = defaultConnectionPositionPair;
    private _positionsForMobile?: OverlayConnectionPositionPair[];

    public constructor() {
        const containerElement = this.overlayContainer.getContainerElement();
        containerElement.addEventListener('contextmenu', (event: Event) => {
            event.preventDefault();
            return false;
        });

        const isMobile$ = this.isMobileExt$.pipe(
            switchMap(isMobileExt => {
                if (isMobileExt !== undefined) {
                    return of(isMobileExt);
                }

                return this.mediaService.isMobile$;
            }),
            startWith(false),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.overlayInfos$ = this.show$.pipe(
            mergeWith(this.hide$),
            switchMap(showParams => {
                if (!showParams) {
                    return of(undefined);
                }

                containerElement.className = Array.from(containerElement.classList)
                    .filter(token => token.startsWith('cdk'))
                    .join(' ');

                containerElement.classList.add('ngx-overlay-container');
                if (this.overlayContainerClass) {
                    this.overlayContainerClass.split(' ').forEach(className => {
                        containerElement.classList.add(className);
                    });
                }

                const info$ = this.ownerElement$.pipe(
                    combineLatestWith(isMobile$),
                    map(([ownerElement, isMobile]) => {
                        const mobileElement = isMobile ? document.body : undefined;
                        return {
                            offsetX: showParams.offsetX && +showParams.offsetX || 0,
                            offsetY: showParams.offsetY && +showParams.offsetY || 0,
                            origin: new CdkOverlayOrigin(new ElementRef(mobileElement ?? showParams.event?.target ?? ownerElement ?? this.elementRef.nativeElement)),
                            width: isMobile ? this.widthForMobile : this.width,
                            context: showParams.context
                        } as OverlayInfos;
                    })
                );

                const updatePosition$ = this.overlayRef$.pipe(
                    take(1),
                    switchMap(overlayRef => {
                        overlayRef.updatePosition();
                        return EMPTY;
                    })
                );

                return info$.pipe(
                    mergeWith(updatePosition$)
                );
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );


        this.isVisible$ = this.overlayInfos$.pipe(
            map(Boolean),
            startWith(false),
            distinctUntilChanged()
        );
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['isMobile']) {
            this.isMobileExt$.next(this.isMobile !== undefined ? coerceBooleanProperty(this.isMobile) : undefined);
        }

        if (changes['ownerElement']) {
            this.ownerElement$.next(this.ownerElement);
        }
    }

    public get positionPairs(): OverlayConnectionPositionPair[] {
        return this.positions;
    }

    public get positions(): OverlayConnectionPositionPair[] {
        if (!this.isMobile) {
            return this._positions;
        } else if (this._positionsForMobile) {
            return this._positionsForMobile;
        } else {
            return OverlayConnectionPositionPair.parse('start top start top');
        }
    }

    @Input()
    public set positions(value: OverlayConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? OverlayConnectionPositionPair.parse(value) : value;
    }

    /** Si pas null, sera utilisé quand isMobile est vrai. Si null et si isMobile est vrai,
     *  alors c'est la valeur 'start top start top' qui est utilisée.
     * */
    @Input()
    public set positionsForMobile(value: OverlayConnectionPositionPair[] | string) {
        this._positionsForMobile = typeof value === 'string' ? OverlayConnectionPositionPair.parse(value) : value;
    }

    /** Affiche le dialog. */
    public show(eventOrOffsetX?: MouseEvent | number, offsetY?: number, context?: unknown): void {
        if (typeof eventOrOffsetX === 'number') {
            this.show$.next({ offsetX: eventOrOffsetX, offsetY, context });
        } else {
            this.show$.next({ event: eventOrOffsetX, offsetY, context });
        }
    }

    /** Ferme le dialog. */
    public close(): void {
        this.hide$.next();
    }
}
