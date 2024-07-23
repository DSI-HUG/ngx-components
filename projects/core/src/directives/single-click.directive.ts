import { Directive, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { NgxDestroy } from './destroy';

@Directive({
    selector: '[ngx-single-click]',
    standalone: true
})
export class NgxSingleClickDirective extends NgxDestroy implements OnInit {
    @Input()
    public throttleTime = 2000;

    @Input()
    public allowDoubleClick = false;

    @Output()
    public readonly singleClick = new EventEmitter<MouseEvent>();

    private _clicks$ = new ReplaySubject<MouseEvent>(1);

    @HostListener('click', ['$event'])
    public clickEvent(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this._clicks$.next(event);
    }

    @HostListener('dblclick', ['$event'])
    public dblClickEvent(event: MouseEvent): void {
        if (!this.allowDoubleClick) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    public ngOnInit(): void {
        this._clicks$.pipe(
            throttleTime(this.throttleTime),
            takeUntil(this.destroyed$)
        ).subscribe((event: MouseEvent) => this.singleClick.emit(event));
    }
}
