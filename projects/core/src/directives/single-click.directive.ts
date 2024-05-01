import { Directive, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { Destroy } from './destroy';

@Directive({
    selector: '[singleClick]',
    standalone: true
})
export class SingleClickDirective extends Destroy implements OnInit {
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
