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
import { NgxFilterDirective, NgxFiltersGroupComponent, NgxFilterToggleDirective } from '@hug/ngx-layout/filters-group';
import { NgxMainBarComponent } from '@hug/ngx-layout/main-bar';
import { NgxPanelComponent } from '@hug/ngx-layout/panel';
import { NgxSearchBarContainerComponent, NgxSearchInputDirective } from '@hug/ngx-layout/search-bar-container/';
import { type Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { argTypesLayout } from './arg-types-layout';
import { NgxFiltersGroupTemplateComponent } from './layout-template/filters-group-template.component';

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
                NgxFiltersGroupTemplateComponent,
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
                MatListModule
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
        title: 'App Bar Title',
        subtitle: 'Subtitle',
        helpUrl: 'https://www.hug.ch/',
        withBackIcon: false,
        searchFolded: false,
        filtersGroupFolded: false,
        appearance: 'default',
        contentPadding: 'regular'
    },
    tags: ['autodocs']
};
export default meta;

type Story = StoryObj;

export const basic: Story = {
    render: args => {
        const props = {
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
        };
        return {
            props,
            template: `
        <div style="display: flex; height: 50vh;">
        <ngx-layout>
            <ngx-app-bar
            [mode]="mode"
            [title]="title"
            [subtitle]="subtitle"
            [helpUrl]="helpUrl"
            [withBackIcon]="withBackIcon"
            >
                <button matIconButton aria-label="Home">
                    <mat-icon>home</mat-icon>
                </button>
            </ngx-app-bar>
            <ngx-main-bar>
                <ngx-actions-group>
                    <button matIconButton aria-label="Filter" matTooltip="Filtres">
                        <mat-icon>filter_list</mat-icon>
                    </button>
                    <button matIconButton aria-label="Columns" matTooltip="Colonnes">
                        <mat-icon>view_column</mat-icon>
                    </button>
                    <button matIconButton aria-label="Settings" matTooltip="Paramètres">
                        <mat-icon>settings</mat-icon>
                    </button>
                    <button matIconButton aria-label="Download" matTooltip="Télécharger">
                        <mat-icon>download</mat-icon>
                    </button>
                </ngx-actions-group>
                <ngx-filters-group (resetFilters)="buttonResetClicked" [folded]="filtersGroupFolded">
                    <ng-template [ngx-filter-toggle] label="Afficher commentaire" [(active)]="commentFilter" />
                    <ng-template
                        [ngx-filter]
                        [active]="!!selectedPeriod"
                        label="Periode"
                        [selectedFilterLabel]="selectedDateRangeLabel()">
                        <mat-button-toggle-group [(ngModel)]="selectedPeriod" aria-label="Font Style">
                            <mat-button-toggle value="3_DAYS">3 derniers jours</mat-button-toggle>
                            <mat-button-toggle value="3_MONTHS">3 derniers mois</mat-button-toggle>
                            <mat-button-toggle value="LAST_YEAR">Dernière année</mat-button-toggle>
                            <mat-button-toggle value="OTHER">Autre</mat-button-toggle>
                        </mat-button-toggle-group>
                        @if (selectedPeriod === 'OTHER') {
                            <mat-form-field>
                                <mat-label>Enter a date range</mat-label>
                                <mat-date-range-input [rangePicker]="picker">
                                    <input matStartDate [(ngModel)]="selectedStartDate" placeholder="Start date" />
                                    <input matEndDate [(ngModel)]="selectedEndDate" placeholder="End date" />
                                </mat-date-range-input>
                                <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
                                <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                                <mat-date-range-picker #picker></mat-date-range-picker>
                            </mat-form-field>
                        }
                    </ng-template>
                    <ng-template
                        [ngx-filter]
                        [active]="!!orderOrigin"
                        label="Origine"
                        [selectedFilterLabel]="orderOriginSelectedLabel()">
                        <mat-button-toggle-group [(ngModel)]="orderOrigin" aria-label="Font Style">
                            <mat-button-toggle style="justify-self: stretch; flex-grow: 1" value="HOSP">Hôpital</mat-button-toggle>
                            <mat-button-toggle style="justify-self: stretch; flex-grow: 1" value="HOME">Domicile</mat-button-toggle>
                        </mat-button-toggle-group>
                    </ng-template>
                    <ng-template
                        [ngx-filter]
                        [active]="!!orderTypes.length"
                        label="Type"
                        [selectedFilterLabel]="orderTypesSelectedLabel()">
                        <mat-selection-list no-padding [(ngModel)]="orderTypes">
                            <mat-list-option value="Médicament" togglePosition="after">Médicament</mat-list-option>
                            <mat-list-option value="Soin" togglePosition="after">Soin</mat-list-option>
                            <mat-list-option value="Laboratoire" togglePosition="after">Laboratoire</mat-list-option>
                            <mat-list-option value="Consultation/Examen" togglePosition="after">
                                Consultation/Examen
                            </mat-list-option>
                            <mat-list-option value="Intervention de soin" togglePosition="after">
                                Intervention de soin
                            </mat-list-option>
                            <mat-list-option value="Radiologie" togglePosition="after">Radiologie</mat-list-option>
                            <mat-list-option value="Onco./Hémato" togglePosition="after">Onco./Hémato</mat-list-option>
                            <mat-list-option value="Autres" togglePosition="after">Autres</mat-list-option>
                        </mat-selection-list>
                    </ng-template>
                    <ng-template [ngx-filter-toggle] label="Afficher documents" [(active)]="documentFilter" />
                </ngx-filters-group>
                <ngx-search-bar-container [folded]="searchFolded">
                    <input
                        ngx-search-input
                        type="text"
                        name="search"
                        placeholder="Rechercher"
                        [(ngModel)]="ngModel"                
                    />
                </ngx-search-bar-container>
            </ngx-main-bar>
            <ngx-panel [appearance]="appearance" [content-padding]="contentPadding">
                <p>Contenu du panneau numéro 1</p>
            </ngx-panel>
        </ngx-layout>
        </div>`
        };
    }
};

export const filtersGroup: Story = {
    render: args => ({
        template: '<ngx-filters-group-template></ngx-filters-group-template>',
        props: args
    })
};
