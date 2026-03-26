import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, inject, input, output, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { NgxTitleBarDirective } from '../directives';
import { NgxFiltersGroupComponent } from '../filters-group';
import { NgxLayoutIntl } from '../providers';
import { NgxSearchBarContainerComponent } from '../search-bar-container';

@Component({
    selector: 'ngx-panel-bar',
    templateUrl: './panel-bar.component.html',
    styleUrl: './panel-bar.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatIcon, MatIconButton, MatTooltip, NgTemplateOutlet]
})
export class NgxPanelBarComponent {
    // inputs
    public hasBackButton = input<boolean>();
    public closable = input<boolean>();

    // output
    public readonly backClicked = output();
    public readonly closeClicked = output();

    protected readonly intl = inject(NgxLayoutIntl, { optional: true });

    protected hasRightContent = computed(() => !!((this.searchBarContainer() ?? this.filtersGroup()) ?? this.closable()));
    protected hasTitle = computed(() => !!this.titleBar());


    private readonly filtersGroup = contentChild(NgxFiltersGroupComponent);
    private readonly searchBarContainer = contentChild(NgxSearchBarContainerComponent);
    private readonly titleBar = contentChild(NgxTitleBarDirective);


    protected emitBackClicked(): void {
        this.backClicked.emit();
    }

    protected emitCloseClicked(): void {
        this.closeClicked.emit();
    }
}
