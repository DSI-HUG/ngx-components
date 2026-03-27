import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, ViewEncapsulation } from '@angular/core';

import { NgxBarTitleDirective } from '../directives';
import { NgxFiltersGroupComponent } from '../filters-group';
import { NgxSearchBarContainerComponent } from '../search-bar-container';

@Component({
    selector: 'ngx-column-bar',
    templateUrl: './column-bar.component.html',
    styleUrl: './column-bar.component.scss',
    imports: [NgTemplateOutlet],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxColumnBarComponent {
    protected hasRightContent = computed(() => this.filtersGroup() ?? this.searchBarContainer());
    protected hasTitle = computed(() => !!this.barTitle());

    private readonly filtersGroup = contentChild(NgxFiltersGroupComponent);
    private readonly searchBarContainer = contentChild(NgxSearchBarContainerComponent);
    private readonly barTitle = contentChild(NgxBarTitleDirective);
}
