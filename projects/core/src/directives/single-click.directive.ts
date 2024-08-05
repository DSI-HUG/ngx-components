import { DestroyRef, Directive, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
    selector: '[ngx-single-click]',
    standalone: true
})
export class NgxSingleClickDirective implements OnInit {
    @Input()
    public throttleTime = 2000;

    @Input()
    public allowDoubleClick = false;

    @Output()
    public readonly singleClick = new EventEmitter<MouseEvent>();

    private _clicks$ = new ReplaySubject<MouseEvent>(1);

    private destroyRef = inject(DestroyRef);

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
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((event: MouseEvent) => this.singleClick.emit(event));
    }
}
