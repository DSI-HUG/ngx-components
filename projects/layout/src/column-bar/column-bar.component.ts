import { ChangeDetectionStrategy, Component, computed, contentChild, ViewEncapsulation } from '@angular/core';

import { NgxFiltersGroupComponent } from '../filters-group';
import { NgxSearchBarContainerComponent } from '../search-bar-container';

@Component({
    selector: 'ngx-column-bar',
    templateUrl: './column-bar.component.html',
    styleUrl: './column-bar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxColumnBarComponent {
    protected hasRightContent = computed(() => this.filtersGroup() ?? this.searchBarContainer());

    private readonly filtersGroup = contentChild(NgxFiltersGroupComponent);
    private readonly searchBarContainer = contentChild(NgxSearchBarContainerComponent);
}
