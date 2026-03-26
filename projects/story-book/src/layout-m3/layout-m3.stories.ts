import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxLayoutComponent } from '@hug/ngx-layout';
import { NgxActionsGroupComponent } from '@hug/ngx-layout/actions-group';
import { NgxAppBarComponent } from '@hug/ngx-layout/app-bar';
import { NgxColumnBarComponent } from '@hug/ngx-layout/column-bar';
import { NgxTitleBarDirective } from '@hug/ngx-layout/directives';
import { NgxFilterDirective, NgxFiltersGroupComponent, NgxFilterToggleDirective } from '@hug/ngx-layout/filters-group';
import { NgxMainBarComponent } from '@hug/ngx-layout/main-bar';
import { NgxPanelComponent } from '@hug/ngx-layout/panel';
import { NgxPanelBarComponent } from '@hug/ngx-layout/panel-bar';
import { NgxSearchBarContainerComponent, NgxSearchInputDirective } from '@hug/ngx-layout/search-bar-container/';
import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { argTypesLayout } from './arg-types-layout';
import { actionsGroupTemplate, filtersGroupFoldedTemplate, filtersGroupTemplate, searchBarFoldedTemplate, searchBarTemplate } from './templates';

const meta: Meta = {
    title: 'Components/Layout-m3',
    decorators: [
        moduleMetadata({
            imports: [
                FormsModule,
                MatIcon,
                MatIconButton,
                MatButton,
                MatTooltip,
                NgxAppBarComponent,
                NgxLayoutComponent,
                NgxActionsGroupComponent,
                NgxSearchBarContainerComponent,
                MatInput,
                NgxSearchInputDirective,
                NgxMainBarComponent,
                NgxPanelComponent,
                NgxFiltersGroupComponent,
                NgxFilterDirective,
                NgxFilterToggleDirective,
                CommonModule,
                MatButtonModule,
                MatChipsModule,
                MatIconModule,
                MatButtonToggle,
                MatButtonToggleGroup,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                MatDatepickerModule,
                MatListModule,
                NgxPanelBarComponent,
                NgxColumnBarComponent,
                NgxTitleBarDirective
            ]
        })
    ],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        ...argTypesLayout
    },
    args: {
        mode: 'standard',
        titleAppBar: 'App Bar Title',
        subtitle: 'Subtitle',
        helpUrl: 'https://www.hug.ch/',
        withBackButton: false,
        searchFolded: false,
        filtersGroupFolded: false,
        appearance: 'default',
        contentPadding: 'none',
        closable: false,
        hasBackButton: false,
        hasSearchPanelBar: true,
        hasActionsPanelBar: true,
        hasFiltersPanelBar: true,
        hasTitlePanelBar: true
    },
    tags: ['autodocs']
};
export default meta;

type Story = StoryObj;

type LayoutStoryProps = Story['args'] & {
    commentFilter: boolean;
    documentFilter: boolean;
    selectedPeriod: '3_DAYS' | '3_MONTHS' | 'LAST_YEAR' | 'OTHER' | undefined;
    selectedStartDate: Date | undefined;
    selectedEndDate: Date | undefined;
    orderOrigin: 'HOSP' | 'HOME' | undefined;
    orderTypes: string[];
    selectedDateRangeLabel: () => string;
    orderOriginSelectedLabel: () => string;
    orderTypesSelectedLabel: () => string;
    buttonResetClicked: () => void;
};

