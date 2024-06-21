import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkConnectedOverlay, CdkOverlayOrigin, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaService } from '@hug/ngx-core';
import { BehaviorSubject, combineLatestWith, delay, distinctUntilChanged, EMPTY, map, mergeWith, Observable, of, ReplaySubject, shareReplay, startWith, Subject, switchMap } from 'rxjs';

import { defaultConnectionPositionPair, OverlayConnectionPositionPair } from './connection-position-pair';

export interface ShowParams {
    event?: MouseEvent;
    offsetX?: number;
    offsetY?: number;
}

interface OverlayInfos {
    offsetX: number;
    offsetY: number;
    origin: CdkOverlayOrigin;
    width: string;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'overlay',
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

    /** Overlay pane containing the options. */
    @ViewChild(CdkConnectedOverlay, { static: true }) private overlay?: CdkConnectedOverlay;

    public readonly isVisible$: Observable<boolean>;

    protected overlayInfos$: Observable<OverlayInfos | undefined>;

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

    public constructor(private elementRef: ElementRef, private overlayContainer: OverlayContainer, mediaService: MediaService) {
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

                return mediaService.isMobile$;
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
                    map(([ownerElement, isMobile]) => ({
                        offsetX: showParams.offsetX && +showParams.offsetX || 0,
                        offsetY: showParams.offsetY && +showParams.offsetY || 0,
                        origin: new CdkOverlayOrigin(new ElementRef((isMobile && document.body) ?? showParams.event?.target ?? ownerElement ?? this.elementRef.nativeElement)),
                        width: isMobile ? this.widthForMobile : this.width
                    } as OverlayInfos))
                );

                const updatePosition$ = info$.pipe(
                    delay(1),
                    switchMap(() => {
                        this.overlay?.overlayRef?.updatePosition();
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
    public show(eventOrOffsetX?: MouseEvent | number, offsetY?: number): void {
        if (typeof eventOrOffsetX === 'number') {
            this.show$.next({ offsetX: eventOrOffsetX, offsetY });
        } else {
            this.show$.next({ event: eventOrOffsetX, offsetY });
        }
    }

    /** Ferme le dialog. */
    public close(): void {
        this.hide$.next();
    }
}
