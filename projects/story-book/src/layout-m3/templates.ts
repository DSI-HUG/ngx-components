import { html } from '../helper';

export const actionsGroupTemplate = html`
    <ngx-actions-group>
        <ngx-action
            label="Filtres"
            icon="filter_list"
            (execute)="() => alert('Filtres')"
        />
        <ngx-action
            label="Colonnes"
            icon="view_column"
            (execute)="() => alert('Colonnes')"
        />
        <ngx-action
            label="Paramètres"
            icon="settings"
            (execute)="() => alert('Paramètres')"
        />
        <ngx-action
            label="Télécharger"
            icon="download"
            (execute)="() => alert('Télécharger')"
        />
        <ngx-action
            label="Partager"
            icon="share"
            (execute)="() => alert('Partager')"
        />
        <ngx-action
            label="Tableau de bord"
            icon="dashboard"
            (execute)="() => alert('Tableau de bord')"
        />
        <ngx-action
            label="Notifications"
            icon="notifications"
            (execute)="alert('Notifications !')"
        />
        <ngx-action
            label="Aide"
            icon="help_outline"
            (execute)="alert('help_outline !')"
        />
    </ngx-actions-group>
`;

export const filtersGroupFoldedTemplate = html`
    <ngx-filters-group (resetFilters)="buttonResetClicked()" [folded]="folded">
        <ng-template [ngxFilterToggle] label="Afficher commentaire" [(active)]="commentFilter" />
        <ng-template
            [ngxFilter]
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
            [ngxFilter]
            [active]="!!orderOrigin"
            label="Origine"
            [selectedFilterLabel]="orderOriginSelectedLabel()">
            <mat-button-toggle-group [(ngModel)]="orderOrigin" aria-label="Font Style">
                <mat-button-toggle style="justify-self: stretch; flex-grow: 1" value="HOSP">Hôpital</mat-button-toggle>
                <mat-button-toggle style="justify-self: stretch; flex-grow: 1" value="HOME">Domicile</mat-button-toggle>
            </mat-button-toggle-group>
        </ng-template>
        <ng-template
            [ngxFilter]
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
        <ng-template [ngxFilterToggle] label="Afficher documents" [(active)]="documentFilter" />
    </ngx-filters-group>`;

export const filtersGroupTemplate = html`
    <ngx-filters-group (resetFilters)="buttonResetClicked()" [folded]="filtersGroupFolded">
        <ng-template [ngxFilterToggle] label="Afficher commentaire" [(active)]="commentFilter" />
        <ng-template
            [ngxFilter]
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
            [ngxFilter]
            [active]="!!orderOrigin"
            label="Origine"
            [selectedFilterLabel]="orderOriginSelectedLabel()">
            <mat-button-toggle-group [(ngModel)]="orderOrigin" aria-label="Font Style">
                <mat-button-toggle style="justify-self: stretch; flex-grow: 1" value="HOSP">Hôpital</mat-button-toggle>
                <mat-button-toggle style="justify-self: stretch; flex-grow: 1" value="HOME">Domicile</mat-button-toggle>
            </mat-button-toggle-group>
        </ng-template>
        <ng-template
            [ngxFilter]
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
        <ng-template [ngxFilterToggle] label="Afficher documents" [(active)]="documentFilter" />
    </ngx-filters-group>`;

export const searchBarTemplate = html`
    <ngx-search-bar-container [folded]="searchFolded">
        <input
            ngxSearchInput
            type="text"
            name="search"
            placeholder="Rechercher"
            [(ngModel)]="ngModel"
        />
    </ngx-search-bar-container>`;

export const searchBarFoldedTemplate = html`
    <ngx-search-bar-container [folded]="true">
        <input
            ngxSearchInput
            type="text"
            name="search"
            placeholder="Rechercher"
            [(ngModel)]="ngModel"
        />
    </ngx-search-bar-container>`;

export const contentLeftTemplate = html`
    <div ngxContentLeft style="display: inline-flex; align-items: center; gap: 0.25rem;">
        <button mat-stroked-button type="button">Left action</button>
    </div>`;

export const contentRightTemplate = html`
    <div ngxContentRight style="display: inline-flex; align-items: center; gap: 0.25rem;">
        <button mat-flat-button type="button">Right action</button>
    </div>`;
