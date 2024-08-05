/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxInputAutosizeDirective } from '@hug/ngx-core';

interface StringFormControls {
    myText: FormControl<string | null>;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-input-autosize-demo',
    styleUrls: ['./input-autosize-demo.component.scss'],
    templateUrl: './input-autosize-demo.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatTabsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NgxInputAutosizeDirective,
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ]
})
export class InputAutosizeDemoComponent {
    public myForm: FormGroup<StringFormControls>;


    protected tabIndex = 1;

    public constructor() {

        this.myForm = new FormGroup<StringFormControls>({
            myText: new FormControl('Je suis votre texte')
        });
    }
}
