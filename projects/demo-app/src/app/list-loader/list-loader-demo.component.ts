/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxDestroy } from '@hug/ngx-core';
import { NgxListLoaderComponent } from '@hug/ngx-list-loader';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

export const myFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY HH:mm'
    },
    display: {
        dateInput: 'DD/MM/YYYY HH:mm',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'DD/MM/YYYY HH:mm',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-list-loader-demo',
    styleUrls: ['./list-loader-demo.component.scss'],
    templateUrl: './list-loader-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatTabsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NgxListLoaderComponent,
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ]
})
export class ListLoaderDemoComponent extends NgxDestroy {
    protected tabIndex = 1;

    protected label = "MyCustomLabel";

    protected onInput1Change$ = new Subject<Event>();
    private changeDetectorRef = inject(ChangeDetectorRef);

    public constructor() {
        super();

        this.onInput1Change$.pipe(
            debounceTime(1),
            distinctUntilChanged(),
            map(event => (event.target as HTMLInputElement).value),
            takeUntil(this.destroyed$)
        ).subscribe(v => {
            this.label = v;
            this.changeDetectorRef.markForCheck();
        });

    }
}
