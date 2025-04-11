import { TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, OnDestroy, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerApply, MatDatepickerInput, MatDateSelectionModel } from '@angular/material/datepicker';
import { NgxTimePickerComponent } from '@hug/ngx-time-picker';
import { cloneDeep } from 'lodash-es';
import { delay, filter, map, tap } from 'rxjs';

import { DATE_TIME_ADAPTER, DateTimeAdapter } from '../date-adapter/date-time-adapter';


@Component({
    selector: 'ngx-datepicker-with-time',
    templateUrl: './datepicker-with-time.component.html',
    styleUrls: ['./datepicker-with-time.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatButton,
        NgxTimePickerComponent,
        MatDatepicker,
        MatDatepickerApply
    ]
})
export class NgxDatepickerWithTimeComponent implements AfterViewInit, OnDestroy {

    @ViewChild(TemplateRef)
    private template?: TemplateRef<unknown>;

    @ViewChild(NgxTimePickerComponent, { read: ElementRef, static: false })
    private timePickerElement?: ElementRef<HTMLElement>;

    protected time?: Date;

    protected datepicker = inject<MatDatepicker<unknown>>(MatDatepicker);
    protected viewContainerRef = inject(ViewContainerRef);
    protected globalModel = inject<MatDateSelectionModel<unknown, unknown>>(MatDateSelectionModel);
    protected dateAdapter? = inject<DateTimeAdapter<unknown> & DateAdapter<unknown>>(DATE_TIME_ADAPTER, { optional: true });
    private destroyRef = inject(DestroyRef);

    private portal?: TemplatePortal;

    public constructor() {

        this.datepicker.openedStream.pipe(
            tap(() => {
                const datePickerInput = this.datepicker.datepickerInput as MatDatepickerInput<Date>;
                this.time = datePickerInput.value ?? new Date();
            }),
            delay(1),
            map(() => this.timePickerElement?.nativeElement.parentElement),
            filter(Boolean),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(datePickerContainer => {
            const containerRef = this.viewContainerRef.element.nativeElement as HTMLElement;
            datePickerContainer.setAttribute('layout', containerRef?.ownerDocument?.body?.clientHeight <= 500 ? 'h' : 'v');
        });
    }

    public onDateTimeClosed(): void {
        const date = cloneDeep(this.globalModel.selection) as Date || new Date();
        if (this.time) {
            const hours = this.time.getHours();
            const minutes = this.time.getMinutes();
            const seconds = this.time.getSeconds();
            date.setHours(hours, minutes, seconds);
        }
        this.globalModel.updateSelection(date, this);
        const datePickerInput = this.datepicker.datepickerInput as MatDatepickerInput<unknown>;
        datePickerInput.writeValue(date);
    }

    public ngAfterViewInit(): void {
        if (!this.template) {
            return;
        }

        this.portal = new TemplatePortal(this.template, this.viewContainerRef);
        this.datepicker.registerActions(this.portal);
    }

    public ngOnDestroy(): void {
        if (!this.portal) {
            return;
        }

        this.datepicker.removeActions(this.portal);

        // Needs to be null checked since we initialize it in `ngAfterViewInit`.
        if (this.portal.isAttached) {
            this.portal.detach();
        }
    }
}
