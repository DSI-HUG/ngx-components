import { ComponentType, ConnectedPosition } from '@angular/cdk/overlay';
import { inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { subscribeWith } from '@hug/ngx-core';
import { merge } from 'lodash-es';
import { debounceTime, delay, EMPTY, filter, fromEvent, map, mergeWith, Observable, shareReplay, Subject, switchMap, take, tap, withLatestFrom } from 'rxjs';

import { NgxTooltipConfig } from './tooltip.model';
import { NgxTooltipComponentInterface } from './tooltip-component.interface';

export abstract class NgxTooltipService<D, T extends NgxTooltipComponentInterface> {
    protected close$ = new Subject<void>();

    protected positions: readonly ConnectedPosition[] = [
        {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 20
        },
        {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: -20
        },
        {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: -20
        },
        {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: 20
        },
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 20
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: -20
        },
        {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 20
        },
        {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
            offsetY: -20
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top'
        }
    ];

    protected dialog = inject(MatDialog);

    public constructor(private tooltipConfig?: MatDialogConfig<D>) {
        if (!this.tooltipConfig) {
            this.tooltipConfig = new MatDialogConfig();
        }
    }

    public open$(triggerElement: HTMLElement, tooltipData: D, tooltipConfig?: NgxTooltipConfig<D>): Observable<void> {
        this.close();

        const additionalPanelClass = (tooltipConfig?.panelClass && tooltipConfig.panelClass instanceof Array && tooltipConfig.panelClass)
            || (tooltipConfig?.panelClass && typeof tooltipConfig?.panelClass === 'string' && [tooltipConfig?.panelClass])
            || new Array<string>();

        const config = merge(tooltipConfig, {
            hasBackdrop: false,
            panelClass: ['ngx-tooltip-overlay', 'no-padding-dialog', 'ngx-tooltip-opening', ...additionalPanelClass]
        } as NgxTooltipConfig<D>);


        const dialogRef$ = this.openRef$(tooltipData, triggerElement, config).pipe(
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const checkClose$ = dialogRef$.pipe(
            switchMap(dialogRef => {
                const tooltipElement = dialogRef.componentInstance.elementRef?.nativeElement.parentElement;

                const mouseEnterTrigger$ = triggerElement ? fromEvent(triggerElement, 'mouseenter') : EMPTY;
                const mouseEnterTooltip$ = tooltipElement ? fromEvent(tooltipElement, 'mouseenter') : EMPTY;
                const mouseLeaveTrigger$ = triggerElement ? fromEvent(triggerElement, 'mouseleave') : EMPTY;
                const mouseLeaveTooltip$ = tooltipElement ? fromEvent(tooltipElement, 'mouseleave') : EMPTY;
                const set$ = mouseEnterTooltip$.pipe(
                    mergeWith(mouseEnterTrigger$),
                    map(() => false)
                );
                const reset$ = mouseLeaveTooltip$.pipe(
                    mergeWith(mouseLeaveTrigger$),
                    map(() => true)
                );
                return set$.pipe(
                    mergeWith(reset$),
                    debounceTime(config.hideDelay || 200),
                    filter(Boolean),
                    map(() => undefined as void)
                );
            })
        );

        const close$ = checkClose$.pipe(
            mergeWith(this.close$),
            withLatestFrom(dialogRef$),
            tap(([_, dialogRef]) => dialogRef.removePanelClass('ngx-tooltip-opened')),
            delay(300),
            tap(([response, dialogRef]) => dialogRef.close(response))
        );

        return dialogRef$.pipe(
            switchMap(dialogRef => dialogRef.afterClosed()),
            subscribeWith(close$),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    public close(): void {
        this.close$.next();
    }

    protected openRef$(tooltipData: D, triggerElement: HTMLElement, tooltipConfig: Partial<NgxTooltipConfig<D>>): Observable<MatDialogRef<NgxTooltipComponentInterface, void>> {
        return this.loadComponent$().pipe(
            take(1),
            switchMap(component => {
                const config = merge({}, this.tooltipConfig, tooltipConfig || {} as Partial<MatDialogConfig<D>>);
                config.data = tooltipData || {} as D;
                config.minWidth = config.minWidth || '100px';

                const dialogRef = this.dialog.open<NgxTooltipComponentInterface, D, void>(component, config);
                return dialogRef.afterOpened().pipe(
                    map(() => dialogRef)
                );
            }),
            tap(tooltipRef => {
                const componentInstance = tooltipRef.componentInstance;
                const tooltipBounds = componentInstance.elementRef?.nativeElement.parentElement?.getBoundingClientRect();
                const triggerBounds = triggerElement?.getBoundingClientRect();
                const bodyBounds = document.body.getBoundingClientRect();

                if (tooltipBounds && triggerBounds) {
                    this.positions.find((position, index) => {
                        // Calc trigger alignment
                        let left = position.offsetX || 0;
                        switch (position.originX) {
                            case 'start':
                                left += triggerBounds.left;
                                break;
                            case 'end':
                                left += triggerBounds.right;
                                break;
                            default:
                                left += triggerBounds.left + triggerBounds.width / 2;
                                break;
                        }

                        let top = position.offsetY || 0;
                        switch (position.originY) {
                            case 'top':
                                top += triggerBounds.top;
                                break;
                            case 'bottom':
                                top += triggerBounds.bottom;
                                break;
                            default:
                                top += triggerBounds.top + triggerBounds.height / 2;
                                break;
                        }

                        // Calc overlay position
                        switch (position.overlayX) {
                            case 'center':
                                left -= tooltipBounds.width / 2;
                                break;
                            case 'end':
                                left -= tooltipBounds.width;
                                break;
                            default:
                                break;
                        }

                        switch (position.overlayY) {
                            case 'center':
                                top -= tooltipBounds.height / 2;
                                break;
                            case 'bottom':
                                top -= tooltipBounds.height;
                                break;
                            default:
                                break;
                        }

                        if ((index < this.positions.length - 1) && (left < bodyBounds.left || top < bodyBounds.top || (left + tooltipBounds.width) > bodyBounds.right || (top + tooltipBounds.height) > bodyBounds.bottom)) {
                            // Try another position
                            return false;
                        }

                        if ((left + tooltipBounds.width) > bodyBounds.right) {
                            left = bodyBounds.right - tooltipBounds.width;
                        }

                        if ((top + tooltipBounds.height) > bodyBounds.bottom) {
                            top = bodyBounds.bottom - tooltipBounds.height;
                        }

                        if (top < bodyBounds.top) {
                            top = bodyBounds.top;
                        }

                        if (left < bodyBounds.left) {
                            left = bodyBounds.left;
                        }

                        tooltipRef.updatePosition({
                            left: `${left}px`,
                            top: `${top}px`
                        });
                        tooltipRef.addPanelClass('ngx-tooltip-opened');

                        return true;
                    });
                } else {
                    console.error('A tooltip component must inherits from TooltipComponent directive. Position can\'t be updated');
                }
            })
        );
    }

    protected abstract loadComponent$(): Observable<ComponentType<T>>;
}