const props = (args: Story['args']): LayoutStoryProps => ({
    ...args,
    commentFilter: false,
    documentFilter: false,
    selectedPeriod: undefined as '3_DAYS' | '3_MONTHS' | 'LAST_YEAR' | 'OTHER' | undefined,
    selectedStartDate: undefined as Date | undefined,
    selectedEndDate: undefined as Date | undefined,
    orderOrigin: undefined as 'HOSP' | 'HOME' | undefined,
    orderTypes: [] as string[],

    selectedDateRangeLabel(): string {
        switch (this.selectedPeriod) {
            case '3_DAYS': return '3 jours';
            case '3_MONTHS': return '3 mois';
            case 'LAST_YEAR': return 'Dernière année';
            case 'OTHER': {
                const s = this.selectedStartDate;
                const e = this.selectedEndDate;
                if (!s && !e) {
                    return '';
                }
                if (!s) {
                    return `jusqu'au ${e!.toLocaleDateString('fr-CH')}`;
                }
                if (!e) {
                    return `dès le: ${s.toLocaleDateString('fr-CH')}`;
                }
                return `du ${s.toLocaleDateString('fr-CH')} au ${e.toLocaleDateString('fr-CH')}`;
            }
            default: return '';
        }
    },

    orderOriginSelectedLabel(): string {
        if (this.orderOrigin === 'HOSP') {
            return 'Hôpital';
        }

        if (this.orderOrigin === 'HOME') {
            return 'Domicile';
        }

        return '';
    },

    orderTypesSelectedLabel(): string {
        return this.orderTypes.join(', ');
    },
    buttonResetClicked(): void {
        this.selectedPeriod = undefined;
        this.selectedStartDate = undefined;
        this.selectedEndDate = undefined;
        this.commentFilter = false;
        this.documentFilter = false;
        this.orderOrigin = undefined;
        this.orderTypes = [];
        console.log('reset clicked');
    }
});

export const basic: Story = {
    render: (args): { props: LayoutStoryProps; template: string } => ({
        props: props(args),
        template: `
        <div style="display: flex; height: 100vh;">
        <ngx-layout>
            <ngx-app-bar
            [mode]="mode"
            [title]="titleAppBar"
            [subtitle]="subtitle"
            [helpUrl]="helpUrl"
            [withBackButton]="withBackButton"
            >
                <button matIconButton aria-label="Home">
                    <mat-icon>home</mat-icon>
                </button>
            </ngx-app-bar>
            <ngx-main-bar>
                ${actionsGroupTemplate}
                ${filtersGroupTemplate}
                ${searchBarTemplate}
                <button matButton="outlined" ngProjectAs="[ngxContentLeft]">ngxContentLeft</button> 
            </ngx-main-bar>
            <ngx-panel [appearance]="appearance" [contentPadding]="contentPadding">
                <ngx-panel-bar [closable]="closable" [hasBackButton]="hasBackButton">
                    @if(hasTitlePanelBar){
                        <h3 ngxTitleBar>Panel Bar Title</h3>}
                    @if(hasActionsPanelBar){
                        ${actionsGroupTemplate}}                 
                    @if(hasFiltersPanelBar){
                        ${filtersGroupTemplate}}                 
                    @if(hasSearchPanelBar){
                        ${searchBarTemplate}
                    }
                    <button matButton="outlined" ngProjectAs="[ngxContentLeft]">ngxContentLeft</button> 
                </ngx-panel-bar>
                <div>
                    <ngx-column-bar>
                        @if(hasTitlePanelBar){
                            <h4 ngxTitleBar>Column Bar Title</h4>}
                        @if(hasActionsPanelBar){
                            ${actionsGroupTemplate}}                 
                        @if(hasFiltersPanelBar){
                            ${filtersGroupFoldedTemplate}}                 
                        @if(hasSearchPanelBar){
                            ${searchBarFoldedTemplate}}         
                        <button matButton="outlined" ngProjectAs="[ngxContentLeft]">ngxContentLeft</button> 
                    </ngx-column-bar>
                </div>
            </ngx-panel>
        </ngx-layout>
        </div>`
    })
};

export const filtersGroup: Story = {
    render: (args): { props: LayoutStoryProps; template: string } => ({
        template: `<div style="display: flex; height: 10vh; width: 100%">${filtersGroupTemplate}</div>`,
        props: props(args)
    })
};
