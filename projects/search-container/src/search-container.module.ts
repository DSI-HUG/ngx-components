import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgxSearchContainerComponent, NgxSearchInputDirective } from './search-container.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    declarations: [
        NgxSearchContainerComponent,
        NgxSearchInputDirective
    ],
    exports: [
        NgxSearchContainerComponent,
        NgxSearchInputDirective
    ]
})
export class SearchContainerModule { }
