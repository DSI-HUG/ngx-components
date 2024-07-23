import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class NgxDestroy implements OnDestroy {
    protected destroyed$ = new Subject<void>();

    public ngOnDestroy(): void {
        if (this.destroyed$.closed) {
            console.error('Observable already unsubscribed');
            return;
        }

        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }
}
