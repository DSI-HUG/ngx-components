/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSearchContainerComponent, NgxSearchInputDirective } from '@hug/ngx-search-container';
import { Subject } from 'rxjs';

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
    selector: 'app-search-container-demo',
    styleUrls: ['./search-container-demo.component.scss'],
    templateUrl: './search-container-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatTabsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NgxSearchContainerComponent,
        NgxSearchInputDirective,
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ]
})
export class SearchContainerDemoComponent {
    protected tabIndex = 1;
    protected searchModel = '';

    protected label = 'MyCustomLabel';

    protected onInput1Change$ = new Subject<Event>();

    protected fullList: readonly string[] = [
        'limace',
        'cygne',
        'chat',
        'ours',
        'faisan',
        'dauphin',
        'paon',
        'furet',
        'panda',
        'phoque',
        'crocodile',
        'gorille',
        'raie',
        'chinchilla',
        'cafard',
        'faisan',
        'corbeau',
        'dromadaire',
        'alpaga',
        'aigle',
        'espadon',
        'canari',
        'guépard',
        'phoque',
        'bison',
        'poney',
        'alpaga',
        'kangourou',
        'pingouin',
        'raie',
        'autruche',
        'jaguar',
        'chameau',
        'oie',
        'lama',
        'perruche',
        'mouche',
        'iguane',
        'crabe'

    ];

    protected searchList: readonly string[] = this.fullList;

    protected searchQueryChanged(value: string): void {
        console.log(value);
        if (!value || value === '') {
            this.searchList = this.fullList;
        } else {
            this.searchList = this.fullList.filter(animal => animal.includes(value));

        }
    }
}
