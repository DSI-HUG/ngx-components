import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SearchContainerComponent, SearchInputDirective } from './search-container.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    declarations: [
        SearchContainerComponent,
        SearchInputDirective
    ],
    exports: [
        SearchContainerComponent,
        SearchInputDirective
    ]
})
export class SearchContainerModule { }
